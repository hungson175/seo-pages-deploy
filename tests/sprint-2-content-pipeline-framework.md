# Sprint 2 QA Framework — Birth-Year Forecast Content Pipeline

**Sprint:** Sprint 2
**Scope:** STORY-003 (Birth-Year Forecast Template + Content Generation)
**Prepared by:** QA
**Date:** 2026-05-01

---

## Overview

Validate the content generation pipeline for ~144 birth-year forecast pages (12 animals × ~6 years × 2 genders). Content is generated from iztro JSON data via LLM, producing 1,200–1,500 word unique pages.

---

## Content Quality Requirements (from Spec)

| Requirement | Threshold | How to Verify |
|-------------|-----------|---------------|
| Word count | 1,200–1,500 words per page | Automated count |
| Uniqueness | 80%+ per page | Cross-comparison script |
| Tone | "Thầy bói nói chuyện" | Manual sample review |
| Language | Vietnamese | Spell check + grammar |
| Art 320 compliance | "Tham khảo" not "tiên đoán" | Regex + manual |
| Specific stars cited | Not vague predictions | NLP extraction |

---

## Pipeline Validation

### Pipeline Flow

```
iztro JSON (chart data)
    ↓
LLM prompt (structured sections)
    ↓
Generated content (per page)
    ↓
Supabase storage (pages table)
    ↓
SSG render (Next.js generateStaticParams)
```

### PIPE-001: iztro JSON Input Validation
**Priority:** P0

| Field | Required | Type |
|-------|----------|------|
| animal | Yes | string (12 zodiac) |
| year | Yes | number (active years) |
| gender | Yes | "nam" or "nu" |
| major_stars | Yes | array[{name, palace, brightness}] |
| minor_stars | Yes | array[{name, palace}] |
| life_palace | Yes | string |
| body_palace | Yes | string |
| elements | Yes | object |

**Pass Criteria:** All fields present, valid values.

---

### PIPE-002: LLM Prompt Structure
**Priority:** P0

| Section | Required | Expected Content |
|---------|----------|------------------|
| Tong quan | Yes | General forecast based on major stars |
| Su nghiep | Yes | Career guidance, specific stars |
| Tai loc | Yes | Wealth forecast, specific palaces |
| Tinh duyen | Yes | Love/relationship, specific stars |
| Suc khoe | Yes | Health warnings/advice |
| Khuyen ngo | Yes | Actionable advice, never deterministic |

**Pass Criteria:** All 6 sections present in generated content.

---

### PIPE-003: Content Uniqueness Validation
**Priority:** P0

| Method | Tool/Approach |
|--------|---------------|
| Cross-page comparison | Jaccard similarity on n-grams |
| Template detection | Regex for repeated phrases |
| Star diversity | Count unique star mentions per page |
| Palace diversity | Count unique palace references |

**Thresholds:**
- Jaccard similarity between any two pages: <20%
- Repeated template phrases: <5% of content
- Unique star combinations: ≥80% of pages

---

### PIPE-004: Tone Validation
**Priority:** P0

| Criterion | Check | Example PASS | Example FAIL |
|-----------|-------|--------------|--------------|
| Conversational | "Bạn" usage | "Bạn sẽ gặp..." | "Ngườii này sẽ..." |
| Advisory | Suggestions, not commands | "Nên cân nhắc..." | "Phải làm..." |
| Non-deterministic | Uncertainty markers | "có thể", "nên" | "sẽ chắc chắn", "nhất định" |
| Specific | Star names cited | "Sao Tử Vi ở cung Mệnh" | "Các sao tốt" |
| Cultural | Classical references | "Theo cổ thư..." | Generic advice |

---

### PIPE-005: Art 320 Compliance
**Priority:** P0

| Check | Required |
|-------|----------|
| "tham khảo" in content | At least 2 times |
| "tiên đoán" NOT in content | Zero occurrences |
| Disclaimer paragraph | Present at end |
| No guaranteed outcomes | No "chắc chắn", "nhất định", "tuyệt đối" |
| No medical claims | Health advice = general only |

---

### PIPE-006: Star Specificity Validation
**Priority:** P0

| Check | Expected |
|-------|----------|
| Major stars named | Tử Vi, Thiên Cơ, Thái Dương, etc. |
| Palace locations | "ở cung Mệnh", "tại cung Tài Bạch" |
| Brightness mentioned | "đắc địa", "hãm địa", "miếu vượng" |
| Combinations | "Tử Vi + Thiên Phủ" |
| Minor stars | Văn Xương, Văn Khúc, etc. |

---

## SEO Validation for Forecast Pages

### SEO-001: Schema Markup
**Priority:** P0

| Schema | Required | Content |
|--------|----------|---------|
| Article | Yes | Headline = page title, author = Bói Toán |
| FAQPage | Yes | 3-5 Q&A pairs |
| BreadcrumbList | Yes | Home > Tử Vi > [Animal] [Year] [Gender] |
| inLanguage | All | "vi" |

### SEO-002: Meta Tags
**Priority:** P0

| Tag | Template | Example |
|-----|----------|---------|
| Title | Tử Vi [Animal] [Year] [Gender] - Xem Chi Tiết | "Tử Vi Tuổi Tý 2026 Nam - Xem Chi Tiết" |
| Description | Luận giải tử vi [Animal] [Year] [Gender]. [Keywords]. | "Luận giải tử vi tuổi Tý 2026 nam mạng. Xem vận mệnh, công danh, tài lộc, tình duyên chi tiết." |
| Canonical | /tuvi/tuoi-[animal]-[year]-[gender]/ | /tuvi/tuoi-ty-2026-nam/ |

**Thresholds:**
- Title: 50–60 characters
- Description: 150–160 characters

### SEO-003: Content Structure
**Priority:** P0

| Element | Required |
|---------|----------|
| H1 | "Tử Vi [Animal] [Year] [Gender]" |
| H2 sections | ≥5 semantic headings |
| Paragraphs | Between H2s |
| Internal links | To /lap-la-so/, related forecasts |
| FAQ section | 3-5 questions |

---

## E-E-A-T Compliance

### Experience
| Check | Expected |
|-------|----------|
| Real scenarios | "Khi bạn đi làm...", "Trong các mối quan hệ..." |
| Practical advice | Specific actions, not generic |
| Seasonal references | Tết, mid-year, year-end |

### Expertise
| Check | Expected |
|-------|----------|
| Terminology | Cung, sao, hạn, vận, đại hạn |
| Classical references | "Theo Tử Vi Đẩu Số..." |
| Palace system | 12 cung referenced correctly |

### Authoritativeness
| Check | Expected |
|-------|----------|
| Author bio | "Chuyên gia phong thủy..." (if present) |
| Citations | Classical texts referenced |
| Internal links | To star guide pages |

### Trustworthiness
| Check | Expected |
|-------|----------|
| Disclaimer | Clear, visible |
| AI transparency | "Nội dung được tạo bởi AI..." (if applicable) |
| No false promises | No guaranteed wealth/love |

---

## Sample Validation Script

```typescript
// Pseudocode for automated content validation
function validateForecastPage(content: string, iztroData: object): ValidationResult {
  return {
    wordCount: countWords(content), // 1200-1500
    sections: checkSections(content, ['Tổng quan', 'Sự nghiệp', 'Tài lộc', 'Tình duyên', 'Sức khỏe']),
    art320: checkArt320(content), // tham khảo present, tiên đoán absent
    starSpecificity: extractStarMentions(content, iztroData), // ≥10 unique stars
    tone: checkTone(content), // advisory, non-deterministic
    uniqueness: compareWithOtherPages(content), // <20% similarity
    meta: checkMetaTags(content), // title 50-60, desc 150-160
    schema: validateJsonLd(content), // Article + FAQPage + BreadcrumbList
  }
}
```

---

## Manual Review Sampling

| Sample Size | Method |
|-------------|--------|
| 10 pages | Full manual review (all criteria) |
| 30 pages | Spot check (word count, Art 320, schema) |
| 144 pages | Automated validation (all criteria) |

---

## Content Generation Pipeline Tests

### GEN-001: Build-Time Generation
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `next build` | All 144 pages generated |
| 2 | Check build time | <10 minutes |
| 3 | Verify HTML output | Content visible in static HTML |
| 4 | Check no client-side rendering | No empty shells |

### GEN-002: ISR Revalidation
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Trigger revalidation | Page regenerates |
| 2 | Content updated | New content served |
| 3 | Cache invalidated | Old content purged |

---

*Framework ready. Will calibrate with actual LLM output when pipeline is built.*
