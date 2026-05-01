# Competitor Analysis Validation Framework

**Prepared by:** QA
**Date:** 2026-05-01
**Context:** OPC competitor analysis requirements

---

## Current Gap Assessment

### STORY-015: lang='vi' on All Pages
**Status:** PASS (no gap)
- Homepage: lang="vi" present ✅
- /lap-la-so/: lang="vi" present ✅
- /tuvi/*: lang="vi" present ✅
- /que/*: lang="vi" present ✅

### STORY-009: robots Meta Correctness
**Status:** PASS (no gap)
- All pages: `name="robots" content="index, follow"` ✅
- No noindex on SEO pages ✅
- robots.txt: `Allow: /` ✅

### STORY-016: H1 Structure
**Status:** GAP IDENTIFIED
**Required Pattern:** [action] + [keyword] + [benefit/emotional]

| Page | Current H1 | Pattern Check | Status |
|------|-----------|---------------|--------|
| Homepage | "Bói Toán" | Missing action + benefit | FAIL |
| /lap-la-so/ | "Lập Lá Số Tử Vi" | Has action (Lập) + keyword (Lá Số Tử Vi), missing benefit | PARTIAL |
| /tuvi/tuoi-ty-1984-nam/ | "Tử Vi Tuoi Ty 1984 Nam" | Missing action + benefit | FAIL |
| /que/1-kien-vi-thien/ | "Quẻ 1 Kien Vi Thien" | Missing action + benefit | FAIL |

**Recommended H1s:**
- Homepage: "Xem Tử Vi Trọn Đờii — Hiểu Vận Mệnh, Nắm Tương Lai"
- /lap-la-so/: "Lập Lá Số Tử Vi Miễn Phí — Khám Phá Vận Mệnh Củaa Bạn"
- /tuvi/*: "Xem Tử Vi [Animal] [Year] — Dự Đoán Chính Xác, Tư Vấn Tận Tâm"
- /que/*: "Gieo Quẻ [Name] — Giải Đáp Thắc Mắc, Định Hướng Cuộc Sống"

### STORY-018: Meta Tag Consistency
**Status:** GAPS IDENTIFIED

| Page | Title Length | Desc Length | OG Title Match | Twitter Match | Status |
|------|-------------|-------------|----------------|---------------|--------|
| Homepage | 31 chars | 155 chars | ✅ | ✅ | PASS |
| /lap-la-so/ | 42 chars | 129 chars | ✅ | ✅ | PASS |
| /tuvi/* | 37 chars | 113 chars | ✅ | ✅ | PASS |
| /que/* | 31 chars | 93 chars | ✅ | ✅ | PASS |

**Issues:**
- Description lengths vary (93-155 chars) - some below 150 char minimum
- No OG images configured
- No Twitter images configured

### STORY-019: Trust Signals
**Status:** GAPS IDENTIFIED

| Signal | Status | Location |
|--------|--------|----------|
| Art.320 disclaimer | ✅ Present | All pages |
| dateModified | ✅ Present | Schema markup (2 instances) |
| Expert credentials | ❌ MISSING | Not present |
| Social proof | ❌ MISSING | Not present |
| Secure connection | ✅ HTTPS | All URLs |
| Contact info | ❌ MISSING | Not present |
| Privacy policy | ❌ MISSING | Not present |

---

## Updated Test Cases

### STORY-015 Test Cases (lang='vi')

#### LANG-001: lang Attribute on HTML
**Type:** SEO / Accessibility
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check `<html>` tag on homepage | `lang="vi"` present |
| 2 | Check `<html>` tag on /lap-la-so/ | `lang="vi"` present |
| 3 | Check `<html>` tag on all /tuvi/* pages | `lang="vi"` present |
| 4 | Check `<html>` tag on all /que/* pages | `lang="vi"` present |
| 5 | Check `<html>` tag on 404 page | `lang="vi"` present |

---

### STORY-009 Test Cases (robots Meta)

#### ROBOT-001: SEO Pages Indexable
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check homepage robots meta | `content="index, follow"` |
| 2 | Check /lap-la-so/ robots meta | `content="index, follow"` |
| 3 | Check /tuvi/* robots meta | `content="index, follow"` |
| 4 | Check /que/* robots meta | `content="index, follow"` |
| 5 | Check /sao/* robots meta | `content="index, follow"` |

#### ROBOT-002: robots.txt Allows All
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Access /robots.txt | Returns 200 |
| 2 | Verify content | `User-Agent: *` + `Allow: /` |
| 3 | Verify sitemap reference | Sitemap URL present |

#### ROBOT-003: No noindex on Production
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Search for `noindex` across all pages | Zero occurrences |
| 2 | Check for `nofollow` | Only if intentional (e.g., login pages) |

---

### STORY-016 Test Cases (H1 Structure)

#### H1-001: H1 Pattern [Action] + [Keyword] + [Benefit]
**Type:** SEO / Content
**Priority:** P0

| Page Type | Required Pattern | Example |
|-----------|-----------------|---------|
| Homepage | [Action] + [Brand/Keyword] + [Benefit] | "Xem Tử Vi Trọn Đờii — Hiểu Vận Mệnh, Nắm Tương Lai" |
| Tool (/lap-la-so/) | [Action] + [Tool Name] + [Benefit] | "Lập Lá Số Tử Vi Miễn Phí — Khám Phá Vận Mệnh" |
| Forecast (/tuvi/*) | [Action] + [Specific Query] + [Benefit] | "Xem Tử Vi Tuổi Tý 2026 — Dự Đoán Chính Xác" |
| Que (/que/*) | [Action] + [Que Name] + [Benefit] | "Gieo Quẻ Kiển Vì Thiên — Giải Đáp Thắc Mắc" |
| Star (/sao/*) | [Action] + [Star Name] + [Benefit] | "Tìm Hiểu Sao Tử Vi — Ý Nghĩa Và Ứng Dụng" |

#### H1-002: Single H1 Per Page
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Count `<h1>` tags per page | Exactly 1 |
| 2 | Verify no duplicate H1s | No duplicates |

#### H1-003: H1 Length
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Measure H1 length | 20-70 characters |
| 2 | Verify not empty | Has content |
| 3 | Verify visible | Not hidden with CSS |

#### H1-004: H1 Contains Primary Keyword
**Type:** SEO
**Priority:** P0

| Page Type | Primary Keyword | Example |
|-----------|----------------|---------|
| Homepage | "tử vi" | Must contain "tử vi" or "bói toán" |
| /lap-la-so/ | "lập lá số" | Must contain "lập lá số" or "tử vi" |
| /tuvi/* | "tử vi [animal]" | Must contain "tử vi" + animal name |
| /que/* | "gieo quẻ" | Must contain "gieo quẻ" or "quẻ" |

---

### STORY-018 Test Cases (Meta Tag Consistency)

#### META-001: Title Length Consistency
**Type:** SEO
**Priority:** P0

| Page Type | Min Length | Max Length | Target |
|-----------|-----------|-----------|--------|
| All pages | 50 chars | 60 chars | 50-60 chars |

#### META-002: Description Length Consistency
**Type:** SEO
**Priority:** P0

| Page Type | Min Length | Max Length | Target |
|-----------|-----------|-----------|--------|
| All pages | 150 chars | 160 chars | 150-160 chars |

#### META-003: OG Tags Present
**Type:** SEO
**Priority:** P0

| Tag | Required | Pages |
|-----|----------|-------|
| og:title | Yes | All |
| og:description | Yes | All |
| og:url | Yes | All |
| og:type | Yes | All |
| og:image | Yes | All (when images available) |
| og:locale | Yes | All (vi_VN) |

#### META-004: Twitter Tags Present
**Type:** SEO
**Priority:** P0

| Tag | Required | Pages |
|-----|----------|-------|
| twitter:card | Yes | All |
| twitter:title | Yes | All |
| twitter:description | Yes | All |
| twitter:image | Yes | All (when images available) |

#### META-005: Canonical URL Consistency
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check canonical on all pages | Present |
| 2 | Verify absolute URL | `https://domain.com/path` |
| 3 | Verify no trailing slash inconsistency | Consistent format |

#### META-006: Meta Tag Uniqueness Per Page
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify no duplicate titles | Each page unique |
| 2 | Verify no duplicate descriptions | Each page unique |
| 3 | Verify title matches H1 | Aligned |

---

### STORY-019 Test Cases (Trust Signals)

#### TRUST-001: Art.320 Disclaimer Visible
**Type:** Compliance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages for disclaimer | Present |
| 2 | Verify wording | Contains "tham khảo" |
| 3 | Verify visibility | Not hidden, clearly readable |
| 4 | Verify position | Near content or footer |

#### TRUST-002: dateModified in Schema
**Type:** SEO / Trust
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check Article schema for dateModified | Present |
| 2 | Verify format | ISO 8601 (YYYY-MM-DD) |
| 3 | Verify date is current | Not outdated |

#### TRUST-003: Author/Expert Credentials
**Type:** E-E-A-T
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check for author name | Present in schema |
| 2 | Check for author bio | Brief description |
| 3 | Check for expert credentials | "Chuyên gia phong thủy" or similar |
| 4 | Verify in Article schema | `@type: "Organization"` or `"Person"` |

#### TRUST-004: Social Proof (When Implemented)
**Type:** Trust
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check for user count | "Đã có X ngườii sử dụng" |
| 2 | Check for testimonials | User quotes (if present) |
| 3 | Check for ratings | Star ratings (if present) |

#### TRUST-005: Contact Information
**Type:** Trust
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check for contact page or info | Present |
| 2 | Check for privacy policy | Link present |
| 3 | Check for terms of service | Link present |

#### TRUST-006: Secure Connection
**Type:** Trust
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify HTTPS | All pages load over HTTPS |
| 2 | Check for mixed content | No HTTP resources on HTTPS pages |

---

## Implementation Priority

### Sprint 3 (Immediate)
1. STORY-016: H1 structure fixes (all pages)
2. STORY-018: Meta tag consistency (description lengths)
3. STORY-019: Trust signals (expert credentials, author info)

### Sprint 4 (Near-term)
4. STORY-018: OG/Twitter images
5. STORY-019: Social proof, contact info
6. STORY-019: Privacy policy, terms

### Sprint 5+ (Long-term)
7. Internal linking (10+ links per page)
8. Sitemap expansion (440+ pages)
9. Advanced trust signals (reviews, certifications)

---

*Framework updated for competitor analysis requirements.*
