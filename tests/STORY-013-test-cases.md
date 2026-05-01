# STORY-013 Test Cases — Gieo Quẻ 64-Quẻ Pages Scaffold

**Story ID:** STORY-013
**Priority:** P2 (Stretch)
**Sprint:** Sprint 2
**Description:** Scaffold template for 64 Gieo Quẻ Kinh Dịch pages with 6 sections, schema markup, and placeholder content

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | /que/[slug]/ route with generateStaticParams | QUE-001 — QUE-003 |
| AC-002 | Allow-list for 64 quẻ slugs | QUE-004 — QUE-006 |
| AC-003 | Page template with 6 sections | QUE-007 — QUE-012 |
| AC-004 | Schema markup (Article + FAQPage + BreadcrumbList) | QUE-013 — QUE-015 |
| AC-005 | 6–12 static pages generated (subset) | QUE-016 — QUE-017 |
| AC-006 | Vietnamese slugs | QUE-018 — QUE-019 |
| AC-007 | Mobile responsive | QUE-020 — QUE-021 |
| AC-008 | Art. 320 disclaimer | QUE-022 |
| AC-009 | Build time <10s for 64 pages | QUE-023 |
| AC-010 | Internal linking (Biến Quẻ) | QUE-024 |

---

## Test Cases

### QUE-001: Route Structure
**Type:** Structural
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify `app/que/[slug]/page.tsx` exists | File present |
| 2 | Verify dynamic route pattern | `/que/{id}-{name-vn}/` |
| 3 | Check `generateStaticParams` | Function exported |

**Pass Criteria:** Route structure correct.

---

### QUE-002: Static Page Generation
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `next build` | Success |
| 2 | Check output directory | `.html` files in `/out/que/` |
| 3 | Verify pre-rendered content | HTML contains content |

**Pass Criteria:** Pages generated as static HTML.

---

### QUE-003: 404 for Invalid Slugs
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate to `/que/invalid-slug/` | Returns 404 |
| 2 | Verify 404 page | Vietnamese error message |

**Pass Criteria:** Invalid slugs return 404.

---

### QUE-004: Allow-List Completeness
**Type:** Functional
**Priority:** P0

| Check | Expected |
|-------|----------|
| Total slugs | 64 |
| ID range | 1–64 |
| Name format | Vietnamese, diacritics stripped |
| Examples | `1-kien-vi-thien`, `2-khon-vi-dia` |

---

### QUE-005: Allow-List Validation
**Type:** Functional
**Priority:** P0

| Input | Expected |
|-------|----------|
| `1-kien-vi-thien` | Valid |
| `64-xxx` | Valid (if in list) |
| `65-xxx` | Invalid (out of range) |
| `kien-vi-thien` | Invalid (no ID) |
| `1_kien_vi_thien` | Invalid (underscores) |

---

### QUE-006: Allow-List Uniqueness
**Type:** Functional
**Priority:** P0

| Check | Expected |
|-------|----------|
| No duplicate slugs | All 64 unique |
| No duplicate IDs | 1–64 each once |

---

### QUE-007: Section 1 — Hero (Quẻ Name + Number + Trigram)
**Type:** Content / UI
**Priority:** P0

| Check | Expected |
|-------|----------|
| Quẻ number | Displayed (e.g., "Quẻ 1") |
| Quẻ name | Vietnamese name |
| Trigram symbols | Two trigram symbols (e.g., ☰ ☰) |
| Visual styling | Consistent with design system |

---

### QUE-008: Section 2 — Ý Nghĩa Quẻ (Core Meaning)
**Type:** Content
**Priority:** P0

| Check | Expected |
|-------|----------|
| Core meaning | 2-3 paragraphs |
| Philosophy | Classical interpretation |
| Vietnamese | All text in Vietnamese |

---

### QUE-009: Section 3 — Lục Hào Interpretation
**Type:** Content
**Priority:** P0

| Check | Expected |
|-------|----------|
| Six lines | All 6 hào listed |
| Line meanings | Each with interpretation |
| Visual | Line diagram (yin/yang) |
| Order | From bottom to top (traditional) |

---

### QUE-010: Section 4 — Ứng Dụng (Applications)
**Type:** Content
**Priority:** P0

| Check | Expected |
|-------|----------|
| Career section | Specific advice |
| Love section | Specific advice |
| Finance section | Specific advice |
| Art 320 | "tham khảo" framing |

---

### QUE-011: Section 5 — Biến Quẻ (Related Hexagrams)
**Type:** Content / Navigation
**Priority:** P0

| Check | Expected |
|-------|----------|
| Related quẻ | Links to changing hexagrams |
| Internal links | `/que/{id}-{name}/` format |
| Context | Explanation of relationship |

---

### QUE-012: Section 6 — FAQ + CTA
**Type:** Content / UI
**Priority:** P0

| Check | Expected |
|-------|----------|
| FAQ items | 3–5 accordion items |
| CTA | Link to Gieo Quẻ tool |
| Art 320 disclaimer | Present |

---

### QUE-013: Article Schema
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| `@type: "Article"` | Present |
| Headline | Quẻ name + number |
| Description | Core meaning summary |
| inLanguage | "vi" |

---

### QUE-014: FAQPage Schema
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| `@type: "FAQPage"` | Present |
| mainEntity | 3-5 Q&A pairs |
| inLanguage | "vi" |

---

### QUE-015: BreadcrumbList Schema
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| `@type: "BreadcrumbList"` | Present |
| Items | Trang chủ, Quẻ, [Quẻ name] |
| inLanguage | "vi" |

---

### QUE-016: Subset Page Generation (6–12 pages)
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Build project | Success |
| 2 | Count generated quẻ pages | 6–12 pages |
| 3 | Verify content | Placeholder text with correct structure |

**Pass Criteria:** 6–12 pages generated with placeholder content.

---

### QUE-017: Placeholder Content Quality
**Type:** Content
**Priority:** P0

| Check | Expected |
|-------|----------|
| Structure | All 6 sections present |
| Quẻ-specific | Placeholder mentions quẻ name |
| Vietnamese | All text in Vietnamese |
| Art 320 | Disclaimer present |

---

### QUE-018: Vietnamese Slugs
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| Diacritics stripped | Yes |
| Lowercase | Yes |
| Hyphens | Yes |
| Format | `{id}-{name-vn}` |
| Example | `1-kien-vi-thien` |

---

### QUE-019: URL Pattern Validation
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| Regex match | `/^\d+-[a-z-]+$/` |
| No special chars | Yes |
| Max length | ≤100 chars |

---

### QUE-020: Mobile Responsive (375px)
**Type:** UI / Responsive
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Open at 375px | No horizontal scroll |
| 2 | Verify sections | Stack vertically |
| 3 | Verify trigram symbols | Readable |
| 4 | Verify FAQ accordion | Usable |

**Pass Criteria:** Fully usable at 375px.

---

### QUE-021: Tablet Responsive (768px)
**Type:** UI / Responsive
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Open at 768px | Layout adapts |
| 2 | Verify spacing | Adequate |

**Pass Criteria:** Fully usable at 768px.

---

### QUE-022: Art. 320 Disclaimer
**Type:** Compliance
**Priority:** P0

| Check | Expected |
|-------|----------|
| "tham khảo" | Present |
| "tiên đoán" | Absent |
| Visible | On every page |

---

### QUE-023: Build Time
**Type:** Performance
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `next build` | Measure time |
| 2 | Record | <10s additional for 64 pages |

**Pass Criteria:** <10s additional build time.

---

### QUE-024: Internal Linking — Biến Quẻ
**Type:** SEO / Navigation
**Priority:** P1

| Check | Expected |
|-------|----------|
| Related quẻ links | Present in Biến Quẻ section |
| Valid URLs | All links resolve to existing pages |
| No broken links | 404 check |

---

### QUE-025: Meta Tags
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| Title | 50-60 chars, includes quẻ name |
| Description | 150-160 chars |
| OG tags | Present |
| Twitter tags | Present |
| Canonical | Correct |

---

### QUE-026: Accessibility
**Type:** Accessibility
**Priority:** P0

| Check | Expected |
|-------|----------|
| lang="vi" | Present |
| Heading hierarchy | H1 → H2 → H3 |
| FAQ accordion | Keyboard navigable |
| Focus indicators | Visible |

---

*Test cases: 26*
*Estimated execution: 3-4 hours*
