# STORY-001 Test Cases - Next.js 15 SSG Migration

**Story:** Next.js 15 SSG/ISR Migration for Tu Vi
**Sprint:** Sprint 1
**Priority:** P0
**Spec Reference:** `docs/specs/story-001-nextjs-ssg-migration.md`

---

## Acceptance Criteria Mapping

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | Next.js 15 project scaffolded with App Router and Tailwind CSS | TC-001, TC-002 |
| AC-002 | generateStaticParams implemented for all static route segments | TC-003, TC-004, TC-005 |
| AC-003 | ISR configured for dynamic forecast routes with revalidate strategy | TC-006, TC-007 |
| AC-004 | Vietnamese slug utilities enforce diacritic stripping and hyphenation | TC-008, TC-009, TC-010 |
| AC-005 | Reusable JSON-LD components for FAQPage, HowTo, BreadcrumbList, Article | TC-011, TC-012 |
| AC-006 | sitemap.ts generates segmented sitemap index | TC-013, TC-014 |
| AC-007 | Supabase schema created with pages and page_metadata_cache tables | TC-015 |
| AC-008 | metadata and metadataBase configured for Open Graph, canonical, Twitter cards | TC-016, TC-017 |
| AC-009 | Vercel deployment pipeline active with environment variables | TC-018, TC-019 |
| AC-010 | Lighthouse mobile score >= 90 on homepage and /lap-la-so/ | TC-020, TC-021 |

---

## Test Cases

### TC-001: App Router Structure
**Type:** Structural
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify `app/` directory exists at project root | Directory exists |
| 2 | Verify `app/layout.tsx` exists with root layout | File exists with valid React component |
| 3 | Verify `app/page.tsx` exists for homepage | File exists |
| 4 | Verify no conflicting `pages/` directory | No `pages/` directory or empty if migrating |
| 5 | Check `package.json` for Next.js version | Version is 15.x |

**Pass Criteria:** All steps pass.

---

### TC-002: Tailwind CSS Integration
**Type:** Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check `tailwind.config.ts` or `.js` exists | Config file present |
| 2 | Verify `app/globals.css` imports Tailwind directives | `@tailwind` directives present |
| 3 | Check `postcss.config.js` exists | PostCSS configured |
| 4 | Verify Tailwind classes render correctly on homepage | Styles applied |

**Pass Criteria:** All steps pass.

---

### TC-003: Static Site Generation - Homepage
**Type:** Functional / Performance
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Run `next build` | Build completes without errors |
| 2 | Check `.next/server/app/page.html` exists | Pre-rendered HTML file exists |
| 3 | Open HTML file and verify content is visible | Real content in HTML, not empty shell |
| 4 | Verify no `getServerSideProps` usage | App Router patterns used |

**Pass Criteria:** All steps pass.

---

### TC-004: generateStaticParams for Static Routes
**Type:** Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check `app/tuvi/[slug]/page.tsx` for `generateStaticParams` | Function exported |
| 2 | Verify function returns array of param objects | Returns `[{ slug: '...' }, ...]` |
| 3 | Check `app/sao/[star]/page.tsx` for `generateStaticParams` | Function exported |
| 4 | Run `next build` and verify static files generated | HTML files exist in `.next/server/app/` |

**Pass Criteria:** All steps pass.

---

### TC-005: Dynamic Route Generation Count
**Type:** Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Count generated files for `tuvi/` routes | Matches expected count (~144) |
| 2 | Count generated files for `sao/` routes | Matches expected count (~34) |
| 3 | Verify each HTML file contains unique content | Content differs per slug |

**Pass Criteria:** All steps pass.

---

### TC-006: ISR Configuration
**Type:** Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check dynamic forecast route for `revalidate` export | `export const revalidate = N` present |
| 2 | Verify revalidate value is reasonable (e.g., 86400) | Value is numeric and > 0 |
| 3 | Verify ISR fallback behavior for unknown slugs | Returns 404, not 500 |

**Pass Criteria:** All steps pass.

---

### TC-007: ISR Revalidation
**Type:** Functional
**Priority:** P1

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Trigger revalidation via `revalidateTag` or time-based | Page regenerates |
| 2 | Verify stale content is updated after revalidation | New content served |

**Pass Criteria:** All steps pass.

---

### TC-008: Vietnamese Slug - Diacritic Stripping
**Type:** SEO / Functional
**Priority:** P0

| Input | Expected Output |
|-------|-----------------|
| `Tu vi` | `tu-vi` |
| `Giai doan que Kinh Dich` | `giai-doan-que-kinh-dich` |
| `Tu tru bat tu` | `tu-tru-bat-tu` |
| `Ngu hanh` | `ngu-hanh` |
| `Lap la so` | `lap-la-so` |
| `Tuoi Ty 2026 nam` | `tuoi-ty-2026-nam` |

**Pass Criteria:** All inputs produce expected outputs.

---

### TC-009: Vietnamese Slug - Edge Cases
**Type:** SEO / Functional
**Priority:** P0

| Input | Expected Output |
|-------|-----------------|
| `Tu vi & Bat tu` | `tu-vi-bat-tu` |
| `Tu  vi` (double space) | `tu-vi` |
| ` Tu vi ` (leading/trailing spaces) | `tu-vi` |
| `Que so 64` | `que-so-64` |
| Empty string | Error or safe fallback |

**Pass Criteria:** All inputs produce expected outputs.

---

### TC-010: Slug URL Safety
**Type:** SEO / Security
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify slug matches regex `/^[a-z0-9]+(-[a-z0-9]+)*$/` | Matches |
| 2 | Verify slug length <= 100 chars | Length enforced |
| 3 | Test with URL-unsafe chars: `< > " % { } \|` | Stripped or rejected |

**Pass Criteria:** All steps pass.

---

### TC-011: JSON-LD Schema Components
**Type:** SEO / Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify reusable schema component exists | Component file present |
| 2 | Test FAQPage schema generation | Valid JSON-LD with `@type: "FAQPage"` |
| 3 | Test HowTo schema generation | Valid JSON-LD with `@type: "HowTo"` |
| 4 | Test BreadcrumbList schema generation | Valid JSON-LD with `@type: "BreadcrumbList"` |
| 5 | Test Article schema generation | Valid JSON-LD with `@type: "Article"` |
| 6 | Verify all schemas include `"inLanguage": "vi"` | Field present in all schemas |

**Pass Criteria:** All steps pass.

---

### TC-012: Schema Validation
**Type:** SEO
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Run schema through Google Rich Results Test | No critical errors |
| 2 | Verify JSON-LD is in `<script type="application/ld+json">` | Present in page HTML |

**Pass Criteria:** All steps pass.

---

### TC-013: Sitemap Generation
**Type:** SEO / Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check `app/sitemap.ts` exists | File present |
| 2 | Verify sitemap index references segmented sitemaps | tuvi.xml, gieoque.xml, tools.xml, blog.xml |
| 3 | Verify each segment has < 10,000 URLs | Count validated |
| 4 | Check `lastmod` dates are present | Dates in ISO format |

**Pass Criteria:** All steps pass.

---

### TC-014: Sitemap Accessibility
**Type:** SEO
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Access `/sitemap.xml` | Returns valid XML |
| 2 | Access segmented sitemaps (e.g., `/tuvi.xml`) | Returns valid XML |
| 3 | Verify all page URLs are included | No missing pages |

**Pass Criteria:** All steps pass.

---

### TC-015: Supabase Schema
**Type:** Database / Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify `pages` table exists | Table present |
| 2 | Verify required columns: id, slug, page_type, title, meta_description, content_json, schema_config, created_at, updated_at | All columns present |
| 3 | Verify `page_metadata_cache` table exists | Table present |
| 4 | Verify columns: slug, metadata, last_generated_at | All columns present |
| 5 | Verify `slug` has unique constraint | No duplicate slugs allowed |

**Pass Criteria:** All steps pass.

---

### TC-016: Metadata API Configuration
**Type:** SEO / Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check `app/layout.tsx` exports `metadata` object | Export present |
| 2 | Verify `metadataBase` is set | `new URL('https://chamque.com')` or similar |
| 3 | Verify `title` and `description` present | Fields populated |
| 4 | Verify `openGraph` object with title, description, images | OG tags present |
| 5 | Verify `twitter` card metadata | Twitter tags present |

**Pass Criteria:** All steps pass.

---

### TC-017: Canonical URLs
**Type:** SEO
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View page source for `<link rel="canonical">` | Tag present |
| 2 | Verify canonical URL is absolute and correct | Full URL with domain |
| 3 | Verify no trailing slash inconsistency | Consistent format |

**Pass Criteria:** All steps pass.

---

### TC-018: Vercel Deployment Pipeline
**Type:** Deployment
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify Vercel project is linked | `vercel.json` or project connected |
| 2 | Check build command is `next build` | Configured correctly |
| 3 | Verify Node.js version >= 18 | Version specified |
| 4 | Trigger deploy and verify success | Build passes, site live |

**Pass Criteria:** All steps pass.

---

### TC-019: Environment Variables
**Type:** Deployment / Security
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify `SUPABASE_URL` is set | Variable present |
| 2 | Verify `SUPABASE_ANON_KEY` is set | Variable present |
| 3 | Verify `SUPABASE_SERVICE_ROLE_KEY` is set (server-side only) | Variable present, not exposed to client |
| 4 | Verify no secrets in code | Keys not hardcoded |

**Pass Criteria:** All steps pass.

---

### TC-020: Lighthouse - Homepage
**Type:** Performance
**Priority:** P0

| Metric | Threshold | Expected Result |
|--------|-----------|-----------------|
| Performance | >= 90 | Score meets threshold |
| Accessibility | >= 90 | Score meets threshold |
| Best Practices | >= 90 | Score meets threshold |
| SEO | >= 90 | Score meets threshold |
| Mobile score | >= 90 | Score meets threshold |

**Pass Criteria:** All metrics >= 90.

---

### TC-021: Lighthouse - /lap-la-so/
**Type:** Performance
**Priority:** P0

| Metric | Threshold | Expected Result |
|--------|-----------|-----------------|
| Performance | >= 90 | Score meets threshold |
| Accessibility | >= 90 | Score meets threshold |
| Best Practices | >= 90 | Score meets threshold |
| SEO | >= 90 | Score meets threshold |
| Mobile score | >= 90 | Score meets threshold |

**Pass Criteria:** All metrics >= 90.

---

### TC-022: Core Web Vitals - LCP
**Type:** Performance
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Measure LCP on mobile | LCP < 2.5s |

**Pass Criteria:** LCP < 2.5s.

---

### TC-023: Core Web Vitals - CLS
**Type:** Performance
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Measure CLS on mobile | CLS < 0.1 |

**Pass Criteria:** CLS < 0.1.

---

### TC-024: Error Handling - Invalid Slugs
**Type:** Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to invalid slug (e.g., `/tuvi/invalid-slug`) | Returns 404 |
| 2 | Verify 404 page is in Vietnamese | Vietnamese text present |

**Pass Criteria:** Returns 404 with Vietnamese page.

---

### TC-025: robots.txt
**Type:** SEO
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Access `/robots.txt` | File accessible |
| 2 | Verify `User-agent: *` with `Allow: /` | All pages allowed |
| 3 | Verify no `noindex` on production pages | None present |

**Pass Criteria:** robots.txt allows all.

---

### TC-026: Accessibility - lang Attribute
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check `<html>` tag for `lang` attribute | `lang="vi"` present |

**Pass Criteria:** `lang="vi"` present on `<html>`.

---

### TC-027: Bundle Size - Static Pages
**Type:** Performance
**Priority:** P1

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Measure client JS bundle for static pages | < 150 KB |

**Pass Criteria:** Bundle < 150 KB.

---

*Total test cases: 27*
*Estimated execution time: 4-6 hours*
*Dependencies: BE/FE implementation complete, Vercel deployment active*
