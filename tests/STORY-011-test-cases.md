# STORY-011 Test Cases — iztro Chart Rendering + Dynamic Import

**Story ID:** STORY-011
**Priority:** P1
**Sprint:** Sprint 2
**Description:** Integrate iztro chart rendering with dynamic import, validate bundle impact, mobile responsive

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | iztro renders SVG chart on form submit | IZT-001 — IZT-005 |
| AC-002 | Dynamic import (not in initial bundle) | IZT-006 — IZT-008 |
| AC-003 | Mobile responsive chart (375px/768px) | IZT-009 — IZT-011 |
| AC-004 | 3 free insights displayed | IZT-012 — IZT-015 |
| AC-005 | CTA for paid deep reading | IZT-016 |
| AC-006 | Error handling (invalid data, iztro failure) | IZT-017 — IZT-019 |
| AC-007 | Accessibility (SVG title/desc, keyboard) | IZT-020 — IZT-022 |
| AC-008 | Performance (render time <3s, FPS >30) | IZT-023 — IZT-025 |

---

## Test Cases

### IZT-001: Chart Renders After Valid Form Submission
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate to /lap-la-so/ | Page loads |
| 2 | Fill name: "Nguyễn Văn A" | Accepted |
| 3 | Select birth date: 1990-01-01 | Accepted |
| 4 | Select birth time: Tý (23h-01h) | Accepted |
| 5 | Select gender: Nam | Accepted |
| 6 | Click "Xem Lá Số" | Chart renders within 3s |
| 7 | Verify SVG element | `<svg>` present in DOM |

**Pass Criteria:** SVG chart visible within 3 seconds.

---

### IZT-002: Chart Content Accuracy
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Submit form with known data | Chart renders |
| 2 | Count palace groups | 12 palaces visible |
| 3 | Verify palace labels | Vietnamese labels (Mệnh, Phụ Mẫu, etc.) |
| 4 | Verify star names | Major stars visible (Tử Vi, Thiên Cơ, etc.) |
| 5 | Verify gender reflected | Male chart layout |

**Pass Criteria:** 12 palaces, correct stars, correct gender.

---

### IZT-003: Chart Interactivity
**Type:** Functional
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Hover over star | Tooltip with star name |
| 2 | Click on palace | Palace highlights |
| 3 | Test zoom (if applicable) | SVG scales |

**Pass Criteria:** Interactive elements respond.

---

### IZT-004: Different Birth Data Produces Different Charts
**Type:** Functional
**Priority:** P0

| Test Data | Expected Difference |
|-----------|-------------------|
| Nam, 1990, Tý | Chart A |
| Nữ, 1990, Tý | Chart B (different layout) |
| Nam, 1996, Sửu | Chart C (different stars) |

**Pass Criteria:** Charts visually different.

---

### IZT-005: Chart SVG Quality
**Type:** UI
**Priority:** P0

| Check | Expected |
|-------|----------|
| viewBox attribute | Present for responsive scaling |
| Inline styles | Consistent with design system |
| No external dependencies | Self-contained SVG |
| Vietnamese diacritics | Clear rendering |

---

### IZT-006: iztro Not in Initial Bundle
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /lap-la-so/ without submitting | No iztro network request |
| 2 | Check initial JS bundle | No iztro code |
| 3 | Submit form | iztro chunk loads dynamically |

**Pass Criteria:** iztro loaded on demand only.

---

### IZT-007: iztro Chunk Size
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Build project | Success |
| 2 | Analyze chunks | iztro chunk <100 KB gzipped |
| 3 | Verify with bundle analyzer | Documented |

**Pass Criteria:** iztro chunk <100 KB.

---

### IZT-008: No iztro on Other Pages
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /tuvi/tuoi-ty-2026-nam/ | No iztro request |
| 2 | Load /sao/tu-vi/ | No iztro request |
| 3 | Load /que/1-kien-vi-thien/ | No iztro request |

**Pass Criteria:** iztro only on /lap-la-so/.

---

### IZT-009: Mobile Chart Display (375px)
**Type:** Responsive
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Open at 375px width | No horizontal scroll |
| 2 | Submit form | Chart fits viewport |
| 3 | Verify SVG scaling | Proportions maintained |
| 4 | Test touch | Tap interactions work |

**Pass Criteria:** Chart usable at 375px.

---

### IZT-010: Tablet Chart Display (768px)
**Type:** Responsive
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Open at 768px width | Chart larger than mobile |
| 2 | Verify layout | Utilizes extra space |

**Pass Criteria:** Chart scales appropriately.

---

### IZT-011: Chart Doesn't Cause Layout Shift
**Type:** Core Web Vitals
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure CLS during chart render | <0.1 |
| 2 | Verify placeholder dimensions | Match final chart size |

**Pass Criteria:** No layout shift.

---

### IZT-012: 3 Free Insights Displayed
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Submit valid form | Chart + 3 insights render |
| 2 | Count insight cards | Exactly 3 visible |
| 3 | Verify insight 1 title | "Mệnh Cung" or similar |
| 4 | Verify insight 2 title | "Sự Nghiệp" or similar (rotating) |
| 5 | Verify insight 3 title | "Ngũ Hành" or similar |

**Pass Criteria:** 3 insights visible with correct structure.

---

### IZT-012a: Insight 1 — Mệnh Cung Verdict
**Type:** Functional / Domain
**Priority:** P0

| Check | Expected |
|-------|----------|
| Primary star | Named (e.g., "Sao Tử Vi") |
| Brightness level | minh / hãm / bình |
| Tứ Hóa in Mệnh | Hóa Lộc / Quyền / Khoa / Kỵ |
| Verdict length | 1 sentence on life trajectory |
| Data source | Actual iztro palace data |

---

### IZT-012b: Insight 2 — Life Area Teaser
**Type:** Functional / Domain
**Priority:** P0

| Check | Expected |
|-------|----------|
| Rotating palace | Quan Lộc / Tài Bạch / Phu Thê / Tật Ách |
| Star combinations | Specific stars in that palace |
| Teaser length | 2 sentences |
| CTA text | "Xem chi tiết 12 cung trong luận giải đầy đủ" |
| Data source | Actual iztro palace data |

---

### IZT-012c: Insight 3 — Lucky Element (Ngũ Hành)
**Type:** Functional / Domain
**Priority:** P0

| Check | Expected |
|-------|----------|
| Birth year element | Kim / Mộc / Thủy / Hỏa / Thổ |
| Current year interaction | Compatible / incompatible |
| Lucky color | Specific color suggestion |
| Lucky number | Specific number suggestion |
| Data source | Actual iztro element data |

---

### IZT-013: Insight Content Quality
**Type:** Content
**Priority:** P0

| Check | Expected |
|-------|----------|
| References actual stars | "Sao Tử Vi ở cung..." |
| Advisory tone | "Nên cân nhắc...", "Có thể..." |
| Vietnamese | All text in Vietnamese |
| Length | 2-3 sentences each |
| Art 320 | "tham khảo" framing |

---

### IZT-014: Insight Uniqueness
**Type:** Content
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Generate insights for Data A | Set A |
| 2 | Generate insights for Data B | Set B |
| 3 | Compare | Different content |

**Pass Criteria:** Insights vary by birth data.

---

### IZT-015: Insight Paywall
**Type:** Functional
**Priority:** P0

| Check | Expected |
|-------|----------|
| Only 3 insights | No more visible |
| CTA below insights | "Xem đầy đủ 12 cung" |
| Price displayed | 99.000đ |

---

### IZT-016: Paid Upsell CTA
**Type:** Functional / Domain
**Priority:** P0

| Check | Expected |
|-------|----------|
| Headline | "Luận Giải Trọn Đời — 99.000đ" |
| Feature: 12-cung | "Phân tích chi tiết 12 cung" |
| Feature: decadal | "Đại Vận trọn đời" |
| Feature: monthly | "Lưu Niên năm hiện tại" |
| Feature: PDF | "Tải PDF đọc offline" |
| Button | "Mua Ngay — 99.000đ" |
| Social proof | "Đã có 1.200+ người mua" (placeholder) |
| Disclaimer | Art 320 compliance |
| Position | After 3 insight cards |

---

### IZT-016a: NO Western Astrology Terms
**Type:** Compliance
**Priority:** P0

| Forbidden Term | Context |
|----------------|---------|
| zodiac | Never use |
| horoscope | Never use |
| sun sign | Never use |
| ascendant | Never use |
| star sign | Never use |
| astrological sign | Never use |

**Pass Criteria:** Zero occurrences in chart, insights, and CTA.

---

### IZT-017: Invalid Birth Data Handling
**Type:** Error Handling
**Priority:** P0

| Input | Expected |
|-------|----------|
| Date before 1900 | Error message |
| Future date | Error message |
| Missing required field | Inline validation |

---

### IZT-018: iztro Library Load Failure
**Type:** Error Handling
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Block iztro chunk | Simulate failure |
| 2 | Submit form | Graceful error message |
| 3 | Verify retry option | Button or auto-retry |

**Pass Criteria:** No crash, user-friendly error.

---

### IZT-019: Chart Generation Failure
**Type:** Error Handling
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Submit edge-case data | e.g., Feb 29 on non-leap |
| 2 | Verify handling | Graceful message |

**Pass Criteria:** No uncaught exceptions.

---

### IZT-020: SVG Accessibility
**Type:** Accessibility
**Priority:** P0

| Check | Expected |
|-------|----------|
| `<title>` in SVG | "Lá số tử vi [Name]" |
| `<desc>` in SVG | Brief description |
| aria-label on stars | Star names |
| Keyboard navigation | Tab through elements |

---

### IZT-021: Form Accessibility
**Type:** Accessibility
**Priority:** P0

| Check | Expected |
|-------|----------|
| Labels linked | for/id match |
| Error announcements | aria-live or role=alert |
| Focus indicators | Visible |

---

### IZT-022: Screen Reader Support
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate with screen reader | Form fields announced |
| 2 | Submit form | Chart announced |
| 3 | Read insights | Content announced |

**Pass Criteria:** Fully navigable.

---

### IZT-023: Chart Render Time
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Submit form | Start timer |
| 2 | Chart visible | Stop timer |
| 3 | Record | <1 second (mid-tier mobile) |

**Pass Criteria:** <1 second on mid-tier mobile device.

---

### IZT-023a: First Load JS Budget
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /lap-la-so/ without submitting | Measure initial JS |
| 2 | Verify iztro not included | No iztro code in initial bundle |
| 3 | Record size | <150 KB |

**Pass Criteria:** Initial load <150 KB, iztro lazy-loaded.

---

### IZT-024: Frame Rate During Interaction
**Type:** Performance
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Interact with chart | Hover, click |
| 2 | Measure FPS | >30fps |

**Pass Criteria:** Smooth interaction.

---

### IZT-025: Memory Usage
**Type:** Performance
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Generate 10 charts sequentially | No memory leak |
| 2 | Check heap size | Stable |

**Pass Criteria:** No memory leak.

---

*Test cases: 25*
*Estimated execution: 4-5 hours*
