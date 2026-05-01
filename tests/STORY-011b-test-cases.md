# STORY-011b Test Cases — iztro UI: Chart Rendering, Interactivity, Performance, Accessibility

**Story ID:** STORY-011b
**Priority:** P0
**Sprint:** Sprint 3
**Description:** Complete iztro chart UI validation — rendering fidelity, user interactivity, performance benchmarks, WCAG 2.1 AA accessibility

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | Chart renders with 12 palaces, correct star positions | IZT2-001 — IZT2-006 |
| AC-002 | Interactive hover states on palaces/stars | IZT2-007 — IZT2-010 |
| AC-003 | Performance: render <3s, FPS >30, bundle lazy-loaded | IZT2-011 — IZT2-015 |
| AC-004 | Accessibility: keyboard nav, ARIA labels, screen reader | IZT2-016 — IZT2-022 |
| AC-005 | Mobile responsive (375px–1440px) | IZT2-023 — IZT2-027 |
| AC-006 | Error states (invalid data, network failure) | IZT2-028 — IZT2-030 |
| AC-007 | CTA integration (3 free insights + paid deep reading) | IZT2-031 — IZT2-033 |

---

## Test Cases

### IZT2-001: Chart Renders 12 Palaces
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate to /lap-la-so/ | Page loads |
| 2 | Submit valid form | Chart renders |
| 3 | Count palace containers | Exactly 12 |
| 4 | Verify palace names | Mệnh, Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc, Nô Bộc, Thiên Di, Tật Ách, Tài Bạch, Tử Nữ, Phu Thê, Huynh Đệ |

**Pass Criteria:** 12 palaces visible with correct Vietnamese labels.

---

### IZT2-002: Major Stars Rendered
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Submit form with known birth data | Chart renders |
| 2 | Verify Tử Vi position | In correct palace |
| 3 | Verify Thiên Cơ position | In correct palace |
| 4 | Verify Thái Dương, Vũ Khúc, Thiên Đồng | All visible |
| 5 | Count total stars | ≥14 major + minor stars |

**Pass Criteria:** All major stars visible in expected palaces.

---

### IZT2-003: Palace Content Accuracy
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Submit form: Nam, 1990-01-01, Tý | Chart renders |
| 2 | Check Mệnh palace | Contains primary life star |
| 3 | Check Tài Bạch palace | Contains wealth indicators |
| 4 | Check Quan Lộc palace | Contains career indicators |
| 5 | Verify palace stems/branches | Correct heavenly stem + earthly branch |

**Pass Criteria:** Palace contents match iztro data model.

---

### IZT2-004: Gender Reflected in Chart
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Submit: Nam, 1990-01-01 | Chart renders with male layout |
| 2 | Submit: Nữ, 1990-01-01 | Chart renders with female layout |
| 3 | Verify palace order | Nam: clockwise; Nữ: counter-clockwise |

**Pass Criteria:** Gender correctly affects palace arrangement.

---

### IZT2-005: Chart SVG Structure
**Type:** Structural
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect chart SVG | Valid SVG element |
| 2 | Verify viewBox | Appropriate for responsive scaling |
| 3 | Verify groups | Palaces grouped in <g> elements |
| 4 | Verify text elements | Star names as <text> |
| 5 | Verify no raster images | Pure SVG, no <img> |

**Pass Criteria:** Clean SVG structure, no external image dependencies.

---

### IZT2-006: Chart Renders on Repeated Submissions
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Submit form with data A | Chart A renders |
| 2 | Change birth year, submit | Chart B renders |
| 3 | Verify no ghost elements | Previous chart fully removed |
| 4 | Submit data A again | Chart A renders correctly |

**Pass Criteria:** Clean re-render without artifacts.

---

### IZT2-007: Palace Hover State
**Type:** Interactivity
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Render chart | Chart visible |
| 2 | Hover over Mệnh palace | Highlight effect applied |
| 3 | Verify cursor | Pointer cursor |
| 4 | Verify tooltip/info panel | Palace details displayed |
| 5 | Hover over another palace | Previous highlight removed |

**Pass Criteria:** Clear hover feedback, single selection at a time.

---

### IZT2-008: Star Hover State
**Type:** Interactivity
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Render chart | Chart visible |
| 2 | Hover over Tử Vi star | Star highlighted/enlarged |
| 3 | Verify tooltip | Star meaning/description shown |
| 4 | Verify palace context | Parent palace indicated |

**Pass Criteria:** Star hover reveals meaning and context.

---

### IZT2-009: Click-to-Select Palace
**Type:** Interactivity
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Render chart | Chart visible |
| 2 | Click Mệnh palace | Palace selected (persistent highlight) |
| 3 | Verify info panel | Detailed palace reading displayed |
| 4 | Click another palace | Previous deselected, new selected |

**Pass Criteria:** Click selects palace, shows detailed reading.

---

### IZT2-010: Keyboard Navigation
**Type:** Interactivity / a11y
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Render chart | Chart visible |
| 2 | Press Tab | Focus moves to first palace |
| 3 | Press Arrow keys | Focus moves between palaces |
| 4 | Press Enter/Space | Selected palace details shown |
| 5 | Press Escape | Details panel closes |

**Pass Criteria:** Full keyboard navigation without mouse.

---

### IZT2-011: Initial Render Performance
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Clear cache | Fresh load |
| 2 | Submit form | Start timer |
| 3 | Measure to first SVG pixel | < 3000ms |
| 4 | Measure to interactive | < 5000ms |

**Pass Criteria:** Chart visible within 3 seconds on 3G.

---

### IZT2-012: Animation Frame Rate
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Open DevTools Performance | Recording |
| 2 | Submit form | Chart renders |
| 3 | Measure FPS during render | > 30 FPS |
| 4 | Measure FPS during hover | > 30 FPS |

**Pass Criteria:** No frame drops below 30 FPS.

---

### IZT2-013: Bundle Lazy-Loading
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /lap-la-so/ without submitting | Network tab open |
| 2 | Verify initial bundle | iztro NOT in initial JS |
| 3 | Submit form | iztro chunk loaded dynamically |
| 4 | Verify chunk size | < 200 KB gzipped |

**Pass Criteria:** iztro loaded on-demand, not in initial bundle.

---

### IZT2-014: Memory Usage
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Open DevTools Memory | Heap snapshot |
| 2 | Render chart 10 times | Submit different data |
| 3 | Force garbage collection | Run GC |
| 4 | Measure heap growth | < 50 MB increase |

**Pass Criteria:** No significant memory leaks.

---

### IZT2-015: Mobile Performance
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Emulate Moto G4 | DevTools |
| 2 | Submit form | Chart renders |
| 3 | Measure render time | < 5000ms |
| 4 | Verify no jank | Smooth animation |

**Pass Criteria:** Acceptable performance on low-end mobile.

---

### IZT2-016: SVG ARIA Labels
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect chart SVG | <svg> element |
| 2 | Verify role | `role="img"` |
| 3 | Verify aria-label | Descriptive label present |
| 4 | Verify title element | <title> inside SVG |
| 5 | Verify desc element | <desc> inside SVG |

**Pass Criteria:** SVG accessible to screen readers.

---

### IZT2-017: Palace ARIA Attributes
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect palace elements | Each palace container |
| 2 | Verify role | `role="button"` or interactive |
| 3 | Verify aria-label | Palace name + "palace" |
| 4 | Verify tabindex | `tabindex="0"` |
| 5 | Verify aria-selected | Updates on selection |

**Pass Criteria:** Each palace is an accessible interactive element.

---

### IZT2-018: Screen Reader Announcements
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enable NVDA/VoiceOver | Screen reader active |
| 2 | Submit form | Chart renders |
| 3 | Verify announcement | "Lá số tử vi đã được tạo" |
| 4 | Navigate to palace | Palace name announced |
| 5 | Select palace | Palace details announced |

**Pass Criteria:** Meaningful announcements for all actions.

---

### IZT2-019: Color Contrast
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run axe DevTools | Full page scan |
| 2 | Check chart text contrast | WCAG AA (4.5:1) |
| 3 | Check palace borders | WCAG AA (3:1 for UI) |
| 4 | Check hover states | Still meets contrast |

**Pass Criteria:** All chart elements WCAG 2.1 AA compliant.

---

### IZT2-020: Focus Visibility
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Tab through chart elements | Keyboard navigation |
| 2 | Verify focus indicator | Visible outline/ring |
| 3 | Verify focus order | Logical (top-left to bottom-right) |
| 4 | Verify no focus traps | Can tab out of chart |

**Pass Criteria:** Clear, logical focus management.

---

### IZT2-021: Reduced Motion Support
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enable prefers-reduced-motion | OS setting |
| 2 | Submit form | Chart renders |
| 3 | Verify no animations | Instant render, no transitions |
| 4 | Verify hover states | Still functional, no motion |

**Pass Criteria:** Respects user motion preferences.

---

### IZT2-022: High Contrast Mode
**Type:** Accessibility
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enable Windows High Contrast | OS setting |
| 2 | Render chart | Chart visible |
| 3 | Verify borders | Visible in HCM |
| 4 | Verify text | Readable in HCM |

**Pass Criteria:** Chart usable in high contrast mode.

---

### IZT2-023: Mobile 375px Layout
**Type:** Responsive
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Set viewport 375×667 | iPhone SE |
| 2 | Render chart | Chart fits viewport |
| 3 | Verify no horizontal scroll | Overflow-x: hidden |
| 4 | Verify text readable | Font size ≥12px |
| 5 | Verify tap targets | ≥44×44px |

**Pass Criteria:** Usable on smallest mobile screens.

---

### IZT2-024: Tablet 768px Layout
**Type:** Responsive
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Set viewport 768×1024 | iPad |
| 2 | Render chart | Chart fits well |
| 3 | Verify palace spacing | Adequate padding |
| 4 | Verify info panel | Side panel or modal |

**Pass Criteria:** Comfortable layout on tablet.

---

### IZT2-025: Desktop 1440px Layout
**Type:** Responsive
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Set viewport 1440×900 | Desktop |
| 2 | Render chart | Chart centered |
| 3 | Verify max-width | Container constrained |
| 4 | Verify info panel | Side panel visible |

**Pass Criteria:** Elegant layout on large screens.

---

### IZT2-026: Orientation Change
**Type:** Responsive
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Render chart in portrait | Mobile |
| 2 | Rotate to landscape | Orientation change |
| 3 | Verify chart re-renders | Fits new orientation |
| 4 | Verify no layout breakage | Elements repositioned |

**Pass Criteria:** Graceful orientation change handling.

---

### IZT2-027: Zoom 200%
**Type:** Responsive / a11y
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Set browser zoom 200% | Ctrl++ |
| 2 | Render chart | Chart visible |
| 3 | Verify no clipping | All content visible |
| 4 | Verify scrollable | Scroll to see all |

**Pass Criteria:** Content accessible at 200% zoom (WCAG 1.4.4).

---

### IZT2-028: Invalid Date Handling
**Type:** Error Handling
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enter invalid date | e.g., 1990-02-30 |
| 2 | Submit form | Validation error |
| 3 | Verify error message | Vietnamese, clear |
| 4 | Verify no chart render | No crash, no partial render |

**Pass Criteria:** Graceful validation, no crashes.

---

### IZT2-029: Network Failure During Load
**Type:** Error Handling
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Block iztro chunk | DevTools block URL |
| 2 | Submit form | Loading state |
| 3 | Verify timeout | Error after ~10s |
| 4 | Verify error message | "Không thể tải lá số" |
| 5 | Verify retry button | Present |

**Pass Criteria:** Clear error state with retry option.

---

### IZT2-030: iztro Runtime Error
**Type:** Error Handling
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Mock iztro to throw | Test environment |
| 2 | Submit form | Error caught |
| 3 | Verify error boundary | Fallback UI shown |
| 4 | Verify no white screen | Graceful degradation |
| 5 | Verify error logged | Console error captured |

**Pass Criteria:** Runtime errors caught, user informed.

---

### IZT2-031: 3 Free Insights Displayed
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Submit form | Chart + insights render |
| 2 | Count insight cards | Exactly 3 |
| 3 | Verify topics | Career, wealth, relationships (or similar) |
| 4 | Verify length | 2-4 sentences each |
| 5 | Verify "Xem thêm" CTA | Present on each |

**Pass Criteria:** 3 relevant free insights with upgrade CTAs.

---

### IZT2-032: Paid Deep Reading CTA
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Render chart with insights | Page loaded |
| 2 | Locate CTA button | "Xem Luận Giải Chi Tiết" |
| 3 | Verify visibility | Prominent, above fold |
| 4 | Verify click | Navigates to payment/modal |
| 5 | Verify tracking | Event fired |

**Pass Criteria:** Clear, functional paid upgrade path.

---

### IZT2-033: CTA Accessibility
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Tab to CTA button | Keyboard nav |
| 2 | Verify focus | Visible focus ring |
| 3 | Verify label | Clear purpose |
| 4 | Activate with Enter | Works |
| 5 | Verify screen reader | Announces button purpose |

**Pass Criteria:** CTA fully accessible.

---

## Regression Tests

| Test | Description | Priority |
|------|-------------|----------|
| REG-001 | Form validation still works | P0 |
| REG-002 | Meta tags unchanged | P0 |
| REG-003 | Schema markup valid | P0 |
| REG-004 | Page load performance | P0 |
| REG-005 | Mobile layout | P0 |

---

*Total: 33 test cases*
