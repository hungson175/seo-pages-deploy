# STORY-015 Test Cases — lang="vi" on All Pages

**Story ID:** STORY-015
**Priority:** P2
**Sprint:** Sprint 3
**Description:** Validate `lang="vi"` attribute on HTML element across all page types for SEO and accessibility

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | `lang="vi"` on homepage | LANG-001 |
| AC-002 | `lang="vi"` on tool pages | LANG-002 |
| AC-003 | `lang="vi"` on forecast pages | LANG-003 |
| AC-004 | `lang="vi"` on que pages | LANG-004 |
| AC-005 | `lang="vi"` on star pages | LANG-005 |
| AC-006 | `lang="vi"` on 404/error pages | LANG-006 |
| AC-007 | `lang="vi"` in schema (inLanguage) | LANG-007 |

---

## Test Cases

### LANG-001: Homepage lang Attribute
**Type:** SEO / Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load homepage | 200 OK |
| 2 | Inspect `<html>` tag | `lang="vi"` present |
| 3 | Verify no other lang | No `lang="en"` or other |
| 4 | Verify case | Exactly `vi` (lowercase) |

**Pass Criteria:** `lang="vi"` on homepage HTML.

---

### LANG-002: Tool Page lang Attribute
**Type:** SEO / Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /lap-la-so/ | 200 OK |
| 2 | Inspect `<html>` tag | `lang="vi"` present |
| 3 | Verify after form submit | Still `lang="vi"` |

**Pass Criteria:** `lang="vi"` on tool page.

---

### LANG-003: Forecast Page lang Attribute
**Type:** SEO / Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /tuvi/tuoi-ty-1984-nam/ | 200 OK |
| 2 | Inspect `<html>` tag | `lang="vi"` present |
| 3 | Sample 10 more forecast pages | All `lang="vi"` |

**Pass Criteria:** `lang="vi"` on all forecast pages.

---

### LANG-004: Que Page lang Attribute
**Type:** SEO / Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /que/1-kien-vi-thien/ | 200 OK |
| 2 | Inspect `<html>` tag | `lang="vi"` present |
| 3 | Sample all 64 que pages | All `lang="vi"` |

**Pass Criteria:** `lang="vi"` on all que pages.

---

### LANG-005: Star Page lang Attribute
**Type:** SEO / Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /sao/tu-vi/ (if exists) | 200 OK |
| 2 | Inspect `<html>` tag | `lang="vi"` present |
| 3 | Sample other star pages | All `lang="vi"` |

**Pass Criteria:** `lang="vi"` on all star pages.

---

### LANG-006: 404 Page lang Attribute
**Type:** SEO / Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load non-existent page | 404 response |
| 2 | Inspect `<html>` tag | `lang="vi"` present |
| 3 | Verify error message | In Vietnamese |

**Pass Criteria:** `lang="vi"` even on error pages.

---

### LANG-007: Schema inLanguage
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect JSON-LD on homepage | `inLanguage: "vi"` |
| 2 | Inspect JSON-LD on forecast | `inLanguage: "vi"` |
| 3 | Inspect JSON-LD on tool | `inLanguage: "vi"` |
| 4 | Verify no "en" in schema | Zero occurrences |

**Pass Criteria:** All schema markup specifies Vietnamese language.

---

### LANG-008: Meta Language Tag
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check `<meta http-equiv="content-language">` | `content="vi"` |
| 2 | Check `<meta name="language">` | `content="vi"` |

**Pass Criteria:** Meta language tags consistent with HTML lang.

---

### LANG-009: OG Locale
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check `og:locale` | `vi_VN` |
| 2 | Verify format | underscore, not hyphen |

**Pass Criteria:** OG locale set to Vietnamese.

---

### LANG-010: Automation — All Pages Scanned
**Type:** Automation
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `npm run test:lang` | Script executes |
| 2 | Verify coverage | All HTML files in /out/ |
| 3 | Verify assertion | Every file has `lang="vi"` |
| 4 | Verify CI gate | Build fails on missing lang |

**Pass Criteria:** Automated lang validation in CI.

---

## Regression Tests

| Test | Description | Priority |
|------|-------------|----------|
| REG-001 | Existing pages still have lang="vi" | P0 |
| REG-002 | No English lang introduced | P0 |

---

*Total: 10 test cases*
