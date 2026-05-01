# Sprint 2 QA Framework — Lighthouse ≥90 Mobile

**Sprint:** Sprint 2
**Goal:** Optimize to Lighthouse ≥90 mobile
**Prepared by:** QA
**Date:** 2026-05-01

---

## Target Metrics

| Category | Threshold | Measurement Tool |
|----------|-----------|------------------|
| Performance | ≥90 | Lighthouse CI / PageSpeed Insights |
| Accessibility | ≥90 | Lighthouse CI / axe DevTools |
| Best Practices | ≥90 | Lighthouse CI |
| SEO | ≥90 | Lighthouse CI |
| Mobile Score | ≥90 | Lighthouse CI |

## Core Web Vitals Thresholds

| Metric | Threshold | Target |
|--------|-----------|--------|
| LCP (Largest Contentful Paint) | <2.5s | <2.0s |
| CLS (Cumulative Layout Shift) | <0.1 | <0.05 |
| INP (Interaction to Next Paint) | <200ms | <150ms |
| FID (First Input Delay) | <100ms | <80ms |
| FCP (First Contentful Paint) | <1.8s | <1.5s |
| TTFB (Time to First Byte) | <800ms | <600ms |

---

## Test Plan by Page Type

### 1. Homepage (/)

| Test Case | Priority | Expected |
|-----------|----------|----------|
| LH-001 | P0 | Performance ≥90 |
| LH-002 | P0 | LCP <2.5s |
| LH-003 | P0 | CLS <0.1 |
| LH-004 | P0 | No render-blocking resources |
| LH-005 | P0 | Images optimized (WebP/AVIF) |
| LH-006 | P0 | Fonts preloaded |

### 2. /lap-la-so/ (Tool Page — iztro loaded)

| Test Case | Priority | Expected |
|-----------|----------|----------|
| LH-007 | P0 | Performance ≥90 |
| LH-008 | P0 | LCP <2.5s |
| LH-009 | P0 | CLS <0.1 (critical for form) |
| LH-010 | P0 | iztro lazy-loaded, not in initial bundle |
| LH-011 | P0 | Client JS <200 KB |
| LH-012 | P0 | No layout shift on form validation |
| LH-013 | P0 | Chart placeholder doesn't cause CLS |

### 3. Birth-Year Forecast (/tuvi/{slug})

| Test Case | Priority | Expected |
|-----------|----------|----------|
| LH-014 | P0 | Performance ≥90 |
| LH-015 | P0 | LCP <2.5s |
| LH-016 | P0 | Content renders without JS (SSG) |
| LH-017 | P0 | Images lazy-loaded below fold |
| LH-018 | P0 | No unused CSS/JS |

### 4. Star Guide (/sao/{star})

| Test Case | Priority | Expected |
|-----------|----------|----------|
| LH-019 | P0 | Performance ≥90 |
| LH-020 | P0 | LCP <2.5s |

---

## Specific Checks

### Bundle Size Budgets

| Page Type | JS Budget | CSS Budget | Total |
|-----------|-----------|------------|-------|
| Static (homepage, forecast) | <150 KB | <20 KB | <170 KB |
| /lap-la-so/ (with iztro) | <200 KB | <20 KB | <220 KB |
| Star guide | <150 KB | <20 KB | <170 KB |

### iztro-Specific Performance

| Check | Priority | Expected |
|-------|----------|----------|
| iztro loaded dynamically (import()) | P0 | Not in _app or layout |
| Chart SVG rendered, not canvas | P0 | Minimizes JS payload |
| iztro bundle <100 KB gzipped | P0 | From build analyzer |
| No iztro on static pages | P0 | Only on /lap-la-so/ |

### Image Optimization

| Check | Priority | Expected |
|-------|----------|----------|
| Next.js Image component used | P0 | Or unoptimized for SSG export |
| WebP/AVIF format | P1 | If images present |
| Proper width/height attributes | P0 | Prevents CLS |
| Lazy loading for below-fold | P0 | loading="lazy" |

### Font Loading

| Check | Priority | Expected |
|-------|----------|----------|
| Fonts preloaded | P0 | `<link rel="preload">` |
| font-display: swap | P0 | Prevents FOIT |
| Self-hosted fonts preferred | P1 | Reduces external requests |

---

## Testing Environment

### Local Testing
```bash
# Install lighthouse-ci
npm install -g @lhci/cli

# Run on built output
lhci autorun --config=lighthouserc.json
```

### lighthouserc.json (recommended)
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./out",
      "url": ["/", "/lap-la-so/", "/tuvi/tuoi-ty-1984-nam/"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

### Deployment Testing
- Vercel preview deployments with Lighthouse CI GitHub Action
- PageSpeed Insights API for production URLs

---

## Regression Prevention

| Check | How |
|-------|-----|
| Bundle size monitoring | webpack-bundle-analyzer in build |
| Performance budgets | lighthouserc.json assertions |
| CI gate | Block merge if Lighthouse <90 |
| Weekly audit | Scheduled Lighthouse runs |

---

## Known Challenges from Sprint 1

1. **Headless Chrome limitation** — Lighthouse CI on Vercel or GitHub Actions solves this
2. **iztro bundle size** — Must be lazy-loaded, verify with bundle analyzer
3. **Client-side hydration** — Ensure SSG HTML is complete before hydration

---

*Framework ready. Will expand into full test cases when stories are assigned.*
