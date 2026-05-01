# SEO Pages Team - Product Backlog

**Owned by:** PO
**Last Updated:** 2026-05-01

---

## P0 - Critical (Must Do First)

### STORY-001: Next.js SSG Migration for Tử Vi
**Priority:** P0
**Status:** Ready
**Estimate:** XL

**Description:**
Migrate Tử Vi pages from React SPA to Next.js SSG/ISR for SEO compatibility.

**Acceptance Criteria:**
- [ ] Next.js 15 project setup with App Router
- [ ] SSG/ISR configuration for dynamic routes
- [ ] Vietnamese slug support (strip diacritics)
- [ ] Vercel deployment pipeline
- [ ] Lighthouse mobile score ≥90

**Notes:**
- Current chamque.com is React SPA = zero SEO surface
- This is the #1 blocker for all SEO work

---

### STORY-002: Free Tool /lap-la-so/ Page
**Priority:** P0
**Status:** Ready
**Estimate:** L

**Description:**
Build the free lá số tử vi generator page (65K monthly searches).

**Acceptance Criteria:**
- [ ] User inputs: name, birth date, birth time, gender
- [ ] iztro integration for chart generation
- [ ] SVG chart display
- [ ] 3 free insights preview
- [ ] CTA for paid deep reading
- [ ] FAQPage schema markup
- [ ] Mobile responsive

**Notes:**
- Highest search volume keyword
- Primary conversion funnel entry point

---

### STORY-003: Birth-Year Forecast Template
**Priority:** P0
**Status:** Ready
**Estimate:** L

**Description:**
Create template for ~144 birth-year forecast pages (12 animals × ~6 years × 2 genders).

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

---

## P1 - High Priority

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
**Status:** New
**Estimate:** M

**Description:**
Implement comprehensive schema markup for all page types.

**Acceptance Criteria:**
- [ ] FAQPage schema
- [ ] HowTo schema (for tool pages)
- [ ] BreadcrumbList schema
- [ ] Article schema
- [ ] Service schema
- [ ] All with `"inLanguage": "vi"`

---

## P2 - Medium Priority

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

### STORY-008: Gieo Quẻ 64-Quẻ Pages
**Priority:** P2
**Status:** New
**Estimate:** L

**Description:**
Build 64 quẻ pages for Gieo Quẻ Kinh Dịch.

**Acceptance Criteria:**
- [ ] URL pattern: `/que/{id}-{name-vn}/`
- [ ] 5-7 semantic H2s per page
- [ ] Lục Hào interpretation
- [ ] Career, love, finance sections
- [ ] FAQ section

**Notes:**
- Leverage existing chamque.com content structure

---

### STORY-009: Sitemap & Indexation
**Priority:** P2
**Status:** New
**Estimate:** S

**Description:**
Implement segmented sitemaps and indexation strategy.

**Acceptance Criteria:**
- [ ] Segmented sitemaps (tuvi.xml, gieoque.xml, tools.xml, blog.xml)
- [ ] Max 10K URLs per sitemap
- [ ] Google Search Console setup
- [ ] Index coverage monitoring

---

## P3 - Low Priority

### STORY-010: Tứ Trụ (Bazi) Pages
**Priority:** P3
**Status:** New
**Estimate:** TBD

**Description:**
Build SEO pages for Tứ Trụ (Bazi) app.

**Acceptance Criteria:**
- TBD based on Tử Vi success

---

## Backlog Notes

- Priorities based on search volume and business value
- Estimates: S (1-2 days), M (3-5 days), L (1-2 weeks), XL (2-4 weeks)
- PO will reprioritize based on Sprint Review feedback
