# QA Sprint 3 Readiness Report

**Prepared by:** QA (Tester)
**Date:** 2026-05-01
**Status:** Sprint 2 Closed, awaiting Sprint 3 Planning

---

## 1. Lighthouse CI Automation Proposal

### Problem
STORY-010 was blocked mid-sprint due to Vercel auth issues. Lighthouse audits were manual, requiring:
- Local HTTP server setup
- Headless Chrome with complex flags
- Manual score verification
- No regression detection between commits

### Proposal: lighthouse-ci Integration

**Implementation:**
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "staticDistDir": "./out",
      "url": [
        "/",
        "/lap-la-so.html",
        "/tuvi/tuoi-ty-1984-nam.html",
        "/que/1-kien-vi-thien.html"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-byte-weight": ["error", { "maxNumericValue": 500000 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**GitHub Actions Integration:**
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

**Benefits:**
- Automated audit on every PR/push
- Prevents Performance/SEO regressions
- Generates shareable reports
- No manual server setup needed
- Catches issues before deploy

**Estimated Effort:** S (1-2 days setup)
**Owner:** BE (infrastructure) + QA (threshold tuning)

---

## 2. Content Uniqueness Validation Prep for LLM-Generated Content

### Problem
STORY-012a MVP used template-based content (deterministic strings). Sprint 3 introduces LLM-generated content with target 80%+ uniqueness. Current validation pipeline cannot verify uniqueness of prose text.

### Validation Framework Needed

#### A. Automated Uniqueness Checks
```typescript
// tests/utils/uniqueness.ts
export function calculateJaccardSimilarity(textA: string, textB: string, n: number = 3): number {
  const ngramsA = extractNgrams(textA, n);
  const ngramsB = extractNgrams(textB, n);
  const intersection = new Set([...ngramsA].filter(x => ngramsB.has(x)));
  const union = new Set([...ngramsA, ...ngramsB]);
  return intersection.size / union.size;
}

export function validateContentUniqueness(pages: ForecastContent[]): ValidationResult {
  const similarities: number[] = [];
  
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const textA = pages[i].sections.map(s => s.content).join(' ');
      const textB = pages[j].sections.map(s => s.content).join(' ');
      const similarity = calculateJaccardSimilarity(textA, textB);
      similarities.push(similarity);
    }
  }
  
  const maxSimilarity = Math.max(...similarities);
  const avgSimilarity = similarities.reduce((a, b) => a + b, 0) / similarities.length;
  
  return {
    pass: maxSimilarity < 0.2, // 80% uniqueness = 20% max similarity
    maxSimilarity,
    avgSimilarity,
    totalComparisons: similarities.length
  };
}
```

#### B. Template Detection
```typescript
// Flag template phrases reused across pages
const TEMPLATE_PATTERNS = [
  /Nội dung chỉ mang tính chất tham khảo/g,
  /không phải lờii tiên đoán/g,
  /Hãy luôn nhớ rằng/g
];

export function detectTemplateUsage(content: string): number {
  let templateWords = 0;
  TEMPLATE_PATTERNS.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) templateWords += matches[0].split(/\s+/).length;
  });
  return templateWords / content.split(/\s+/).length;
}
```

#### C. Star Diversity Check
```typescript
// Ensure each page references different star combinations
export function validateStarDiversity(pages: ForecastContent[]): boolean {
  const starSets = pages.map(page => {
    const text = page.sections.map(s => s.content).join(' ');
    // Extract star names using regex
    const starMatches = text.match(/Sao [A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÉÈẺẼẸÊỀẾỆỂỄÍÌỈĨỊÓÒỎÕỌÔỒỐỘỔỖƠỜỚỢỞỠÚÙỦŨỤƯỪỨỰỬỮÝỲỶỸỴĐ][a-zàáạảãâầấậẩẫăằắặẳẵéèẻẽẹêềếệểễíìỉĩịóòỏõọôồốộổỗơờớợởỡúùủũụưừứựửữýỳỷỹỵđ]+/g) || [];
    return new Set(starMatches);
  });
  
  // 80% of pages should have unique star combinations
  const uniqueSets = new Set(starSets.map(s => [...s].sort().join(',')));
  return uniqueSets.size / starSets.length >= 0.8;
}
```

#### D. Manual Review Sampling
| Sample Size | Method | Purpose |
|-------------|--------|---------|
| 5 pages | Full read | Tone, Art.320, domain rules |
| 15 pages | Spot check | Word count, schema, slugs |
| All pages | Automated | Uniqueness, template detection |

**Ready for Sprint 3:** Framework code written, needs integration into pipeline.

---

## 3. iztro UI Re-Validation Approach for Sprint 3

### Context
STORY-011 was ACCEPTED with UI deferred to Sprint 3. Current state:
- ✅ iztro installed as dependency
- ✅ Form-to-iztro mapper working
- ✅ Schema markup present
- ❌ No actual chart rendering (placeholder only)
- ❌ No 3 insights from real iztro data
- ❌ No dynamic import wrapper

### Sprint 3 Re-Validation Scope

#### Phase 1: Infrastructure (Day 1-2)
| Test | What | Expected |
|------|------|----------|
| IZT-R01 | `next/dynamic` wrapper | `ssr: false`, loading skeleton |
| IZT-R02 | iztro lazy-loaded | Chunk <100 KB, not in initial bundle |
| IZT-R03 | `iztro.bySolar()` call | Returns astrolabe JSON |
| IZT-R04 | Error boundaries | Graceful failure for invalid inputs |

#### Phase 2: Chart Rendering (Day 3-5)
| Test | What | Expected |
|------|------|----------|
| IZT-R05 | 12-palace grid | SVG renders 12 cung |
| IZT-R06 | Major stars | 14 sao chính with brightness |
| IZT-R07 | Palace names | Mệnh, Phụ Mẫu, etc. |
| IZT-R08 | Tứ Hóa | Hóa Lộc, Quyền, Khoa, Kỵ positioned |
| IZT-R09 | Mobile responsive | Readable at 375px |
| IZT-R10 | Render time | <1s on mid-tier mobile |

#### Phase 3: Insights (Day 5-7)
| Test | What | Expected |
|------|------|----------|
| IZT-R11 | Mệnh Cung Verdict | Primary star + brightness + transformation |
| IZT-R12 | Life Area Teaser | Rotating palace, 2 sentences |
| IZT-R13 | Lucky Element | Ngũ Hành analysis |
| IZT-R14 | Data accuracy | All insights from actual iztro JSON |
| IZT-R15 | No Western astrology | Zero forbidden terms |

#### Phase 4: Performance (Day 7-8)
| Test | What | Expected |
|------|------|----------|
| IZT-R16 | Lighthouse | ≥90 all categories |
| IZT-R17 | Bundle budget | Initial <150 KB, iztro <100 KB |
| IZT-R18 | Memory | No leaks on repeated generation |

**Total: 18 re-validation test cases for Sprint 3**

---

## 4. Sprint 3 Readiness Items to Flag

### Critical (Block Sprint Start if Not Resolved)

| # | Item | Risk | Mitigation | Owner |
|---|------|------|-----------|-------|
| 1 | **Vercel credentials** | Deploy blocked again | GitHub Pages backup confirmed working | BE |
| 2 | **LLM API access** | Content pipeline blocked | Ollama local or API key ready | BE |
| 3 | **iztro browser compatibility** | Chart may not render | Test on target browsers | FE |

### High (Impact Sprint Velocity)

| # | Item | Risk | Mitigation | Owner |
|---|------|------|-----------|-------|
| 4 | **Supabase real connection** | Mock data limits testing | Set up dev project | BE |
| 5 | **Lighthouse CI setup** | Manual audits slow validation | Implement lighthouserc.json | BE/QA |
| 6 | **Content uniqueness tool** | Cannot verify 80% target | Integrate into pipeline | QA |
| 7 | **iztro SVG renderer** | Custom renderer complex | Evaluate react-iztro first | FE |

### Medium (Nice to Have)

| # | Item | Risk | Mitigation | Owner |
|---|------|------|-----------|-------|
| 8 | **Image assets** | No images in MVP | Source lotus/dragon abstract symbols | PO |
| 9 | **PDF generation** | Paid CTA promises PDF | Evaluate jsPDF or server-side | BE |
| 10 | **Multi-year forecasts** | Only 2026 in MVP | Extend pipeline to 2025-2027 | BE |

### QA-Specific Readiness

| Checklist Item | Status |
|----------------|--------|
| Test cases for iztro UI (18 cases) | ✅ Ready |
| Test cases for LLM content (12 cases) | ✅ Ready |
| Lighthouse CI config draft | ✅ Ready |
| Uniqueness validation script | ✅ Ready |
| Domain constraint filters (Art.320, Western astrology) | ✅ Ready |
| Mobile responsive checklists | ✅ Ready |
| Performance budget thresholds | ✅ Ready |

---

## Summary

**QA is FULLY READY for Sprint 3.**

All validation frameworks prepared:
- 18 iztro UI re-validation cases
- 12 LLM content validation cases  
- Lighthouse CI automation proposal
- Content uniqueness validation scripts
- Domain constraint compliance checks

**Recommendations for Sprint 3 Planning:**
1. Resolve Vercel credentials OR confirm GitHub Pages as primary deploy
2. Confirm LLM provider (Ollama local vs API)
3. FE to evaluate react-iztro before committing to custom SVG renderer
4. BE to set up real Supabase dev project for integration testing

---

*Report prepared by QA. Standing by for Sprint 3 Planning.*
