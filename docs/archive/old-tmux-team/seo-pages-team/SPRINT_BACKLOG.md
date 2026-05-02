# SEO Pages Team - Sprint Backlog

**Owned by:** SM
**Current Sprint:** Sprint 3
**Last Updated:** 2026-05-02
**Status:** EMERGENCY REPLANNING - Boss directive received

---

## Sprint Goal (UPDATED)

**Fill all SEO pages with REAL CONTENT.** Every page must have substantive, unique text instead of "Nội dung chi tiết đang được biên soạn" placeholders. Priority order: Star pages → Que pages → Forecast pages.

**STOP:** All iztro chart work, Cloudflare migration, PostgreSQL setup.
**REASON:** Boss confirmed team purpose is SEO content pages only. Horoscope app already exists separately.

---

## Sprint Items (REPRIORITIZED)

### P0 (MUST HAVE - Boss Directive)

#### STORY-022: Star Pages Real Content (20 pages)
**Owner:** BE + FE
**Status:** Not started
**Priority:** P0

**Description:**
Replace placeholder text on all 20 star pages with real, substantive content about each sao in Tử Vi.

**Pages to fill:**
- /sao/tu-vi (Tử Vi)
- /sao/thien-co (Thiên Cơ)
- /sao/thai-duong (Thái Dương)
- /sao/vu-khuc (Vũ Khúc)
- /sao/thien-dong (Thiên Đồng)
- /sao/liem-trinh (Liêm Trinh)
- /sao/thien-phu (Thiên Phủ)
- /sao/thai-am (Thái Âm)
- /sao/tham-lang (Tham Lang)
- /sao/cu-mon (Cự Môn)
- /sao/thien-luong (Thiên Lương)
- /sao/pha-quan (Phá Quân)
- /sao/ta-phu (Tả Phù)
- /sao/huu-bat (Hữu Bật)
- /sao/thien-khoi (Thiên Khôi)
- /sao/thien-viet (Thiên Việt)
- /sao/van-xuong (Văn Xương)
- /sao/van-khuc (Văn Khúc)
- /sao/thien-ma (Thiên Mã)
- /sao/thien-hinh (Thiên Hình)

**Content Requirements per page:**
- [ ] Minimum 800-1200 words
- [ ] Real information about the star (not placeholder)
- [ ] What the star means in Tử Vi
- [ ] Characteristics of people with this star
- [ ] Which palace it affects
- [ ] Combinations with other stars
- [ ] Practical advice
- [ ] "Thầy bói nói chuyện" tone
- [ ] Art. 320 compliance: include "tham khảo" disclaimer

**Acceptance Criteria:**
- [ ] All 20 pages have real content (not placeholders)
- [ ] Each page has at least 5 sections (H2s)
- [ ] Content is accurate for Vietnamese Tử Vi
- [ ] No Western astrology terms
- [ ] QA validates content quality

---

#### STORY-023: Que Pages Real Content (6 pages)
**Owner:** BE + FE
**Status:** Not started
**Priority:** P0

**Description:**
Replace placeholder text on all 6 que pages with real Kinh Dịch content.

**Pages to fill:**
- /que/1-kien-vi-thien (Kiển Vi Thiên)
- /que/2-khon-vi-dia (Khôn Vi Địa)
- /que/3-ton-vi-loi (Trùn Vi Lôi)
- /que/4-mong-vi-thuy (Mông Vi Thủy)
- /que/5-tung-vi-thuy (Tống Vi Thủy)
- /que/6-tung-vi-thien (Tống Vi Thiên)

**Content Requirements per page:**
- [ ] Minimum 800-1200 words
- [ ] Real Kinh Dịch meaning
- [ ] Judgment/interpretation
- [ ] Practical application (work, love, finance, health)
- [ ] Advice for the querent
- [ ] Changing lines explanation
- [ ] "Thầy bói nói chuyện" tone
- [ ] Art. 320 compliance

**Acceptance Criteria:**
- [ ] All 6 pages have real content
- [ ] Each page has at least 5 sections (H2s)
- [ ] Content is accurate for Kinh Dịch
- [ ] QA validates content quality

---

#### STORY-024: Forecast Pages Real Content (96 pages)
**Owner:** BE + FE
**Status:** Not started
**Priority:** P0

**Description:**
Replace placeholder text on all birth-year forecast pages with real forecasts.

**Pages to fill:** 12 animals × 4 years × 2 genders = 96 pages

**Content Requirements per page:**
- [ ] Minimum 800-1200 words
- [ ] Overview for the specific animal/year/gender
- [ ] Career forecast
- [ ] Love/relationship forecast
- [ ] Health forecast
- [ ] Finance forecast
- [ ] General advice for the year
- [ ] "Thầy bói nói chuyện" tone
- [ ] Art. 320 compliance

**Acceptance Criteria:**
- [ ] All 96 pages have real content
- [ ] Each page has at least 5 sections (H2s)
- [ ] Content varies by animal/year/gender (not identical)
- [ ] QA validates content quality and uniqueness

---

### P1 (SHOULD HAVE)

#### STORY-016: H1 Optimization
**Owner:** FE
**Status:** Not started

**Description:**
Optimize H1s across all page types using formula: [action] + [keyword] + [benefit].

**Acceptance:**
- [ ] All pages have optimized H1s

---

### P2 (QUICK WINS)

#### STORY-015: HTML lang='vi' Verification
**Owner:** FE
**Status:** Already done

#### STORY-019: Trust Signals
**Owner:** FE
**Status:** Partially done (ReadingProcess component exists)

---

### CANCELLED / DEFERRED

#### STORY-011b: iztro UI Rendering
**Status:** CANCELLED per Boss directive
**Reason:** Team purpose is SEO content pages, not horoscope app

#### Cloudflare + PostgreSQL Migration
**Status:** DEFERRED to future sprint
**Reason:** Not needed for content-focused work

#### STORY-012b: Birth-Year Content Pipeline (72+ pages)
**Status:** REPLACED by STORY-024
**Reason:** Need real content first, pipeline second

---

## Sprint Progress

| Story | Assignee | Status | Notes |
|-------|----------|--------|-------|
| STORY-022 | BE/FE | Not started | 20 star pages need real content |
| STORY-023 | BE/FE | Not started | 6 que pages need real content |
| STORY-024 | BE/FE | Not started | 96 forecast pages need real content |
| STORY-016 | FE | Not started | H1 optimization |
| STORY-015 | FE | Done | Already implemented |
| STORY-019 | FE | Partial | ReadingProcess component done |
| STORY-011b | FE | CANCELLED | Boss directive |
| Cloudflare | BE | DEFERRED | Not needed now |

---

## Definition of Done Checklist

For each story:
- [ ] Real content implemented (no placeholders)
- [ ] Minimum word count met (800-1200 words/page)
- [ ] Art. 320 compliance ("tham khảo" visible)
- [ ] TL code review approved
- [ ] QA content validation passed
- [ ] Lint and build pass
- [ ] PO accepts

---

## Boss Directive Log

**2026-05-02 08:15** - Boss clarified team purpose:
- "Toan bo team nay focus vao lam cac trang de lam SEO cho tuvi"
- lap-la-so stays mock (Boss has separate app)
- All focus on content pages with real text
- Stop all technical infrastructure work

---

## Next Steps

1. SM to distribute STORY-022, 023, 024 to BE/FE
2. TL to create technical approach for content storage (JSON/TS files acceptable for now)
3. BE to generate real content for all pages
4. FE to integrate content into page templates
5. QA to validate content quality
6. PO to review and accept
