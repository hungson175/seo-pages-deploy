# Star×Cung Post-Deploy Monitoring Packet — Batch 2A + 2B Foundation + 2B-1

**Date:** 2026-05-04 (Asia/Ho_Chi_Minh)  
**Prepared by:** PO  
**Scope:** Monitoring setup only. No code, no deploy, no DNS/Caddy/Vercel change.  
**Current live app SHA:** `15eac297ac05462127f025799ca58e8146f70343`  
**OCI web image:** `boitoan-web:15eac297`  
**Runtime expectation:** `REAL_TUVI_GENERATED_READINGS_MODE=safe-fallback` until generated/LLM runtime is separately approved.  
**Rollback anchor:** `f6034dfb`.

## 1. Monitoring objective

Monitor the live SEO release covering:

1. Batch 2A star×cung pages.
2. Batch 2B Foundation `/sao/*/` hub pages.
3. Batch 2B-1 star×cung pages.
4. Homepage P0 chart entry flow, because it is now the primary conversion path.

This packet defines the URL universe, baseline keyword table, Google Search Console (GSC) Day-7/Day-14 schedule, manual GSC submission/inspection steps, and a reusable first daily monitor template.

## 2. Live URL universe

### 2.1 Homepage / conversion route

| Type | URL | Expected status | Expected indexability | Notes |
|---|---|---:|---|---|
| Homepage | `https://boitoan.com.vn/` | 200 | Indexable | Hero form visible above SEO content; flow should reach `/reading/{chartId}` in max 2 clicks. |

### 2.2 Star×Cung pages — 8 total approved URLs

`public/star-palace.xml` must contain exactly these 8 URLs. All expected `<lastmod>` values are `2026-05-04`.

| Batch | Star×Cung | URL | Expected status | Expected indexability | Target keyword |
|---|---|---|---:|---|---|
| Batch 1 | Tử Vi × Mệnh | `https://boitoan.com.vn/sao/tu-vi/cung/menh/` | 200 | Indexable | `sao tử vi cung mệnh` |
| Batch 2A | Tử Vi × Quan Lộc | `https://boitoan.com.vn/sao/tu-vi/cung/quan-loc/` | 200 | Indexable | `sao tử vi cung quan lộc` |
| Batch 2A | Thái Dương × Mệnh | `https://boitoan.com.vn/sao/thai-duong/cung/menh/` | 200 | Indexable | `sao thái dương cung mệnh` |
| Batch 2A | Thái Âm × Mệnh | `https://boitoan.com.vn/sao/thai-am/cung/menh/` | 200 | Indexable | `sao thái âm cung mệnh` |
| Batch 2A | Vũ Khúc × Mệnh | `https://boitoan.com.vn/sao/vu-khuc/cung/menh/` | 200 | Indexable | `sao vũ khúc cung mệnh` |
| Batch 2B-1 | Thiên Phủ × Mệnh | `https://boitoan.com.vn/sao/thien-phu/cung/menh/` | 200 | Indexable | `sao thiên phủ cung mệnh` |
| Batch 2B-1 | Cự Môn × Mệnh | `https://boitoan.com.vn/sao/cu-mon/cung/menh/` | 200 | Indexable | `sao cự môn cung mệnh` |
| Batch 2B-1 | Thiên Đồng × Mệnh | `https://boitoan.com.vn/sao/thien-dong/cung/menh/` | 200 | Indexable | `sao thiên đồng cung mệnh` |

### 2.3 Star foundation hubs — 10 total URLs

`public/stars.xml` must contain exactly these 10 URLs. All expected `<lastmod>` values are `2026-05-04`.

| Group | Star hub | URL | Expected status | Expected indexability | Target keyword |
|---|---|---|---:|---|---|
| Existing foundation | Tử Vi | `https://boitoan.com.vn/sao/tu-vi/` | 200 | Indexable | `sao tử vi` |
| Existing foundation | Thái Dương | `https://boitoan.com.vn/sao/thai-duong/` | 200 | Indexable | `sao thái dương` |
| Existing foundation | Thái Âm | `https://boitoan.com.vn/sao/thai-am/` | 200 | Indexable | `sao thái âm` |
| Existing foundation | Thiên Cơ | `https://boitoan.com.vn/sao/thien-co/` | 200 | Indexable | `sao thiên cơ` |
| Existing foundation | Vũ Khúc | `https://boitoan.com.vn/sao/vu-khuc/` | 200 | Indexable | `sao vũ khúc` |
| Existing foundation | Thiên Lương | `https://boitoan.com.vn/sao/thien-luong/` | 200 | Indexable | `sao thiên lương` |
| Batch 2B foundation | Thiên Phủ | `https://boitoan.com.vn/sao/thien-phu/` | 200 | Indexable | `sao thiên phủ` |
| Batch 2B foundation | Cự Môn | `https://boitoan.com.vn/sao/cu-mon/` | 200 | Indexable | `sao cự môn` |
| Batch 2B foundation | Thiên Đồng | `https://boitoan.com.vn/sao/thien-dong/` | 200 | Indexable | `sao thiên đồng` |
| Batch 2B foundation | Liêm Trinh | `https://boitoan.com.vn/sao/liem-trinh/` | 200 | Indexable | `sao liêm trinh` |

### 2.4 Gated URL spot-checks

These must stay 404 until explicit Gal approval plus SEO + Bói-Toán + Reviewer PASS.

| Gated combo | URL | Expected status | Reason |
|---|---|---:|---|
| Liêm Trinh × Mệnh | `https://boitoan.com.vn/sao/liem-trinh/cung/menh/` | 404 | Special Reviewer check pending for crime/violence/legal language. |
| Vũ Khúc × Tài Bạch | `https://boitoan.com.vn/sao/vu-khuc/cung/tai-bach/` | 404 | Not approved in current allow-list. |
| Tham Lang × Phu Thê | `https://boitoan.com.vn/sao/tham-lang/cung/phu-the/` | 404 | Bói-Toán gated. |
| Thất Sát × Mệnh | `https://boitoan.com.vn/sao/that-sat/cung/menh/` | 404 | Bói-Toán gated. |
| Phá Quân × Mệnh | `https://boitoan.com.vn/sao/pha-quan/cung/menh/` | 404 | Bói-Toán gated. |
| Any × Tật Ách sample | `https://boitoan.com.vn/sao/tu-vi/cung/tat-ach/` | 404 | Sensitive palace gated. |

## 3. Sitemap and lastmod expectations

| Sitemap | Expected contents | Expected lastmod | GSC action |
|---|---|---|---|
| `https://boitoan.com.vn/sitemap-index.xml` | Includes `stars.xml` and `star-palace.xml` entries | `stars.xml=2026-05-04`, `star-palace.xml=2026-05-04` | Submit/check as umbrella sitemap. |
| `https://boitoan.com.vn/stars.xml` | Exactly 10 star foundation hub URLs | Every URL `2026-05-04` | Inspect after deploy; submit if not discovered. |
| `https://boitoan.com.vn/star-palace.xml` | Exactly 8 approved star×cung URLs | Every URL `2026-05-04` | Submit/check immediately after deploy. |

Do **not** let gated URLs appear in `star-palace.xml`. Current live SHA expectation is `15eac297`.

## 4. Baseline keyword table

Manual baseline should be collected on 2026-05-04 or as soon as GSC/search access is available. Use Vietnam/`vi` search context where possible. Record raw source: GSC Performance, Google manual SERP, or SEO tool. If no ranking is visible, mark `not in top 100`, not blank.

### 4.1 Homepage baseline

| URL | Primary keyword | Secondary keyword | Baseline date | Baseline source | Baseline position | 14-day target signal |
|---|---|---|---|---|---:|---|
| `https://boitoan.com.vn/` | `lập lá số tử vi` | `lập lá số tử vi miễn phí` | 2026-05-04 | TBD | TBD | Impressions begin; CTR validates hero/form snippet. |

### 4.2 Star×Cung baseline — 8 URLs

| URL | Target keyword | Baseline date | Baseline source | Baseline position | Day-14 position | 14-day delta | Notes |
|---|---|---|---|---:|---:|---:|---|
| `/sao/tu-vi/cung/menh/` | `sao tử vi cung mệnh` | 2026-05-04 | TBD | TBD | TBD | TBD | Existing allow-list page; compare against new internal-link lift. |
| `/sao/tu-vi/cung/quan-loc/` | `sao tử vi cung quan lộc` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2A. |
| `/sao/thai-duong/cung/menh/` | `sao thái dương cung mệnh` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2A. |
| `/sao/thai-am/cung/menh/` | `sao thái âm cung mệnh` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2A. |
| `/sao/vu-khuc/cung/menh/` | `sao vũ khúc cung mệnh` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2A. |
| `/sao/thien-phu/cung/menh/` | `sao thiên phủ cung mệnh` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2B-1. |
| `/sao/cu-mon/cung/menh/` | `sao cự môn cung mệnh` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2B-1. |
| `/sao/thien-dong/cung/menh/` | `sao thiên đồng cung mệnh` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2B-1. |

### 4.3 Star foundation baseline — 10 URLs

| URL | Target keyword | Baseline date | Baseline source | Baseline position | Day-14 position | 14-day delta | Notes |
|---|---|---|---|---:|---:|---:|---|
| `/sao/tu-vi/` | `sao tử vi` | 2026-05-04 | TBD | TBD | TBD | TBD | Foundation hub. |
| `/sao/thai-duong/` | `sao thái dương` | 2026-05-04 | TBD | TBD | TBD | TBD | Foundation hub. |
| `/sao/thai-am/` | `sao thái âm` | 2026-05-04 | TBD | TBD | TBD | TBD | Foundation hub. |
| `/sao/thien-co/` | `sao thiên cơ` | 2026-05-04 | TBD | TBD | TBD | TBD | Foundation hub. |
| `/sao/vu-khuc/` | `sao vũ khúc` | 2026-05-04 | TBD | TBD | TBD | TBD | Foundation hub. |
| `/sao/thien-luong/` | `sao thiên lương` | 2026-05-04 | TBD | TBD | TBD | TBD | Foundation hub. |
| `/sao/thien-phu/` | `sao thiên phủ` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2B foundation. |
| `/sao/cu-mon/` | `sao cự môn` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2B foundation. |
| `/sao/thien-dong/` | `sao thiên đồng` | 2026-05-04 | TBD | TBD | TBD | TBD | Batch 2B foundation. |
| `/sao/liem-trinh/` | `sao liêm trinh` | 2026-05-04 | TBD | TBD | TBD | TBD | Foundation only; Liêm Trinh×Mệnh remains gated. |

## 5. GSC checkpoint schedule

| Checkpoint | Date (+07) | Owner | Required actions | Decision output |
|---|---|---|---|---|
| Day 0 | 2026-05-04 | PO / Gal with GSC access | Submit/check `sitemap-index.xml`, `stars.xml`, `star-palace.xml`; inspect 3 sample URLs; record keyword baseline. | Confirm Google can fetch pages and no sitemap mismatch. |
| Day 1 | 2026-05-05 | PO | Daily monitor template: HTTP/indexability/sitemap/gating check; note any GSC discoverability if available. | PASS/attention list. |
| Day 2 | 2026-05-06 | PO | Repeat daily monitor for 19-url set; compare noindex/gating. | PASS/attention list. |
| Day 3 | 2026-05-07 | PO | Repeat daily monitor; watch for accidental broad ungating. | PASS/attention list. |
| Day 4 | 2026-05-08 | PO | Repeat daily monitor; collect early impressions if GSC exposes. | PASS/attention list. |
| Day 5 | 2026-05-09 | PO | Repeat daily monitor. | PASS/attention list. |
| Day 6 | 2026-05-10 | PO | Repeat daily monitor; prepare Day-7 GSC packet. | Ready for Day-7. |
| Day 7 | 2026-05-11 | PO + SEO | GSC index coverage, impressions/clicks, Discovered-currently-not-indexed, URL Inspection on 2–3 samples: one Batch 2A page, one Batch 2B-1 page, one foundation hub. | Decide whether to hold next content batch, improve internal links/snippets, or continue. |
| Day 14 | 2026-05-18 | PO + SEO + Gal | 14-day keyword delta, GSC impressions/clicks, URL Inspection on any still-unindexed pages, sitemap status, error review. | Decide next content batch: Liêm Trinh special-review vs next source-gated star×cung. |

Suggested Day-7 URL Inspection samples:

1. `https://boitoan.com.vn/sao/tu-vi/cung/quan-loc/` — Batch 2A career intent.
2. `https://boitoan.com.vn/sao/thien-phu/cung/menh/` — Batch 2B-1 new source-gated page.
3. `https://boitoan.com.vn/sao/liem-trinh/` — foundation hub with sensitive future expansion.

## 6. Manual GSC submission and URL Inspection instructions

1. Open Google Search Console property for `boitoan.com.vn`.
2. Go to **Sitemaps**.
3. Submit or re-submit these URLs:
   - `https://boitoan.com.vn/sitemap-index.xml`
   - `https://boitoan.com.vn/stars.xml`
   - `https://boitoan.com.vn/star-palace.xml`
4. Confirm the sitemap table shows success/fetched status. If status is pending, record timestamp and retry at Day-1.
5. Go to **URL Inspection** and inspect the Day-7 sample URLs above plus any page Gal/SEO requests.
6. For each inspected URL, record:
   - URL is on Google: Yes/No.
   - Page fetch: Successful/Failed.
   - Indexing allowed: Yes/No.
   - User-declared canonical and Google-selected canonical.
   - Crawled as: Googlebot smartphone/desktop.
   - Last crawl date.
   - If available, request indexing for live 200/indexable URLs only.
7. Do **not** request indexing for gated 404 URLs.
8. If `star-palace.xml` has more or fewer than 8 URLs, stop and escalate to Gal before more content work.

## 7. First daily monitor template

Use this as the first daily note, then append one note per day to SBrain/ops report.

```markdown
# Bói Toán star×cung daily monitor — YYYY-MM-DD

Live SHA: 15eac297
Web image: boitoan-web:15eac297
Generated-reading mode: safe-fallback
Monitor window: YYYY-MM-DD HH:mm +07
Owner: PO

## Summary

- Overall: PASS / ATTENTION / FAIL
- Homepage P0 flow: PASS / FAIL
- star-palace.xml: 8 URLs / mismatch
- stars.xml: 10 URLs / mismatch
- Gated combo spot-check: PASS / FAIL
- /api/chart terminology: zero Tử Tức + Tử Nữ present / FAIL
- /reading robots: noindex,nofollow / FAIL
- GSC status changes: none / list

## URL checks

| URL group | Count | HTTP/indexability | Notes |
|---|---:|---|---|
| Homepage | 1 | PASS/FAIL | Form above SEO content; submits to reading. |
| Star×Cung | 8 | PASS/FAIL | All 200/indexable; Article 320 visible. |
| Star hubs | 10 | PASS/FAIL | All 200/indexable. |
| Gated combos | 6+ samples | PASS/FAIL | All 404. |

## GSC notes

- Sitemap-index status:
- stars.xml status:
- star-palace.xml status:
- URL Inspection samples:
  - URL:
  - Coverage:
  - Canonical:
  - Last crawl:
  - Request indexing submitted? yes/no

## Keyword baseline / delta

| URL | Keyword | Baseline position | Current position | Impressions | Clicks | Notes |
|---|---|---:|---:|---:|---:|---|
| | | | | | | |

## Follow-ups

- [ ] Escalate any 5xx, noindex regression, sitemap mismatch, or Tử Tức leak immediately.
- [ ] If all green, continue monitoring; do not start next content batch until Gal confirms.
```

## 8. Escalation rules

Escalate to Gal immediately if any of these occur:

- Any approved star×cung or star hub URL returns 404/5xx.
- `star-palace.xml` is not exactly 8 URLs.
- `stars.xml` is not exactly 10 URLs.
- Any gated sensitive URL returns 200/indexable.
- Any public surface shows `Tử Tức`, `tu_tuc`, or `子息`.
- `/reading/{chartId}` is indexable or lacks noindex/nofollow.
- Homepage chart form falls below SEO content again.
- GSC reports blocked-by-robots for approved indexable pages.

## 9. Next content-batch decision hook

Do not start the next content batch until at least Day-0 monitor is complete and Gal decides. Likely next choices:

1. **Liêm Trinh×Mệnh special-review prep** — requires extra Reviewer focus on crime/violence/legal/deterministic language.
2. **Next star×cung source gate** — choose safer Mệnh-only combinations after SEO/Bói-Toán shortlist.
3. **Monitoring-first hold** — wait until Day-7 or Day-14 if GSC indexing is slow.

