# QA Checklist - Sprint 1

**Sprint Goal:** Establish Next.js 15 SSG foundation for Tu Vi SEO pages
**Sprint Dates:** 2026-05-01 to 2026-05-15
**QA Owner:** QA (Tester)
**Last Updated:** 2026-05-01

---

## Sprint 1 Stories

| Story | Priority | Status | Test Cases File |
|-------|----------|--------|-----------------|
| STORY-001 | P0 | Ready for Test | tests/STORY-001-test-cases.md |
| STORY-002-shell | P0 | Ready for Test | tests/STORY-002-shell-test-cases.md |

---

## SEO Validation Checklist

### Schema Markup

| Requirement | STORY-001 | STORY-002-shell | How to Verify |
|-------------|-----------|-----------------|---------------|
| FAQPage schema present and valid | N/A | Required | View page source, validate JSON-LD |
| HowTo schema present and valid | N/A | Required | View page source, validate JSON-LD |
| BreadcrumbList schema present | Required | N/A | View page source, validate JSON-LD |
| Article schema present | Required | N/A | View page source, validate JSON-LD |
| Service schema present | N/A | Required | View page source, validate JSON-LD |
| All schemas include inLanguage vi | Required | Required | Check JSON-LD for inLanguage field |
| Schema validates in Google Rich Results Test | Required | Required | Run URL through test tool |

### Meta Tags

| Requirement | STORY-001 | STORY-002-shell | How to Verify |
|-------------|-----------|-----------------|---------------|
| Title: 50-60 characters | Required | Required | Count characters |
| Description: 150-160 characters | Required | Required | Count characters |
| Open Graph tags present | Required | Required | Check og: meta tags |
| Twitter Card tags present | Required | Required | Check twitter: meta tags |
| Canonical URL correct | Required | Required | Check link rel=canonical |
| metadataBase configured | Required | Required | Check layout.tsx |

### Vietnamese Slugs

| Requirement | STORY-001 | STORY-002-shell | How to Verify |
|-------------|-----------|-----------------|---------------|
| Diacritics stripped | Required | N/A | Test slug generation function |
| Lowercase | Required | N/A | Verify output |
| Hyphens (not underscores) | Required | N/A | Verify output |
| URL-safe characters only | Required | N/A | Regex validation |
| Max 100 chars | Required | N/A | Length check |

### Sitemaps

| Requirement | STORY-001 | STORY-002-shell | How to Verify |
|-------------|-----------|-----------------|---------------|
| Segmented sitemaps (tuvi.xml, etc.) | Required | N/A | Access /sitemap.xml |
| Max 10K URLs per sitemap | Required | N/A | Count URLs |
| All pages included | Required | N/A | Cross-reference with routes |
| Last modified dates correct | Required | N/A | Check lastmod format |

---

## Content Quality Checklist

| Requirement | STORY-001 | STORY-002-shell | How to Verify |
|-------------|-----------|-----------------|---------------|
| Art. 320 disclaimer present | N/A | Required | Check FAQ and CTA sections |
| Tham khao framing (not tien doan) | N/A | Required | Read FAQ content |
| No deity/sacred figure images | N/A | Required | Visual inspection |
| Abstract symbols only | N/A | Required | Visual inspection |
| FAQ content in Vietnamese | N/A | Required | Read content |
| 5-7 FAQ items | N/A | Required | Count items |

---

## E-E-A-T Compliance Checklist

| Pillar | Requirement | STORY-002-shell | How to Verify |
|--------|-------------|-----------------|---------------|
| Experience | Real user scenarios described | Check | FAQ answers describe real use |
| Expertise | Specific Tu Vi terminology used | Check | Terms like cung, sao, han present |
| Authoritativeness | Clear source of knowledge | Check | Classical references cited |
| Trustworthiness | Clear disclaimer | Check | Tham khao disclaimer visible |
| Trustworthiness | Transparent about AI usage | Check | Disclaimer mentions AI if applicable |
| Trustworthiness | No false promises | Check | No guaranteed outcomes stated |

---

## Performance Testing Checklist

### Core Web Vitals

| Metric | Threshold | STORY-001 | STORY-002-shell | How to Measure |
|--------|-----------|-----------|-----------------|---------------|
| LCP | < 2.5s | Required | Required | Lighthouse or Web Vitals extension |
| CLS | < 0.1 | Required | Required | Lighthouse or Web Vitals extension |
| INP | < 200ms | Required | Required | Lighthouse or Web Vitals extension |

### Lighthouse Scores

| Metric | Threshold | STORY-001 | STORY-002-shell | How to Measure |
|--------|-----------|-----------|-----------------|---------------|
| Mobile score | >= 90 | Required | Required | Lighthouse CI or PageSpeed Insights |
| Performance | >= 90 | Required | Required | Lighthouse CI or PageSpeed Insights |
| Accessibility | >= 90 | Required | Required | Lighthouse CI or PageSpeed Insights |
| Best Practices | >= 90 | Required | Required | Lighthouse CI or PageSpeed Insights |
| SEO | >= 90 | Required | Required | Lighthouse CI or PageSpeed Insights |

### Bundle Size

| Page Type | Threshold | How to Measure |
|-----------|-----------|---------------|
| Static pages | < 150 KB | webpack-bundle-analyzer |
| /lap-la-so/ | < 200 KB | webpack-bundle-analyzer |

---

## Functional Testing Checklist

### STORY-001

| Test Area | Cases | Priority |
|-----------|-------|----------|
| App Router structure | 2 | P0 |
| SSG generation | 3 | P0 |
| ISR configuration | 2 | P0 |
| Vietnamese slug generation | 3 | P0 |
| Schema components | 2 | P0 |
| Sitemap generation | 2 | P0 |
| Supabase schema | 1 | P0 |
| Metadata configuration | 2 | P0 |
| Vercel deployment | 2 | P0 |
| Lighthouse scores | 2 | P0 |
| Error handling | 2 | P0 |
| Accessibility | 1 | P0 |
| Performance | 1 | P1 |

**Total: 27 test cases**

### STORY-002-shell

| Test Area | Cases | Priority |
|-----------|-------|----------|
| Route and layout | 2 | P0 |
| Form UI and validation | 4 | P0 |
| Placeholders (chart, insights) | 2 | P0 |
| CTA section | 1 | P0 |
| FAQ section | 2 | P0 |
| Schema markup | 2 | P0 |
| Mobile responsive | 2 | P0 |
| Lighthouse score | 1 | P0 |
| Out of scope verification | 1 | P0 |
| Accessibility | 1 | P0 |
| Bundle size | 1 | P1 |
| Static crawlability | 1 | P0 |

**Total: 20 test cases**

---

## Testing Tools Required

| Tool | Purpose |
|------|---------|
| Lighthouse CI | Performance and SEO scores |
| Google Rich Results Test | Schema validation |
| PageSpeed Insights | Core Web Vitals |
| Chrome DevTools | Responsive testing, bundle analysis |
| axe DevTools | Accessibility testing |
| curl / wget | robots.txt, sitemap validation |

---

## Definition of Done for QA

A story passes QA when:

- [ ] All P0 test cases pass
- [ ] SEO validation checklist complete (schema, meta, slugs, sitemap)
- [ ] Content quality checklist complete (disclaimer, tone, compliance)
- [ ] E-E-A-T compliance verified
- [ ] Lighthouse mobile score >= 90
- [ ] Core Web Vitals thresholds met
- [ ] Accessibility requirements met
- [ ] No critical or high-severity issues open
- [ ] Test results documented in test case files
- [ ] SM notified of completion

---

## Issue Severity Levels

| Severity | Definition | Example |
|----------|-----------|---------|
| Critical | Blocks release, no workaround | Build fails, Lighthouse < 70 |
| High | Major functionality broken | Schema invalid, form submission fails |
| Medium | Feature works with issues | Minor layout shift, typo in meta |
| Low | Cosmetic or minor | Spacing inconsistency, non-blocking warning |

---

## Reporting Template

```
QA -> SM [HH:mm]: STORY-XXX testing complete.

Results:
- Passed: X / Y test cases
- Failed: Z test cases
- Severity: [Critical/High/Medium/Low]

Issues:
1. [Issue description] - [Severity]
2. [Issue description] - [Severity]

Recommendations:
- [Any recommendations]

Status: [PASS / PASS WITH NOTES / FAIL]
```

---

*QA Checklist v1.0 - Sprint 1*
*Ready for testing execution*
