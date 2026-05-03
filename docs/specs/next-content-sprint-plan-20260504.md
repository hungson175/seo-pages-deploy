SEO Pages next content sprint proposal — 2026-05-04 04:05 +07
Owner: PO. Scope: planning only; no deploy, no code/content generation until Gal approves.

## Recommendation

Run the next sprint as **Star×Cung Batch 2 + Measurement Gate**, not a broad 64-quẻ expansion yet.

Why:
- Real Tử Vi shell makes star/palace education directly useful for `/lap-la-so/` users and internal linking.
- Current star×cung system already has route guards, long-form template, and reviewer/domain gates; expanding in a small batch is safer than opening all combinations.
- Current `/que/` content is only a 6-page scaffold; jumping to 64 risks thin/templated pages unless Bói-Toán supplies a richer hexagram content model first.
- Forecast pages already shipped canary/monitoring work; next forecast action should be measurement and duplicate/sitemap hygiene, not more generation until GSC signal is read.

## Current content state observed

- Star×Cung approved combinations: 6 current CMO first batch combinations in `src/content/star-palace.ts`.
- Palace foundation pages: 12 pages are live/indexable content units.
- Star foundation pages: 6 priority stars are live/indexable content units.
- Quẻ scaffold: 6 content entries currently in `src/content/que.ts`, not 64.
- Forecast monitoring foundations exist (`docs/gsc-api-setup.md`, monitoring template, duplicate sitemap fix commits on local master), but public performance signal still needs collection/interpretation.

## Candidate comparison

### Option A — Star×Cung Batch 2 (recommended main sprint)

Objective:
- Publish a small, domain-reviewed second batch of star×cung pages that deepen Tử Vi topical authority and link naturally into `/lap-la-so/`, `/cung/*`, and `/sao/*`.

Suggested scope:
- 6–12 new combinations maximum.
- Prioritize combinations with strong search/entity value and clear domain-safe interpretation.
- Keep all non-approved combinations gated: no sitemap, no generation, redirect/404 behavior unchanged per existing guardrails.

Possible batch-selection criteria:
1. Query intent: star + palace combinations users actually search or ask about.
2. Domain confidence: Bói-Toán can verify without new algorithm work.
3. Internal link value: connects to existing 12 cung pages and 6 star pages.
4. Conversion fit: helps users understand why a personalized chart matters.

Hard gates:
- Bói-Toán approves exact combination list and copy model before implementation.
- Reviewer approves no deterministic fate/health/death/legal/finance claims.
- SEO approves sitemap/indexability and internal link placement.
- CMO approves CTA/trust copy if CTA wording changes.
- No domain algorithm changes; content is interpretive/educational only.

SEO additions required before Batch 2 ships:
- Internal-link matrix deliverable: every new star×cung page must specify links to its related `/cung/*` page, `/sao/*` page, and `/lap-la-so/` CTA/anchor so no page ships orphaned.
- 7-day post-deploy GSC checkpoint for Batch 2 URLs: index coverage, impressions, `Discovered - currently not indexed`, and URL Inspection on 2–3 sample pages.
- Baseline keyword tracking before publish: target keyword, current SERP position, and planned 14-day delta check.
- Sitemap `<lastmod>` must reflect the actual content update date, not a generic build date.

Tests/checks:
- `npm test`
- `npm run build`
- Star×Cung allow-list tests: only approved combinations generated.
- Sitemap parity: approved pages included, gated pages excluded.
- Sitemap `<lastmod>` checks: Batch 2 URLs use real content update dates.
- Redirect/guard tests for unapproved combinations.
- Article 320/compliance tests: visible “tham khảo” disclaimer and no forbidden deterministic claims.
- Metadata/H1 uniqueness tests for each new page.
- Internal-link coverage tests/checklist: each new page links to related `/cung/*`, `/sao/*`, and `/lap-la-so/`; no orphaned Batch 2 URLs.
- Playwright focused SEO: one H1, `lang=vi`, canonical, Article/Breadcrumb/FAQ schema if applicable, no placeholders.

Dependencies:
- Bói-Toán combination ranking and domain notes.
- SEO keyword/internal-link recommendation.
- CMO CTA/trust review only if conversion module changes.

Deliverables:
- Batch 2 combination list with rationale.
- Internal-link matrix: page → `/cung/*`, `/sao/*`, `/lap-la-so/` anchor/CTA.
- Baseline keyword tracking table: target keyword, pre-publish SERP position, 14-day delta owner.
- 7-day GSC checkpoint template for Batch 2 URLs.
- Implementation checklist and exact gate matrix.
- After approval only: docs + content commits in small batches.

### Option B — Gieo Quẻ 64-quẻ scaffold (prepare, do not publish broadly yet)

Objective:
- Prepare the 64-quẻ content model and allow-list so the product can scale `/que/*` later without thin pages.

Why not main sprint now:
- Current quẻ content has only 6 entries; a direct 64-page expansion risks template-only/thin content.
- Kinh Dịch domain review is a separate lane from the Real Tử Vi shell.

Safe prep scope:
- Draft a content schema for all 64 quẻ: name, slug, tượng, thoán, hào summary, use cases, “tham khảo” disclaimer, internal links.
- Build a review checklist and sample 3 pages for Bói-Toán before opening 64.
- Keep unapproved 64 pages out of sitemap and out of generated routes.

Hard gates:
- Bói-Toán approves canonical 64-quẻ names/slugs and content model.
- SEO approves whether to publish 64 at once or in clusters.
- Reviewer checks no placeholder/thin pages.

Tests/checks if later implemented:
- 64 allow-list uniqueness and id range 1–64.
- `dynamicParams=false` or equivalent guard.
- Sitemap parity tests.
- Build time budget (<10s extra target from existing story docs).
- Schema/canonical/Article 320 checks.

### Option C — Forecast monitoring improvements (make this a prerequisite lane)

Objective:
- Read performance signal from existing forecast/canary pages before adding more forecast content.

Scope:
- GSC/manual monitoring table for indexed URLs, impressions, CTR, position, duplicate/sitemap issues.
- Decide whether forecast expansion should continue, pause, or adjust templates.
- Do not generate more forecast pages until GSC baseline is reviewed.

Hard gates:
- GSC property/access or manual export available.
- Sitemap duplicate checks stay green.
- Existing forecast Article 320/disclaimer tests stay green.

Tests/checks:
- Sitemap no duplicate canonical URLs.
- `npm test`, `npm run build`.
- Optional Playwright sample of forecast pages.

## Proposed sprint structure

### Phase 0 — Measurement and consultant selection (0.5–1 day)

- Ask SEO for 10–20 candidate star×cung combinations and internal-link priorities.
- Ask Bói-Toán to approve/trim to 6–12 combinations with domain notes.
- Check current GSC/manual sitemap/indexing status for forecast canary pages.
- Capture baseline keyword/SERP position for each proposed Batch 2 target before publish.
- Output: final Sprint Batch 2 list, internal-link matrix, baseline keyword table, and gate owner matrix.

Exit gate:
- Gal approves the exact batch and no-deploy scope.

### Phase 1 — Docs/spec only (0.5 day)

- Write `docs/specs/star-palace-batch-2-plan.md` with combination list, page template invariants, internal-link matrix, baseline keyword table, GSC checkpoint template, gates, tests, and rollback.
- No public route/code changes yet.

Exit gate:
- Reviewer/Bói-Toán/SEO say plan is safe to implement.

### Phase 2 — Implementation after approval only (1–2 days)

- Add combinations in small commits.
- Update copy/content only, no algorithm changes.
- Run tests/build/focused Playwright.
- Verify sitemap `<lastmod>` equals actual content update date for Batch 2 URLs.
- Request consultant reviews before merge/deploy.

Post-deploy checkpoint if Gal later approves publish:
- Day 7: check Batch 2 URL index coverage, impressions, `Discovered - currently not indexed`, and URL Inspection on 2–3 samples.
- Day 14: compare baseline SERP position to current position for each target keyword; summarize keep/iterate/hold recommendations.

## Non-goals for this sprint

- No OCI/Caddy/DNS/prod work.
- No public shadow exposure.
- No broad 64-quẻ publishing without content model approval.
- No live LLM/generated content calls without VCR/replay guard and explicit approval.
- No algorithm/domain behavior changes.

## Recommended immediate next action

Ask SEO and Bói-Toán for Star×Cung Batch 2 candidate list and domain notes. While they respond, PO can draft `docs/specs/star-palace-batch-2-plan.md` from this plan only if Gal approves continuing beyond planning.

## 2026-05-04 Batch 2 synthesis update

Bói-Toán approved 8 Batch 2 combinations for planning and gated 8 sensitive combinations. PO synthesized the list with SEO additions in `docs/specs/star-palace-batch-2-synthesis-20260504.md`.

Recommended split for Gal approval:
- **Batch 2A first:** Tử Vi×Quan Lộc, Thái Dương×Mệnh, Thái Âm×Mệnh, Vũ Khúc×Mệnh.
- **Batch 2B after source/support verification:** Thiên Phủ×Mệnh, Cự Môn×Mệnh, Thiên Đồng×Mệnh, Liêm Trinh×Mệnh.

Reason for split: Batch 2A uses stars already supported by current local `PRIORITY_STAR_SLUGS`; Batch 2B is domain-approved but must not ship until `/sao/*` foundation/source support is verified or narrowly enabled, because SEO requires every new star×cung page to link to `/cung/*`, `/sao/*`, and `/lap-la-so/` without orphaning. Liêm Trinh×Mệnh also needs special Reviewer check for crime/violence/legal/deterministic language.
