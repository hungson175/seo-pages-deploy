# SEO Pages Team - Product Backlog

**Owned by:** PO
**Last Updated:** 2026-05-01

---

## P0 - Critical (Must Do First)

### STORY-001: Next.js SSG Migration for Tử Vi
**Priority:** P0
**Status:** ✅ DONE (Sprint 1)
**Estimate:** XL

**Description:**
Migrate Tử Vi pages from React SPA to Next.js SSG/ISR for SEO compatibility.

**Acceptance Criteria:**
- [x] Next.js 15 project setup with App Router
- [x] SSG/ISR configuration for dynamic routes
- [x] Vietnamese slug support (strip diacritics)
- [x] Vercel deployment pipeline
- [ ] Lighthouse mobile score ≥90 (deferred to Sprint 2)

**Notes:**
- Current chamque.com is React SPA = zero SEO surface
- This is the #1 blocker for all SEO work

---

### STORY-002: Free Tool /lap-la-so/ Page
**Priority:** P0
**Status:** Partially DONE (shell complete in Sprint 1, chart integration in Sprint 2)
**Estimate:** L

**Description:**
Build the free lá số tử vi generator page (65K monthly searches).

**Acceptance Criteria:**
- [x] User inputs: name, birth date, birth time, gender
- [ ] iztro integration for chart generation (Sprint 2)
- [ ] SVG chart display (Sprint 2)
- [ ] 3 free insights preview (Sprint 2)
- [ ] CTA for paid deep reading (Sprint 2)
- [x] FAQPage schema markup
- [x] Mobile responsive

**Notes:**
- Highest search volume keyword
- Primary conversion funnel entry point

---

### STORY-010: Lighthouse ≥90 Mobile Optimization
**Priority:** P0
**Status:** In Sprint 2
**Estimate:** M

**Description:**
Deploy to Vercel preview and optimize to Lighthouse ≥90 mobile.

**Acceptance Criteria:**
- [ ] Deploy to Vercel preview
- [ ] Lighthouse mobile score ≥90
- [ ] LCP <2.5s
- [ ] CLS <0.1
- [ ] FID <100ms
- [ ] Image optimization
- [ ] Font loading optimized
- [ ] JS bundle splitting

**Notes:**
- Sprint 1 accepted proxy indicators (106-108 KB, build green)
- Sprint 2 must verify with actual Lighthouse audit
- If <90, performance fixes become P0 within Sprint 2

---

## P1 - High Priority

### STORY-003: Birth-Year Forecast Template
**Priority:** P1
**Status:** In Sprint 2
**Estimate:** L

**Description:**
Create template for ~96 birth-year forecast pages (12 animals × 4 years × 2 genders). **NOTE: Allow-list has 4 years, not 6.**

**Acceptance Criteria:**
- [ ] Dynamic route: `/tuvi/{animal}-{year}-{gender}/`
- [ ] iztro data integration (stars, palaces, brightness)
- [ ] LLM content generation (1,200-1,500 words)
- [ ] 80%+ uniqueness per page
- [ ] "Thầy bói nói chuyện" tone
- [ ] Art. 320 compliance disclaimer
- [ ] BreadcrumbList + Article schema

**Notes:**
- This is where ALL search volume lives
- Use iztro JSON for genuinely unique predictions
- **Split across sprints:** STORY-012a (12-24 pages in Sprint 2), STORY-012b (remaining 72+ pages in Sprint 3)
- May split into two sprints (72 + 72) based on TL capacity

---

### STORY-011: iztro Chart Integration for /lap-la-so/
**Priority:** P1
**Status:** In Sprint 2
**Estimate:** M

**Description:**
Integrate iztro library for SVG birth chart generation in the free tool page.

**Acceptance Criteria:**
- [ ] iztro generates chart from user input (name, birth date/time, gender)
- [ ] SVG chart renders client-side
- [ ] 3 free insights preview
- [ ] CTA for paid deep reading
- [ ] Mobile responsive chart display

**Notes:**
- Client-side rendering (SSR not needed for interactive tool)
- Bói-Toán consultant input pending on chart elements and insights
- CMO consultant input pending on conversion funnel optimization

---

### STORY-004: Educational Hub Pages (Star Guide)
**Priority:** P1
**Status:** New
**Estimate:** M

**Description:**
Create ~34 educational pages for major and minor stars.

**Acceptance Criteria:**
- [ ] 14 major star pages
- [ ] 20 minor star pages
- [ ] Each page: overview, characteristics, in different palaces
- [ ] Internal linking to related pages
- [ ] Authority content for link building

---

### STORY-005: Annual Forecast Hub
**Priority:** P1
**Status:** New
**Estimate:** M

**Description:**
Create annual forecast hub and compatibility pages.

**Acceptance Criteria:**
- [ ] 2026 annual forecast hub
- [ ] Compatibility pages (9K+ searches)
- [ ] dateModified schema for annual regeneration
- [ ] Tết 2027 campaign ready by Jan 2027

---

### STORY-006: Schema Markup System
**Priority:** P1
**Status:** Partially DONE (basic schemas in Sprint 1)
**Estimate:** M

**Description:**
Implement comprehensive schema markup for all page types.

**Acceptance Criteria:**
- [x] FAQPage schema
- [x] HowTo schema (for tool pages)
- [x] BreadcrumbList schema
- [x] Article schema
- [ ] Service schema (deferred from Sprint 1)
- [ ] WebSite schema (competitor gap — aituvi missing)
- [x] All with `"inLanguage": "vi"`

**Notes:**
- Competitor analysis (OPC): aituvi.com has incomplete schema. We can outrank by having full Schema.org coverage.
- tuvi.vn NOINDEXES year pages — we SHOULD index ours for long-tail SEO.

---

## P2 - Medium Priority

### STORY-013: Gieo Quẻ 64-Quẻ Pages Scaffold
**Priority:** P2
**Status:** In Sprint 2
**Estimate:** L

**Description:**
Build 64 quẻ pages scaffold for Gieo Quẻ Kinh Dịch.

**Acceptance Criteria:**
- [ ] URL pattern: `/que/{id}-{name-vn}/`
- [ ] 5-7 semantic H2s per page
- [ ] Lục Hào interpretation sections
- [ ] Career, love, finance sections
- [ ] FAQ section

**Notes:**
- Leverage existing chamque.com content structure
- Scaffold only in Sprint 2; full content in future sprint

---

### STORY-007: Life-Area Hub Pages
**Priority:** P2
**Status:** New
**Estimate:** M

**Description:**
Create ~12 life-area hub pages (career, love, health, wealth, etc.).

**Acceptance Criteria:**
- [ ] 12 hub pages
- [ ] Aggregates related content
- [ ] Strong internal linking
- [ ] Conversion CTAs

---

### STORY-009: Sitemap & Indexation
**Priority:** P2
**Status:** Partially DONE (single-file sitemap in Sprint 1)
**Estimate:** S

**Description:**
Implement segmented sitemaps and indexation strategy. All 440+ pages should be indexed.

**Acceptance Criteria:**
- [ ] Segmented sitemaps (tuvi.xml, gieoque.xml, tools.xml, blog.xml)
- [ ] Max 10K URLs per sitemap
- [ ] Sitemap includes all 440+ pages
- [ ] Google Search Console setup
- [ ] Index coverage monitoring
- [ ] Index strategy: index all SEO pages, noindex only forms/tools

**Notes:**
- Competitor gap: tuvi.vn NOINDEXES year pages. We gain advantage by indexing all forecast pages.

---

## P3 - Low Priority

### STORY-014: Tứ Trụ (Bazi) Pages
**Priority:** P3
**Status:** New
**Estimate:** TBD

**Description:**
Build SEO pages for Tứ Trụ (Bazi) app.

**Acceptance Criteria:**
- TBD based on Tử Vi success

---

## Tech Debt & Sprint Carry-Forward

### Sprint 1 → Sprint 2
- [ ] ISR configuration
- [ ] Segmented sitemaps (from single-file)
- [ ] Full Supabase integration (from types-only)
- [ ] ServiceSchema for /lap-la-so/
- [ ] Hub index pages (/tuvi, /sao, /que)
- [ ] Allow-list consolidation
- [ ] Metadata typo fix
- [ ] Remove duplicate next.config.js
- [ ] Fix OG URL path

---

## Backlog Notes

- Priorities based on search volume and business value
- Estimates: S (1-2 days), M (3-5 days), L (1-2 weeks), XL (2-4 weeks)
- PO will reprioritize based on Sprint Review feedback
- PO cross-domain awareness: SEO, Marketing, Bói Toán, TikTok

---

## New Stories (From Competitor Analysis — OPC 2026-05-01)

### STORY-015: HTML lang="vi" Fix
**Priority:** P2
**Status:** New
**Estimate:** XS

**Description:**
Fix `<html lang="vi">` on all pages. Competitor aituvi.com has lang="en" which is an SEO mistake.

**Acceptance Criteria:**
- [ ] All pages have `<html lang="vi">`
- [ ] No pages have lang="en" or missing lang

---

### STORY-016: H1 Optimization
**Priority:** P1
**Status:** New
**Estimate:** S

**Description:**
Optimize H1 tags per tuvi.vn formula: [action] + [keyword] + [benefit/emotional].

**Acceptance Criteria:**
- [ ] H1 formula applied to all page types
- [ ] Birth-year pages: "Xem tử vi [năm] tuổi [con giáp] [giới tính]: [lợi ích]"
- [ ] Tool pages: "Lập lá số tử vi: Khám phá vận mệnh chính xác"
- [ ] Each H1 is unique per page

**Notes:**
- Competitor insight: tuvi.vn uses formulaic H1s that rank well.

---

### STORY-017: Internal Linking Matrix
**Priority:** P2
**Status:** New
**Estimate:** M

**Description:**
Build internal linking matrix where every page links to 10+ related pages.

**Acceptance Criteria:**
- [ ] Birth-year pages link to: same animal other years, same year other animals, compatible animals, tool page
- [ ] Tool page links to: popular forecasts, educational content
- [ ] Educational pages link to: related stars, related forecasts
- [ ] Footer: category hubs (/tuvi, /sao, /que)

**Notes:**
- Competitor insight: tuvi.vn ranks on category pages with deep internal linking.

---

### STORY-018: Meta Tag Template System
**Priority:** P2
**Status:** New
**Estimate:** S

**Description:**
Create meta tag templates per page type for consistent, optimized SEO.

**Acceptance Criteria:**
- [ ] Title template: [keyword] | [brand] for each page type
- [ ] Description template: 150-160 chars with CTA
- [ ] OG tags per page type
- [ ] Twitter cards per page type

---

### STORY-019: Trust Signals
**Priority:** P2
**Status:** New
**Estimate:** XS

**Description:**
Add trust signals in footer to match competitor standards.

**Acceptance Criteria:**
- [ ] Art. 320 compliance badge
- [ ] "Kết quả chỉ mang tính tham khảo" disclaimer
- [ ] Contact info
- [ ] Privacy policy link
- [ ] Last updated date

---

### STORY-020: Daily Auto-Articles
**Priority:** P3
**Status:** New
**Estimate:** L

**Description:**
Daily auto-generated articles for content freshness (competitor aituvi strategy).

**Acceptance Criteria:**
- [ ] Daily horoscope auto-generation
- [ ] Daily "ngày tốt xấu" article
- [ ] Auto-publish to site
- [ ] dateModified schema updates

**Notes:**
- Complex feature — likely Sprint 4+ scope.

---

## Backlog Notes

- Priorities based on search volume and business value
- Estimates: XS (few hours), S (1-2 days), M (3-5 days), L (1-2 weeks), XL (2-4 weeks)
- PO will reprioritize based on Sprint Review feedback
- PO cross-domain awareness: SEO, Marketing, Bói Toán, TikTok
- Competitor analysis integrated: tuvi.vn, aituvi.com patterns
