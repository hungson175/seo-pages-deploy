# Star×Cung Batch 2 synthesis — 2026-05-04 06:45 +07

Owner: PO. Scope: planning/synthesis only. No code changes, no route un-gating, no deploy.

## Inputs synthesized

- Bói-Toán domain approval: `/tmp/boi_toan_batch2_approval_20260504.txt`.
- SEO additions from Gal/SEO for Batch 2 shipping gates:
  - internal-link matrix for each new page → `/cung/*`, `/sao/*`, `/lap-la-so/`;
  - 7-day post-deploy GSC checkpoint for Batch 2 URLs;
  - baseline keyword tracking before publish and 14-day delta;
  - sitemap `<lastmod>` must equal actual content update date.
- SEO consultant final ranking: `/tmp/star_cung_batch2_seo_ranking_20260504.md`.
  - code-ready/search-first 2A: Tử Vi×Quan Lộc, Thái Dương×Mệnh, Thái Âm×Mệnh, Vũ Khúc×Mệnh;
  - dependency-gated 2B: Thiên Phủ×Mệnh, Cự Môn×Mệnh, Thiên Đồng×Mệnh, Liêm Trinh×Mệnh because current local source still gates star-palace generation through `PRIORITY_STAR_SLUGS`.

## Recommended Gal decision

Approve **Batch 2A implementation planning** for 4 pages first, then unlock **Batch 2B** only after the star foundation/source dependency is reviewed.

### Batch 2A — implementation-ready first slice

These use stars already in current local `PRIORITY_STAR_SLUGS`, have existing Batch 1 entity authority, and link cleanly to existing `/sao/*`, `/cung/*`, and `/lap-la-so/` pages.

| Priority | Combo | Planned URL | Why first | Domain caveat |
|---|---|---|---|---|
| 1 | Tử Vi × Quan Lộc | `/sao/tu-vi/cung/quan-loc/` | High-intent career/leadership query; natural continuation from Tử Vi×Mệnh and `/cung/quan-loc/`. | Career tendencies only; no guaranteed job, promotion, salary, or status outcome. Include Mệnh + Tài Bạch tam phương context. |
| 2 | Thái Dương × Mệnh | `/sao/thai-duong/cung/menh/` | Mệnh is highest-utility palace; Thái Dương already has Quan Lộc authority; strong identity/visibility intent. | Personality/visibility tendencies only; no fame or recognition guarantee. |
| 3 | Thái Âm × Mệnh | `/sao/thai-am/cung/menh/` | Complements Thái Dương; good internal pair for Mệnh education. | Inner-life/receptivity tendencies only; avoid specific emotional/psychological predictions. |
| 4 | Vũ Khúc × Mệnh | `/sao/vu-khuc/cung/menh/` | Connects existing Vũ Khúc×Tài Bạch to Mệnh; useful for action/discipline/resource-management learning. | Personality/action tendencies only; no guaranteed success or financial outcome. |

### Batch 2B — domain-approved, dependency-gated

These are approved by Bói-Toán for planning, but should not ship until source support is explicit. Current local star-palace code types combinations as `PriorityStarSlug`; the four stars below are present in legacy `STAR_CONTENT`/routes, but are not in local `PRIORITY_STAR_SLUGS`. Because SEO requires every new page to link to its `/sao/*` foundation page and avoid orphaning, PO should verify local build/source parity or add a narrow, reviewed foundation-page enablement before generating these pages.

| Priority | Combo | Planned URL | Dependency before ship | Domain caveat |
|---|---|---|---|---|
| 5 | Thiên Phủ × Mệnh | `/sao/thien-phu/cung/menh/` | Confirm `/sao/thien-phu/` source generation in current branch or add approved foundation support. | Stability/resource-management tendencies only; no guaranteed stability or wealth. |
| 6 | Cự Môn × Mệnh | `/sao/cu-mon/cung/menh/` | Confirm `/sao/cu-mon/` source generation in current branch or add approved foundation support. | Communication/analysis tendencies only; no legal or dispute outcome prediction. |
| 7 | Thiên Đồng × Mệnh | `/sao/thien-dong/cung/menh/` | Confirm `/sao/thien-dong/` source generation in current branch or add approved foundation support. | Harmony/comfort/wellbeing tendencies only; no guaranteed happiness or health. |
| 8 | Liêm Trinh × Mệnh | `/sao/liem-trinh/cung/menh/` | Confirm `/sao/liem-trinh/` source generation in current branch or add approved foundation support; requires special Reviewer check. | Medium sensitivity: passion/justice/emotional intensity only. Avoid crime, violence, legal outcome, deterministic fate, and `quan tham` framing. |

## Keep gated / not Batch 2

Do not add any of these to allow-lists, sitemap, route generation, or internal-link promotion in Batch 2:

- Tham Lang × Phu Thê — relationship/sexuality sensitivity.
- Thất Sát × Mệnh — aggression/competition sensitivity; violence-language risk.
- Phá Quân × Mệnh — destruction/transformation sensitivity; deterministic-language risk.
- Liêm Trinh × Phu Thê — relationship emotional-intensity sensitivity.
- Any star × Tật Ách — health gate.
- Any star × Tử Nữ — children/fertility gate.
- Thất Sát × Phu Thê — relationship aggression gate.
- Phá Quân × Phu Thê — relationship destruction gate.

## Required page invariants for all approved combos

Every Batch 2 page must include, visibly in body copy:

1. Exact or equivalent disclaimer: `Nội dung chỉ mang tính tham khảo để tự suy ngẫm, không phải lời khẳng định tương lai.`
2. Tam phương context, not isolated star reading:
   - Mệnh pages: Mệnh ↔ Quan Lộc ↔ Tài Bạch, plus Thiên Di as useful đối chiếu when relevant.
   - Quan Lộc page: Quan Lộc ↔ Mệnh ↔ Tài Bạch, plus real-world work context.
3. Conditional language: `có thể`, `có xu hướng`, `thường`, `gợi ý`, `nên kiểm chứng`.
4. No deterministic claims about fate, health, finance, legal outcomes, relationships, death, cure/giải hạn, guaranteed success, guaranteed wealth, guaranteed promotion, guaranteed fame, or guaranteed happiness.
5. No algorithm/domain behavior changes; content is educational/interpretive only.

## Internal-link matrix deliverable

Before implementation PR, fill and test this matrix. Every row must be represented in content and/or related-links module so no Batch 2 URL ships orphaned.

| Page | Link to cung | Link to sao | Batch 1 sibling/internal link | CTA/link to `/lap-la-so/` | Suggested contextual anchor |
|---|---|---|---|---|---|
| `/sao/tu-vi/cung/quan-loc/` | `/cung/quan-loc/` | `/sao/tu-vi/` | `/sao/tu-vi/cung/menh/` | `/lap-la-so/` | `lập lá số Tử Vi để xem tam phương Mệnh - Quan Lộc - Tài Bạch` |
| `/sao/thai-duong/cung/menh/` | `/cung/menh/` | `/sao/thai-duong/` | `/sao/thai-duong/cung/quan-loc/` | `/lap-la-so/` | `lập lá số để xem Thái Dương ở Mệnh cùng các cung liên quan` |
| `/sao/thai-am/cung/menh/` | `/cung/menh/` | `/sao/thai-am/` | `/sao/thai-am/cung/phuc-duc/` | `/lap-la-so/` | `lập lá số để đối chiếu Mệnh, Quan Lộc và Tài Bạch` |
| `/sao/vu-khuc/cung/menh/` | `/cung/menh/` | `/sao/vu-khuc/` | `/sao/vu-khuc/cung/tai-bach/` | `/lap-la-so/` | `lập lá số để xem Vũ Khúc ở Mệnh trong toàn cục` |
| `/sao/thien-phu/cung/menh/` | `/cung/menh/` | `/sao/thien-phu/` | TBD after source support | `/lap-la-so/` | `lập lá số để xem Thiên Phủ ở Mệnh cùng tam phương` |
| `/sao/cu-mon/cung/menh/` | `/cung/menh/` | `/sao/cu-mon/` | TBD after source support | `/lap-la-so/` | `lập lá số để xem Cự Môn ở Mệnh cùng bối cảnh tam phương` |
| `/sao/thien-dong/cung/menh/` | `/cung/menh/` | `/sao/thien-dong/` | TBD after source support | `/lap-la-so/` | `lập lá số để kiểm chứng Thiên Đồng ở Mệnh trong toàn lá số` |
| `/sao/liem-trinh/cung/menh/` | `/cung/menh/` | `/sao/liem-trinh/` | TBD after source support + special Reviewer check | `/lap-la-so/` | `lập lá số để đọc Liêm Trinh ở Mệnh theo hướng tham khảo` |

Implementation test expectation:
- each generated page has at least one internal link to the matching `/cung/*` page;
- each generated page has at least one internal link to the matching `/sao/*` page;
- each generated page has at least one CTA/link to `/lap-la-so/`;
- Batch 2A pages cross-link to the matching Batch 1 sibling where available;
- all internal links resolve in local build; no broken anchor/route.

## Baseline keyword tracking table

Capture this before publish. Use manual SERP/GSC if API access is unavailable. Record location/device/date, then compare 14 days after publish.

| Page | Primary keyword | Secondary keyword | Baseline SERP position | 14-day delta owner |
|---|---|---|---|---|
| `/sao/tu-vi/cung/quan-loc/` | `sao tử vi ở cung quan lộc` | `tử vi cung quan lộc` | TBD pre-publish | SEO/PO |
| `/sao/thai-duong/cung/menh/` | `sao thái dương ở cung mệnh` | `thái dương cung mệnh` | TBD pre-publish | SEO/PO |
| `/sao/thai-am/cung/menh/` | `sao thái âm ở cung mệnh` | `thái âm cung mệnh` | TBD pre-publish | SEO/PO |
| `/sao/vu-khuc/cung/menh/` | `sao vũ khúc ở cung mệnh` | `vũ khúc cung mệnh` | TBD pre-publish | SEO/PO |
| `/sao/thien-phu/cung/menh/` | `sao thiên phủ ở cung mệnh` | `thiên phủ cung mệnh` | TBD pre-publish | SEO/PO |
| `/sao/thien-dong/cung/menh/` | `sao thiên đồng ở cung mệnh` | `thiên đồng cung mệnh` | TBD pre-publish | SEO/PO |
| `/sao/cu-mon/cung/menh/` | `sao cự môn ở cung mệnh` | `cự môn cung mệnh` | TBD pre-publish | SEO/PO |
| `/sao/liem-trinh/cung/menh/` | `sao liêm trinh ở cung mệnh` | `liêm trinh cung mệnh` | TBD pre-publish | SEO/PO |

## 7-day GSC checkpoint template

At Day 7 after any Gal-approved publish, record for every shipped Batch 2 URL:

- Index coverage status.
- Impressions/clicks/CTR/average position.
- Whether URL is `Discovered - currently not indexed`.
- URL Inspection on 2–3 representative pages:
  - one top-priority Batch 2A page;
  - one Mệnh page;
  - Liêm Trinh page if shipped, otherwise highest-risk dependency page.
- Summary: keep, iterate internal links/title/meta, or hold further batch.

## Sitemap `<lastmod>` requirement

For each Batch 2 URL, sitemap `<lastmod>` must use the actual content update date for that page. Do not use a generic build date. If content is written/merged over multiple days, use the page's own latest content-edit date.

Implementation note for later:
- add or update a page-level `lastUpdated`/`contentUpdatedAt` source if current sitemap generation cannot express per-page dates;
- add a sitemap parity test that validates Batch 2 URLs and lastmod values.

## Implementation gates and tests after Gal approval

No implementation should begin until Gal approves exact Batch 2 scope. When approved:

1. Add combinations in small commits; keep gated list excluded.
2. If implementing Batch 2B, first resolve non-priority star source support narrowly and test it.
3. Write/extend content with domain-safe copy and tam phương context.
4. Run:
   - `npm test`
   - `npm run build`
   - focused star×cung allow-list tests
   - sitemap inclusion/exclusion/lastmod tests
   - internal-link coverage tests/checklist
   - Article 320/compliance tests for `tham khảo` disclaimer and forbidden-language guard
   - Playwright focused SEO for one H1, `lang=vi`, canonical, schema, no placeholders
5. Consultant review required before merge/deploy:
   - Bói-Toán: domain/copy pass on exact diff
   - Reviewer: compliance, especially Liêm Trinh×Mệnh if included
   - SEO: sitemap/indexability/internal-link/lastmod pass
   - CMO only if CTA/conversion copy changes

## Open questions for Gal/SEO

1. Should Batch 2 implementation be split into 2A (4 pages) and 2B (4 pages), as recommended, or should PO first resolve source support so all 8 ship together?
2. Does SEO want live observed `/sao/thien-phu/`, `/sao/thien-dong/`, `/sao/cu-mon/`, `/sao/liem-trinh/` treated as enough, or require local source/build proof before those pages are linked from new star×cung pages?
3. Who owns the pre-publish baseline keyword capture if GSC/API access is unavailable: SEO or PO manual baseline?

## Recommended immediate next action

Ask Gal to approve **Batch 2A only** for implementation planning. Keep Batch 2B in the approved backlog, not in the first implementation PR, until source support and Liêm Trinh special review workflow are explicit.
