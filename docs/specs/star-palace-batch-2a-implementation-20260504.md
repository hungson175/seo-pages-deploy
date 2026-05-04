# Star×Cung Batch 2A Implementation Slice — 2026-05-04

## Objective

Ship the first narrowly approved Batch 2A star×cung SEO slice after the real Tử Vi shell launch, without broad route ungating or production deploy. The slice adds four new indexable combinations that both Bói-Toán and SEO approved as code-ready:

1. `Tử Vi × Quan Lộc` — `/sao/tu-vi/cung/quan-loc/`
2. `Thái Dương × Mệnh` — `/sao/thai-duong/cung/menh/`
3. `Thái Âm × Mệnh` — `/sao/thai-am/cung/menh/`
4. `Vũ Khúc × Mệnh` — `/sao/vu-khuc/cung/menh/`

Existing approved page stays live in the allow-list:

- `Tử Vi × Mệnh` — `/sao/tu-vi/cung/menh/`

## Explicit gates

- No production deploy from this branch until Reviewer + Bói-Toán + SEO carry-forward approve the exact commit.
- No broad source expansion: Batch 2B remains gated because several stars are not in `PRIORITY_STAR_SLUGS`.
- Sensitive/gated combinations remain blocked: `Tham Lang×Phu Thê`, `Thất Sát×Mệnh`, `Phá Quân×Mệnh`, `Liêm Trinh×Phu Thê`, any `Tật Ách`, any `Tử Nữ`, `Thất Sát×Phu Thê`, `Phá Quân×Phu Thê`.
- `Liêm Trinh×Mệnh` stays Batch 2B and needs special Reviewer language check before any future publish.
- Every page must include `tham khảo`, `không phải lời tiên đoán`, Tam Hợp Phái / 《紫微斗数全书》 method framing, and tam phương tứ chính context.

## Implementation summary

- `src/content/star-palace-approved.json` allow-lists exactly 5 approved combinations: the previous `Tử Vi×Mệnh` plus Batch 2A four pages.
- `src/content/star-palace.ts` adds unique, reviewed-content-ready profiles for the four Batch 2A pages. Each page is above the 1,500-word SEO depth target.
- Star-palace `dateModified` / sitemap `<lastmod>` is set to the actual content update date: `2026-05-04`.
- The canonical compliance validator now permits the technical phrase `xác định Mệnh Cung` without falsely flagging fatalistic `định mệnh`.

## Word-count evidence

| Page | URL | Rendered words |
|---|---:|---:|
| Tử Vi × Mệnh | `/sao/tu-vi/cung/menh/` | 1,675 |
| Tử Vi × Quan Lộc | `/sao/tu-vi/cung/quan-loc/` | 2,172 |
| Thái Dương × Mệnh | `/sao/thai-duong/cung/menh/` | 2,035 |
| Thái Âm × Mệnh | `/sao/thai-am/cung/menh/` | 2,015 |
| Vũ Khúc × Mệnh | `/sao/vu-khuc/cung/menh/` | 2,053 |

## Internal-link matrix

Each new page must avoid orphaning and link to its star hub, palace hub, approved sibling where useful, and chart CTA.

| New page | Star hub | Palace hub | Approved sibling/context | CTA |
|---|---|---|---|---|
| `/sao/tu-vi/cung/quan-loc/` | `/sao/tu-vi/` | `/cung/quan-loc/` | `/sao/tu-vi/cung/menh/` | `/lap-la-so/` |
| `/sao/thai-duong/cung/menh/` | `/sao/thai-duong/` | `/cung/menh/` | `/sao/tu-vi/cung/menh/` | `/lap-la-so/` |
| `/sao/thai-am/cung/menh/` | `/sao/thai-am/` | `/cung/menh/` | `/sao/tu-vi/cung/menh/` | `/lap-la-so/` |
| `/sao/vu-khuc/cung/menh/` | `/sao/vu-khuc/` | `/cung/menh/` | `/sao/tu-vi/cung/menh/` | `/lap-la-so/` |

Automated assertions cover required star hub, palace hub, and `/lap-la-so/` links for every approved page. Hub backlinks are generated from the same allow-list via `getApprovedStarPalaceLinksForStar()` and `getApprovedStarPalaceLinksForPalace()`.

## Baseline keyword tracking before publish

Record baseline before any production deploy. If rank is not visible, write `not in top 100` rather than guessing.

| URL | Target keyword | Baseline SERP position | 14-day delta target |
|---|---|---:|---:|
| `/sao/tu-vi/cung/quan-loc/` | `sao tử vi ở cung quan lộc` | TBD before deploy | +impressions / indexed |
| `/sao/thai-duong/cung/menh/` | `sao thái dương ở cung mệnh` | TBD before deploy | +impressions / indexed |
| `/sao/thai-am/cung/menh/` | `sao thái âm ở cung mệnh` | TBD before deploy | +impressions / indexed |
| `/sao/vu-khuc/cung/menh/` | `sao vũ khúc ở cung mệnh` | TBD before deploy | +impressions / indexed |

## GSC Day-7 checkpoint after publish

At Day 7 after deployment, check:

1. `star-palace.xml` submitted/seen in GSC.
2. URL Inspection on 2–3 sample Batch 2A URLs.
3. Index coverage state for all 4 new URLs.
4. Impressions/clicks/position for target keywords.
5. `Discovered - currently not indexed` or crawl anomalies.
6. Whether internal links from `/sao/*`, `/cung/*`, and `/lap-la-so/` are crawled.

## Test plan

Focused checks already added/updated:

- `tests/star-palace-template.test.ts`
  - exact Batch 2A allow-list
  - gated Batch 2B/sensitive combos stay blocked
  - word-count depth ≥ 1,500
  - canonical compliance validator has no deterministic-language errors
  - `tham khảo`, `không phải lời tiên đoán`, `Tam Hợp Phái`, tam phương context
  - no `Tử Tức` / `子息` / `tu_tuc` leaks
  - required internal links to `/sao/*`, `/cung/*`, `/lap-la-so/`
  - sitemap/root sitemap allow-list parity
- `tests/sitemap-parity.test.ts`
  - generated `public/star-palace.xml` exactly matches `star-palace-approved.json`
- `src/lib/compliance/__tests__/policy.test.ts`
  - permits `xác định Mệnh Cung` while still rejecting fatalistic `định mệnh` claims
- `e2e/core-pages.spec.ts`
  - approved Batch 2A route renders and unapproved route remains 404-gated

Required before handoff: `npm test`, `npm run build`; optional after local server: `npx playwright test e2e/core-pages.spec.ts`.
