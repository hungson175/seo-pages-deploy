# Star×Cung Batch 2B-2 — Liêm Trinh×Mệnh Special-Review Prep

**Date:** 2026-05-04 (Asia/Ho_Chi_Minh)  
**Prepared by:** PO  
**Scope:** Planning and review-prep only. No route ungating, no content implementation, no sitemap change, no deploy.  
**Candidate URL:** `https://boitoan.com.vn/sao/liem-trinh/cung/menh/`  
**Current production state:** 404/gated. Must remain gated until dedicated Bói-Toán + Reviewer PASS and Gal approval.  
**Live release baseline:** `15eac297` has 8 approved star×cung pages; `Liêm Trinh×Mệnh` is not included.

## 1. Objective

Prepare the special-review frame for `Liêm Trinh×Mệnh` so the next implementation slice can be tightly scoped and safe. Liêm Trinh is approved as a **foundation star hub** (`/sao/liem-trinh/`) but the star×cung page requires extra review because common Tử Vi discourse can drift into crime, punishment, violence, legal-outcome, or deterministic moral-judgment language.

This document is not approval to publish the page.

## 2. Non-negotiable gates

Before adding `liem-trinh:menh` to `src/content/star-palace-approved.json` or `public/star-palace.xml`, all gates must be true:

- [ ] Gal approves moving from prep to implementation.
- [ ] Bói-Toán approves the domain framing and exact draft copy.
- [ ] Reviewer performs special check for crime/violence/legal/deterministic language.
- [ ] SEO confirms internal-link matrix, sitemap parity, canonical/indexability, and keyword baseline.
- [ ] Tests prove all other sensitive/non-Mệnh combos remain gated/404.
- [ ] No production deploy until separate OCI deploy approval.

## 3. Risk checklist

### 3.1 Content-risk areas

- [ ] Crime accusation language.
- [ ] Punishment, prison, criminal-case or lawsuit predictions.
- [ ] Violence imagery or aggressive moral labeling.
- [ ] Deterministic claims about character, fate, marriage, career, money, legal outcomes, or health.
- [ ] “Giải hạn” or guarantee phrasing.
- [ ] Medical, legal, financial advice or substitute-advice framing.
- [ ] Shame-based copy that labels a person as inherently bad, corrupt, dangerous, or untrustworthy.
- [ ] Over-reading one star in one palace without tam phương/tứ chính context.

### 3.2 Product/SEO-risk areas

- [ ] Accidental broad ungating of other Liêm Trinh star×cung URLs.
- [ ] Accidental sitemap inclusion before review.
- [ ] Missing `tham khảo` / `không phải lời tiên đoán` disclaimer.
- [ ] Missing tam phương context.
- [ ] Missing internal links to `/sao/liem-trinh/`, `/cung/menh/`, sibling Mệnh star×cung pages, and `/lap-la-so/`.
- [ ] Duplicate H1/title with `/sao/liem-trinh/` foundation page.
- [ ] Insufficient word count/depth versus current star×cung threshold.

## 4. Safe draft constraints

### 4.1 Allowed framing

Use Liêm Trinh as a reflective archetype for:

- Integrity and personal boundaries.
- Accountability and disciplined self-management.
- Taste, standards, discernment, and the need to align action with values.
- Ability to notice temptation, pressure, or conflict and respond with structure.
- The difference between charisma, self-protection, and over-control.
- Mệnh as self-observation and identity axis, not a fixed moral verdict.

### 4.2 Required context

Every section should reinforce:

- This is a single-star/single-palace lens for tham khảo.
- Actual reading needs Mệnh, Thân, tam phương tứ chính, Tứ Hóa, sát/cát tinh, đại hạn/tiểu hạn, and real-life context.
- Liêm Trinh in Mệnh should be read with neutral conditional language: “có xu hướng”, “dễ cần quan sát”, “nên kiểm tra thêm”, “trong một số bố cục”.
- Use `Tử Nữ`, never `Tử Tức`.

### 4.3 Banned or avoid-by-default wording

Do not use these or close variants in user-facing copy:

- `phạm pháp`, `tù tội`, `án`, `án tù`, `kiện tụng chắc chắn`, `hình phạt`, `tội lỗi`, `tội phạm`.
- `bạo lực`, `hung ác`, `nguy hiểm`, `tha hóa`, `dâm`, `đồi bại`, `xấu xa`.
- `chắc chắn`, `định mệnh`, `số phải`, `không tránh khỏi`, `ắt sẽ` when tied to negative outcomes.
- Any claim that the user will definitely have legal trouble, moral failure, divorce, disease, financial loss, or violent conflict.

If a traditional term must be referenced for domain accuracy, put it behind a neutral explanation and reviewer approval; do not headline or emphasize it.

## 5. Proposed safe page outline for later implementation

Do not implement until Gal approves. If approved, use an outline like:

1. H1: `Sao Liêm Trinh ở cung Mệnh: chính trực, ranh giới và cách tự quản mình`
2. Intro: Article 320 disclaimer + why single-star readings are only tham khảo.
3. “Liêm Trinh ở Mệnh nói về điều gì?” — neutral identity/discipline framing.
4. “Điểm mạnh cần quan sát” — standards, responsibility, discernment, personal boundaries.
5. “Điểm dễ lệch khi áp lực cao” — rigidity, self-criticism, sensitivity to fairness; no crime/legal predictions.
6. “Tam phương tứ chính cần xem kèm” — Mệnh with Tài Bạch, Quan Lộc, Thiên Di, Phúc Đức; do not conclude alone.
7. “Câu hỏi tự soi chiếu” — reflection prompts.
8. CTA: invite user to create full chart at `/lap-la-so/`.
9. FAQ with disclaimers and no deterministic promises.

## 6. Internal-link matrix for later implementation

If implemented, the page must link to:

| Target | Required href | Purpose |
|---|---|---|
| Star foundation | `/sao/liem-trinh/` | Anchor the star concept. |
| Palace foundation | `/cung/menh/` | Anchor Mệnh concept. |
| Approved sibling pages | `/sao/tu-vi/cung/menh/`, `/sao/thai-duong/cung/menh/`, `/sao/thai-am/cung/menh/`, `/sao/vu-khuc/cung/menh/`, `/sao/thien-phu/cung/menh/`, `/sao/cu-mon/cung/menh/`, `/sao/thien-dong/cung/menh/` | Prevent orphaning and support Mệnh cluster. |
| Tool CTA | `/lap-la-so/` | Convert to full chart flow. |
| Hub | `/tu-vi/` | Reinforce topic hub. |

## 7. Test plan for implementation slice

### 7.1 Required unit/integration assertions

- `liem-trinh:menh` appears in approved allow-list only after the implementation commit.
- `star-palace.xml` increases from 8 to 9 URLs only if this exact page is approved.
- `lastmod` is the actual implementation date, not copied blindly.
- Page word count meets `MIN_STAR_PALACE_WORDS`.
- Page has Article 320 phrasing: `tham khảo` and `không phải lời tiên đoán`.
- Page has tam phương/tứ chính context.
- Page includes required internal links from §6.
- Page contains zero `Tử Tức`, `tu_tuc`, `子息`.
- Page has no banned-pattern matches from §4.3.
- Other sensitive/gated examples remain 404:
  - `/sao/tham-lang/cung/phu-the/`
  - `/sao/that-sat/cung/menh/`
  - `/sao/pha-quan/cung/menh/`
  - `/sao/liem-trinh/cung/phu-the/`
  - `/sao/tu-vi/cung/tat-ach/`
  - `/sao/tu-vi/cung/tu-nu/`

### 7.2 Required browser/SEO assertions

- New URL returns 200 and is indexable only after approval.
- Canonical is exactly `https://boitoan.com.vn/sao/liem-trinh/cung/menh/`.
- H1 is unique and not identical to `/sao/liem-trinh/`.
- `star-palace.xml` exact URL count is 9 after approval; before approval it must remain 8.
- No generated/private reading route becomes indexable.
- Homepage P0 form remains above SEO content.

### 7.3 Suggested commands for implementation review

```bash
git diff --check
npm test
npm run build
npx playwright test e2e/core-pages.spec.ts e2e/seo-requirements.spec.ts
```

Add focused tests first, then content, then allow-list/sitemap change. If banned-pattern tests fail, edit copy; do not weaken tests without Reviewer approval.

## 8. Baseline keyword and GSC placeholders

| URL | Target keyword | Baseline date | Baseline source | Baseline position | Day-7 checkpoint | Day-14 checkpoint |
|---|---|---|---|---:|---|---|
| `/sao/liem-trinh/cung/menh/` | `sao liêm trinh cung mệnh` | TBD before deploy | GSC if page exists; otherwise manual SERP / SEO tool | TBD | Deploy + 7 days | Deploy + 14 days |

If implementation is approved, collect baseline before deployment where possible. Do not claim GSC baseline without verified GSC property and PO Editor-level access.

## 9. Handoff request for consultants

When Gal approves implementation prep to move forward, send this request:

- **Bói-Toán:** approve/adjust safe semantic framing for Liêm Trinh×Mệnh; confirm no domain accuracy issue with avoiding crime/legal deterministic language.
- **Reviewer:** special scan for banned patterns and deterministic/unsafe claims; verify no broad ungating.
- **SEO:** confirm keyword target, internal-link matrix, sitemap lastmod, and GSC baseline/checkpoint requirements.

## 10. Current decision

Recommended next step after Day-0 monitoring/GSC access checkpoint: ask Gal whether to open an implementation branch for `Liêm Trinh×Mệnh` under the constraints above. Until then, keep production and `master` unchanged.
