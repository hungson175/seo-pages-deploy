# Sprint 2 QA Framework — iztro Chart Rendering Validation

**Sprint:** Sprint 2
**Scope:** STORY-002-full (iztro integration into /lap-la-so/)
**Prepared by:** QA
**Date:** 2026-05-01

---

## Overview

Validate iztro library integration for interactive lá số tử vi chart generation on `/lap-la-so/`. This is a client-side only feature — must not impact SSG/static page performance.

---

## Acceptance Criteria Mapping (from PRODUCT_BACKLOG)

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | User inputs: name, birth date, birth time, gender | IZT-001 — IZT-003 |
| AC-002 | iztro integration for chart generation | IZT-004 — IZT-008 |
| AC-003 | SVG chart display | IZT-009 — IZT-012 |
| AC-004 | 3 free insights preview | IZT-013 — IZT-016 |
| AC-005 | CTA for paid deep reading | IZT-017 |
| AC-006 | FAQPage schema markup | IZT-018 |
| AC-007 | Mobile responsive | IZT-019 — IZT-020 |

---

## Functional Test Cases

### IZT-001: Form Submission Triggers Chart Generation
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Fill form with valid data | All fields accept input |
| 2 | Click "Xem Lá Số" | Form validates, no errors |
| 3 | Verify network request | No API call (client-side iztro) |
| 4 | Verify chart renders | SVG chart visible within 3 seconds |

**Pass Criteria:** Chart renders after valid form submission.

---

### IZT-002: Form Validation — Invalid Data
**Priority:** P0

| Input | Expected Error |
|-------|----------------|
| Empty birth_date | "Vui lòng chọn ngày sinh" |
| Empty birth_time | "Vui lòng chọn giờ sinh" |
| Empty gender | "Vui lòng chọn giới tính" |
| Date before 1900 | "Ngày sinh không hợp lệ" |
| Future date | "Ngày sinh không hợp lệ" |

**Pass Criteria:** All validation messages in Vietnamese, inline display.

---

### IZT-003: Form Input Edge Cases
**Priority:** P0

| Case | Input | Expected |
|------|-------|----------|
| Leap year | Feb 29, 2000 | Accepted |
| Non-leap year | Feb 29, 2001 | Rejected |
| Midnight boundary | 23:59 → Tý (00:00) | Correct time period |
| Long name | 100+ characters | Truncated or accepted |

---

### IZT-004: iztro Library Loaded Correctly
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load /lap-la-so/ | Page renders without iztro in initial bundle |
| 2 | Submit form | iztro loaded dynamically (import()) |
| 3 | Check Network tab | iztro chunk loaded on demand |
| 4 | Verify global pollution | No iztro globals on window before load |

**Pass Criteria:** iztro lazy-loaded, not in critical path.

---

### IZT-005: Chart Generation — Correct Parameters
**Priority:** P0

| Test Data | Expected Chart |
|-----------|---------------|
| Nam, 1990-01-01, Tý | Male chart, Year of Horse (1990) |
| Nữ, 1996-02-15, Sửu | Female chart, Year of Rat (1996) |
| Nam, 1984-12-31, Hợi | Male chart, Year of Rat (1984) |

**Pass Criteria:** Chart reflects correct gender, year, time period.

---

### IZT-006: Chart Accuracy — Star Positions
**Priority:** P0

| Check | How to Verify |
|-------|---------------|
| 12 palaces (cung) visible | Count SVG groups |
| Major stars in correct palaces | Cross-reference with iztro JSON output |
| Star brightness indicators | Visual check (size/color variation) |
| Palace labels in Vietnamese | Text content verification |

**Pass Criteria:** Chart structure matches Tử Vi tradition.

---

### IZT-007: Chart Interactivity
**Priority:** P1

| Interaction | Expected Behavior |
|-------------|-------------------|
| Hover over star | Tooltip with star name |
| Click on palace | Highlight palace, show details |
| Zoom in/out | SVG scales smoothly |
| Pan | Chart moves within viewport |

---

### IZT-008: Error Handling — iztro Failure
**Priority:** P0

| Scenario | Expected Behavior |
|----------|-------------------|
| Invalid birth data | Graceful error message, no crash |
| iztro library fails to load | Retry button, fallback message |
| Chart generation error | "Không thể tạo lá số" message |

---

### IZT-009: SVG Chart Output
**Priority:** P0

| Check | Expected |
|-------|----------|
| SVG element present | `<svg>` tag in DOM |
| ViewBox defined | Responsive scaling |
| Inline styles or classes | Consistent with design system |
| No external image dependencies | Self-contained SVG |
| Accessibility | `<title>` and `<desc>` in SVG |

---

### IZT-010: Chart Visual Quality
**Priority:** P1

| Check | Expected |
|-------|----------|
| Color scheme | Dark navy + gold accents |
| Font rendering | Vietnamese diacritics clear |
| Responsive scaling | Fits container on mobile/desktop |
| Print-friendly | Readable when printed |

---

### IZT-011: Chart Performance
**Priority:** P0

| Metric | Threshold |
|--------|-----------|
| Time to render | <3 seconds after submit |
| SVG DOM nodes | <500 elements |
| Memory usage | No leaks on repeated generation |
| FPS during interaction | >30fps |

---

### IZT-012: Chart Accessibility
**Priority:** P0

| Check | Expected |
|-------|----------|
| SVG title | "Lá số tử vi [Name]" |
| SVG desc | Brief description of chart |
| aria-label on interactive elements | Star names, palace names |
| Keyboard navigation | Tab through palaces |
| Screen reader | Announces chart structure |

---

## Insights (3 Free Preview) Validation

### IZT-013: Insights Display
**Priority:** P0

| Check | Expected |
|-------|----------|
| 3 insight cards visible | After chart renders |
| Categories | Career, Love, Wealth (or similar) |
| Content length | 2-3 sentences each |
| Vietnamese language | All text in Vietnamese |
| Art 320 disclaimer | "Tham khảo" framing |

---

### IZT-014: Insight Content Quality
**Priority:** P0

| Criterion | Check |
|-----------|-------|
| Specificity | References actual stars in chart |
| Tone | "Thầy bói nói chuyện" — advisory, not deterministic |
| Uniqueness | Different for each birth data |
| No false promises | No guaranteed outcomes |

---

### IZT-015: Insight Accuracy
**Priority:** P0

| Check | How |
|-------|-----|
| Content derived from iztro JSON | Verify data flow |
| Star names match chart | Cross-reference |
| Palace references correct | e.g., "Sao Tử Vi ở cung Mệnh" |

---

### IZT-016: Insight Limiting (Paywall)
**Priority:** P0

| Check | Expected |
|-------|----------|
| Only 3 insights shown | No scrolling to more |
| Clear CTA | "Xem đầy đủ 12 cung — 99.000đ" |
| No broken content | Insights feel complete but limited |

---

## SEO & Schema Validation

### IZT-017: CTA Section
**Priority:** P0

| Check | Expected |
|-------|----------|
| Visible after insights | Below 3 insight cards |
| Price displayed | "99.000đ" or similar |
| Payment CTA | "Mua Ngay" or "Thanh Toán" |
| Trust signals | Secure payment icon |
| Art 320 disclaimer | "Kết quả chỉ mang tính chất tham khảo" |

---

### IZT-018: Schema Markup
**Priority:** P0

| Schema | Presence | Validation |
|--------|----------|------------|
| HowTo | Required | Google Rich Results Test |
| FAQPage | Required | Google Rich Results Test |
| Service | Required | Google Rich Results Test |
| BreadcrumbList | Required | Google Rich Results Test |
| inLanguage: vi | All schemas | Manual check |

---

## Mobile Responsive

### IZT-019: Mobile Chart Display (375px)
**Priority:** P0

| Check | Expected |
|-------|----------|
| Chart fits viewport | No horizontal scroll |
| SVG scales down | viewBox maintains proportions |
| Touch interactions work | Tap to select, pinch to zoom |
| Insights readable | Font size ≥16px |
| CTA visible | Above fold or clear scroll hint |

---

### IZT-020: Tablet Display (768px)
**Priority:** P0

| Check | Expected |
|-------|----------|
| Chart larger than mobile | Utilizes extra width |
| Form may be side-by-side | If design allows |
| Insights in grid | 2 columns possible |

---

## Performance & Bundle

### IZT-021: Bundle Impact
**Priority:** P0

| Check | Threshold |
|-------|-----------|
| Initial JS (before iztro) | <150 KB |
| iztro chunk size | <100 KB gzipped |
| Total after iztro load | <220 KB |
| No iztro on other pages | Verified in build output |

---

### IZT-022: Loading States
**Priority:** P0

| State | Expected |
|-------|----------|
| Form submitting | Button disabled, spinner |
| iztro loading | "Đang tải thư viện..." |
| Chart generating | "Đang lập lá số..." |
| Insights loading | "Đang phân tích..." |

---

## Out of Scope Verification

| Item | Expected |
|------|----------|
| Server-side rendering of chart | Not present (client-side only) |
| API endpoint for chart | Not present |
| Full 12-cung reading without payment | Not present |
| iztro on static pages | Not present |

---

## Regression Checks

| Check | Against Sprint 1 |
|-------|-----------------|
| Form UI unchanged | Same 4 inputs |
| Validation still works | Same error messages |
| Placeholder removed | Replaced by actual chart |
| Schema markup preserved | HowTo + FAQPage + Service |
| Mobile responsive maintained | Same breakpoints |
| Accessibility maintained | Labels, aria-live |

---

*Framework ready. Will expand with specific test data when implementation is complete.*
