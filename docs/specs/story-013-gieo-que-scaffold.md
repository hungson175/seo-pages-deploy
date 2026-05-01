# STORY-013: Gieo Quẻ 64-Quẻ Pages Scaffold

**Status:** FINAL — Sprint 2 P2 (Stretch)

## Overview

Build the scaffold for 64 Gieo Quẻ Kinh Dịch pages. Sprint 2 delivers the route structure, page template, and schema markup for a subset of quẻ pages. Full content generation is Sprint 3+.

## Architecture

### Route Structure

- Route: `/que/{id}-{name-vn}/`
- Example: `/que/1-kien-vi-thien/`, `/que/2-khon-vi-dia/`
- Dynamic segment validated against allow-list

### URL Strategy

- Format: `/que/{id}-{name-vn}/`
- `id`: 1–64 (hexagram number)
- `name-vn`: Vietnamese name, diacritics stripped, hyphenated
- Examples: `kien-vi-thien`, `khon-vi-dia`, `ton-vi-loi`

### Page Template

Each quẻ page includes:

1. **Hero**: Quẻ name + number + trigram symbols
2. **Ý Nghĩa Quẻ**: Core meaning and philosophy
3. **Lục Hào Interpretation**: Six lines (hào) and their meanings
4. **Ứng Dụng**: Career, love, finance sections
5. **Biến Quẻ**: Related/changing hexagrams
6. **FAQ Section**: 3–5 accordion items
7. **CTA**: Link to Gieo Quẻ tool (when built)

### Schema Markup

| Schema | Purpose |
|--------|---------|
| Article | Main content |
| FAQPage | Accordion questions |
| BreadcrumbList | Navigation trail |

All schemas include `"inLanguage": "vi"`.

## Data Model

Uses `pages` table with `page_type: 'que'`:
- `slug`: `{id}-{name-vn}`
- `content_json`: `{sections: [{heading, content}]}`
- `hexagram_metadata`: `{number, trigrams, changingLines, relatedHexagrams}`

## MVP Scope (Sprint 2)

- Scaffold template for all 64 quẻ pages
- Generate static pages for initial subset (6–12 quẻ)
- Placeholder content with correct structure
- Full content generation deferred to Sprint 3

## Acceptance Criteria

- [ ] `/que/[slug]/` route with `generateStaticParams`
- [ ] Allow-list validation for 64 quẻ slugs
- [ ] Page template with 6 sections (Ý Nghĩa, Lục Hào, Ứng Dụng, Biến Quẻ, FAQ, CTA)
- [ ] Schema markup: Article + FAQPage + BreadcrumbList
- [ ] Static pages generated for 6–12 quẻ (subset)
- [ ] Vietnamese slugs (strip diacritics)
- [ ] Mobile responsive
- [ ] Article 320 disclaimer on every page

## Technical Constraints

- **Build time**: 64 pages should not add > 10s to build
- **Content**: Placeholder text for Sprint 2; real content in Sprint 3
- **Internal linking**: Link to related quẻ pages (Biến Quẻ section)
- **SEO**: Each page must have unique title and meta description

## BE / FE Work Split

| Task | Owner | Deliverable |
|------|-------|-------------|
| Allow-list (64 quẻ) | BE | Slug array with id + Vietnamese names |
| Route scaffold | FE | `/que/[slug]/page.tsx` with template |
| Schema components | FE | Article + FAQPage + BreadcrumbList |
| Static generation | FE | `generateStaticParams` for quẻ subset |
| Placeholder content | BE | Seed 6–12 quẻ rows with structured placeholder text |

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| 64 pages slow build | Low | Medium | Test build time; paginate if needed |
| Quẻ naming inconsistency | Medium | Low | Standardize on traditional Vietnamese names |
| Content overlap with Tử Vi | Low | Medium | Clear URL separation (`/que/` vs `/tuvi/`) |

---

*Spec length: ~100 lines. Ready for BE/FE TDD.*
