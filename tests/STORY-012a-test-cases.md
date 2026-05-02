# STORY-012a Test Cases — Content Pipeline MVP (12-24 Pages)

**Story ID:** STORY-012a
**Priority:** P1
**Sprint:** Sprint 2
**Description:** Birth-year forecast content generation pipeline MVP — 12-24 pages with uniqueness ≥80%, tone, Art. 320 compliance, schema

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | 12-24 MVP pages generated | CNT-001 — CNT-003 |
| AC-002 | 1,200–1,500 words per page | CNT-004 — CNT-005 |
| AC-003 | 80%+ uniqueness per page | CNT-006 — CNT-008 |
| AC-004 | "Thầy bói nói chuyện" tone | CNT-009 — CNT-011 |
| AC-005 | Art. 320 compliance | CNT-012 — CNT-015 |
| AC-006 | Specific stars cited | CNT-016 — CNT-018 |
| AC-007 | SEO schema (Article + FAQPage + BreadcrumbList) | CNT-019 — CNT-021 |
| AC-008 | Meta tags (title 50-60, desc 150-160) | CNT-022 — CNT-024 |
| AC-009 | E-E-A-T compliance | CNT-025 — CNT-027 |
| AC-010 | Vietnamese slugs correct | CNT-028 — CNT-029 |

---

## Test Cases

### CNT-001: MVP Page Count
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run content generation | 12-24 pages created |
| 2 | Verify page files exist | `.html` in `/out/tuvi/` |
| 3 | Count unique slugs | 12-24 unique |

**Pass Criteria:** 12-24 pages generated.

---

### CNT-002: Page Coverage
**Type:** Functional
**Priority:** P0

| Check | Expected |
|-------|----------|
| Animal variety | ≥6 different animals |
| Year variety | ≥2 different years |
| Gender variety | Both nam and nu |
| Combinations | No duplicates |

---

### CNT-003: SSG Generation
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `next build` | All pages generated |
| 2 | Check build time | <10 minutes |
| 3 | Verify static HTML | Content in HTML, not JS-dependent |

**Pass Criteria:** Build succeeds, content pre-rendered.

---

### CNT-004: Word Count Per Page
**Type:** Content
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Count words in each page | 1,200–1,500 |
| 2 | Sample 10 pages | All within range |

**Pass Criteria:** All sampled pages 1,200–1,500 words.

---

### CNT-005: Content Structure
**Type:** Content
**Priority:** P0

| Section | Required | Position |
|---------|----------|----------|
| Tổng quan | Yes | First H2 |
| Sự nghiệp | Yes | After Tổng quan |
| Tài lộc | Yes | After Sự nghiệp |
| Tình duyên | Yes | After Tài lộc |
| Sức khỏe | Yes | After Tình duyên |
| Lời khuyên | Yes | Last H2 |
| FAQ | Yes | After content |
| Disclaimer | Yes | End of page |

**Pass Criteria:** All 8 sections present.

---

### CNT-006: Uniqueness — Jaccard Similarity
**Type:** Content
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract text from all pages | Clean text |
| 2 | Compute Jaccard similarity (3-grams) | <20% between any two pages |
| 3 | Flag duplicates | None |

**Pass Criteria:** <20% similarity.

---

### CNT-007: Uniqueness — Template Detection
**Type:** Content
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Identify template phrases | "Năm 2026 mang đến..." |
| 2 | Measure template percentage | <5% of total content |
| 3 | Verify variable sections | Majority unique |

**Pass Criteria:** <5% template content.

---

### CNT-008: Uniqueness — Star Diversity
**Type:** Content
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract star mentions per page | Count |
| 2 | Verify unique combinations | ≥80% of pages have unique star sets |
| 3 | Check palace references | Vary by page |

**Pass Criteria:** ≥80% unique star combinations.

---

### CNT-009: Tone — Conversational
**Type:** Content
**Priority:** P0

| Check | Expected | Example |
|-------|----------|---------|
| "Bạn" usage | Frequent | "Bạn sẽ gặp..." |
| Direct address | Present | Second person |
| Warm tone | Friendly, not clinical | "Đừng lo lắng quá..." |

---

### CNT-010: Tone — Advisory (Non-Deterministic)
**Type:** Content
**Priority:** P0

| Check | Expected | Forbidden |
|-------|----------|-----------|
| Uncertainty markers | "có thể", "nên", "nên cân nhắc" | "sẽ chắc chắn", "nhất định" |
| Conditional language | "Nếu bạn..." | "Bạn phải..." |
| Suggestions | "Nên đầu tư vào..." | "Đầu tư vào..." (command) |

---

### CNT-011: Tone — "Thầy Bói Nói Chuyện"
**Type:** Content
**Priority:** P0

| Check | Expected |
|-------|----------|
| Knowledgeable | References classical concepts |
| Conversational | Not academic or robotic |
| Advisory | Offers guidance, not predictions |
| Specific | Cites stars, palaces, brightness |

**Sample PASS:** "Sao Tử Vi của bạn năm nay đắc địa ở cung Mệnh, cho thấy có nhiều cơ hội phát triển. Tuy nhiên, sao Thái Tuế ở cung Tật Ách nhắc nhở nên chú ý sức khỏe."

**Sample FAIL:** "Năm 2026 bạn sẽ giàu có và thành công. Không có gì phải lo lắng."

---

### CNT-012: Art. 320 — "tham khảo" Presence
**Type:** Compliance
**Priority:** P0

| Check | Expected |
|-------|----------|
| "tham khảo" in content | ≥2 occurrences |
| "tham khảo" in disclaimer | 1 occurrence |
| Total | ≥3 occurrences per page |

---

### CNT-013: Art. 320 — "tiên đoán" Absence
**Type:** Compliance
**Priority:** P0

| Check | Expected |
|-------|----------|
| "tiên đoán" count | 0 |
| "đoán trước" count | 0 |
| "tiên tri" count | 0 |
| Similar deterministic terms | 0 |

---

### CNT-014: Art. 320 — Disclaimer Paragraph
**Type:** Compliance
**Priority:** P0

| Check | Expected |
|-------|----------|
| Visible disclaimer | At end of page |
| Wording | "Kết quả chỉ mang tính chất tham khảo..." |
| Not hidden | Visible without scrolling (or clear) |

---

### CNT-015: Art. 320 — No Guaranteed Outcomes
**Type:** Compliance
**Priority:** P0

| Forbidden Phrase | Example |
|------------------|---------|
| "chắc chắn" | "Bạn chắc chắn sẽ thăng chức" |
| "nhất định" | "Nhất định sẽ thành công" |
| "tuyệt đối" | "Tuyệt đối không nên..." |
| "100%" | "Cơ hội 100%" |
| "đảm bảo" | "Đảm bảo tài lộc" |
| "định mệnh" | "Định mệnh đã an bài" |

**Pass Criteria:** Zero occurrences.

---

### CNT-015a: NO Western Astrology Terms
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
| constellation | Never use for zodiac |
| ruling planet | Never use |

**Pass Criteria:** Zero occurrences across all MVP pages.

---

### CNT-016: Specific Stars Cited
**Type:** Content
**Priority:** P0

| Check | Expected |
|-------|----------|
| Major stars named | Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Lương, Phá Quân |
| Palace locations | "ở cung Mệnh", "tại cung Tài Bạch" |
| Brightness | "đắc địa", "hãm địa", "miếu vượng", "hãm" |

---

### CNT-017: Star-Palace Accuracy
**Type:** Content
**Priority:** P0

| Check | How |
|-------|-----|
| Stars match iztro JSON | Cross-reference |
| Palaces correct | Verify against chart |
| Brightness accurate | Match iztro data |

**Pass Criteria:** Content matches iztro data.

---

### CNT-017a: Tam Hợp Phái Referenced
**Type:** Content / Domain
**Priority:** P0

| Check | Expected |
|-------|----------|
| Mentioned when relevant | Thân-Tý-Thìn, Dần-Ngọ-Tuất, Tỵ-Dậu-Sửu, Hợi-Mão-Mùi |
| Correct combinations | Per iztro JSON |
| Context | Explains harmonious combinations |

---

### CNT-017b: Tứ Hóa (Four Transformations)
**Type:** Content / Domain
**Priority:** P0

| Check | Expected |
|-------|----------|
| Hóa Lộc | Position and meaning |
| Hóa Quyền | Position and meaning |
| Hóa Khoa | Position and meaning |
| Hóa Kỵ | Position and meaning |
| Source | Actual iztro JSON data |

---

### CNT-017c: Ngũ Hành (Five Elements)
**Type:** Content / Domain
**Priority:** P0

| Check | Expected |
|-------|----------|
| Birth year element | Kim / Mộc / Thủy / Hỏa / Thổ |
| Element interactions | Compatible / incompatible |
| Yearly interactions | Current year element effect |
| Source | Actual iztro JSON data |

---

### CNT-017d: Độ Sáng Terminology
**Type:** Content / Domain
**Priority:** P0

| Check | Expected |
|-------|----------|
| "minh" | Bright / strong |
| "hãm" | Dim / weak |
| "bình" | Neutral |
| Forbidden | "strong", "weak", "powerful" |
| Source | Actual iztro brightness data |

**Pass Criteria:** Vietnamese brightness terms only.

---

### CNT-018: Minor Stars Included
**Type:** Content
**Priority:** P1

| Check | Expected |
|-------|----------|
| Minor stars mentioned | Văn Xương, Văn Khúc, Thiên Mã, Thiên Hình, etc. |
| Not just major stars | Diversity of references |

---

### CNT-019: Article Schema
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| `@type: "Article"` | Present |
| headline | Matches page H1 |
| description | Matches meta description |
| author | `{@type: "Organization", name: "Bói Toán"}` |
| datePublished | Present |
| dateModified | Present |
| inLanguage | "vi" |

---

### CNT-020: FAQPage Schema
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| `@type: "FAQPage"` | Present |
| mainEntity array | 3-5 Q&A pairs |
| inLanguage | "vi" |
| Questions relevant | Related to forecast |

---

### CNT-021: BreadcrumbList Schema
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| `@type: "BreadcrumbList"` | Present |
| 3 items | Trang chủ, Tử vi, [Page name] |
| inLanguage | "vi" |

---

### CNT-022: Title Length
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| Title template | `Tử Vi [Animal] [Year] [Gender] - Xem Chi Tiết` |
| Length | 50-60 characters |
| Example | "Tử Vi Tuổi Tý 2026 Nam - Xem Chi Tiết" (39 chars) |

---

### CNT-023: Description Length
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| Description template | `Luận giải tử vi [Animal] [Year] [Gender]. [Keywords].` |
| Length | 150-160 characters |
| Keywords | vận mệnh, công danh, tài lộc, tình duyên |

---

### CNT-024: Meta Tags Completeness
**Type:** SEO
**Priority:** P0

| Tag | Required |
|-----|----------|
| title | Yes |
| description | Yes |
| og:title | Yes |
| og:description | Yes |
| og:url | Yes |
| twitter:card | Yes |
| twitter:title | Yes |
| twitter:description | Yes |
| canonical | Yes |
| robots | index, follow |

---

### CNT-025: E-E-A-T — Expertise
**Type:** E-E-A-T
**Priority:** P0

| Check | Expected |
|-------|----------|
| Terminology | Cung, sao, hạn, vận, đại hạn, tiểu hạn |
| Classical references | "Theo Tử Vi Đẩu Số", "Cổ thư ghi..." |
| Palace system | 12 cung referenced correctly |
| Star combinations | "Tử Vi + Thiên Phủ hội chiếu" |

---

### CNT-026: E-E-A-T — Trustworthiness
**Type:** E-E-A-T
**Priority:** P0

| Check | Expected |
|-------|----------|
| Clear disclaimer | Visible |
| AI transparency | "Nội dung được tạo bởi AI dựa trên lá số" (if applicable) |
| No false promises | No guaranteed outcomes |
| Realistic advice | Actionable but not exaggerated |

---

### CNT-027: E-E-A-T — Authoritativeness
**Type:** E-E-A-T
**Priority:** P0

| Check | Expected |
|-------|----------|
| Internal links | To /lap-la-so/, star guides |
| Classical citations | Referenced |
| Author info | "Bói Toán" or expert bio |

---

### CNT-028: Vietnamese Slugs
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| Pattern | `/tuvi/tuoi-[animal]-[year]-[gender]/` |
| Diacritics stripped | Yes |
| Lowercase | Yes |
| Hyphens | Yes |
| Example | `/tuvi/tuoi-ty-2026-nam/` |

---

### CNT-029: URL Safety
**Type:** SEO
**Priority:** P0

| Check | Expected |
|-------|----------|
| Regex | `/^[a-z0-9-]+$/` |
| No special chars | Yes |
| Max length | ≤100 chars |

---

### CNT-030: Build Time Constraint
**Type:** Performance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `next build` with 12-24 pages | Measure build time |
| 2 | Record time | <30 seconds for 24 pages |
| 3 | Verify no timeout | Build completes |

**Pass Criteria:** <30 seconds.

---

### CNT-031: Supabase UPSERT Behavior
**Type:** Database
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run pipeline first time | 12-24 rows inserted |
| 2 | Run pipeline second time | No duplicates (UPSERT) |
| 3 | Verify updated_at | Timestamp updated |
| 4 | Verify rollback | Can delete and re-generate |

**Pass Criteria:** Idempotent, no duplicates.

---

*Test cases: 29*
*Estimated execution: 6-8 hours (requires content generation + manual review)*
