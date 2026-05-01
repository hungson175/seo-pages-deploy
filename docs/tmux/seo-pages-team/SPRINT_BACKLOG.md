# SEO Pages Team - Sprint Backlog

**Owned by:** SM
**Current Sprint:** Sprint 2
**Last Updated:** 2026-05-01

---

## Sprint Goal

Deploy to Vercel with Lighthouse ≥90 mobile, integrate iztro chart with dynamic loading, and build birth-year forecast content pipeline for 12-24 MVP pages.

---

## Sprint Items

### PRIMARY

#### STORY-010: Lighthouse ≥90 Mobile Optimization (P0)
- [ ] Deploy to Vercel preview
- [ ] Run actual Lighthouse audit
- [ ] Fix: image optimization, font loading, JS bundle splitting
- [ ] Core Web Vitals: LCP <2.5s, CLS <0.1, FID <100ms
- [ ] Acceptance: Lighthouse mobile ≥90 on Vercel preview

#### STORY-011: iztro Chart Integration for /lap-la-so/ (P1)
- [ ] Install iztro library
- [ ] Dynamic import with ssr: false (next/dynamic)
- [ ] Use iztro locale 'vi-VN' for native Vietnamese output
- [ ] Chart renders client-side after form submission
- [ ] **12-PALACE GRID MUST DISPLAY:** Mệnh Cung, Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc, Nô Bộc, Thiên Di, Tật Ách, Tài Bạch, Tử Nữ, Phu Thê, Huynh Đệ
- [ ] **3 FREE INSIGHTS:** (1) Mệnh Cung verdict, (2) One life area teaser, (3) Lucky element snapshot
- [ ] **PAID UPSELL CTA:** full 12-palace analysis + decadal breakdown + monthly forecast + PDF export
- [ ] Mobile responsive
- [ ] Acceptance: Functional chart generation with full 12-palace grid, 3 insights, paid CTA

#### STORY-012a: Birth-Year Forecast Content Pipeline MVP (P1)
- [ ] Content pipeline: iztro JSON → LLM → 1,200-1,500 words
- [ ] Generate 12-24 MVP pages (one animal or one year as sample)
- [ ] 80%+ uniqueness per page
- [ ] "Thầy bói nói chuyện" tone
- [ ] Art. 320 compliance ("tham khảo" not "tiên đoán")
- [ ] BreadcrumbList + Article schema
- [ ] Supabase data layer for content storage
- [ ] **DOMAIN REQUIREMENTS:**
  - [ ] Use Tam Hợp Phái algorithm (iztro default)
  - [ ] Include Four Transformations (Tứ Hóa): Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ — determined by birth year stem
  - [ ] Reference Five Elements Class (Ngũ Hành Cục): Thủy Nhị Cục, Mộc Tam Cục, Kim Tứ Cục, Thổ Ngũ Cục, Hỏa Lục Cục
  - [ ] Include major star brightness levels (Miếu/Vượng/Đắc/Lợi/Bình/Bất/Hạn) — brightness changes interpretation
  - [ ] NO Western astrology terms
- [ ] Acceptance: Pipeline functional, 12-24 pages generated, uniqueness ≥80%, domain accuracy verified

### STRETCH

#### STORY-013: Gieo Quẻ 64-Quẻ Pages Scaffold (P2)
- [ ] 64 quẻ pages scaffold
- [ ] URL: /que/{id}-{name-vn}/
- [ ] 5-7 semantic H2s per page
- [ ] Lục Hào interpretation sections
- [ ] FAQ section
- [ ] Acceptance: 64 scaffold pages, correct URL pattern, semantic structure

---

## Sprint Progress

| Story | Assignee | Status | Notes |
|-------|----------|--------|-------|
| STORY-010 | FE | TDD RED done (5 tests), GREEN impl starting | Lighthouse + Vercel deploy. Spec at docs/specs/story-010-lighthouse.md |
| STORY-011 | BE/FE | BE implementation DONE (iztro installed), FE GREEN impl in progress | BE: iztro installed + 56/56 tests. FE: 21 RED tests, GREEN implementation starting. iztro dynamic integration. Spec at docs/specs/story-011-iztro-integration.md |
| STORY-012a | BE/FE | TL review: APPROVE with CHANGES. BE fixing blocking issue. | BE: 56/56 tests. 1 BLOCKING: extract.ts throws Error → must return null. FE: 10 RED tests, GREEN implementation in progress. |
| STORY-013 | FE | Spec distributed, QA cases ready (26) | Stretch — start only if 012a done early. Spec at docs/specs/story-013-gieo-que-scaffold.md |

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

---

## Sprint 1 Carryover (Tech Debt)

| # | Item | Priority | Owner | Status |
|---|------|----------|-------|--------|
| 1 | Segmented sitemaps (currently single-file) | P2 | FE | Not started |
| 2 | Hub index pages (/tuvi, /sao, /que) | P2 | FE | Not started |
| 3 | Fix metadata typo (đờii → đờii) | P2 | FE | Not started |
| 4 | Remove duplicate next.config.js | P2 | FE | Not started |
| 5 | Fix OG URL to full path | P2 | FE | Not started |
| 6 | Allow-list consolidation | P2 | BE | Not started |
| 7 | Configure ISR for dynamic routes | P3 | TL | Not started |
| 8 | CI/CD Lighthouse check in build pipeline | P3 | TL | Not started |

---

## Consultant Input

| Consultant | Status | Impact | Key Input |
|-----------|--------|--------|-----------|
| Bói-Toán | ✅ RECEIVED & INTEGRATED | STORY-011, STORY-012a | 12-palace grid, 3 free insights, paid upsell, Four Transformations, Five Elements, star brightness, Tam Hợp Phái, Art. 320 |
| SEO | ⏳ PENDING | STORY-010, STORY-012a | Technical SEO requirements, schema strategy |
| CMO | ⏳ PENDING | STORY-011 | Conversion funnel, CTA placement, paywall strategy |

*SM will route additional consultant requirements to team immediately when PO relays them. Does not block Sprint 2 execution.*

---

## Sprint 2 Active Improvements (SM Monitoring)

| # | Improvement | Target Roles | Status |
|---|-------------|--------------|--------|
| 1 | BE→FE Interface Contract + Single Source of Truth | TL (spec), BE/FE (impl) | Monitoring |
| 2 | AC Checklist Review Gate before TDD | BE + FE | Monitoring |

*SM will spot-check during Sprint 2. Evidence determines status at Sprint 2 retrospective.*

---

## Confidence

75% delivery with revised scope (vs 40% with original scope)
