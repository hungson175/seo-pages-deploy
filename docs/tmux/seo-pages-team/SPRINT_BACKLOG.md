# SEO Pages Team - Sprint Backlog

**Owned by:** SM
**Current Sprint:** Sprint 1
**Last Updated:** 2026-05-01

---

## Sprint Goal

Establish Next.js 15 SSG foundation for Tử Vi SEO pages. Stretch: /lap-la-so/ page shell ready for Sprint 2 iztro integration.

---

## Sprint Items

### PRIMARY

#### STORY-001: Next.js 15 SSG Migration (P0, XL)
- [ ] Next.js 15 + App Router setup
- [ ] SSG/ISR configuration for dynamic routes
- [ ] Vietnamese slug support (strip diacritics)
- [ ] Vercel deployment pipeline
- [ ] Lighthouse mobile score ≥90

### STRETCH

#### STORY-002-shell: /lap-la-so/ Page Shell (P0, L — descoped to shell only)
- [ ] Form UI: name, birth date, birth time, gender
- [ ] Page routing and static layout
- [ ] FAQPage schema markup structure
- [ ] Mobile responsive shell
- [ ] **EXCLUDED from Sprint 1:** iztro chart rendering, 3 insights preview, paid CTA logic

---

## Sprint Progress

| Story | Assignee | Status | Notes |
|-------|----------|--------|-------|
| STORY-001 | TL/BE/FE | FE implementation DONE, pending TL review | FE: 129 pages, 29/29 tests passing, build green. BE: TDD done, implementing. |
| STORY-002-shell | FE (stretch) | FE implementation DONE, pending TL review | Form UI, FAQ accordion, HowTo+FAQPage schema, CTA placeholder. 106-108 KB first load. |

---

## Definition of Done Checklist

For each story:
- [ ] Code implemented and committed
- [ ] TDD tests pass
- [ ] TL code review approved
- [ ] QA SEO validation passed
- [ ] Lint and build pass
- [ ] Lighthouse score ≥90 mobile
- [ ] PO accepts
