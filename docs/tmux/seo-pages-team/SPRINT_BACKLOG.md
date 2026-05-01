# SEO Pages Team - Sprint Backlog

**Owned by:** SM
**Current Sprint:** Sprint 3
**Last Updated:** 2026-05-01

---

## Sprint Goal

Render iztro charts with full 12-palace grid UI, deploy to Vercel production (boitoan.vn), complete birth-year forecast content for 72+ pages, and implement competitor quick-wins (H1 optimization, lang='vi', meta tag templates, trust signals).

---

## Sprint Items

### P0 (MUST HAVE)

#### STORY-011b: iztro UI Rendering (P0)
- [ ] 12-palace SVG grid layout (4x3 traditional)
- [ ] Star brightness color coding (minh/hãm/bình)
- [ ] Interactive features: hover tooltip, click expand
- [ ] Insight card refinement with star icons
- [ ] Paid CTA with full feature list
- [ ] Performance: render < 1s, responsive 375px+
- [ ] Accessibility: keyboard nav, aria labels, screen reader
- [ ] Dynamic import with ssr: false
- [ ] Acceptance: Functional chart rendering, <1s render, mobile responsive, a11y compliant

#### Vercel Production Deploy (P0)
- [ ] Configure Vercel CLI with token
- [ ] Deploy to boitoan.vn
- [ ] Verify build output on production
- [ ] Run Lighthouse audit ≥90 mobile
- [ ] Acceptance: Live on boitoan.vn, Lighthouse ≥90

### P1 (SHOULD HAVE)

#### STORY-012b: Birth-Year Forecast Content Pipeline (72+ pages) (P1)
- [ ] Scale pipeline from 12-24 to 72+ pages
- [ ] LLM integration for 80%+ uniqueness (Claude/OpenAI)
- [ ] Content generation: 1,200-1,500 words per page
- [ ] Art. 320 compliance ('tham khảo' mandatory)
- [ ] Domain rules: Tam Hợp Phái, Tứ Hóa, Ngũ Hành, độ sáng
- [ ] NO Western astrology terms
- [ ] Supabase seeding with real data layer
- [ ] Acceptance: 72+ pages generated, uniqueness ≥80%, tone correct

#### STORY-016: H1 Optimization (P1)
- [ ] H1 formula: [action] + [keyword] + [benefit/emotional]
- [ ] Action verbs: 'Xem', 'Tìm Hiểu', 'Khám Phá', 'Lập'
- [ ] Benefit phrases: 'Luận Giải Chi Tiết', 'Miễn Phí', 'Chính Xác'
- [ ] Update all page templates (tuvi, sao, que)
- [ ] Acceptance: All pages have optimized H1s per formula

### P2 (QUICK WINS — parallelizable)

#### STORY-015: HTML lang='vi' Verification (P2)
- [ ] Verify lang='vi' on all pages
- [ ] Fix any missing lang attributes
- [ ] Acceptance: 100% pages have lang='vi'

#### STORY-018: Meta Tag Template System (P2)
- [ ] Enhance buildMetadata() with templates per page type
- [ ] Title template: '{action} {topic} {year?} {benefit} | Bói Toán'
- [ ] Description templates with CTA
- [ ] Apply to all page types
- [ ] Acceptance: All pages have optimized meta tags

#### STORY-019: Trust Signals (P2)
- [ ] Add authorExpertise component (name, title, publish date)
- [ ] Enhance Art.320 with visual badge styling
- [ ] Add 'Cập nhật: [date]' metadata line
- [ ] Acceptance: Trust signals visible on all content pages

### STRETCH

#### STORY-017: Internal Linking Matrix (STRETCH — only if P0+P1 done early)
- [ ] Data structure: Map<slug, relatedSlugs[]>
- [ ] Logic: Same animal/year/adjacent animals → related
- [ ] FE renders 'Xem thêm' section with 10 related links
- [ ] Acceptance: 10+ related links per content page

---

## Sprint Progress

| Story | Assignee | Status | Notes |
|-------|----------|--------|-------|
| STORY-011b | FE | Not started | TL spec ready: docs/specs/story-011b-iztro-ui-rendering.md |
| Vercel Deploy | BE | Not started | Token ready, needs env config |
| STORY-012b | BE | Not started | LLM provider decision needed |
| STORY-016 | FE | Not started | h1Formatter utility approach ready |
| STORY-015 | FE | Not started | Already done, verify maintained |
| STORY-018 | FE | Not started | buildMetadata() enhancement approach ready |
| STORY-019 | FE | Not started | authorExpertise component approach ready |
| STORY-017 | FE/BE | Not started | Stretch — only if P0+P1 done early |

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

## Sprint 3 Active Improvements (SM Monitoring)

| # | Improvement | Target Roles | Status |
|---|-------------|--------------|--------|
| 1 | Credential Readiness Check at Sprint Start | SM + TL | Effective ✅ (Vercel token obtained) |
| 2 | Early Spec for High-Risk Stories | TL | Effective ✅ (STORY-011b spec ready) |

---

## Sprint 3 Blockers to Resolve

| Blocker | Owner | Status |
|---------|-------|--------|
| LLM provider selection (Claude vs OpenAI vs local) | Boss/PO | Pending |
| Supabase real credentials + schema migration | BE | Pending |
| Vercel env variable configuration | BE | Pending |

---

## Sprint 3 Tech Debt Carryover

| # | Item | Priority | Owner |
|---|------|----------|-------|
| 1 | STORY-017: Internal linking matrix (if not completed) | P1 | FE/BE |
| 2 | STORY-020: Daily auto-articles | P3 | BE |
| 3 | ISR configuration | P2 | TL |
| 4 | Full Supabase integration with real data fetching | P1 | BE |
| 5 | Segmented sitemaps expansion | P2 | FE |
| 6 | Hub index pages (/tuvi, /sao, /que) | P2 | FE |
| 7 | CI/CD Lighthouse check in build pipeline | P3 | TL |
