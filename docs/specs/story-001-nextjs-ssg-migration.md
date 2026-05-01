# STORY-001: Next.js 15 SSG/ISR Migration for Tử Vi

## Overview

Migrate Tử Vi pages from a React SPA (zero SEO surface) to a Next.js 15 application using the App Router with SSG/ISR. This is the foundational technical story that unblocks all subsequent SEO page work.

## Architecture

### Framework & Rendering Strategy

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Router | App Router | Native support for `generateStaticParams`, `metadata`, and `sitemap.ts` |
| Static pages | `output: 'export'` or `generateStaticParams` | Educational hubs, star guides, quẻ pages — content changes infrequently |
| Dynamic pages | ISR (`revalidate: false` or `86400`) | Birth-year forecasts — regenerate annually or on-demand via `revalidateTag` |
| Client interactivity | Islands architecture | Use `'use client'` only for the `/lap-la-so/` tool form and chart preview |

### Route Structure

```
app/
├── (main)/
│   ├── page.tsx                    # Homepage
│   ├── tuvi/
│   │   └── [slug]/page.tsx         # Birth-year forecasts (~144 pages)
│   ├── sao/
│   │   └── [star]/page.tsx         # Star educational pages (~34)
│   └── que/
│       └── [slug]/page.tsx         # Gieo Quẻ pages (64) — P2
├── (tool)/
│   └── lap-la-so/
│       └── page.tsx                # Free tool — P0
├── sitemap.ts                      # Root sitemap index
└── layout.tsx                      # Root layout with fonts + metadata
```

### URL & Slug Strategy

- Strip all Vietnamese diacritics (e.g., `tử vi` → `tu-vi`, `giáp tý` → `giap-ty`)
- Lowercase, hyphen-separated
- Dynamic segments validated against an allow-list at build time
- Canonical URLs enforced via `metadataBase` and `<link rel="canonical">`

### Schema Markup System

Implement a declarative, reusable JSON-LD layer:

| Page Type | Primary Schema | Supporting Schema |
|-----------|---------------|-------------------|
| Homepage | WebSite | BreadcrumbList |
| `/lap-la-so/` | HowTo | FAQPage, Service |
| Birth-year forecast | Article | FAQPage, BreadcrumbList |
| Star guide | Article | BreadcrumbList |
| Quẻ page | Article | FAQPage, BreadcrumbList |

All schemas must include `"inLanguage": "vi"`.

### iztro Integration

- **Build-time only** for SSG pages: invoke iztro inside `generateStaticParams` or data-fetching helpers to produce chart SVGs and JSON metadata
- **Client-side** only for the `/lap-la-so/` interactive tool
- SVG output is preferred over canvas to minimize JS payload on static pages

### Sitemap Strategy

- `app/sitemap.ts` exports a sitemap index referencing segmented sitemaps
- Segmented by content type: `tuvi.xml`, `gieoque.xml`, `tools.xml`, `blog.xml`
- Each segment must not exceed 10,000 URLs
- `lastmod` derived from `updated_at` in Supabase or build timestamp

## Data Model

### Supabase Tables (Minimal Schema)

**`pages`**
- `id` (uuid, PK)
- `slug` (text, unique) — diacritics stripped
- `page_type` (enum: `forecast`, `star`, `que`, `tool`, `hub`)
- `title` (text)
- `meta_description` (text)
- `content_json` (jsonb) — structured sections for LLM rendering
- `schema_config` (jsonb) — which schemas to inject
- `created_at`, `updated_at` (timestamptz)

**`page_metadata_cache`**
- `slug` (text, PK)
- `metadata` (jsonb) — pre-computed Open Graph, Twitter, canonical
- `last_generated_at` (timestamptz)

### Caching Strategy

| Layer | Mechanism | Invalidation |
|-------|-----------|--------------|
| Next.js | ISR `revalidate` | Time-based or `revalidateTag(slug)` |
| Vercel Edge | `cache-control` headers | On redeploy |
| Supabase | Row-level `updated_at` | ISR `fetch` with `next.revalidate` |

## API Endpoints

### Internal Data API (Supabase Client)

- `GET /pages?slug={slug}` — fetch page content and metadata
- Used exclusively inside `page.tsx` and `generateMetadata` via server-side Supabase client

### External API (Edge Function — Optional)

- `POST /api/generate-content` — LLM pipeline for iztro JSON → unique prose
- Secured with service-role key; invoked during build or ISR revalidation

## Acceptance Criteria

- [ ] Next.js 15 project scaffolded with App Router and Tailwind CSS
- [ ] `generateStaticParams` implemented for all static route segments
- [ ] ISR configured for dynamic forecast routes with appropriate `revalidate` strategy
- [ ] Vietnamese slug utilities enforce diacritic stripping and hyphenation
- [ ] Reusable JSON-LD components for FAQPage, HowTo, BreadcrumbList, and Article
- [ ] `sitemap.ts` generates segmented sitemap index (tuvi, gieoque, tools, blog)
- [ ] Supabase schema created with `pages` and `page_metadata_cache` tables
- [ ] `metadata` and `metadataBase` configured for Open Graph, canonical, and Twitter cards
- [ ] Vercel deployment pipeline active with environment variables for Supabase
- [ ] Lighthouse mobile score ≥ 90 on homepage and `/lap-la-so/`

## Error Handling

- **Invalid slugs**: Return 404 with a Vietnamese-language not-found page
- **Supabase failures**: Graceful degradation — static pages show cached data; dynamic pages return 500 with retry guidance
- **Missing metadata**: Fallback to generic Open Graph and description

## BE / FE Work Split

| Layer | Owner | Deliverable |
|-------|-------|-------------|
| Project scaffold | BE | Next.js 15 + Tailwind + Supabase client setup |
| Database schema | BE | Supabase migrations for `pages` and `page_metadata_cache` |
| Route structure | FE | App Router groups, `generateStaticParams`, `metadata` |
| JSON-LD system | FE | Reusable schema components (declarative, no hardcoded JSON) |
| Slug utilities | BE | Diacritic stripping, hyphenation, allow-list validation |
| Sitemap | FE | `sitemap.ts` with segmented index generation |
| Deployment | BE | Vercel project config, environment variables, `robots.txt` |

## Technical Constraints

- **No code samples in specs** — this spec defines architecture only
- **Core Web Vitals**: LCP < 2.5s, CLS < 0.1, INP < 200ms
- **Bundle size**: Keep client JS < 150 KB for static pages; iztro loaded lazily on tool page only
- **Accessibility**: Vietnamese screen-reader friendly headings, `lang="vi"` on `<html>`
- **Article 320 compliance**: Every forecast page must include a `"tham khảo"` disclaimer
- **SEO**: `robots.txt` allows all; no `noindex` on production pages
- **Staging**: Deploy previews enabled on Vercel for every PR

---

*Spec finalized for Sprint 1. Length: ~170 lines. Ready for BE/FE breakdown.*
