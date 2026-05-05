#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const BASE_URL = (process.env.BOITOAN_BASE_URL || 'https://boitoan.com.vn').replace(/\/$/, '')
const OUTPUT_DIR = process.env.BOITOAN_LIVE_SMOKE_DIR || `/tmp/boitoan_live_generated_smoke_${timestamp()}`
const OUTPUT_JSON = process.env.BOITOAN_LIVE_SMOKE_OUTPUT || `${OUTPUT_DIR}/result.json`
const HEADLESS = process.env.BOITOAN_LIVE_SMOKE_HEADED === '1' ? false : true
const RUN_CHAT = process.env.BOITOAN_LIVE_SMOKE_CHAT !== '0'
const RUN_GENERATED = process.env.BOITOAN_LIVE_SMOKE_GENERATED !== '0'
const TIMEOUT_MS = Number(process.env.BOITOAN_LIVE_SMOKE_TIMEOUT_MS || 120_000)
const MOBILE_VIEWPORT = { width: 390, height: 844 }

const SAMPLE = {
  name: process.env.BOITOAN_LIVE_SMOKE_NAME || 'Sơn',
  gender: process.env.BOITOAN_LIVE_SMOKE_GENDER || 'Nam',
  birthDate: process.env.BOITOAN_LIVE_SMOKE_BIRTH_DATE || '1984-05-17',
  birthHourPattern: process.env.BOITOAN_LIVE_SMOKE_BIRTH_HOUR_PATTERN || 'Tý sớm|Ty_som|00:00',
  chatQuestion: process.env.BOITOAN_LIVE_SMOKE_CHAT_QUESTION || 'Giải thích về cung Mệnh của tôi',
}

const FORBIDDEN = /Tử\s*Tức|tu_tuc|子息|chắc chắn|nhất định|sẽ xảy ra|100%|định mệnh|chết|tử vong|qua đời|đoản mệnh|ung thư|bệnh nặng|chẩn đoán|bác sĩ|thuốc điều trị|phẫu thuật|lợi nhuận|đầu tư chắc thắng|giàu to|phá sản|mất trắng|kiện tụng|tù tội|phạm pháp|ra tòa|án tù|giải hạn|cúng giải|bùa|trấn yểm|ung thư|bệnh nặng|chẩn đoán|bác sĩ|thuốc điều trị|phẫu thuật|đầu tư chắc thắng|giàu to|phá sản|mất trắng|tài lộc chắc|tài vận chắc|Tools được gọi|search_kb/iu

const result = {
  baseUrl: BASE_URL,
  startedAt: new Date().toISOString(),
  sample: { ...SAMPLE, birthHourPattern: SAMPLE.birthHourPattern },
  checks: {},
  network: [],
  screenshots: {},
  errors: [],
}

function timestamp() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
}

function record(name, ok, details = {}) {
  result.checks[name] = { ok: Boolean(ok), ...details }
  if (!ok) result.errors.push(name)
}

function sanitizeUrl(url) {
  return String(url).replace(/chart\/[A-Za-z0-9_-]+/g, 'chart/{id}').replace(/reading\/[A-Za-z0-9_-]+/g, 'reading/{id}')
}


function forbiddenMatches(text) {
  const flags = FORBIDDEN.flags.includes('g') ? FORBIDDEN.flags : `${FORBIDDEN.flags}g`
  const regex = new RegExp(FORBIDDEN.source, flags)
  const matches = []
  for (const match of String(text || '').matchAll(regex)) {
    matches.push({ match: match[0], index: match.index, context: String(text || '').slice(Math.max(0, match.index - 60), match.index + 120) })
    if (matches.length >= 10) break
  }
  return matches
}

function hasRealGeneratedText(text) {
  return /Luận giải được tạo|I · TÍNH CÁCH|TÍNH CÁCH|Cung Mệnh biểu hiện|Hình dáng|Vui vẻ và đa tình/.test(text) &&
    !/Chưa tạo được luận giải|đang kiểm định|mở công khai|bản public/i.test(text)
}

function hasChatAnswer(text, question) {
  return text.includes(question) &&
    /Mệnh|cung Mệnh|lá số|tham khảo|Bói Toán/i.test(text) &&
    !/Bói Toán đang xem lá số|Hỏi đáp đang được kiểm định|Không thể kết nối|AI đang lỗi/i.test(text)
}

async function screenshot(page, name) {
  const path = `${OUTPUT_DIR}/${name}.png`
  await page.screenshot({ path, fullPage: false })
  result.screenshots[name] = path
}

async function fillFirst(page, selectors, value) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first()
    if (!(await locator.count())) continue
    try {
      await locator.fill(value, { timeout: 10_000 })
      return selector
    } catch {}
  }
  return null
}

async function selectByOptionText(page, regex, fallbackRegex = null) {
  const count = await page.locator('select').count()
  for (let i = 0; i < count; i += 1) {
    const select = page.locator('select').nth(i)
    const options = await select.evaluate((el) => [...el.options].map((option) => ({ value: option.value, text: option.textContent || '' })))
    const option = options.find((candidate) => regex.test(`${candidate.value} ${candidate.text}`)) ||
      (fallbackRegex ? options.find((candidate) => fallbackRegex.test(`${candidate.value} ${candidate.text}`)) : null)
    if (!option) continue
    await select.selectOption(option.value)
    return option
  }
  return null
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })
  const browser = await chromium.launch({ headless: HEADLESS })
  const page = await browser.newPage({ viewport: MOBILE_VIEWPORT })

  page.on('response', (response) => {
    const url = response.url()
    if (/\/api\/chart|\/luan-giai\/|\/api\/chat|\/robots\.txt/.test(url)) {
      result.network.push({ url: sanitizeUrl(url), status: response.status(), method: response.request().method() })
    }
  })
  page.on('requestfailed', (request) => {
    result.network.push({ url: sanitizeUrl(request.url()), status: 'failed', method: request.method(), failure: request.failure()?.errorText || null })
  })

  try {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS })
    await page.waitForTimeout(1200)
    await screenshot(page, '01_home')

    const nameSelector = await fillFirst(page, ['input[name="name"]', 'input[name="fullName"]', 'input[placeholder*="Tên"]', 'input[placeholder*="tên"]'], SAMPLE.name)
    const dateSelector = await fillFirst(page, ['input[name="birthDate"]', 'input[type="date"]'], SAMPLE.birthDate)
    const genderOption = await selectByOptionText(page, new RegExp(SAMPLE.gender, 'i'), /Nam|male/i)
    const hourOption = await selectByOptionText(page, new RegExp(SAMPLE.birthHourPattern, 'i'))
    record('form_fields_filled', Boolean(nameSelector && dateSelector && genderOption && hourOption), { nameSelector, dateSelector, genderOption, hourOption })
    await screenshot(page, '02_filled')

    const chartResponsePromise = page.waitForResponse((response) => response.url().includes('/api/chart') && response.request().method() === 'POST', { timeout: TIMEOUT_MS }).catch(() => null)
    await page.getByRole('button', { name: /Lập lá số|Lập lá số ngay|Dựng/i }).first().click({ timeout: 30_000 })
    const chartResponse = await chartResponsePromise
    const chartText = chartResponse ? await chartResponse.text() : ''
    let chartId = null
    try { chartId = JSON.parse(chartText).chartId || null } catch {}
    result.chartId = chartId ? '{redacted-session-chart-id}' : null
    await page.waitForURL(/\/reading\//, { timeout: TIMEOUT_MS })
    await page.waitForTimeout(5000)
    await screenshot(page, '03_initial_reading')

    const initialText = await page.locator('body').innerText()
    const chartIndex = initialText.indexOf('THIÊN BÀN') >= 0 ? initialText.indexOf('THIÊN BÀN') : initialText.indexOf('Thiên Bàn')
    const generatedIndex = initialText.indexOf('Luận giải được tạo')
    record('reading_opened', page.url().includes('/reading/'), { url: sanitizeUrl(page.url()), chartStatus: chartResponse?.status() || null })
    record('chart_first_mobile', chartIndex >= 0 && (generatedIndex === -1 || chartIndex < generatedIndex), { chartIndex, generatedIndex, first300: initialText.slice(0, 300) })
    record('api_chart_no_tu_tuc', !/Tử\s*Tức|tu_tuc|子息/.test(chartText), { hasTuNu: chartText.includes('Tử Nữ') })

    if (RUN_GENERATED) {
      await page.locator('button.rdg-mobile-tab').filter({ hasText: /Luận giải/ }).last().click({ timeout: 30_000 })
      await page.waitForTimeout(1000)
      await screenshot(page, '04_luan_clicked')
      await page.waitForFunction(() => /Luận giải được tạo|I · TÍNH CÁCH|TÍNH CÁCH|Cung Mệnh biểu hiện|Hình dáng/.test(document.body.innerText) && !/Chưa tạo được luận giải|đang kiểm định|mở công khai/.test(document.body.innerText), null, { timeout: TIMEOUT_MS }).catch((error) => {
        result.generatedWaitError = error.message || String(error)
      })
      await screenshot(page, '05_luan_generated')
      const generatedText = await page.locator('body').innerText()
      record('generated_reading_real_text', hasRealGeneratedText(generatedText), { sample: generatedText.slice(0, 500) })
      record('generated_reading_forbidden_scan', !FORBIDDEN.test(generatedText), { forbiddenPattern: FORBIDDEN.source, matches: forbiddenMatches(generatedText) })
    }

    if (RUN_CHAT) {
      await page.locator('button.rdg-mobile-tab').filter({ hasText: /Hỏi/ }).last().click({ timeout: 30_000 })
      await page.waitForTimeout(1000)
      await screenshot(page, '06_chat_open')
      const inputs = page.locator('textarea, input[type="text"], [contenteditable="true"]')
      const inputVisible = await inputs.last().isVisible().catch(() => false)
      record('chat_input_visible', inputVisible, { inputCount: await inputs.count() })
      if (inputVisible) {
        await inputs.last().fill(SAMPLE.chatQuestion)
        const chatResponsePromise = page.waitForResponse((response) => /\/api\/chat/.test(response.url()), { timeout: TIMEOUT_MS }).catch(() => null)
        await page.locator('button.rdg-send-btn, button').filter({ hasText: /Gửi/ }).last().click({ timeout: 30_000 })
        const chatResponse = await chatResponsePromise
        record('chat_api_200', chatResponse?.status() === 200, { status: chatResponse?.status() || null })
        await page.waitForFunction((question) => !/Bói Toán đang xem lá số/.test(document.body.innerText) && document.body.innerText.includes(question), SAMPLE.chatQuestion, { timeout: TIMEOUT_MS }).catch((error) => {
          result.chatWaitError = error.message || String(error)
        })
      }
      await page.waitForTimeout(1000)
      await screenshot(page, '07_chat_answer')
      const chatText = await page.locator('body').innerText()
      record('chat_answer_visible', hasChatAnswer(chatText, SAMPLE.chatQuestion), { tail: chatText.slice(-1200) })
      record('chat_forbidden_scan', !FORBIDDEN.test(chatText.slice(-5000)), { forbiddenPattern: FORBIDDEN.source, matches: forbiddenMatches(chatText.slice(-5000)) })
    }

    await page.goto(`${BASE_URL}/robots.txt`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS })
    const robots = await page.textContent('body')
    record('robots_private_routes', /Disallow:\s*\/reading\//i.test(robots || '') && /Disallow:\s*\/api\//i.test(robots || ''), {
      hasReadingDisallow: /Disallow:\s*\/reading\//i.test(robots || ''),
      hasApiDisallow: /Disallow:\s*\/api\//i.test(robots || ''),
    })
  } catch (error) {
    result.errors.push(error?.stack || String(error))
  } finally {
    await browser.close()
    result.finishedAt = new Date().toISOString()
    result.pass = result.errors.length === 0 && Object.values(result.checks).every((check) => check.ok)
    await writeFile(OUTPUT_JSON, `${JSON.stringify(result, null, 2)}\n`)
    console.log(JSON.stringify(result, null, 2))
    if (!result.pass) process.exit(1)
  }
}

await main()
