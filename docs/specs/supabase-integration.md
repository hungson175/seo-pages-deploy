# Supabase Integration Spec

**Status:** FINAL — Sprint 2 Approved  
**Applies to:** STORY-012a (MVP pipeline), STORY-011 (iztro tool config)

## Purpose

Connect the Next.js static export to real Supabase data for dynamic routes. Currently all pages are hardcoded placeholders. This spec defines the minimal schema, data access patterns, and migration path from static to dynamic content.

## Sprint 2 Scope: MVP Pipeline (12–24 Pages)

STORY-012a delivers the **pipeline**, not the full 96 pages.
- Sprint 2: Build pipeline + seed 12–24 MVP pages (one animal across all years/genders, or one year across all animals)
- Sprint 3: Apply pipeline to remaining ~72 pages

## Sprint 2 Improvement: AC Checklist Review Gate

Per SM Action Item #2, **before TDD begins**, devs MUST:
1. Read the Acceptance Criteria in this spec
2. Cross-check against SPRINT_BACKLOG.md story AC
3. Confirm understanding before writing first test

## Database Schema

### Table: `pages`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | uuid | PK, default gen_random_uuid() | |
| `slug` | text | UNIQUE, NOT NULL | Diacritics stripped, validated against allow-list |
| `page_type` | enum | NOT NULL | `forecast`, `star`, `que`, `tool`, `hub` |
| `title` | text | NOT NULL | H1 + `<title>` |
| `meta_description` | text | NOT NULL | 150-160 chars |
| `content_json` | jsonb | NOT NULL, default `{}` | Ordered sections: `[{heading, content}]` |
| `faq_items` | jsonb | default `[]` | `[{question, answer}]` for FAQPage schema |
| `schema_config` | jsonb | default `{}` | `{primary: 'Article', supporting: ['FAQPage']}` |
| `updated_at` | timestamptz | NOT NULL, default now() | Drives `lastmod` and `dateModified` |
| `created_at` | timestamptz | NOT NULL, default now() | |

### Table: `tool_configs`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | uuid | PK | |
| `tool_slug` | text | UNIQUE, NOT NULL | e.g. `lap-la-so` |
| `faq_items` | jsonb | default `[]` | Static FAQ for tool page |
| `cta_copy` | jsonb | default `{}` | `{headline, description, price, buttonText}` |
| `howto_steps` | jsonb | default `[]` | Steps for HowTo schema |
| `disclaimer` | text | default '' | Article 320 text |
| `updated_at` | timestamptz | NOT NULL | |

### Indexes

- `pages_slug_idx` on `pages(slug)` — route lookups
- `pages_type_idx` on `pages(page_type)` — sitemap generation by type
- `pages_updated_at_idx` on `pages(updated_at)` — stale data detection

## Data Access Patterns

### Server-Side Fetching

All data fetching happens in Server Components or `generateStaticParams`/`generateMetadata`:

- `getPageBySlug(slug: string)` — returns full page data or null
- `getPagesByType(type: PageType)` — returns array for sitemap generation
- `getToolConfig(toolSlug: string)` — returns tool configuration

### Caching Strategy

| Layer | Mechanism | TTL | Invalidation |
|-------|-----------|-----|--------------|
| Next.js ISR | `next.revalidate` | 86400s | `revalidateTag(slug)` |
| Supabase | Row-level `updated_at` | N/A | Application-driven |
| Vercel Edge | Static export | On deploy | Redeploy |

### Graceful Degradation

- Supabase unavailable → page renders from last static export (stale content)
- Row missing → `notFound()` (404)
- Partial data → render available sections, omit incomplete ones

## Content Pipeline

### Birth-Year Forecast Pages (96 total; 12–24 in Sprint 2 MVP)

1. **Seed data**: BE generates placeholder rows for all 96 allow-list slugs
2. **MVP content**: LLM pipeline generates content for 12–24 pages (one animal or one year)
3. **Uniqueness**: Each page has unique `content_json` based on animal/year/gender combination
4. **Update cycle**: Annual refresh before Tết (triggered by `updated_at` batch update)

### Star Pages (~34 pages)

1. **Seed data**: BE creates rows for all star slugs
2. **Content**: Static educational content (rarely changes)
3. **Update cycle**: Manual, on editorial schedule

### Tool Page (/lap-la-so/)

1. **Seed data**: Single row in `tool_configs`
2. **Content**: Static FAQ, CTA copy, HowTo steps
3. **Dynamic part**: iztro chart generated client-side (no DB dependency)

## Migration Path

### Phase 1: Schema + Types (Sprint 2)

- Create Supabase tables and indexes
- Update TypeScript types in `src/types/database.ts`
- Create `src/lib/data-fetch.ts` with mock returns (structure only)

### Phase 2: Real Data + Seed (Sprint 2-3)

- Seed `pages` with placeholder content for all allow-list slugs
- Seed `tool_configs` with `/lap-la-so/` content
- Connect `data-fetch.ts` to real Supabase queries

### Phase 3: Content Generation (Sprint 3+)

- LLM pipeline populates `content_json` for birth-year forecasts
- QA validates uniqueness and Article 320 compliance
- Batch update `updated_at` to trigger ISR revalidation

## Environment Configuration

Required environment variables (already in `vercel.json`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, for seeding/admin)

## Acceptance Criteria

- [ ] Supabase schema created with `pages` and `tool_configs` tables
- [ ] TypeScript types updated and passing compilation
- [ ] `data-fetch.ts` provides typed helpers with proper error handling
- [ ] All dynamic routes fetch data via `data-fetch.ts` (no hardcoded content)
- [ ] Seed script populates all allow-list slugs with placeholder content
- [ ] Sitemap generation queries Supabase instead of hardcoded arrays
- [ ] Build passes with real or mock data
- [ ] Article 320 disclaimer present in all seeded content

## Technical Constraints

- **RLS**: Enable Row Level Security on all tables; allow public read, restrict write to service role
- **Migrations**: Use Supabase CLI migrations (committed to repo)
- **No direct SQL in specs**: Schema described in tables, exact CREATE TABLE via migrations
- **Bundle impact**: `@supabase/ssr` already in dependencies; no new client-side JS

---

*Spec length: ~140 lines. Ready for Sprint 2 integration.*
