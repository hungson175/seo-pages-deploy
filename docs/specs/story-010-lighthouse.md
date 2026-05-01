# STORY-010: Lighthouse ≥90 Mobile Optimization

**Status:** FINAL — Sprint 2 P0

## Overview

Deploy the Sprint 1 build to Vercel and optimize until Lighthouse mobile score ≥ 90. This is the Sprint 2 P0 gate — all subsequent work must maintain this threshold.

## Architecture

### Deployment Strategy

- Target: Vercel production or preview deployment
- Output: `dist/` (static export from `next.config.ts`)
- Domain: `https://boitoan.vn` (production) or Vercel preview URL

### Measurement Baseline

Current proxy indicators from Sprint 1:
- First Load JS: 106–108 KB (static pages), 108 KB (`/lap-la-so/`)
- Build: 129 static pages, zero JS hydration on static routes
- No third-party scripts
- Only one client component (`/lap-la-so/`)

These indicators suggest Performance score 95–100, but **actual measurement is required**.

### Optimization Levers

| Category | Current State | Optimization |
|----------|---------------|--------------|
| Bundle size | 106–108 KB | Already under budget; monitor iztro addition |
| Fonts | Inter from Google Fonts | Subset for Vietnamese; use `font-display: swap` |
| Images | None currently | When added: WebP/AVIF, lazy-load, explicit dimensions |
| CSS | Tailwind purged | Ensure no unused styles bloat |
| HTML | Semantic, lang="vi" | Already optimal |

## Acceptance Criteria

- [ ] Deployed to Vercel (production or preview)
- [ ] Lighthouse mobile Performance ≥ 90
- [ ] Lighthouse mobile Accessibility ≥ 90
- [ ] Lighthouse mobile Best Practices ≥ 90
- [ ] Lighthouse mobile SEO ≥ 90
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1
- [ ] Build passes with `output: 'export'`
- [ ] All existing tests still pass

## Technical Constraints

- **No SSR for measurement**: Static export only; ISR measurement deferred to Sprint 3
- **Budget preservation**: `/lap-la-so/` must stay < 200 KB First Load JS after iztro integration
- **Accessibility**: Vietnamese screen-reader friendly, proper heading hierarchy, ARIA labels on form
- **SEO**: Canonical URLs, proper meta tags, schema markup validates in Rich Results Test

## BE / FE Work Split

| Task | Owner | Deliverable |
|------|-------|-------------|
| Vercel deploy | BE | Project linked, env vars set, build succeeds |
| Lighthouse audit | FE | Run audit, document scores, flag issues |
| Performance fixes | FE | Implement optimizations (fonts, images, bundle) |
| Accessibility fixes | FE | ARIA, contrast, heading hierarchy |
| Regression test | QA | Confirm no score drop after fixes |

## Success Metrics

| Metric | Threshold | Measurement Tool |
|--------|-----------|------------------|
| Performance | ≥ 90 | Lighthouse CI or PageSpeed Insights |
| Accessibility | ≥ 90 | Lighthouse |
| Best Practices | ≥ 90 | Lighthouse |
| SEO | ≥ 90 | Lighthouse |
| LCP | < 2.5s | Lighthouse / Web Vitals |
| CLS | < 0.1 | Lighthouse / Web Vitals |

## Fallback Plan

If Lighthouse < 90 after initial deploy:
1. Identify lowest-scoring category
2. Apply quick wins (font optimization, image compression, defer non-critical JS)
3. Re-measure
4. If still < 90, escalate to TL for architecture review

---

*Spec length: ~90 lines. Ready for FE TDD.*
