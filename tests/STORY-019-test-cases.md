# STORY-019 Test Cases — Trust Signals

**Story ID:** STORY-019
**Priority:** P2
**Sprint:** Sprint 3
**Description:** Validate trust signals for E-E-A-T compliance — Art.320 disclaimers, expert credentials, dateModified, social proof

---

## Acceptance Criteria

| AC | Description | Test Cases |
|----|-------------|------------|
| AC-001 | Art.320 disclaimer visible | TRUST-001 — TRUST-003 |
| AC-002 | dateModified in schema | TRUST-004 — TRUST-006 |
| AC-003 | Author/expert credentials | TRUST-007 — TRUST-010 |
| AC-004 | Social proof (when implemented) | TRUST-011 — TRUST-013 |
| AC-005 | Contact information | TRUST-014 — TRUST-016 |
| AC-006 | Secure connection (HTTPS) | TRUST-017 — TRUST-018 |
| AC-007 | Privacy policy link | TRUST-019 — TRUST-020 |

---

## Test Cases

### TRUST-001: Art.320 Disclaimer — All Pages
**Type:** Compliance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load homepage | Disclaimer visible |
| 2 | Load /lap-la-so/ | Disclaimer visible |
| 3 | Load /tuvi/* | Disclaimer visible |
| 4 | Load /que/* | Disclaimer visible |
| 5 | Verify wording | Contains "tham khảo" |

**Pass Criteria:** Disclaimer on all pages.

---

### TRUST-002: Art.320 Disclaimer — Position
**Type:** Compliance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect page layout | Disclaimer location |
| 2 | Verify visibility | Not hidden, clearly readable |
| 3 | Verify proximity | Near content or in footer |
| 4 | Verify font size | ≥12px |

**Pass Criteria:** Disclaimer clearly visible.

---

### TRUST-003: Art.320 Disclaimer — Wording
**Type:** Compliance
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Read disclaimer text | Vietnamese |
| 2 | Verify "tham khảo" | Present |
| 3 | Verify no absolute claims | No "chắc chắn", "100%" |
| 4 | Verify cultural respect | Appropriate tone |

**Pass Criteria:** Proper disclaimer wording.

---

### TRUST-004: dateModified in Article Schema
**Type:** SEO / Trust
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect JSON-LD | Article schema |
| 2 | Verify dateModified field | Present |
| 3 | Verify format | ISO 8601 (YYYY-MM-DD) |
| 4 | Verify date is recent | Not outdated |

**Pass Criteria:** dateModified present and current.

---

### TRUST-005: dateModified Accuracy
**Type:** SEO / Trust
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check build date | When page was generated |
| 2 | Verify dateModified matches | Build date |
| 3 | Verify updates reflected | New build = new date |

**Pass Criteria:** dateModified reflects actual page age.

---

### TRUST-006: datePublished Present
**Type:** SEO / Trust
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect JSON-LD | Article schema |
| 2 | Verify datePublished | Present |
| 3 | Verify ≤ dateModified | Published before modified |

**Pass Criteria:** Both dates present and logical.

---

### TRUST-007: Author Name in Schema
**Type:** E-E-A-T
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect JSON-LD | Author field |
| 2 | Verify @type | "Person" or "Organization" |
| 3 | Verify name | Present |
| 4 | Verify on all content pages | 100% coverage |

**Pass Criteria:** Author identified in schema.

---

### TRUST-008: Author Bio (When Implemented)
**Type:** E-E-A-T
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check author page or section | Bio present |
| 2 | Verify credentials | "Chuyên gia phong thủy" etc. |
| 3 | Verify photo | Real person or avatar |
| 4 | Verify expertise statement | Brief background |

**Pass Criteria:** Author credentials visible.

---

### TRUST-009: Organization Schema
**Type:** E-E-A-T
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect JSON-LD | Organization or Publisher |
| 2 | Verify name | Site/brand name |
| 3 | Verify logo | Logo URL present |
| 4 | Verify URL | Site URL |

**Pass Criteria:** Organization identified.

---

### TRUST-010: Expert Credentials on Page
**Type:** E-E-A-T
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect content | Expert mention |
| 2 | Verify credentials | "Chuyên gia", "thầy" etc. |
| 3 | Verify expertise area | Phong thủy, tử vi |
| 4 | Verify not fabricated | Plausible credentials |

**Pass Criteria:** Expert credentials mentioned.

---

### TRUST-011: Social Proof — User Count
**Type:** Trust
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check for user count | "Đã có X người sử dụng" |
| 2 | Verify number | Real or estimated |
| 3 | Verify visibility | Above fold or prominent |

**Pass Criteria:** Social proof visible (when implemented).

---

### TRUST-012: Social Proof — Testimonials
**Type:** Trust
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check for testimonials | User quotes |
| 2 | Verify authenticity | Realistic names/comments |
| 3 | Verify variety | Multiple users |
| 4 | Verify no fakes | Plausible, not generic |

**Pass Criteria:** Testimonials authentic (when implemented).

---

### TRUST-013: Social Proof — Ratings
**Type:** Trust
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check for star ratings | If implemented |
| 2 | Verify schema | AggregateRating |
| 3 | Verify review count | Realistic number |

**Pass Criteria:** Ratings structured data valid.

---

### TRUST-014: Contact Information
**Type:** Trust
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check footer | Contact info |
| 2 | Verify email or form | Present |
| 3 | Verify response promise | "Phản hồi trong 24h" etc. |

**Pass Criteria:** Contact method available.

---

### TRUST-015: About Page
**Type:** Trust
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check /about/ or /gioi-thieu/ | Page exists |
| 2 | Verify mission statement | Present |
| 3 | Verify team info | If applicable |
| 4 | Verify history | When site started |

**Pass Criteria:** About page builds trust.

---

### TRUST-016: Physical Address (If Applicable)
**Type:** Trust
**Priority:** P2

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check for address | Vietnam location |
| 2 | Verify in schema | LocalBusiness if applicable |

**Pass Criteria:** Location transparent (if applicable).

---

### TRUST-017: HTTPS on All Pages
**Type:** Trust
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Load homepage | `https://` |
| 2 | Load all page types | `https://` |
| 3 | Verify certificate | Valid, not expired |
| 4 | Verify redirect | HTTP → HTTPS |

**Pass Criteria:** All pages served over HTTPS.

---

### TRUST-018: No Mixed Content
**Type:** Trust
**Priority:** P0

| Step | Action | Expected |
|------|--------|----------|
| 1 | Inspect page resources | All loaded over HTTPS |
| 2 | Check images | `https://` |
| 3 | Check scripts | `https://` |
| 4 | Check stylesheets | `https://` |
| 5 | Verify console | No mixed content warnings |

**Pass Criteria:** Zero mixed content warnings.

---

### TRUST-019: Privacy Policy Link
**Type:** Trust / Compliance
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check footer | Privacy policy link |
| 2 | Verify link works | 200 OK |
| 3 | Verify content | GDPR/Vietnam privacy compliant |
| 4 | Verify last updated | Recent date |

**Pass Criteria:** Privacy policy accessible and current.

---

### TRUST-020: Terms of Service Link
**Type:** Trust / Compliance
**Priority:** P1

| Step | Action | Expected |
|------|--------|----------|
| 1 | Check footer | Terms link |
| 2 | Verify link works | 200 OK |
| 3 | Verify content | Standard terms |
| 4 | Verify disclaimer reference | Art. 320 mentioned |

**Pass Criteria:** Terms accessible and compliant.

---

## Regression Tests

| Test | Description | Priority |
|------|-------------|----------|
| REG-001 | Existing disclaimers still present | P0 |
| REG-002 | Schema still valid | P0 |
| REG-003 | HTTPS still enforced | P0 |

---

*Total: 20 test cases*
