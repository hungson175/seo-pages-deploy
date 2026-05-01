# STORY-002-shell Test Cases - /lap-la-so/ Page Shell

**Story:** /lap-la-so/ Free Tool Page (Shell)
**Sprint:** Sprint 1
**Priority:** P0 (Stretch Goal)
**Spec Reference:** `docs/specs/story-002-shell-lap-la-so.md`

---

## Acceptance Criteria Mapping

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | /lap-la-so/ route renders with (tool) layout group | TC-001, TC-002 |
| AC-002 | Form with 4 inputs styled with Tailwind | TC-003, TC-004 |
| AC-003 | Inline validation with Vietnamese error messages | TC-005, TC-006 |
| AC-004 | Chart placeholder visible after form submission | TC-007 |
| AC-005 | Insights placeholder visible after form submission | TC-008 |
| AC-006 | CTA section for paid deep reading | TC-009 |
| AC-007 | FAQ section with 5-7 accordion items | TC-010, TC-011 |
| AC-008 | HowTo + FAQPage + Service schema markup | TC-012, TC-013 |
| AC-009 | Mobile responsive (375px and 768px) | TC-014, TC-015 |
| AC-010 | Lighthouse mobile score >= 90 | TC-016 |
| AC-011 | NOT included: iztro chart, insights, API | TC-017 |

---

## Test Cases

### TC-001: Route and Layout Group
**Type:** Functional / Structural
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify app/(tool)/lap-la-so/page.tsx exists | File present |
| 2 | Verify app/(tool)/layout.tsx exists | File present |
| 3 | Verify route accessible at /lap-la-so/ | Page renders at URL |
| 4 | Verify (tool) layout distinct from (main) | Different layout applied |

**Pass Criteria:** All steps pass.

---

### TC-002: Page Structure
**Type:** Structural
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify hero section with tool title | Section present |
| 2 | Verify form section | Section present |
| 3 | Verify chart placeholder section | Section present |
| 4 | Verify insights placeholder section | Section present |
| 5 | Verify CTA section | Section present |
| 6 | Verify FAQ section | Section present |

**Pass Criteria:** All sections present.

---

### TC-003: Form UI - Input Fields
**Type:** Functional / UI
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify name input field exists | Text input present |
| 2 | Verify birth_date date picker exists | Date input present |
| 3 | Verify birth_time dropdown exists | Select with 12 options (Ty, Suu, Dan, etc.) |
| 4 | Verify gender radio/select exists | Nam / Nu options present |
| 5 | Verify submit button exists | Button present and clickable |
| 6 | Verify all inputs styled with Tailwind | Tailwind classes applied |

**Pass Criteria:** All fields present and styled.

---

### TC-004: Form UX - Mobile First
**Type:** UI / Responsive
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Test at 375px width | Inputs stack vertically |
| 2 | Test at 768px width | Inputs may use grid layout |
| 3 | Verify touch targets >= 44x44px | Tap targets large enough |
| 4 | Verify input labels linked to inputs | Labels associated with inputs |

**Pass Criteria:** Form usable at both breakpoints.

---

### TC-005: Inline Validation - Name Field
**Type:** Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Submit form with empty name | Error message in Vietnamese |
| 2 | Enter valid Vietnamese name | Error clears |
| 3 | Enter name > 100 chars | Error or truncation |

**Pass Criteria:** Validation works with Vietnamese messages.

---

### TC-006: Inline Validation - Date and Time Fields
**Type:** Functional
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Submit form with empty birth_date | Error message in Vietnamese |
| 2 | Enter date before 1900 | Error message in Vietnamese |
| 3 | Enter future date | Error message in Vietnamese |
| 4 | Submit without selecting birth_time | Error message in Vietnamese |
| 5 | Submit without selecting gender | Error message in Vietnamese |

**Pass Criteria:** All fields validated with Vietnamese messages.

---

### TC-007: Chart Placeholder
**Type:** Functional / UI
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Submit valid form | Chart placeholder visible |
| 2 | Verify placeholder contains instruction text | Vietnamese instruction present |
| 3 | Verify no actual chart renders | Empty state, no SVG chart |

**Pass Criteria:** Placeholder visible, no chart rendered.

---

### TC-008: Insights Placeholder
**Type:** Functional / UI
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Submit valid form | Insights placeholder visible |
| 2 | Verify placeholder message present | Vietnamese message present |
| 3 | Verify no real insights rendered | Static placeholder only |

**Pass Criteria:** Placeholder visible, no insights rendered.

---

### TC-009: CTA Section - Paid Deep Reading
**Type:** Functional / UI
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify CTA section exists below placeholders | Section present |
| 2 | Verify placeholder copy for upsell | Text present |
| 3 | Verify CTA button or link present | Clickable element present |
| 4 | Verify "tham khao" disclaimer present | Art. 320 compliance text |

**Pass Criteria:** CTA section complete with compliance text.

---

### TC-010: FAQ Section - Structure
**Type:** Functional / UI
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify FAQ section has 5-7 items | Count between 5 and 7 |
| 2 | Verify each item has question and answer | Q+A structure present |
| 3 | Verify accordion behavior (click to expand) | Items expand/collapse |

**Pass Criteria:** 5-7 accordion items, functional.

---

### TC-011: FAQ Section - Content Quality
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify FAQ questions in Vietnamese | Vietnamese text |
| 2 | Verify answers in Vietnamese | Vietnamese text |
| 3 | Verify "tham khao" disclaimer in FAQ | Art. 320 compliance |
| 4 | Verify no deterministic predictions | "Tham khao" framing, not "tien doan" |

**Pass Criteria:** Content compliant with Art. 320.

---

### TC-012: Schema Markup - HowTo
**Type:** SEO
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View page source for JSON-LD | Script tag present |
| 2 | Verify at-type HowTo | Present |
| 3 | Verify HowTo has name and step array | Fields present |
| 4 | Verify steps describe lap la so process | Content relevant |
| 5 | Verify inLanguage vi | Field present |

**Pass Criteria:** Valid HowTo schema with vi language.

---

### TC-013: Schema Markup - FAQPage and Service
**Type:** SEO
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify at-type FAQPage | Present |
| 2 | Verify mainEntity array with Q&A pairs | Present |
| 3 | Verify at-type Service | Present |
| 4 | Verify inLanguage vi on all schemas | Field present |

**Pass Criteria:** All three schemas present and valid.

---

### TC-014: Mobile Responsive - 375px
**Type:** UI / Responsive
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open page at 375px viewport | No horizontal scroll |
| 2 | Verify form inputs stack vertically | Stacked layout |
| 3 | Verify text readable without zoom | Font size >= 16px for inputs |
| 4 | Verify FAQ accordion usable | Tap targets work |

**Pass Criteria:** Page fully usable at 375px.

---

### TC-015: Mobile Responsive - 768px
**Type:** UI / Responsive
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open page at 768px viewport | Layout adapts |
| 2 | Verify form may use 2-column layout | Grid or flex layout |
| 3 | Verify content not cramped | Adequate spacing |

**Pass Criteria:** Page fully usable at 768px.

---

### TC-016: Lighthouse Mobile Score
**Type:** Performance
**Priority:** P0

| Metric | Threshold | Expected Result |
|--------|-----------|-----------------|
| Performance | >= 90 | Score meets threshold |
| Accessibility | >= 90 | Score meets threshold |
| Best Practices | >= 90 | Score meets threshold |
| SEO | >= 90 | Score meets threshold |
| Mobile score | >= 90 | Score meets threshold |

**Pass Criteria:** All metrics >= 90.

---

### TC-017: Out of Scope Verification
**Type:** Functional (Negative Test)
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify no iztro chart SVG renders | No SVG chart |
| 2 | Verify no API calls on form submit | No network requests |
| 3 | Verify no real-time insights | Static placeholders only |
| 4 | Verify no dynamic chart generation | Empty state persists |

**Pass Criteria:** None of the Sprint 2 features present.

---

### TC-018: Accessibility - ARIA
**Type:** Accessibility
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Verify form labels linked to inputs | for/id attributes match |
| 2 | Verify error announcements via aria-live | aria-live region present |
| 3 | Verify accordion uses button elements | Buttons, not divs |
| 4 | Verify focus indicators visible | Focus styles present |

**Pass Criteria:** All accessibility requirements met.

---

### TC-019: Client JS Bundle Size
**Type:** Performance
**Priority:** P1

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Measure client JS bundle for this page | < 200 KB |

**Pass Criteria:** Bundle < 200 KB.

---

### TC-020: Static Content Crawlability
**Type:** SEO
**Priority:** P0

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Disable JavaScript in browser | Page content still visible |
| 2 | Verify schema markup in static HTML | JSON-LD present without JS |
| 3 | Verify FAQ content visible without JS | Content in HTML |

**Pass Criteria:** Page crawlable without JavaScript.

---

*Total test cases: 20*
*Estimated execution time: 3-4 hours*
*Dependencies: FE implementation complete, STORY-001 scaffold stable*
