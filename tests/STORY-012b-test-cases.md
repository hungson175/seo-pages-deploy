# STORY-012b Test Cases — 72+ Forecast Pages: Scale, Uniqueness, Tone, Compliance

**Story ID:** STORY-012b
**Priority:** P1
**Sprint:** Sprint 3
**Description:** Validate 72+ forecast content pages at scale — uniqueness ≥80%, "Thầy bói nói chuyện" tone, Art. 320 compliance, schema integrity

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | 72+ pages generated | SCL-001 — SCL-003 |
| AC-002 | Uniqueness ≥80% per page | SCL-004 — SCL-008 |
| AC-003 | 1,200–1,500 words per page | SCL-009 — SCL-011 |
| AC-004 | "Thầy bói nói chuyện" tone | SCL-012 — SCL-016 |
| AC-005 | Art. 320 compliance | SCL-017 — SCL-020 |
| AC-006 | Specific stars cited | SCL-021 — SCL-023 |
| AC-007 | SEO schema (Article + FAQPage) | SCL-024 — SCL-027 |
| AC-008 | Meta tags optimized | SCL-028 — SCL-030 |
| AC-009 | H1 formula compliance | SCL-031 — SCL-033 |
| AC-010 | No Western astrology terms | SCL-034 — SCL-036 |

---

## Test Cases

### SCL-001: Page Count (72+)
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run content generation for all combinations | All pages created |
| 2 | Count generated pages | ≥72 |
| 3 | Verify coverage | All 12 animals × 2 genders × 3+ years |
| 4 | Check no duplicates | Unique content per page |

**Pass Criteria:** ≥72 unique forecast pages.

---

### SCL-002: Animal Coverage
**Type:** Functional
**Priority:** P0

| Animal | Years | Gender | Expected Pages |
|--------|-------|--------|---------------|
| Tý | 1984, 1996, 2008 | Nam, Nữ | 6 |
| Sửu | 1985, 1997, 2009 | Nam, Nữ | 6 |
| Dần | 1986, 1998, 2010 | Nam, Nữ | 6 |
| Mão | 1987, 1999, 2011 | Nam, Nữ | 6 |
| Thìn | 1988, 2000, 2012 | Nam, Nữ | 6 |
| Tỵ | 1989, 2001, 2013 | Nam, Nữ | 6 |
| Ngọ | 1990, 2002, 2014 | Nam, Nữ | 6 |
| Mùi | 1991, 2003, 2015 | Nam, Nữ | 6 |
| Thân | 1992, 2004, 2016 | Nam, Nữ | 6 |
| Dậu | 1993, 2005, 2017 | Nam, Nữ | 6 |
| Tuất | 1994, 2006, 2018 | Nam, Nữ | 6 |
| Hợi | 1995, 2007, 2019 | Nam, Nữ | 6 |

**Pass Criteria:** All 12 animals covered with 3-year spread.

---

### SCL-003: SSG Build Success
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `next build` | Build succeeds |
| 2 | Verify output directory | `/out/tuvi/` populated |
| 3 | Verify HTML files | All 72+ `.html` files |
| 4 | Verify no build errors | Exit code 0 |
| 5 | Verify build time | < 5 minutes |

**Pass Criteria:** Clean build with all pages.

---

### SCL-004: Uniqueness — Sample 10 Pages
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Select 10 random pages | Diverse animals/years/genders |
| 2 | Extract body text | Strip HTML |
| 3 | Run pairwise similarity | Cosine/Jaccard |
| 4 | Verify all pairs | < 20% similarity |
| 5 | Verify vs template | > 80% unique from template |

**Pass Criteria:** All sampled pages ≥80% unique.

---

### SCL-005: Uniqueness — Cross-Animal
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Select Tý Nam 1990 page | Page A |
| 2 | Select Sửu Nam 1990 page | Page B |
| 3 | Compare content | Different animal-specific sections |
| 4 | Verify shared content | Only structural/template text |

**Pass Criteria:** Animal-specific content clearly differentiated.

---

### SCL-006: Uniqueness — Cross-Gender
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Select Tý Nam 1990 page | Page A |
| 2 | Select Tý Nữ 1990 page | Page B |
| 3 | Compare content | Gender-specific differences |
| 4 | Verify relationship section | Different advice for nam/nữ |

**Pass Criteria:** Gender-specific content clearly differentiated.

---

### SCL-007: Uniqueness — Cross-Year
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Select Tý Nam 1984 page | Page A |
| 2 | Select Tý Nam 1996 page | Page B |
| 3 | Compare content | Different year-specific predictions |
| 4 | Verify age references | Different life stages |

**Pass Criteria:** Year-specific predictions clearly differentiated.

---

### SCL-008: Uniqueness Automation Script
**Type:** Automation
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `npm run test:uniqueness` | Script executes |
| 2 | Verify sample size | ≥20 pages tested |
| 3 | Verify threshold | 80% minimum |
| 4 | Verify report | CSV/JSON output with scores |
| 5 | Verify CI integration | Fails build if <80% |

**Pass Criteria:** Automated uniqueness gate in CI.

---

### SCL-009: Word Count — All Pages
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run word count across all pages | Script |
| 2 | Verify minimum | ≥1,200 words |
| 3 | Verify maximum | ≤1,500 words |
| 4 | Check outliers | Flag pages outside range |

**Pass Criteria:** 95% of pages within 1,200–1,500 words.

---

### SCL-010: Word Count — Sample Validation
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Manual count on 5 random pages | Word count tool |
| 2 | Verify Vietnamese word counting | CJK + Latin handled |
| 3 | Verify no padding | No repeated phrases to inflate count |

**Pass Criteria:** Manual count matches script, no padding.

---

### SCL-011: Content Structure
**Type:** Content Quality
**Priority:** P0

| Section | Required | Min Words |
|---------|----------|-----------|
| Introduction | Yes | 100 |
| General Forecast | Yes | 200 |
| Career | Yes | 200 |
| Wealth | Yes | 200 |
| Relationships | Yes | 200 |
| Health | Yes | 150 |
| Monthly Breakdown | Yes | 150 |
| FAQ | Yes | 100 |
| Conclusion | Yes | 100 |

**Pass Criteria:** All sections present with minimum word counts.

---

### SCL-012: Tone — Conversational Style
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Read 5 random pages aloud | Natural flow |
| 2 | Verify sentence length | Mixed short/medium |
| 3 | Verify personal address | "Bạn", "anh/chị" |
| 4 | Verify warmth | Encouraging, empathetic |

**Pass Criteria:** Sounds like a friendly fortune teller speaking.

---

### SCL-013: Tone — No Robotic Language
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Search for forbidden patterns | "Theo dữ liệu", "hệ thống cho biết" |
| 2 | Search for passive voice | < 20% of sentences |
| 3 | Search for template markers | No `{variable}` in output |
| 4 | Verify human touch | Anecdotes, rhetorical questions |

**Pass Criteria:** No robotic or template-heavy language.

---

### SCL-014: Tone — Cultural Appropriateness
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify respectful language | No mocking of beliefs |
| 2 | Verify Buddhist references | Appropriate, not preachy |
| 3 | Verify ancestor respect | Honoring tradition |
| 4 | Verify no superstition claim | Not presented as science |

**Pass Criteria:** Culturally sensitive and respectful.

---

### SCL-015: Tone — Emotional Balance
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify warnings framed positively | "Cần chú ý" not "Nguy hiểm" |
| 2 | Verify hope present | Always ends optimistically |
| 3 | Verify no fear-mongering | No catastrophic predictions |
| 4 | Verify empowerment | User has agency |

**Pass Criteria:** Balanced, hopeful, empowering tone.

---

### SCL-016: Tone — Consistency Across 72 Pages
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Sample 10 pages | Different writers (if multiple) |
| 2 | Verify consistent voice | Same "personality" |
| 3 | Verify consistent formality | Same register |
| 4 | Verify consistent perspective | Same point of view |

**Pass Criteria:** Single consistent voice across all pages.

---

### SCL-017: Art. 320 — Disclaimer Present
**Type:** Compliance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all 72+ pages | Disclaimer visible |
| 2 | Verify wording | Contains "tham khảo" |
| 3 | Verify position | Footer or near content |
| 4 | Verify visibility | Not hidden |

**Pass Criteria:** All pages have visible Art. 320 disclaimer.

---

### SCL-018: Art. 320 — Forbidden Terms
**Type:** Compliance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Search all pages for "tiên đoán" | Zero occurrences |
| 2 | Search for "tiên tri" | Zero occurrences |
| 3 | Search for "đoán trước" | Zero occurrences |
| 4 | Search for absolute claims | No "chắc chắn", "100%" |

**Pass Criteria:** Zero forbidden terms across all pages.

---

### SCL-019: Art. 320 — Language Softening
**Type:** Compliance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify predictive verbs | "có thể", "nên", "nên cân nhắc" |
| 2 | Verify probability language | "khả năng cao", "có xu hướng" |
| 3 | Verify advice framing | Suggestions, not commands |
| 4 | Verify conditional statements | "Nếu... thì..." |

**Pass Criteria:** Softened, advisory language throughout.

---

### SCL-020: Art. 320 — Automated Compliance Check
**Type:** Automation
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `npm run test:compliance` | Script executes |
| 2 | Verify pattern matching | Regex for forbidden terms |
| 3 | Verify all pages scanned | 100% coverage |
| 4 | Verify CI gate | Build fails on violation |
| 5 | Verify report | Violations listed with file/line |

**Pass Criteria:** Automated compliance gate in CI.

---

### SCL-021: Specific Stars Cited
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Sample 10 pages | Random |
| 2 | Count star mentions | ≥5 unique stars per page |
| 3 | Verify star names | Tử Vi, Thiên Cơ, Thái Dương, etc. |
| 4 | Verify star context | Explained in relation to user |

**Pass Criteria:** Specific stars cited with meaning.

---

### SCL-022: Star Accuracy
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Select known birth chart | e.g., Tý Nam 1990 |
| 2 | Calculate expected stars | Manual or iztro reference |
| 3 | Verify page content | Mentions correct stars for that chart |
| 4 | Verify palace placement | Stars in correct palaces |

**Pass Criteria:** Star references astrologically accurate.

---

### SCL-023: Star Variety
**Type:** Content Quality
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Sample 20 pages | Random |
| 2 | Extract all star mentions | List unique stars |
| 3 | Verify coverage | ≥20 different stars mentioned |
| 4 | Verify no over-reliance | No single star dominates |

**Pass Criteria:** Rich variety of star references.

---

### SCL-024: Schema — Article Present
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | JSON-LD present |
| 2 | Verify @type | "Article" |
| 3 | Verify headline | Matches H1 |
| 4 | Verify author | Present |
| 5 | Verify dateModified | Present |

**Pass Criteria:** Valid Article schema on all pages.

---

### SCL-025: Schema — FAQPage Present
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | FAQPage JSON-LD present |
| 2 | Verify @type | "FAQPage" |
| 3 | Count questions | ≥3 per page |
| 4 | Verify Q&A pairs | Relevant to animal/year/gender |

**Pass Criteria:** Valid FAQPage with 3+ relevant questions.

---

### SCL-026: Schema — BreadcrumbList
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | BreadcrumbList present |
| 2 | Verify trail | Home > Tử Vi > [Animal] > [Year] > [Gender] |
| 3 | Verify URLs | Absolute, correct |

**Pass Criteria:** Valid breadcrumb on all pages.

---

### SCL-027: Schema — inLanguage
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all JSON-LD | inLanguage field |
| 2 | Verify value | "vi" |
| 3 | Verify no "en" | Zero English language codes |

**Pass Criteria:** All schema has `inLanguage: "vi"`.

---

### SCL-028: Meta Title
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | Title present |
| 2 | Verify length | 50–60 characters |
| 3 | Verify pattern | "Tử Vi [Animal] [Year] [Gender] — [Benefit]" |
| 4 | Verify uniqueness | No duplicate titles |

**Pass Criteria:** All titles optimized and unique.

---

### SCL-029: Meta Description
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | Description present |
| 2 | Verify length | 150–160 characters |
| 3 | Verify CTA | Contains call-to-action |
| 4 | Verify uniqueness | No duplicate descriptions |

**Pass Criteria:** All descriptions optimized and unique.

---

### SCL-030: OG/Twitter Tags
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | og:title, og:description present |
| 2 | Verify twitter:card | "summary_large_image" |
| 3 | Verify og:type | "article" |
| 4 | Verify og:locale | "vi_VN" |

**Pass Criteria:** Social tags present and correct.

---

### SCL-031: H1 Formula Compliance
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check all pages | H1 present |
| 2 | Verify pattern | [Action] + [Keyword] + [Benefit] |
| 3 | Example check | "Xem Tử Vi Tuổi Tý 2026 — Dự Đoán Chính Xác, Tư Vấn Tận Tâm" |
| 4 | Verify length | 20–70 characters |

**Pass Criteria:** All H1s follow formula.

---

### SCL-032: H1 Uniqueness
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Extract all H1s | Script |
| 2 | Check duplicates | Zero duplicates |
| 3 | Verify animal/year/gender | All variables included |

**Pass Criteria:** Every page has unique H1.

---

### SCL-033: H1 Keyword Inclusion
**Type:** SEO
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Verify "tử vi" in all H1s | 100% |
| 2 | Verify animal name in H1 | 100% |
| 3 | Verify year in H1 | 100% |

**Pass Criteria:** Primary keywords in every H1.

---

### SCL-034: No Western Astrology Terms
**Type:** Compliance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Search all pages for "zodiac" | Zero |
| 2 | Search for "horoscope" | Zero |
| 3 | Search for "sun sign" | Zero |
| 4 | Search for "ascendant" | Zero |
| 5 | Search for "rising sign" | Zero |

**Pass Criteria:** Zero Western astrology terms.

---

### SCL-035: No Western Astrology Concepts
**Type:** Compliance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Search for "cung hoàng đạo" | Zero |
| 2 | Search for "dấu hiệu mặt trời" | Zero |
| 3 | Search for "cung mọc" | Zero |
| 4 | Verify all references | Eastern zodiac (Tý, Sửu, etc.) |

**Pass Criteria:** Only Eastern astrology terminology.

---

### SCL-036: Automated Western Term Check
**Type:** Automation
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `npm run test:western-terms` | Script executes |
| 2 | Verify blacklist | 20+ forbidden terms |
| 3 | Verify all pages | 100% scanned |
| 4 | Verify CI gate | Build fails on violation |

**Pass Criteria:** Automated Western term gate in CI.

---

## Regression Tests

| Test | Description | Priority |
|------|-------------|----------|
| REG-001 | Existing 12-24 pages still pass | P0 |
| REG-002 | Build performance | P0 |
| REG-003 | Mobile layout | P0 |
| REG-004 | Schema validation | P0 |

---

*Total: 36 test cases*
