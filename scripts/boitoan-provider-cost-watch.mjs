#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const NUMBER_FIELDS = new Set(['count', 'cap', 'limit', 'latency_ms', 'provider_calls', 'tool_rounds', 'reply_len'])

export function parseLogKeyValues(line) {
  const values = {}
  const regex = /([A-Za-z_][A-Za-z0-9_]*)=([^\s]+)/g
  for (const match of String(line || '').matchAll(regex)) {
    const key = match[1]
    const raw = match[2]
    values[key] = NUMBER_FIELDS.has(key) && /^-?\d+$/.test(raw) ? Number(raw) : raw
  }
  return values
}

function emptySummary() {
  return {
    lineCount: 0,
    provider: {
      dailyCountEvents: 0,
      dailyBlockedEvents: 0,
      reservations: 0,
      latestByScopeModel: {},
    },
    requestLimits: {
      countEvents: 0,
      blockedEvents: 0,
      byScopeDimension: {},
    },
    chat: {
      responseCount: 0,
      slowCount: 0,
      failedCount: 0,
      providerCalls: 0,
      toolRounds: 0,
      latencyMs: [],
    },
    generatedRoutes: {
      count: 0,
      byStatus: {},
      byTabStatus: {},
      latencyMs: [],
    },
    cache: {
      hit: 0,
      hitAfterRegister: 0,
      miss: 0,
      raceLoss: 0,
    },
    openaiCompletionsPosts: 0,
    safetyFailures: 0,
    errorLike: 0,
    alerts: [],
  }
}

function addCount(map, key, by = 1) {
  map[key] = (map[key] || 0) + by
}

function pushNumber(values, value) {
  if (Number.isFinite(value)) values.push(value)
}

function percentile(values, p) {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const index = Math.max(0, Math.ceil(sorted.length * p) - 1)
  return sorted[index]
}

function average(values) {
  if (!values.length) return 0
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
}

function finalizeSummary(summary) {
  const cacheReads = summary.cache.hit + summary.cache.hitAfterRegister + summary.cache.miss
  const cacheHits = summary.cache.hit + summary.cache.hitAfterRegister
  const finalized = {
    ...summary,
    chat: {
      ...summary.chat,
      avgLatencyMs: average(summary.chat.latencyMs),
      p95LatencyMs: percentile(summary.chat.latencyMs, 0.95),
      maxLatencyMs: summary.chat.latencyMs.length ? Math.max(...summary.chat.latencyMs) : 0,
    },
    generatedRoutes: {
      ...summary.generatedRoutes,
      avgLatencyMs: average(summary.generatedRoutes.latencyMs),
      p95LatencyMs: percentile(summary.generatedRoutes.latencyMs, 0.95),
      maxLatencyMs: summary.generatedRoutes.latencyMs.length ? Math.max(...summary.generatedRoutes.latencyMs) : 0,
    },
    cache: {
      ...summary.cache,
      hitRate: cacheReads ? Number((cacheHits / cacheReads).toFixed(3)) : null,
    },
  }
  finalized.alerts = buildAlerts(finalized)
  return finalized
}

export function summarizeProviderLogText(text) {
  const summary = emptySummary()
  const lines = String(text || '').split(/\r?\n/).filter((line) => line.trim().length > 0)
  summary.lineCount = lines.length

  for (const line of lines) {
    if (/POST\s+https:\/\/api\.openai\.com\/v1\/chat\/completions/.test(line)) {
      summary.openaiCompletionsPosts += 1
    }

    if (/Generated reading failed safety validation/.test(line)) {
      summary.safetyFailures += 1
    }

    if (/chat_provider_failed|provider failed|all 3 attempts failed|Generated reading failed safety validation|\bERROR\b|Traceback|Exception/.test(line)) {
      summary.errorLike += 1
    }

    if (/provider_daily_cap\s+count\b/.test(line)) {
      const kv = parseLogKeyValues(line)
      summary.provider.dailyCountEvents += 1
      summary.provider.reservations += 1
      const key = `${kv.scope || 'unknown'}|${kv.model || 'unknown'}`
      summary.provider.latestByScopeModel[key] = {
        count: Number(kv.count || 0),
        cap: Number(kv.cap || 0),
      }
    }

    if (/provider_daily_cap\s+blocked\b/.test(line)) {
      const kv = parseLogKeyValues(line)
      summary.provider.dailyBlockedEvents += 1
      const key = `${kv.scope || 'unknown'}|${kv.model || 'unknown'}`
      summary.provider.latestByScopeModel[key] = {
        count: Number(kv.count || 0),
        cap: Number(kv.cap || 0),
      }
    }

    if (/provider_request_limit\s+count\b/.test(line) || /provider_request_limit\s+blocked\b/.test(line)) {
      const kv = parseLogKeyValues(line)
      const key = `${kv.scope || 'unknown'}|${kv.dimension || 'unknown'}`
      if (!summary.requestLimits.byScopeDimension[key]) {
        summary.requestLimits.byScopeDimension[key] = {
          countEvents: 0,
          blockedEvents: 0,
          latestCount: 0,
          limit: 0,
        }
      }
      const bucket = summary.requestLimits.byScopeDimension[key]
      bucket.latestCount = Number(kv.count || 0)
      bucket.limit = Number(kv.limit || 0)
      if (/provider_request_limit\s+blocked\b/.test(line)) {
        summary.requestLimits.blockedEvents += 1
        bucket.blockedEvents += 1
      } else {
        summary.requestLimits.countEvents += 1
        bucket.countEvents += 1
      }
    }

    if (/chat_response\b|chat_slow_response\b|chat_provider_failed\b/.test(line)) {
      const kv = parseLogKeyValues(line)
      if (/chat_provider_failed\b/.test(line)) summary.chat.failedCount += 1
      if (/chat_slow_response\b/.test(line)) summary.chat.slowCount += 1
      if (/chat_response\b/.test(line)) summary.chat.responseCount += 1
      summary.chat.providerCalls += Number(kv.provider_calls || 0)
      summary.chat.toolRounds += Number(kv.tool_rounds || 0)
      pushNumber(summary.chat.latencyMs, Number(kv.latency_ms))
    }

    if (/generated_reading_route\b/.test(line)) {
      const kv = parseLogKeyValues(line)
      const status = String(kv.status || 'unknown')
      const tab = String(kv.tab || 'unknown')
      summary.generatedRoutes.count += 1
      addCount(summary.generatedRoutes.byStatus, status)
      addCount(summary.generatedRoutes.byTabStatus, `${tab}|${status}`)
      pushNumber(summary.generatedRoutes.latencyMs, Number(kv.latency_ms))
    }

    if (/llm_cache\s+HIT-after-register\b/.test(line)) summary.cache.hitAfterRegister += 1
    else if (/llm_cache\s+HIT\b/.test(line)) summary.cache.hit += 1
    else if (/llm_cache\s+MISS\b/.test(line)) summary.cache.miss += 1
    else if (/llm_cache\s+RACE-LOSS\b/.test(line)) summary.cache.raceLoss += 1
  }

  return finalizeSummary(summary)
}

export function buildAlerts(summary) {
  const alerts = []
  if (summary.provider.dailyBlockedEvents > 0) {
    alerts.push(`provider_daily_cap_blocked=${summary.provider.dailyBlockedEvents}`)
  }
  if (summary.requestLimits.blockedEvents > 0) {
    alerts.push(`provider_request_limit_blocked=${summary.requestLimits.blockedEvents}`)
  }
  if (summary.safetyFailures > 0) {
    alerts.push(`generated_safety_failures=${summary.safetyFailures}`)
  }
  if (summary.chat.failedCount > 0) {
    alerts.push(`chat_provider_failed=${summary.chat.failedCount}`)
  }
  if (summary.errorLike > 0) {
    alerts.push(`error_like=${summary.errorLike}`)
  }

  for (const [key, value] of Object.entries(summary.provider.latestByScopeModel)) {
    if (value.cap > 0 && value.count >= Math.ceil(value.cap * 0.8)) {
      alerts.push(`provider_daily_cap_80pct ${key} ${value.count}/${value.cap}`)
    }
  }

  return alerts
}

export function renderProviderCostWatch(summary) {
  const lines = []
  lines.push('Bói Toán provider/cost watch (source-safe log summary)')
  lines.push(`lines=${summary.lineCount}`)
  lines.push(`provider_reservations=${summary.provider.reservations} daily_blocked=${summary.provider.dailyBlockedEvents} openai_completion_posts=${summary.openaiCompletionsPosts}`)
  const providerKeys = Object.entries(summary.provider.latestByScopeModel)
  if (providerKeys.length) {
    lines.push('provider_daily_cap_latest:')
    for (const [key, value] of providerKeys) lines.push(`  ${key} ${value.count}/${value.cap}`)
  }
  lines.push(`request_limit_counts=${summary.requestLimits.countEvents} request_limit_blocked=${summary.requestLimits.blockedEvents}`)
  const requestKeys = Object.entries(summary.requestLimits.byScopeDimension)
  if (requestKeys.length) {
    lines.push('request_limits_latest:')
    for (const [key, value] of requestKeys) lines.push(`  ${key} latest=${value.latestCount}/${value.limit} blocked=${value.blockedEvents}`)
  }
  lines.push(`chat responses=${summary.chat.responseCount} slow=${summary.chat.slowCount} failed=${summary.chat.failedCount} provider_calls=${summary.chat.providerCalls} avg_ms=${summary.chat.avgLatencyMs} p95_ms=${summary.chat.p95LatencyMs} max_ms=${summary.chat.maxLatencyMs}`)
  lines.push(`generated_routes=${summary.generatedRoutes.count} by_status=${JSON.stringify(summary.generatedRoutes.byStatus)} avg_ms=${summary.generatedRoutes.avgLatencyMs} p95_ms=${summary.generatedRoutes.p95LatencyMs} max_ms=${summary.generatedRoutes.maxLatencyMs}`)
  lines.push(`cache hit=${summary.cache.hit} hit_after_register=${summary.cache.hitAfterRegister} miss=${summary.cache.miss} race_loss=${summary.cache.raceLoss} hit_rate=${summary.cache.hitRate ?? 'n/a'}`)
  lines.push(`safety_failures=${summary.safetyFailures} error_like=${summary.errorLike}`)
  lines.push(summary.alerts.length ? `ALERTS: ${summary.alerts.join('; ')}` : 'ALERTS: none')
  return `${lines.join('\n')}\n`
}

async function readStdin() {
  if (process.stdin.isTTY) return ''
  const chunks = []
  for await (const chunk of process.stdin) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks).toString('utf8')
}

async function main() {
  const args = process.argv.slice(2)
  const jsonOnly = args.includes('--json')
  const failOnAlert = args.includes('--fail-on-alert')
  const fileIndex = args.indexOf('--file')
  let text = ''

  if (fileIndex >= 0) {
    const filePath = args[fileIndex + 1]
    if (!filePath) throw new Error('--file requires a path')
    text = await readFile(filePath, 'utf8')
  } else {
    text = await readStdin()
  }

  if (!text.trim()) {
    console.error('Usage: ssh oci-sg \'docker logs --since 6h boitoan-api-1 2>&1\' | npm run watch:boitoan-provider-cost')
    console.error('Options: --file <path> --json --fail-on-alert')
    process.exit(64)
  }

  const summary = summarizeProviderLogText(text)
  process.stdout.write(jsonOnly ? `${JSON.stringify(summary, null, 2)}\n` : renderProviderCostWatch(summary))
  if (failOnAlert && summary.alerts.length) process.exit(1)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error?.message || String(error))
    process.exit(1)
  })
}
