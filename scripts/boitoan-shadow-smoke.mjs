#!/usr/bin/env node
import { chromium } from '@playwright/test'

const BASE_URL = (process.env.BASE_URL || process.env.SHADOW_BASE_URL || 'http://127.0.0.1:17120').replace(/\/$/, '')
const RUN_BROWSER = process.env.SHADOW_SMOKE_BROWSER !== '0'
const RUN_FORM = process.env.SHADOW_SMOKE_FORM !== '0'
const TIMEOUT_MS = Number(process.env.SHADOW_SMOKE_TIMEOUT_MS || 90_000)
const UI_WAIT_MS = Number(process.env.SHADOW_SMOKE_UI_WAIT_MS || 10_000)
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

function count(text, needle) {
  return (String(text || '').match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length
}

function hasFallback(text) {
  return String(text || '').includes('đang được hoàn thiện') ||
    String(text || '').includes('bản công khai') ||
    String(text || '').includes('giai đoạn ra mắt công khai')
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

async function browserChecksFromChart(chartId) {
  if (!RUN_BROWSER || !chartId) return
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 300))
  })
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

    const buttons = await page.getByRole('button', { name: /Sự nghiệp/ }).count()
    if (buttons > 0) {
      const tabResponsePromise = page.waitForResponse((tabResponse) =>
        tabResponse.url().includes('/luan-giai/su-nghiep'),
      { timeout: TIMEOUT_MS }).catch(() => null)
      await page.getByRole('button', { name: /Sự nghiệp/ }).first().click({ timeout: 30_000 })
      const tabResponse = await tabResponsePromise
      await page.waitForFunction(() => {
        const text = document.body?.innerText || ''
        return text.includes('đang được hoàn thiện') ||
          text.includes('bản công khai') ||
          text.includes('giai đoạn ra mắt công khai') ||
          text.includes('Không thể tải luận giải')
      }, undefined, { timeout: UI_WAIT_MS }).catch(() => null)
      const visible = await page.locator('body').innerText()
      record('reading_tab_ii_visible_fallback', hasFallback(visible) && !visible.includes('Không thể tải luận giải'), {
        hasFallback: hasFallback(visible),
        hasGenericError: visible.includes('Không thể tải luận giải'),
        tabResponseStatus: tabResponse?.status() ?? null,
        tabFallbackHeader: tabResponse?.headers()?.['x-boitoan-proxy-fallback'] ?? null,
        uiWaitMs: UI_WAIT_MS,
      })
    } else {
      record('reading_tab_ii_button_present', false, { buttons })
    }
    result.artifacts.browserConsoleErrors = consoleErrors.slice(0, 20)
  } finally {
    await browser.close()
  }
}

async function browserFormFlow() {
  if (!RUN_BROWSER || !RUN_FORM) return null
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  try {
    await page.goto(`${BASE_URL}/lap-la-so`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS })
    await page.getByRole('button', { name: /Tiếp tục/i }).first().click({ timeout: 30_000 })
    await page.getByPlaceholder('Ngày').waitFor({ state: 'visible', timeout: UI_WAIT_MS })
    await page.getByPlaceholder('Ngày').fill('01')
    await page.getByPlaceholder('Tháng').fill('01')
    await page.getByPlaceholder('Năm').fill('1994')
    await page.getByRole('button', { name: /Ngọ|Ngo|11h-13h/i }).first().click({ timeout: 30_000 })
    await page.getByRole('button', { name: /Tiếp tục/i }).last().click({ timeout: 30_000 })
    await page.getByRole('button', { name: /Dựng|DỰNG/i }).waitFor({ state: 'visible', timeout: UI_WAIT_MS })
    const chartResponsePromise = page.waitForResponse((response) =>
      response.url().includes('/api/chart') && response.request().method() === 'POST',
    { timeout: TIMEOUT_MS })
    await page.getByRole('button', { name: /Dựng|DỰNG/i }).click({ timeout: 30_000 })
    const chartResponse = await chartResponsePromise
    const chartText = await chartResponse.text()
    await page.waitForURL(/\/reading\//, { timeout: TIMEOUT_MS })
    record('form_flow_submit_opens_reading', chartResponse.status() === 200 && /\/reading\//.test(page.url()), {
      chartStatus: chartResponse.status(),
      readingUrl: page.url(),
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
    await lockedTabApiChecks(chartId)
    await browserChecksFromChart(chartId)
  }
  await browserFormFlow()
} catch (error) {
  result.errors.push(error?.stack || String(error))
} finally {
  result.finishedAt = new Date().toISOString()
  console.log(JSON.stringify(result, null, 2))
  if (result.errors.length) process.exit(1)
}
