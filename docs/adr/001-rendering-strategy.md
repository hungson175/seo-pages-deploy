# ADR-001: Rendering Strategy for SEO Pages

## Status

APPROVED — Sprint 2 Scope Locked

## Context

Sprint 1 used `output: 'export'` (static export) for simplicity. Sprint 2 introduces:
- iztro chart generation (client-side interactive tool)
- Birth-year forecast pages with LLM-generated content (needs periodic updates)
- Potential for real-time content updates (annual Tết refresh)

We must choose a rendering strategy that balances SEO, performance, and maintainability.

## Decision Drivers

| Driver | Weight | Rationale |
|--------|--------|-----------|
| SEO (crawlability) | Critical | Google must index all pages without JS |
| Performance (Core Web Vitals) | Critical | LCP < 2.5s, CLS < 0.1 |
| Content freshness | High | Forecasts update annually; tool is interactive |
| Build complexity | Medium | Static export is simplest; SSR adds ops overhead |
| Cost (Vercel) | Medium | SSR/ISR costs more than static at scale |

## Options Considered

### Option A: Static Export (current, Sprint 1)

`output: 'export'` — all pages pre-rendered at build time, deployed as static HTML.

**Pros:**
- Fastest build and deploy
- Zero runtime cost on Vercel (static hosting)
- Perfect SEO (pure HTML)
- Simplest mental model

**Cons:**
- Cannot use ISR or dynamic routes with server data
- Requires rebuild for ANY content change
- No `revalidate` or `revalidateTag`
- iztro chart must be client-side only (acceptable for tool page)

### Option B: ISR (Incremental Static Regeneration)

`output: 'standalone'` or default Next.js output with `revalidate` on dynamic routes.

**Pros:**
- Pages regenerated automatically after TTL
- `revalidateTag` for on-demand updates (e.g., annual content refresh)
- Can fetch fresh Supabase data on revalidation
- Still SEO-friendly (serves static HTML)

**Cons:**
- Requires Vercel server runtime (costs vs static)
- Slightly more complex caching mental model
- Must handle stale-while-revalidate behavior

### Option C: SSR (Server-Side Rendering)

`output: 'standalone'` with dynamic routes fetching data on every request.

**Pros:**
- Always fresh data
- No stale content risk

**Cons:**
- Slowest (server compute per request)
- Highest cost
- Unnecessary for content that changes annually
- Overkill for our use case

## Decision

**RECOMMENDATION: Hybrid — Option A for Sprint 2, migrate to Option B in Sprint 3.**

### Sprint 2 (Current): Static Export

- Keep `output: 'export'` for all pages
- Content updates via rebuild + redeploy
- iztro chart remains client-side on `/lap-la-so/`
- Supabase data fetched at build time via `generateStaticParams` + data helpers

**Rationale for Sprint 2:**
- We have ~96 forecast pages + ~20 star pages + 6 quẻ pages (current allow-list)
- Build time is fast (< 1 minute for < 150 pages)
- Content updates are infrequent (annual)
- No need for ISR complexity yet
- MVP pipeline: only 12–24 pages need real content in Sprint 2

### Sprint 3 (Future): Migrate to ISR

- Switch to default Next.js output (no `output: 'export'`)
- Add `revalidate: 86400` to forecast routes
- Add `revalidateTag(slug)` for on-demand content updates
- Keep static export for star/quẻ pages (rarely change)

**Trigger for migration:**
- Build time exceeds 2 minutes
- Content update frequency exceeds weekly
- Need for real-time personalization

## Consequences

### Positive
- Sprint 2 remains simple and fast
- No Vercel server runtime costs
- Clear migration path when needed

### Negative
- Annual content refresh requires full redeploy (not on-demand revalidation)
- Cannot use `revalidateTag` until Sprint 3

## Implementation Notes

- `next.config.ts`: Keep `output: 'export'` for Sprint 2
- Data fetching: Use server-side Supabase client in `generateStaticParams` and page components
- iztro integration: Client-side only on `/lap-la-so/`; no server rendering of charts
- Sitemap: Static generation at build time (acceptable until page count > 10K)

## Acceptance Criteria

- [ ] `next.config.ts` documents the rendering strategy decision
- [ ] All dynamic routes fetch data at build time (not request time)
- [ ] iztro chart renders client-side without hydration errors
- [ ] Build time documented and monitored
- [ ] Migration criteria to ISR defined and logged

---

*ADR length: ~110 lines. Ready for Sprint 2 Planning review.*
