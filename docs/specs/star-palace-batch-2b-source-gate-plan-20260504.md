# Star×Cung Batch 2B Source-Gate Plan — 2026-05-04

## Context

Batch 2A is live on OCI at exact SHA `d8c86e11` after SEO, Bói-Toán, Reviewer, and Gal approval. It opened four new pages and kept the total star×cung allow-list at five URLs including existing `Tử Vi×Mệnh`.

This document prepares the next content sprint without changing production code or opening routes.

## Batch 2B candidate set

Bói-Toán approved these four combinations as the Batch 2B backlog, but SEO flagged that they are **not code-ready** yet because their star foundation pages are not in `PRIORITY_STAR_SLUGS`:

| Candidate | Target URL | Current blocker | Extra review |
|---|---|---|---|
| Thiên Phủ × Mệnh | `/sao/thien-phu/cung/menh/` | `/sao/thien-phu/` currently redirects to `/tu-vi/` | Wealth/asset claims must stay non-deterministic |
| Cự Môn × Mệnh | `/sao/cu-mon/cung/menh/` | `/sao/cu-mon/` currently redirects to `/tu-vi/` | Avoid legal/professional deterministic claims |
| Thiên Đồng × Mệnh | `/sao/thien-dong/cung/menh/` | `/sao/thien-dong/` currently redirects to `/tu-vi/` | Avoid health/longevity guarantees |
| Liêm Trinh × Mệnh | `/sao/liem-trinh/cung/menh/` | `/sao/liem-trinh/` currently redirects to `/tu-vi/` | **Special Reviewer check** for crime/violence/legal language |

## Scope decision proposal

Do **not** ship all 2B candidates in one undifferentiated batch.

Recommended split:

1. **Batch 2B-Foundation:** create safe, rich `/sao/*/` foundation pages for the four missing stars only. No star×cung URLs should be added to `star-palace-approved.json` in this foundation slice.
2. **Batch 2B-1:** after foundation review passes, publish three lower-risk combos: `Thiên Phủ×Mệnh`, `Cự Môn×Mệnh`, `Thiên Đồng×Mệnh`.
3. **Batch 2B-2:** publish `Liêm Trinh×Mệnh` only after a dedicated Reviewer + Bói-Toán language review passes.

Rationale: the internal-link matrix requires every star×cung page to link to `/sao/{star}/`. Opening a star×cung page before its star hub is safe/indexable would create either orphaning or a link to a redirected/gated page.

## Non-negotiable gates

- No broad `PRIORITY_STAR_SLUGS` expansion without full 1,500+ word foundation pages and tests.
- No `star-palace-approved.json` expansion until the matching `/sao/{star}/` page is live-ready.
- No `Tật Ách`, `Tử Nữ`, Phu Thê violent/crime-risk, or non-approved combinations.
- Every new page must include:
  - `tham khảo`
  - `không phải lời tiên đoán`
  - Tam Hợp Phái / 《紫微斗数全书》 method framing
  - tam phương tứ chính context when reading star×cung
  - no deterministic health, death, finance, legal, crime, violence, giải hạn, or guarantee phrasing
- Liêm Trinh content must get a named Reviewer special check before merge.
- Production deploy remains separate and must use OCI only, not Vercel.

## Implementation checklist — Batch 2B-Foundation

Code scope:

- Expand `PRIORITY_STAR_SLUGS` narrowly with exactly:
  - `thien-phu`
  - `cu-mon`
  - `thien-dong`
  - `liem-trinh`
- Add safe `STAR_PROFILES` entries for those four stars in `src/content/stars.ts`.
- Keep `src/content/star-palace-approved.json` unchanged during the foundation slice.
- Regenerate `public/stars.xml`; do **not** change `public/star-palace.xml` in foundation slice except by generator parity if unchanged.

Tests to add/update:

- `tests/star-pages.test.ts`
  - updated explicit priority allow-list count/order
  - every new star foundation page has 1,500+ words
  - Article 320 method/disclaimer copy visible
  - forbidden deterministic/legal/health/finance/crime/violence patterns absent
- `tests/sitemap-parity.test.ts`
  - `stars.xml` exactly matches expanded `PRIORITY_STAR_SLUGS`
  - non-priority legacy stars still redirect
- `e2e/core-pages.spec.ts`
  - one representative new foundation page 200/indexable and has CTA/internal links
- Existing `star-palace-template.test.ts`
  - confirms 2B star×cung URLs remain gated until the next slice

## Implementation checklist — Batch 2B-1

Only after foundation slice passes Reviewer + SEO + Bói-Toán:

- Add reviewed star×cung draft profiles for:
  - `thien-phu:menh`
  - `cu-mon:menh`
  - `thien-dong:menh`
- Add those three combinations to `src/content/star-palace-approved.json`.
- Set star-palace page and sitemap lastmod to actual content update date.
- Update implementation spec with:
  - internal-link matrix
  - baseline keyword table
  - GSC Day-7 checkpoint
  - 14-day keyword delta table

Tests:

- all Batch 2A + 2B-1 approved URLs 200/indexable
- `star-palace.xml` exact allow-list count
- gated Batch 2B-2 `liem-trinh×menh` still 404 until special review
- all sensitive/gated combos still 404
- no `Tử Tức`/`tu_tuc`/`子息`
- no deterministic / legal / finance / health guarantees

## Implementation checklist — Batch 2B-2 Liêm Trinh

Only after dedicated Bói-Toán + Reviewer special review:

- Add `liem-trinh:menh` profile and allow-list entry.
- Copy constraints:
  - Frame Liêm Trinh as integrity, boundaries, discipline, accountability, and self-management.
  - Avoid crime accusation language, punishment claims, violence imagery, legal-outcome language, or deterministic moral judgment.
  - Avoid claims like “dễ phạm pháp”, “dính tù tội”, “chắc chắn kiện tụng”, or “số có án”.
- Require focused tests for these banned patterns.

## Post-deploy monitoring continuity from Batch 2A

Batch 2A was deployed before keyword baselines were captured. Treat this as an immediate post-deploy correction:

1. Create a baseline table now using GSC/keyword tool when available and mark date/time explicitly as post-deploy baseline.
2. Day-7 checkpoint for Batch 2A: 2026-05-11.
3. Check all five star×cung URLs:
   - index coverage
   - impressions/clicks/position
   - URL Inspection for 2–3 sample URLs
   - `Discovered - currently not indexed`
   - crawl anomalies
4. Compare 14-day movement on 2026-05-18.

Batch 2B must capture baseline **before** production deploy if possible.

## Open decisions for Gal

1. Approve docs-only Batch 2B-Foundation implementation slice?
2. Should Liêm Trinh foundation page be included in the first foundation slice, or isolated behind its own special review even before `/sao/liem-trinh/` exists?
3. Who owns Batch 2A keyword baseline/GSC Day-7 check: PO, SEO-consultant, or Gal dashboard?
