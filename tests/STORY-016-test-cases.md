# STORY-016 Test Cases — H1 Optimization: Formula Compliance

**Story ID:** STORY-016
**Priority:** P1
**Sprint:** Sprint 3
**Description:** Validate all H1 headings follow [action] + [keyword] + [benefit/emotional] formula for maximum SEO impact

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | All pages have single H1 | H1-001 — H1-003 |
| AC-002 | H1 follows [action]+[keyword]+[benefit] | H1-004 — H1-008 |
| AC-003 | H1 length 20–70 characters | H1-009 — H1-011 |
| AC-004 | H1 contains primary keyword | H1-012 — H1-014 |
| AC-005 | H1 unique per page | H1-015 — H1-017 |
| AC-006 | H1 visible (not hidden) | H1-018 — H1-020 |

---

## Formula Definition

```
H1 = [Action Verb] + [Primary Keyword] + [Benefit/Emotional Hook]

Examples:
- "Xem Tử Vi Tuổi Tý 2026 — Dự Đoán Chính Xác, Tư Vấn Tận Tâm"
- "Lập Lá Số Tử Vi Miễn Phí — Khám Phá Vận Mệnh Củaa Bạn"
- "Gieo Quẻ Kiển Vì Thiên — Giải Đáp Thắc Mắc, Định Hướng Cuộc Sống"
- "Tìm Hiểu Sao Tử Vi — Ý Nghĩa Và Ứng Dụng Trong Lá Số"
```

---

## Page-Type H1 Formulas

| Page Type | Formula | Example |
|-----------|---------|---------|
| Homepage | [Action] + [Brand/Keyword] + [Benefit] | "Xem Tử Vi Trọn Đời — Hiểu Vận Mệnh, Nắm Tương Lai" |
| Tool (/lap-la-so/) | [Action] + [Tool Name] + [Benefit] | "Lập Lá Số Tử Vi Miễn Phí — Khám Phá Vận Mệnh" |
| Forecast (/tuvi/*) | [Action] + [Tử Vi] + [Animal] + [Year] + [Benefit] | "Xem Tử Vi Tuổi Tý 2026 — Dự Đoán Chính Xác" |
| Que (/que/*) | [Action] + [Que Name] + [Benefit] | "Gieo Quẻ Kiển Vì Thiên — Giải Đáp Thắc Mắc" |
| Star (/sao/*) | [Action] + [Star Name] + [Benefit] | "Tìm Hiểu Sao Tử Vi — Ý Nghĩa Và Ứng Dụng" |

---

## Test Cases

### H1-001: Single H1 Per Page — Homepage
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load homepage | Page renders |
| 2 | Count `<h1>` tags | Exactly 1 |
| 3 | Verify no duplicate H1s | None |

**Pass Criteria:** Exactly one H1 on homepage.

---

### H1-002: Single H1 Per Page — All Other Pages
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /lap-la-so/ | Exactly 1 H1 |
| 2 | Load /tuvi/tuoi-ty-1984-nam/ | Exactly 1 H1 |
| 3 | Load /que/1-kien-vi-thien/ | Exactly 1 H1 |
| 4 | Load /sao/tu-vi/ | Exactly 1 H1 |

**Pass Criteria:** Exactly one H1 on every page type.

---

### H1-003: No H1 in Footer/Header
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect header component | No H1 |
| 2 | Inspect footer component | No H1 |
| 3 | Inspect sidebar (if any) | No H1 |
| 4 | Inspect modals | No H1 |

**Pass Criteria:** H1 only in main content area.

---

### H1-004: Formula Compliance — Homepage
**Type:** SEO
**Priority:** P0

| Component | Required | Example |
|-----------|----------|---------|
| Action | Yes | "Xem", "Khám Phá", "Tìm Hiểu" |
| Keyword | Yes | "Tử Vi", "Bói Toán" |
| Benefit | Yes | "Trọn Đời", "Hiểu Vận Mệnh" |

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract homepage H1 | Text content |
| 2 | Verify action verb | Present at start |
| 3 | Verify keyword | "tử vi" or "bói toán" |
| 4 | Verify benefit | Emotional or practical value |

**Pass Criteria:** H1 = [Action] + [Keyword] + [Benefit].

---

### H1-005: Formula Compliance — Tool Page
**Type:** SEO
**Priority:** P0

| Component | Required | Example |
|-----------|----------|---------|
| Action | Yes | "Lập", "Tạo", "Khám Phá" |
| Keyword | Yes | "Lá Số Tử Vi" |
| Benefit | Yes | "Miễn Phí", "Chính Xác" |

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract /lap-la-so/ H1 | Text content |
| 2 | Verify action verb | Present |
| 3 | Verify keyword | "lá số" or "tử vi" |
| 4 | Verify benefit | Free, accurate, etc. |

**Pass Criteria:** H1 follows tool page formula.

---

### H1-006: Formula Compliance — Forecast Pages
**Type:** SEO
**Priority:** P0

| Component | Required | Example |
|-----------|----------|---------|
| Action | Yes | "Xem", "Đọc", "Khám Phá" |
| Keyword | Yes | "Tử Vi" |
| Specific | Yes | "Tuổi Tý 1984" |
| Benefit | Yes | "Dự Đoán Chính Xác" |

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract forecast H1 | e.g., /tuvi/tuoi-ty-1984-nam/ |
| 2 | Verify action verb | Present |
| 3 | Verify "tử vi" | Present |
| 4 | Verify animal + year | Present |
| 5 | Verify benefit | Emotional/practical value |

**Pass Criteria:** H1 follows forecast formula.

---

### H1-007: Formula Compliance — Que Pages
**Type:** SEO
**Priority:** P0

| Component | Required | Example |
|-----------|----------|---------|
| Action | Yes | "Gieo", "Đọc", "Giải" |
| Keyword | Yes | Quẻ name |
| Benefit | Yes | "Giải Đáp", "Định Hướng" |

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract que H1 | e.g., /que/1-kien-vi-thien/ |
| 2 | Verify action verb | Present |
| 3 | Verify que name | Present |
| 4 | Verify benefit | Present |

**Pass Criteria:** H1 follows que formula.

---

### H1-008: Formula Compliance — Star Pages
**Type:** SEO
**Priority:** P0

| Component | Required | Example |
|-----------|----------|---------|
| Action | Yes | "Tìm Hiểu", "Khám Phá" |
| Keyword | Yes | Star name |
| Benefit | Yes | "Ý Nghĩa", "Ứng Dụng" |

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract star H1 | e.g., /sao/tu-vi/ |
| 2 | Verify action verb | Present |
| 3 | Verify star name | Present |
| 4 | Verify benefit | Present |

**Pass Criteria:** H1 follows star formula.

---

### H1-009: Length Minimum
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract all H1s | Across all page types |
| 2 | Measure length | Character count |
| 3 | Verify minimum | ≥20 characters |

**Pass Criteria:** No H1 shorter than 20 chars.

---

### H1-010: Length Maximum
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract all H1s | Across all page types |
| 2 | Measure length | Character count |
| 3 | Verify maximum | ≤70 characters |

**Pass Criteria:** No H1 longer than 70 chars.

---

### H1-011: Length Distribution
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure all H1s | Character count |
| 2 | Calculate average | Mean length |
| 3 | Verify target range | 40–60 characters |
| 4 | Flag outliers | <30 or >65 |

**Pass Criteria:** Most H1s in optimal range.

---

### H1-012: Primary Keyword — Forecast
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all forecast H1s | /tuvi/* |
| 2 | Verify "tử vi" present | 100% |
| 3 | Verify animal name | 100% |
| 4 | Verify year | 100% |

**Pass Criteria:** All forecast H1s contain primary keywords.

---

### H1-013: Primary Keyword — Tool
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check /lap-la-so/ H1 | Tool page |
| 2 | Verify "lá số" or "tử vi" | Present |
| 3 | Verify action verb | Present |

**Pass Criteria:** Tool H1 contains relevant keywords.

---

### H1-014: Primary Keyword — Que
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all que H1s | /que/* |
| 2 | Verify "quẻ" or "gieo quẻ" | Present |
| 3 | Verify que name | Present |

**Pass Criteria:** All que H1s contain relevant keywords.

---

### H1-015: Uniqueness — No Duplicates
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract all H1s | All pages |
| 2 | Run uniqueness check | Set comparison |
| 3 | Verify zero duplicates | All unique |

**Pass Criteria:** Every page has unique H1.

---

### H1-016: Uniqueness — Cross-Page Differentiation
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Compare Tý Nam 1984 vs Tý Nữ 1984 | Different H1s |
| 2 | Compare Tý Nam 1984 vs Tý Nam 1996 | Different H1s |
| 3 | Compare Tý Nam 1984 vs Sửu Nam 1984 | Different H1s |

**Pass Criteria:** All combinations produce unique H1s.

---

### H1-017: Uniqueness Automation
**Type:** Automation
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `npm run test:h1-uniqueness` | Script executes |
| 2 | Verify all pages scanned | 100% |
| 3 | Verify report | Duplicates listed if any |
| 4 | Verify CI gate | Build fails on duplicate |

**Pass Criteria:** Automated uniqueness gate in CI.

---

### H1-018: Visibility — Not Hidden
**Type:** SEO / Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect H1 element | CSS styles |
| 2 | Verify display | Not `display: none` |
| 3 | Verify visibility | Not `visibility: hidden` |
| 4 | Verify opacity | Not `opacity: 0` |
| 5 | Verify off-screen | Not positioned off-screen |

**Pass Criteria:** H1 visible to users and search engines.

---

### H1-019: Visibility — Screen Reader
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enable screen reader | NVDA/VoiceOver |
| 2 | Navigate to H1 | Announced |
| 3 | Verify aria-hidden | Not present on H1 |

**Pass Criteria:** H1 accessible to assistive tech.

---

### H1-020: Visual Prominence
**Type:** UX / SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load page | Above the fold |
| 2 | Verify font size | Largest on page |
| 3 | Verify weight | Bold or prominent |
| 4 | Verify color | High contrast |

**Pass Criteria:** H1 is visually dominant heading.

---

## Regression Tests

| Test | Description | Priority |
|------|-------------|----------|
| REG-001 | Existing pages H1 still valid | P0 |
| REG-002 | No H1 count regressions | P0 |
| REG-003 | Schema headline alignment | P0 |

---

*Total: 20 test cases*
