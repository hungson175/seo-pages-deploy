import { describe, expect, it } from 'vitest'

// Script is intentionally plain ESM so it can run directly in production shells.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no declaration file is needed for this test-only dynamic import
const watchModule = await import('../scripts/boitoan-provider-cost-watch.mjs')

const {
  parseLogKeyValues,
  renderProviderCostWatch,
  summarizeProviderLogText,
} = watchModule as {
  parseLogKeyValues: (line: string) => Record<string, string | number>
  renderProviderCostWatch: (summary: ReturnType<typeof summarizeProviderLogText>) => string
  summarizeProviderLogText: (text: string) => {
    provider: {
      reservations: number
      dailyBlockedEvents: number
      latestByScopeModel: Record<string, { count: number; cap: number }>
    }
    requestLimits: {
      blockedEvents: number
      byScopeDimension: Record<string, { blockedEvents: number; latestCount: number; limit: number }>
    }
    chat: {
      responseCount: number
      slowCount: number
      failedCount: number
      providerCalls: number
      avgLatencyMs: number
      p95LatencyMs: number
    }
    generatedRoutes: {
      count: number
      byStatus: Record<string, number>
      byTabStatus: Record<string, number>
      p95LatencyMs: number
    }
    cache: {
      hit: number
      hitAfterRegister: number
      miss: number
      raceLoss: number
      hitRate: number | null
    }
    openaiCompletionsPosts: number
    safetyFailures: number
    errorLike: number
    alerts: string[]
  }
}

describe('boitoan provider cost watch parser', () => {
  it('parses key=value metrics without retaining raw secrets or IDs', () => {
    expect(parseLogKeyValues('provider_daily_cap count scope=llm model=gpt-4o-mini count=12 cap=400')).toEqual({
      scope: 'llm',
      model: 'gpt-4o-mini',
      count: 12,
      cap: 400,
    })
  })

  it('summarizes provider calls, route latency, cache hit rate, and alerts', () => {
    const summary = summarizeProviderLogText([
      'INFO provider_daily_cap count scope=llm model=gpt-4o-mini count=1 cap=400',
      'INFO provider_daily_cap count scope=llm model=gpt-4o-mini count=2 cap=400',
      'INFO provider_request_limit count scope=chat dimension=ip key_hash=abc count=3 limit=20',
      'INFO chat_response latency_ms=900 provider_calls=2 tool_rounds=1 reply_len=500',
      'INFO chat_slow_response latency_ms=21000 provider_calls=3 tool_rounds=2 reply_len=800',
      'INFO generated_reading_route status=ok tab=tinh_cach section=core latency_ms=3100',
      'INFO generated_reading_route status=error tab=tinh_cach section=core latency_ms=6100',
      'INFO llm_cache HIT sig=abc... tab=tinh_cach section=core v=1',
      'INFO llm_cache HIT-after-register sig=abc... tab=tinh_cach section=core v=1',
      'INFO llm_cache MISS sig=abc... tab=su_nghiep section=core v=1 — composing',
      'INFO POST https://api.openai.com/v1/chat/completions HTTP/1.1 200 OK',
    ].join('\n'))

    expect(summary.provider.reservations).toBe(2)
    expect(summary.provider.latestByScopeModel['llm|gpt-4o-mini']).toEqual({ count: 2, cap: 400 })
    expect(summary.requestLimits.byScopeDimension['chat|ip'].latestCount).toBe(3)
    expect(summary.chat.responseCount).toBe(1)
    expect(summary.chat.slowCount).toBe(1)
    expect(summary.chat.providerCalls).toBe(5)
    expect(summary.chat.avgLatencyMs).toBe(10950)
    expect(summary.chat.p95LatencyMs).toBe(21000)
    expect(summary.generatedRoutes.byStatus).toEqual({ ok: 1, error: 1 })
    expect(summary.generatedRoutes.byTabStatus['tinh_cach|ok']).toBe(1)
    expect(summary.cache.hitRate).toBe(0.667)
    expect(summary.openaiCompletionsPosts).toBe(1)
    expect(summary.alerts).toEqual([])
  })

  it('flags safety failures, provider failures, daily cap blocks, and request-limit blocks', () => {
    const summary = summarizeProviderLogText([
      'WARNING provider_daily_cap blocked scope=llm model=gpt-4o-mini count=400 cap=400',
      'WARNING provider_request_limit blocked scope=generation dimension=chart key_hash=def count=25 limit=24',
      'WARNING chat_provider_failed error=RateLimitError latency_ms=30000 provider_calls=1 tool_rounds=0',
      'ERROR Generated reading failed safety validation tab=tinh_cach reason=forbidden',
      'Traceback (most recent call last):',
    ].join('\n'))

    expect(summary.provider.dailyBlockedEvents).toBe(1)
    expect(summary.requestLimits.blockedEvents).toBe(1)
    expect(summary.requestLimits.byScopeDimension['generation|chart'].blockedEvents).toBe(1)
    expect(summary.chat.failedCount).toBe(1)
    expect(summary.safetyFailures).toBe(1)
    expect(summary.errorLike).toBe(3)
    expect(summary.alerts).toContain('provider_daily_cap_blocked=1')
    expect(summary.alerts).toContain('provider_request_limit_blocked=1')
    expect(summary.alerts).toContain('generated_safety_failures=1')
    expect(summary.alerts).toContain('chat_provider_failed=1')
    expect(summary.alerts).toContain('error_like=3')
  })

  it('renders source-safe output without raw log lines or secret-looking tokens', () => {
    const summary = summarizeProviderLogText([
      'INFO provider_daily_cap count scope=llm model=gpt-4o-mini count=320 cap=400 api_key=sk-should-not-render',
      'INFO chat_response latency_ms=1000 provider_calls=1 tool_rounds=0 reply_len=200',
    ].join('\n'))
    const rendered = renderProviderCostWatch(summary)

    expect(rendered).toContain('provider_reservations=1')
    expect(rendered).toContain('provider_daily_cap_80pct llm|gpt-4o-mini 320/400')
    expect(rendered).not.toContain('sk-should-not-render')
    expect(rendered).not.toContain('api_key')
  })
})
