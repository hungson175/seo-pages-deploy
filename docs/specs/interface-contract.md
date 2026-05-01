# BE→FE Interface Contract for Dynamic Routes

**Status:** FINAL — Sprint 2 Approved  
**Applies to:** STORY-011 (iztro), STORY-012a (MVP pipeline), STORY-013 (Gieo Quẻ)

## Purpose

Define the data contract between Backend (Supabase/data layer) and Frontend (Next.js App Router) for all dynamic routes. Prevents role boundary blur, enables parallel development, and establishes error-handling conventions.

## Sprint 2 Improvement: AC Checklist Review Gate

Per SM Action Item #2, **before TDD begins**, devs MUST:
1. Read the Acceptance Criteria in this contract
2. Cross-check against SPRINT_BACKLOG.md story AC
3. Confirm understanding before writing first test

## Route-to-Data Mapping

| Route | Data Source | Shape | Freshness |
|-------|-------------|-------|-----------|
| `/tuvi/[slug]` | `pages` table (forecast) | `ForecastPageData` | ISR: daily or on-demand |
| `/sao/[star]` | `pages` table (star) | `StarPageData` | Static (rarely changes) |
| `/que/[slug]` | `pages` table (que) | `QuePageData` | Static (rarely changes) |
| `/lap-la-so/` | `tool_configs` table + iztro client | `ToolConfig` | Static config; dynamic chart client-side |

## Data Shapes

### ForecastPageData

- `slug` (string) — validated against allow-list
- `title` (string) — H1 + meta title
- `meta_description` (string) — 150-160 chars
- `content_sections` (array) — ordered sections with `heading` (h2) and `content` (markdown/html)
- `faq_items` (array) — `{question, answer}` pairs for FAQPage schema
- `schema_config` (object) — which schemas to inject and their overrides
- `iztro_input` (object) — `{birthYear, gender, animal}` for optional chart generation
- `disclaimer` (string) — Article 320 compliance text
- `updated_at` (ISO string) — drives `lastmod` in sitemap and `dateModified` in schema

### StarPageData

- `slug`, `title`, `meta_description`, `content_sections`, `faq_items`, `schema_config`, `updated_at`
- `star_metadata` (object) — `brightness`, `palaceAssociations`, `relatedStars`

### QuePageData

- `slug`, `title`, `meta_description`, `content_sections`, `faq_items`, `schema_config`, `updated_at`
- `hexagram_metadata` (object) — `number`, `trigrams`, `changingLines`, `relatedHexagrams`

### ToolConfig

- `faq_items` (array) — static FAQ for /lap-la-so/
- `cta_copy` (object) — `headline`, `description`, `price`, `buttonText`
- `howto_steps` (array) — steps for HowTo schema
- `disclaimer` (string)

## Error Handling Contract

### BE Responsibilities

- Return `null` for missing slugs (FE renders 404)
- Return `stale` flag if `updated_at` > 24h old (FE triggers revalidation)
- Never throw on data fetch — always return structured result or `null`

### FE Responsibilities

- Call `notFound()` when BE returns `null`
- Render generic fallback metadata when `meta_description` is empty
- Display `updated_at` in footer for transparency
- Log data-fetch failures to console (development only)

### Fallback Behavior

| Scenario | BE Action | FE Action |
|----------|-----------|-----------|
| Slug not in allow-list | N/A (caught at route level) | `notFound()` |
| Slug valid but no DB row | Return `null` | `notFound()` |
| DB timeout | Return `null` | `notFound()` with retry suggestion |
| Partial data (missing sections) | Return data with `incomplete: true` | Render available sections, hide incomplete |
| Stale data (>24h) | Return data with `stale: true` | Render page, trigger `revalidateTag` in background |

## Caching Contract

| Layer | Key | TTL | Invalidation |
|-------|-----|-----|--------------|
| Next.js ISR | `page:${slug}` | 86400s (1 day) | `revalidateTag(slug)` or time-based |
| Vercel Edge | URL path | On deploy | Redeploy |
| Supabase | Row `updated_at` | N/A | ISR checks `updated_at` on revalidate |

## File Ownership

| File | Owner | Rationale |
|------|-------|-----------|
| `src/lib/data/allow-lists.ts` | BE | Single source of truth for all valid slugs |
| `src/lib/allow-list.ts` | **DEPRECATED** — consolidate into `data/allow-lists.ts` | |
| `src/lib/supabase/server.ts` | BE | Server client creation |
| `src/lib/supabase/client.ts` | BE | Browser client creation |
| `src/lib/metadata.ts` | FE | Page metadata assembly |
| `src/components/json-ld/*.tsx` | FE | Schema rendering |
| `src/app/**/page.tsx` | FE | Route component, calls data layer |
| `src/lib/data-fetch.ts` | **NEW — BE owns, FE reviews** | Unified data-fetch helper with error handling |

## Migration Path

1. Sprint 2: Create `src/lib/data-fetch.ts` with typed helpers for each route type
2. Sprint 2: Migrate existing pages to use `data-fetch.ts` instead of inline hardcoded content
3. Sprint 2: Delete `src/lib/allow-list.ts`, update imports to `src/lib/data/allow-lists.ts`
4. Sprint 3: Add real Supabase queries to `data-fetch.ts` (currently returns mock data)

## Acceptance Criteria

- [ ] Single allow-list source of truth exists and is imported by all dynamic routes
- [ ] `data-fetch.ts` provides typed helpers for `getForecastPage`, `getStarPage`, `getQuePage`, `getToolConfig`
- [ ] All helpers return `null` on failure (never throw)
- [ ] FE routes handle `null` by calling `notFound()`
- [ ] Stale data detection triggers ISR revalidation
- [ ] File ownership documented and respected (BE does not modify `page.tsx` or `json-ld.tsx`)

---

*Contract length: ~120 lines. Ready for Sprint 2 spec integration.*
