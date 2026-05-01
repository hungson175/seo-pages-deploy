# STORY-017 Test Cases — Internal Linking (Stretch)

**Story ID:** STORY-017
**Priority:** Stretch
**Sprint:** Sprint 3
**Description:** Validate 10+ related internal links per page for SEO and user engagement

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | 10+ internal links per page | LINK-001 — LINK-003 |
| AC-002 | Links contextually relevant | LINK-004 — LINK-006 |
| AC-003 | Anchor text optimized | LINK-007 — LINK-009 |
| AC-004 | No broken links | LINK-010 — LINK-012 |
| AC-005 | Link distribution balanced | LINK-013 — LINK-015 |

---

## Test Cases

### LINK-001: Link Count — Homepage
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load homepage | Page renders |
| 2 | Count internal links | ≥10 |
| 3 | Exclude nav/footer (optional) | Content links ≥5 |

**Pass Criteria:** Sufficient internal links.

---

### LINK-002: Link Count — Forecast Pages
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load forecast page | e.g., /tuvi/tuoi-ty-1984-nam/ |
| 2 | Count internal links | ≥10 |
| 3 | Verify related forecasts | Links to other animals/years |

**Pass Criteria:** ≥10 links including related content.

---

### LINK-003: Link Count — Tool Pages
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /lap-la-so/ | Page renders |
| 2 | Count internal links | ≥10 |
| 3 | Verify tool links | Links to que, forecasts |

**Pass Criteria:** Tool page well-connected.

---

### LINK-004: Contextual Relevance — Forecast
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load Tý 1984 Nam page | Content loaded |
| 2 | Check related links | Tý 1996, Sửu 1984, etc. |
| 3 | Verify relevance | Same animal or same year |
| 4 | Verify no random links | All related to astrology |

**Pass Criteria:** Links contextually relevant.

---

### LINK-005: Contextual Relevance — Que
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load que page | e.g., /que/1-kien-vi-thien/ |
| 2 | Check related links | Other ques, forecasts |
| 3 | Verify thematic relevance | All divination-related |

**Pass Criteria:** Links thematically consistent.

---

### LINK-006: Contextual Relevance — Tool
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load /lap-la-so/ | Page renders |
| 2 | Check links | Forecast pages, que pages |
| 3 | Verify user journey | Natural next steps |

**Pass Criteria:** Links guide user journey.

---

### LINK-007: Anchor Text — Descriptive
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect link texts | Not "click here" |
| 2 | Verify keyword inclusion | Target page keyword |
| 3 | Verify natural language | Readable sentence |

**Pass Criteria:** Descriptive, keyword-rich anchors.

---

### LINK-008: Anchor Text — Variety
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check multiple links to same page | If any |
| 2 | Verify different anchors | Not identical |
| 3 | Verify natural variation | Synonyms, contexts |

**Pass Criteria:** Varied anchor text.

---

### LINK-009: Anchor Text — No Over-Optimization
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check exact match anchors | < 50% |
| 2 | Verify branded anchors | Some "Bói Toán" etc. |
| 3 | Verify generic anchors | Some "xem thêm", "tìm hiểu" |

**Pass Criteria:** Natural anchor distribution.

---

### LINK-010: Broken Link Check
**Type:** Functional
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run link checker | All internal links |
| 2 | Verify 200 responses | All reachable |
| 3 | Verify no 404s | Zero broken links |
| 4 | Verify no redirects | Direct links preferred |

**Pass Criteria:** Zero broken internal links.

---

### LINK-011: Broken Link Automation
**Type:** Automation
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Run `npm run test:links` | Script executes |
| 2 | Verify coverage | All pages scanned |
| 3 | Verify CI gate | Build fails on 404 |

**Pass Criteria:** Automated link checking in CI.

---

### LINK-012: External Links — Nofollow
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Find external links | If any |
| 2 | Verify rel="nofollow" | Present |
| 3 | Verify opens new tab | `target="_blank"` |

**Pass Criteria:** External links properly attributed.

---

### LINK-013: Link Distribution — Homepage
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Count links to forecasts | ≥3 |
| 2 | Count links to tools | ≥2 |
| 3 | Count links to ques | ≥2 |
| 4 | Count links to content | ≥3 |

**Pass Criteria:** Balanced link distribution.

---

### LINK-014: Link Distribution — Forecast
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Count links to related forecasts | ≥5 |
| 2 | Count links to tools | ≥2 |
| 3 | Count links to homepage | ≥1 |
| 4 | Count links to que | ≥2 |

**Pass Criteria:** Related content prominently linked.

---

### LINK-015: Deep Link Ratio
**Type:** SEO
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Count homepage links | < 30% of total |
| 2 | Count deep page links | > 70% to content pages |
| 3 | Verify orphan pages | Zero pages with 0 links |

**Pass Criteria:** Deep pages well-linked.

---

## Regression Tests

| Test | Description | Priority |
|------|-------------|----------|
| REG-001 | Existing links still work | P0 |
| REG-002 | No link count regressions | P0 |

---

*Total: 15 test cases (Stretch Goal)*
