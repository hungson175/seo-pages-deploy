#!/usr/bin/env node
import { writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const BASE_URL = (process.env.BASE_URL || process.env.SHADOW_BASE_URL || 'http://127.0.0.1:17120').replace(/\/$/, '')
const RUN_BROWSER = process.env.SHADOW_SMOKE_BROWSER !== '0'
const RUN_FORM = process.env.SHADOW_SMOKE_FORM !== '0'
const TIMEOUT_MS = Number(process.env.SHADOW_SMOKE_TIMEOUT_MS || 90_000)
const UI_WAIT_MS = Number(process.env.SHADOW_SMOKE_UI_WAIT_MS || 10_000)
const OUTPUT_PATH = process.env.SHADOW_SMOKE_OUTPUT || ''
const STRICT_BROWSER_DIAGNOSTICS = process.env.SHADOW_SMOKE_STRICT_BROWSER_DIAGNOSTICS === '1'
const EXPECT_CHAT_HIDDEN = process.env.SHADOW_SMOKE_EXPECT_CHAT_HIDDEN !== '0'
const SAMPLE_CHART = {
  name: 'Bạn',
  gender: 'Nam',
  birthDate: '1994-01-01',
  birthHour: 'Ngo',
}

const result = {
  baseUrl: BASE_URL,
  startedAt: new Date().toISOString(),
  checks: {},
  artifacts: {},
  errors: [],
}
const browserConsoleErrors = []
const browserNetworkIssues = []

function count(text, needle) {
  return (String(text || '').match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
}

function hasFallback(text) {
  return String(text || '').includes('Chưa tạo được luận giải') ||
    String(text || '').includes('đang được hoàn thiện') ||
    String(text || '').includes('bản công khai') ||
    String(text || '').includes('giai đoạn ra mắt công khai')
}

function hasFakeGeneratedPlaceholder(text) {
  return String(text || '').includes('Phần luận giải này đang được kiểm định trước khi mở công khai') ||
    String(text || '').includes('đang được hoàn thiện cho bản public') ||
    String(text || '').includes('mở công khai') ||
    String(text || '').includes('bản public')
}

function hasGenericFallbackReadingBody(text) {
  return [
    'bản luận giải tóm tắt',
    'Bản tóm tắt sáu mặt',
    'Cung Mệnh được đọc',
    '6 chiều tính cách',
    'ĐIỂM MẠNH BẨM SINH',
    'Cung Mệnh biểu hiện sáu mặt',
    'Hành trình rèn giũa tính cách',
    'VÒNG TRÒN NGHIỆP LỰC',
  ].some((marker) => String(text || '').includes(marker))
}

function paywallMarkers(text) {
  return ['suggested_packages', 'required_tab', '49000', 'Đọc bản thân'].filter((marker) =>
    String(text || '').includes(marker),
  )
}

function record(name, ok, details = {}) {
  result.checks[name] = { ok: Boolean(ok), ...details }
  if (!ok) result.errors.push(`${name} failed`)
}

function generatedReading5xxIssues() {
  return browserNetworkIssues.filter((issue) =>
    typeof issue.status === 'number' &&
    issue.status >= 500 &&
    String(issue.url).includes('/luan-giai/'),
  )
}

function browser404Issues() {
  return browserNetworkIssues.filter((issue) => issue.status === 404)
}

function attachBrowserDiagnostics(page, label) {
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return
    const location = msg.location()
    browserConsoleErrors.push({
      label,
      text: msg.text().slice(0, 300),
      url: location?.url || null,
      lineNumber: location?.lineNumber ?? null,
    })
  })
  page.on('response', (response) => {
    const status = response.status()
    if (status < 400) return
    browserNetworkIssues.push({
      label,
      status,
      url: response.url(),
      resourceType: response.request().resourceType(),
    })
  })
  page.on('requestfailed', (request) => {
    browserNetworkIssues.push({
      label,
      status: 'failed',
      url: request.url(),
      resourceType: request.resourceType(),
      failure: request.failure()?.errorText || null,
    })
  })
}

async function fetchText(path, options = {}) {
  const url = `${BASE_URL}${path}`
  const response = await fetch(url, { redirect: 'manual', ...options })
  const text = await response.text()
  return { url, response, text }
}

async function routeChecks() {
  for (const path of ['/', '/tu-vi/', '/lap-la-so/', '/robots.txt']) {
    const { response, text } = await fetchText(path)
    record(`route_${path.replace(/[^a-z0-9]+/gi, '_') || 'home'}_ok`, response.status >= 200 && response.status < 400, {
      status: response.status,
      url: `${BASE_URL}${path}`,
    })
    if (path === '/robots.txt') {
      record('robots_disallow_private_routes', text.includes('Disallow: /reading/') && text.includes('Disallow: /api/'), {
        hasReadingDisallow: text.includes('Disallow: /reading/'),
        hasApiDisallow: text.includes('Disallow: /api/'),
      })
    }
  }
}

async function createChartViaApi() {
  const { response, text } = await fetchText('/api/chart', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(SAMPLE_CHART),
  })
  let parsed = null
  try {
    parsed = JSON.parse(text)
  } catch {}
  const chartId = parsed?.chartId || null
  record('api_chart_post_ok', response.status === 200 && Boolean(chartId), {
    status: response.status,
    hasChartId: Boolean(chartId),
  })
  record('api_chart_no_tu_tuc_leaks', count(text, 'Tử Tức') === 0 && count(text, 'tu_tuc') === 0 && count(text, '子息') === 0, {
    tuTuc: count(text, 'Tử Tức'),
    tuTucSlug: count(text, 'tu_tuc'),
    ziXi: count(text, '子息'),
    tuNu: count(text, 'Tử Nữ'),
  })
  result.artifacts.apiChartId = chartId
  return { chartId, body: text }
}

async function lockedTabApiChecks(chartId) {
  for (const [key, label] of [
    ['su-nghiep', 'Sự nghiệp'],
    ['tinh-duyen', 'Tình duyên'],
  ]) {
    const { response, text } = await fetchText(`/api/chart/${chartId}/luan-giai/${key}`)
    record(`locked_${key}_fallback_header`, response.status === 200 && response.headers.get('x-boitoan-proxy-fallback') === 'locked-reading', {
      status: response.status,
      fallbackHeader: response.headers.get('x-boitoan-proxy-fallback'),
    })
    record(`locked_${key}_safe_body`, hasFallback(text) && paywallMarkers(text).length === 0 && !text.includes('Không thể tải luận giải'), {
      label,
      hasFallback: hasFallback(text),
      paywallMarkers: paywallMarkers(text),
      hasGenericError: text.includes('Không thể tải luận giải'),
      tuTuc: count(text, 'Tử Tức') + count(text, 'tu_tuc') + count(text, '子息'),
    })
  }
}

async function tinhCachApiChecks(chartId) {
  const { response, text } = await fetchText(`/api/chart/${chartId}/luan-giai/tinh-cach`)
  record('tinh_cach_analysis_safe_body', response.status === 200 &&
    text.includes('Tìm hiểu bản thân') &&
    paywallMarkers(text).length === 0 &&
    !text.includes('Không thể tải luận giải') &&
    !hasFakeGeneratedPlaceholder(text) &&
    count(text, 'Tử Tức') === 0 &&
    count(text, 'tu_tuc') === 0 &&
    count(text, '子息') === 0, {
    status: response.status,
    fallbackHeader: response.headers.get('x-boitoan-proxy-fallback'),
    hasAnalysisTitle: text.includes('Tìm hiểu bản thân'),
    hasRetryableFailCopy: text.includes('Chưa tạo được luận giải'),
    hasFakeGeneratedPlaceholder: hasFakeGeneratedPlaceholder(text),
    paywallMarkers: paywallMarkers(text),
    hasGenericError: text.includes('Không thể tải luận giải'),
    tuTuc: count(text, 'Tử Tức') + count(text, 'tu_tuc') + count(text, '子息'),
  })
}

async function readingHtmlFallbackCheck(chartId) {
  const { response, text } = await fetchText(`/reading/${chartId}`)
  record('reading_ssr_fallback_present', response.status === 200 &&
    text.includes('data-boitoan-reading-ssr-fallback') &&
    text.includes('Lá số đã tạo') &&
    count(text, 'Tử Tức') === 0 &&
    count(text, 'tu_tuc') === 0 &&
    count(text, '子息') === 0, {
    status: response.status,
    hasFallbackMarker: text.includes('data-boitoan-reading-ssr-fallback'),
    hasFallbackTitle: text.includes('Lá số đã tạo'),
    tuTuc: count(text, 'Tử Tức'),
    tuTucSlug: count(text, 'tu_tuc'),
    ziXi: count(text, '子息'),
  })
}

async function browserChecksFromChart(chartId) {
  if (!RUN_BROWSER || !chartId) return
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  attachBrowserDiagnostics(page, 'reading')
  try {
    const response = await page.goto(`${BASE_URL}/reading/${chartId}`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS })
    await page.waitForTimeout(2000)
    const metaRobots = await page.locator('meta[name="robots"]').getAttribute('content').catch(() => null)
    const headers = response?.headers() || {}
    record('reading_page_200', response?.status() === 200, { status: response?.status(), url: page.url() })
    record('reading_noindex_nofollow', typeof metaRobots === 'string' && metaRobots.includes('noindex') && metaRobots.includes('nofollow'), { metaRobots })
    record('reading_private_cache_posture', String(headers['cache-control'] || '').includes('no-store') || String(headers['x-robots-tag'] || '').includes('noindex') || Boolean(metaRobots), {
      cacheControl: headers['cache-control'] || null,
      xRobotsTag: headers['x-robots-tag'] || null,
      metaRobots,
    })

    const initialVisible = await page.locator('body').innerText()
    const chartIndex = initialVisible.indexOf('THIÊN BÀN') >= 0 ? initialVisible.indexOf('THIÊN BÀN') : initialVisible.indexOf('Thiên Bàn')
    const longDisclaimerIndex = initialVisible.indexOf('TÓM TẮT TRƯỚC KHI ĐỌC') >= 0 ? initialVisible.indexOf('TÓM TẮT TRƯỚC KHI ĐỌC') : initialVisible.indexOf('Không khẳng định tương lai')
    const chartMetrics = await page.evaluate(() => {
      const svg = Array.from(document.querySelectorAll('svg')).find((candidate) =>
        /Mệnh|Quan Lộc|Tử Nữ|Phụ Mẫu|Phúc Đức/.test(candidate.textContent || ''),
      )
      const note = document.querySelector('[data-boitoan-mobile-compact-disclaimer]')
      const rect = (element) => {
        if (!element) return null
        const box = element.getBoundingClientRect()
        return { top: box.top, bottom: box.bottom, left: box.left, width: box.width, height: box.height }
      }
      return { chart: rect(svg), compactDisclaimer: rect(note) }
    })
    record('reading_mobile_chart_first', chartIndex >= 0 &&
      (longDisclaimerIndex === -1 || chartIndex < longDisclaimerIndex) &&
      Boolean(chartMetrics.chart) &&
      chartMetrics.chart.top < 260 &&
      chartMetrics.chart.height > 280 &&
      (!chartMetrics.compactDisclaimer || chartMetrics.compactDisclaimer.top >= chartMetrics.chart.bottom - 1), {
      chartIndex,
      longDisclaimerIndex,
      chartMetrics,
      first300: initialVisible.slice(0, 300),
    })

    if (EXPECT_CHAT_HIDDEN) {
      const hoiTab = page.getByRole('button', { name: /Hỏi/i }).first()
      if (await hoiTab.count()) {
        await hoiTab.click({ timeout: 30_000 })
        await page.waitForTimeout(1000)
      }
      const visible = await page.locator('body').innerText()
      const html = await page.content()
      record('reading_chat_disabled_card_visible', visible.includes('Hỏi thêm về lá số') &&
        html.includes('data-boitoan-chat-visible-card') &&
        !visible.includes('Bạn muốn hỏi thêm điều gì') &&
        !visible.includes('Gợi ý hỏi Bói Toán') &&
        !visible.includes('Không thể kết nối') &&
        !visible.includes('AI đang lỗi'), {
        hasDisabledCard: visible.includes('Hỏi thêm về lá số'),
        hasCardMarker: html.includes('data-boitoan-chat-visible-card'),
        hasChatPrompt: visible.includes('Bạn muốn hỏi thêm điều gì'),
        hasChatSuggestions: visible.includes('Gợi ý hỏi Bói Toán'),
        hasChatConnectionError: visible.includes('Không thể kết nối'),
        hasAiError: visible.includes('AI đang lỗi'),
      })
    }

    const luanTab = page.getByRole('button', { name: /Luận giải/i }).first()
    if (await luanTab.count()) {
      await luanTab.click({ timeout: 30_000 })
      await page.waitForTimeout(1000)
    }

    const luanVisible = await page.locator('body').innerText()
    record('reading_tinh_cach_visible_not_blank', luanVisible.includes('Tìm hiểu bản thân') &&
      luanVisible.includes('Chưa tạo được luận giải') &&
      luanVisible.includes('Thử lại') &&
      luanVisible.includes('Xem lá số 12 cung') &&
      !hasFakeGeneratedPlaceholder(luanVisible) &&
      !hasGenericFallbackReadingBody(luanVisible) &&
      !luanVisible.includes('Không thể tải luận giải'), {
      hasAnalysisTitle: luanVisible.includes('Tìm hiểu bản thân'),
      hasRetryableFailCopy: luanVisible.includes('Chưa tạo được luận giải'),
      hasRetry: luanVisible.includes('Thử lại'),
      hasViewChart: luanVisible.includes('Xem lá số 12 cung'),
      hasFakeGeneratedPlaceholder: hasFakeGeneratedPlaceholder(luanVisible),
      hasGenericFallbackReadingBody: hasGenericFallbackReadingBody(luanVisible),
      hasGenericError: luanVisible.includes('Không thể tải luận giải'),
      sample: luanVisible.slice(0, 500),
    })

    const buttons = await page.getByRole('button', { name: /Sự nghiệp/ }).count()
    if (buttons > 0) {
      const tabResponsePromise = page.waitForResponse((tabResponse) =>
        tabResponse.url().includes('/luan-giai/su-nghiep'),
      { timeout: UI_WAIT_MS }).catch(() => null)
      await page.getByRole('button', { name: /Sự nghiệp/ }).first().click({ timeout: 30_000 })
      const tabResponse = await tabResponsePromise
      await page.waitForFunction(() => {
        const text = document.body?.innerText || ''
        return text.includes('Chưa tạo được luận giải') ||
          text.includes('Thử lại') ||
          text.includes('Xem lá số 12 cung') ||
          text.includes('Không thể tải luận giải')
      }, undefined, { timeout: UI_WAIT_MS }).catch(() => null)
      await page.waitForFunction(() => {
        const text = document.body?.innerText || ''
        return text.includes('đang được hoàn thiện') ||
          text.includes('bản công khai') ||
          text.includes('giai đoạn ra mắt công khai') ||
          text.includes('Chưa tạo được luận giải') ||
          text.includes('Không thể tải luận giải')
      }, undefined, { timeout: UI_WAIT_MS }).catch(() => null)
      const visible = await page.locator('body').innerText()
      record('reading_tab_ii_visible_fallback', hasFallback(visible) && !hasFakeGeneratedPlaceholder(visible) && !visible.includes('Không thể tải luận giải'), {
        hasFallback: hasFallback(visible),
        hasRetryableFailCopy: visible.includes('Chưa tạo được luận giải'),
        hasFakeGeneratedPlaceholder: hasFakeGeneratedPlaceholder(visible),
        hasGenericError: visible.includes('Không thể tải luận giải'),
        tabResponseStatus: tabResponse?.status() ?? null,
        tabFallbackHeader: tabResponse?.headers()?.['x-boitoan-proxy-fallback'] ?? null,
        uiWaitMs: UI_WAIT_MS,
      })
    } else {
      record('reading_tab_ii_button_present', false, { buttons })
    }
  } finally {
    await browser.close()
  }
}

async function browserFormFlow() {
  if (!RUN_BROWSER || !RUN_FORM) return null
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  attachBrowserDiagnostics(page, 'form-flow')
  try {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS })
    await page.locator('#home-name, input[name="name"]').first().fill('Bạn', { timeout: 30_000 })
    await page.locator('#home-birth-date, input[name="birthDate"]').first().fill('1994-01-01', { timeout: 30_000 })
    await page.locator('#home-gender, select[name="gender"]').first().selectOption('Nam')
    await page.locator('#home-birth-hour, select[name="birthHour"]').first().selectOption('Ngo')
    const chartResponsePromise = page.waitForResponse((response) =>
      response.url().includes('/api/chart') && response.request().method() === 'POST',
    { timeout: TIMEOUT_MS })
    await page.getByRole('button', { name: /Lập lá số|LẬP LÁ SỐ|Dựng|DỰNG/i }).first().click({ timeout: 30_000 })
    const chartResponse = await chartResponsePromise
    const chartText = await chartResponse.text()
    await page.waitForURL(/\/reading\//, { timeout: TIMEOUT_MS })
    await page.waitForTimeout(2000)
    const visible = await page.locator('body').innerText()
    record('form_flow_submit_opens_reading', chartResponse.status() === 200 && /\/reading\//.test(page.url()) && /THIÊN BÀN|Thiên Bàn/.test(visible), {
      chartStatus: chartResponse.status(),
      readingUrl: page.url(),
      hasChart: /THIÊN BÀN|Thiên Bàn/.test(visible),
      tuTuc: count(chartText, 'Tử Tức') + count(chartText, 'tu_tuc') + count(chartText, '子息'),
      tuNu: count(chartText, 'Tử Nữ'),
    })
    let chartId = null
    try { chartId = JSON.parse(chartText).chartId || null } catch {}
    result.artifacts.formFlowChartId = chartId
    return chartId
  } finally {
    await browser.close()
  }
}

try {
  await routeChecks()
  const { chartId } = await createChartViaApi()
  if (chartId) {
    await readingHtmlFallbackCheck(chartId)
    await tinhCachApiChecks(chartId)
    await lockedTabApiChecks(chartId)
    await browserChecksFromChart(chartId)
  }
  await browserFormFlow()
} catch (error) {
  result.errors.push(error?.stack || String(error))
} finally {
  result.finishedAt = new Date().toISOString()
  if (browserConsoleErrors.length) {
    result.artifacts.browserConsoleErrors = browserConsoleErrors.slice(0, 50)
  }
  if (browserNetworkIssues.length) {
    result.artifacts.browserNetworkIssues = browserNetworkIssues.slice(0, 50)
  }
  if (STRICT_BROWSER_DIAGNOSTICS && RUN_BROWSER) {
    const network404s = browser404Issues()
    const generated5xx = generatedReading5xxIssues()
    record('browser_no_network_404s', network404s.length === 0, {
      count: network404s.length,
      issues: network404s.slice(0, 20),
    })
    record('browser_no_generated_reading_5xx', generated5xx.length === 0, {
      count: generated5xx.length,
      issues: generated5xx.slice(0, 20),
    })
  }
  let output = JSON.stringify(result, null, 2)
  if (OUTPUT_PATH) {
    try {
      await writeFile(OUTPUT_PATH, `${output}\n`)
    } catch (error) {
      result.errors.push(`failed to write SHADOW_SMOKE_OUTPUT: ${error?.message || String(error)}`)
      output = JSON.stringify(result, null, 2)
    }
  }
  console.log(output)
  if (result.errors.length) process.exit(1)
}
