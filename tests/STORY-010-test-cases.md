# STORY-010 Test Cases — Lighthouse ≥90 Mobile + Core Web Vitals

**Story ID:** STORY-010
**Priority:** P0
**Sprint:** Sprint 2
**Description:** Optimize to Lighthouse ≥90 mobile, Core Web Vitals (LCP <2.5s, CLS <0.1)

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | Lighthouse Performance ≥90 | LH-001 — LH-005 |
| AC-002 | Lighthouse Accessibility ≥90 | LH-006 — LH-008 |
| AC-003 | Lighthouse Best Practices ≥90 | LH-009 — LH-010 |
| AC-004 | Lighthouse SEO ≥90 | LH-011 — LH-013 |
| AC-005 | LCP <2.5s | LH-014 — LH-016 |
| AC-006 | CLS <0.1 | LH-017 — LH-019 |
| AC-007 | INP <200ms | LH-020 — LH-021 |
| AC-008 | Bundle size budgets maintained | LH-022 — LH-024 |

---

## Test Cases

### LH-001: Lighthouse Performance Score — Homepage
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Deploy to Vercel preview | Preview URL available |
| 2 | Run Lighthouse mobile on / | Performance ≥90 |
| 3 | Record score | Documented |

**Pass Criteria:** Performance ≥90.

---

### LH-002: Lighthouse Performance Score — /lap-la-so/
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run Lighthouse mobile on /lap-la-so/ | Performance ≥90 |
| 2 | Verify iztro not in initial bundle | Dynamic import confirmed |

**Pass Criteria:** Performance ≥90.

---

### LH-003: Lighthouse Performance Score — Forecast Page
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run Lighthouse mobile on /tuvi/tuoi-ty-2026-nam/ | Performance ≥90 |
| 2 | Verify no render-blocking resources | All CSS async or inline |

**Pass Criteria:** Performance ≥90.

---

### LH-004: Lighthouse Performance Score — Star Guide
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run Lighthouse mobile on /sao/tu-vi/ | Performance ≥90 |

**Pass Criteria:** Performance ≥90.

---

### LH-005: Lighthouse Performance Score — Gieo Quẻ
**Type:** Performance
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run Lighthouse mobile on /que/1-kien-vi-thien/ | Performance ≥90 |

**Pass Criteria:** Performance ≥90.

---

### LH-006: Lighthouse Accessibility — Homepage
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run Lighthouse mobile on / | Accessibility ≥90 |
| 2 | Check color contrast | AA compliance |

**Pass Criteria:** Accessibility ≥90.

---

### LH-007: Lighthouse Accessibility — /lap-la-so/
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run Lighthouse mobile on /lap-la-so/ | Accessibility ≥90 |
| 2 | Verify form labels | All inputs labeled |
| 3 | Verify error announcements | aria-live or role=alert |

**Pass Criteria:** Accessibility ≥90.

---

### LH-008: Lighthouse Accessibility — All Pages
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run Lighthouse on sample of 5 pages | All ≥90 |
| 2 | Verify lang="vi" | Present on all pages |

**Pass Criteria:** All sampled pages ≥90.

---

### LH-009: Lighthouse Best Practices — Security
**Type:** Best Practices
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run Lighthouse on / | Best Practices ≥90 |
| 2 | Check HTTPS | All resources HTTPS |
| 3 | Check no console errors | Clean console |

**Pass Criteria:** Best Practices ≥90.

---

### LH-010: Lighthouse Best Practices — Modern Standards
**Type:** Best Practices
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify no deprecated APIs | None used |
| 2 | Verify no vulnerabilities | npm audit clean |

**Pass Criteria:** Best Practices ≥90.

---

### LH-011: Lighthouse SEO — Meta Tags
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run Lighthouse on / | SEO ≥90 |
| 2 | Verify title present | All pages |
| 3 | Verify description present | All pages |

**Pass Criteria:** SEO ≥90.

---

### LH-012: Lighthouse SEO — Crawlability
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify robots.txt allows all | User-agent: * Allow: / |
| 2 | Verify no noindex on production | None |
| 3 | Verify canonical URLs | Present on all pages |

**Pass Criteria:** SEO ≥90.

---

### LH-013: Lighthouse SEO — Mobile-Friendly
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify viewport meta | width=device-width |
| 2 | Verify tap targets ≥48px | No failures |
| 3 | Verify font size ≥12px | No failures |

**Pass Criteria:** SEO ≥90.

---

### LH-014: LCP — Homepage
**Type:** Core Web Vitals
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure LCP on mobile | <2.5s |
| 2 | Identify LCP element | Document |

**Pass Criteria:** LCP <2.5s.

---

### LH-015: LCP — /lap-la-so/
**Type:** Core Web Vitals
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure LCP on mobile | <2.5s |
| 2 | Verify form renders quickly | Not blocked by JS |

**Pass Criteria:** LCP <2.5s.

---

### LH-016: LCP — Forecast Page
**Type:** Core Web Vitals
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure LCP on mobile | <2.5s |
| 2 | Verify content pre-rendered | SSG HTML visible |

**Pass Criteria:** LCP <2.5s.

---

### LH-017: CLS — Homepage
**Type:** Core Web Vitals
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure CLS on mobile | <0.1 |
| 2 | Check for layout shifts | No unexpected shifts |

**Pass Criteria:** CLS <0.1.

---

### LH-018: CLS — /lap-la-so/
**Type:** Core Web Vitals
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure CLS on mobile | <0.1 |
| 2 | Verify form validation doesn't shift | Error messages inline |
| 3 | Verify chart placeholder | No shift on render |

**Pass Criteria:** CLS <0.1.

---

### LH-019: CLS — All Pages
**Type:** Core Web Vitals
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure CLS on 5 sample pages | All <0.1 |
| 2 | Check images have dimensions | width/height set |
| 3 | Check fonts use font-display: swap | Prevents FOIT |

**Pass Criteria:** All <0.1.

---

### LH-020: INP — Interactive Elements
**Type:** Core Web Vitals
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure INP on /lap-la-so/ | <200ms |
| 2 | Test form submission | Responsive |
| 3 | Test FAQ accordion | Responsive |

**Pass Criteria:** INP <200ms.

---

### LH-021: FID — First Input
**Type:** Core Web Vitals
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure FID on /lap-la-so/ | <100ms |
| 2 | Verify main thread not blocked | No long tasks |

**Pass Criteria:** FID <100ms.

---

### LH-022: Bundle Size — Static Pages
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure initial JS | <150 KB |
| 2 | Verify with webpack-bundle-analyzer | Document |

**Pass Criteria:** <150 KB.

---

### LH-023: Bundle Size — /lap-la-so/
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure initial JS (before iztro) | <150 KB |
| 2 | Measure iztro chunk | <100 KB |
| 3 | Measure total after iztro load | <220 KB |

**Pass Criteria:** Within budgets.

---

### LH-024: Bundle Size — No iztro on Static Pages
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check /tuvi/ page bundle | No iztro code |
| 2 | Check /sao/ page bundle | No iztro code |
| 3 | Check /que/ page bundle | No iztro code |

**Pass Criteria:** iztro only on /lap-la-so/.

---

## Testing Tools

| Tool | Purpose |
|------|---------|
| Lighthouse CI | Automated scoring |
| PageSpeed Insights API | Production monitoring |
| Chrome DevTools | Manual CWV measurement |
| web-vitals library | Real-user monitoring |
| webpack-bundle-analyzer | Bundle analysis |

---

*Test cases: 24*
*Estimated execution: 4-6 hours (requires deployment)*
