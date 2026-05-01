# STORY-018 Test Cases — Meta Tag Consistency

**Story ID:** STORY-018
**Priority:** P2
**Sprint:** Sprint 3
**Description:** Validate meta tag consistency across all pages — title, description, OG, Twitter, canonical

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | Title length 50–60 chars | META-001 — META-003 |
| AC-002 | Description length 150–160 chars | META-004 — META-006 |
| AC-003 | OG tags complete | META-007 — META-010 |
| AC-004 | Twitter tags complete | META-011 — META-013 |
| AC-005 | Canonical URL correct | META-014 — META-016 |
| AC-006 | Meta uniqueness per page | META-017 — META-019 |
| AC-007 | Meta matches H1/content | META-020 — META-022 |

---

## Test Cases

### META-001: Title Length — All Pages
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract all title tags | Script |
| 2 | Measure length | Character count |
| 3 | Verify minimum | ≥50 characters |
| 4 | Verify maximum | ≤60 characters |
| 5 | Flag outliers | List pages outside range |

**Pass Criteria:** 95% of titles within 50–60 chars.

---

### META-002: Title Length — Sample Validation
**Type:** SEO
**Priority:** P0

| Page Type | Min | Max | Example |
|-----------|-----|-----|---------|
| Homepage | 50 | 60 | "Bói Toán Miễn Phí — Xem Tử Vi, Gieo Quẻ, Lập Lá Số" |
| Tool | 50 | 60 | "Lập Lá Số Tử Vi Miễn Phí — Khám Phá Vận Mệnh Ngay" |
| Forecast | 50 | 60 | "Tử Vi Tuổi Tý 1984 Nam — Dự Đoán Chính Xác 2026" |
| Que | 50 | 60 | "Quẻ Kiển Vì Thiên — Giải Đáp Thắc Mắc, Định Hướng" |

**Pass Criteria:** All sampled titles in range.

---

### META-003: Title Uniqueness
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract all titles | All pages |
| 2 | Check duplicates | Set comparison |
| 3 | Verify zero duplicates | All unique |

**Pass Criteria:** Every page has unique title.

---

### META-004: Description Length — All Pages
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract all meta descriptions | Script |
| 2 | Measure length | Character count |
| 3 | Verify minimum | ≥150 characters |
| 4 | Verify maximum | ≤160 characters |
| 5 | Flag outliers | List pages outside range |

**Pass Criteria:** 95% of descriptions within 150–160 chars.

---

### META-005: Description Content Quality
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Sample 10 descriptions | Random pages |
| 2 | Verify CTA present | "Xem ngay", "Tìm hiểu", etc. |
| 3 | Verify keyword inclusion | Primary keyword present |
| 4 | Verify no duplication | Not copy of title |

**Pass Criteria:** Descriptions compelling and unique.

---

### META-006: Description Uniqueness
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract all descriptions | All pages |
| 2 | Check duplicates | Set comparison |
| 3 | Verify zero duplicates | All unique |

**Pass Criteria:** Every page has unique description.

---

### META-007: OG Title Present
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | `og:title` present |
| 2 | Verify content | Matches page title |
| 3 | Verify uniqueness | Per page |

**Pass Criteria:** OG title on all pages.

---

### META-008: OG Description Present
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | `og:description` present |
| 2 | Verify content | Matches meta description |
| 3 | Verify length | 150–160 chars |

**Pass Criteria:** OG description on all pages.

---

### META-009: OG URL Present
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | `og:url` present |
| 2 | Verify absolute URL | `https://domain.com/path` |
| 3 | Verify no trailing slash mismatch | Consistent |

**Pass Criteria:** OG URL absolute and correct.

---

### META-010: OG Type and Locale
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check `og:type` | "website" (home) / "article" (content) |
| 2 | Check `og:locale` | "vi_VN" |
| 3 | Check `og:site_name` | Site name present |

**Pass Criteria:** OG type and locale correct.

---

### META-011: Twitter Card Type
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | `twitter:card` present |
| 2 | Verify value | "summary_large_image" |

**Pass Criteria:** Twitter card type set.

---

### META-012: Twitter Title and Description
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | `twitter:title` present |
| 2 | Verify content | Matches page title |
| 3 | Check `twitter:description` | Present, matches meta desc |

**Pass Criteria:** Twitter tags complete.

---

### META-013: OG/Twitter Images
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check `og:image` | Present (when available) |
| 2 | Verify absolute URL | `https://domain.com/image.png` |
| 3 | Verify dimensions | 1200×630 recommended |
| 4 | Check `twitter:image` | Present (when available) |

**Pass Criteria:** Social images configured.

---

### META-014: Canonical URL Present
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | `rel="canonical"` present |
| 2 | Verify absolute URL | `https://domain.com/path` |
| 3 | Verify no query params | Clean URL |

**Pass Criteria:** Canonical on all pages.

---

### META-015: Canonical Consistency
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check trailing slash | Consistent policy |
| 2 | Check HTTP vs HTTPS | All HTTPS |
| 3 | Check www vs non-www | Consistent |

**Pass Criteria:** Canonical format consistent site-wide.

---

### META-016: Self-Referential Canonical
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check canonical on each page | Points to itself |
| 2 | Verify no cross-page canonicals | No page A canonical to page B |

**Pass Criteria:** Each page canonicalizes to itself.

---

### META-017: Title-Description Uniqueness Pair
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract title+description pairs | All pages |
| 2 | Check for duplicate pairs | Zero duplicates |
| 3 | Verify variation | Each page has distinct pair |

**Pass Criteria:** No two pages share same title+desc.

---

### META-018: Title-H1 Alignment
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract title and H1 | Same page |
| 2 | Verify keyword overlap | Same primary keyword |
| 3 | Verify consistency | Not contradictory |

**Pass Criteria:** Title and H1 aligned.

---

### META-019: Description-Content Alignment
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract description | Page content |
| 2 | Verify topic match | Description reflects content |
| 3 | Verify no clickbait | Accurate representation |

**Pass Criteria:** Description accurately represents content.

---

### META-020: Meta Tag Order
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect `<head>` | Tag order |
| 2 | Verify charset first | `<meta charset>` first |
| 3 | Verify viewport early | Before title |
| 4 | Verify title before OG | Standard order |

**Pass Criteria:** Meta tags in optimal order.

---

### META-021: Robots Meta Correct
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check SEO pages | `index, follow` |
| 2 | Check tool/utility pages | `index, follow` or `noindex` as intended |
| 3 | Verify no accidental noindex | No SEO page blocked |

**Pass Criteria:** Correct robots directives.

---

### META-022: Automation — Meta Validation
**Type:** Automation
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `npm run test:meta` | Script executes |
| 2 | Verify all pages | 100% coverage |
| 3 | Verify length checks | Titles, descriptions |
| 4 | Verify uniqueness | No duplicates |
| 5 | Verify CI gate | Build fails on violation |

**Pass Criteria:** Automated meta validation in CI.

---

## Regression Tests

| Test | Description | Priority |
|------|-------------|----------|
| REG-001 | Existing meta tags unchanged | P0 |
| REG-002 | Schema still valid | P0 |
| REG-003 | Social sharing previews | P0 |

---

*Total: 22 test cases*
