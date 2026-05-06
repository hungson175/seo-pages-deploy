# Sample Code Reconciliation Branch Command Plan — 2026-05-06

Status: **prep-only / not executed**.

Purpose: provide an exact, reviewable command plan for reconciling Boss human-team upstream `sample_code/horoscope origin/main@2fe2ec0` with the current live-safe generated-readings branch `f91c746`, once Gal/Bói-Toán approve opening the branch and decide the public palace naming policy.

This document is **not approval** to run the plan.

## Hard stop conditions

Do not execute this plan until Gal confirms:

1. Open reconciliation branch: yes/no.
2. Public palace naming policy: preserve current `Tử Nữ` gate or accept upstream `Tử Tức` with explicit safety/content changes.
3. Domain lane scope: which commits are approved for cherry-pick.

Never run provider-consuming smoke, flip envs, deploy, migrate production DB, or merge human `origin/main` as-is from this plan.

## Starting assumptions

- Top-level repo path: `~/tools/seo-pages-team`.
- Nested app repo path: `~/tools/seo-pages-team/sample_code/horoscope`.
- Current live-safe nested branch/head: `fix/generated-route-safe-error-details-20260505@f91c746`.
- Human upstream to reconcile from: `origin/main@2fe2ec0`.
- Candidate domain commits from upstream:
  - `8c345d2` — Đại Vận structured methodology signals.
  - `0b39d97` — 24 Tuần/Triệt formations and KB files.
  - `2fe2ec0` — `use_raw` support for Tuần/Triệt formation matching.
  - `3ce9efb` — Tabs I–III must not mention Đại/Tiểu vận.

## Phase 0 — snapshot only

```bash
cd ~/tools/seo-pages-team/sample_code/horoscope

git status --short
git branch --show-current
git rev-parse HEAD
git rev-parse origin/main
```

Expected before proceeding:

- Working tree clean.
- HEAD is `f91c746...` or another Gal-approved live-safe base.
- `origin/main` is `2fe2ec0...` or a newly reviewed upstream head.

If dirty, stop and ask Gal.

## Phase 1 — create no-deploy reconciliation branch

```bash
cd ~/tools/seo-pages-team/sample_code/horoscope

git fetch --all --prune

git switch fix/generated-route-safe-error-details-20260505

git switch -c chore/reconcile-human-upstream-domain-20260506
```

Do not switch to `origin/main`. The branch base must be the live-safe stack so safety files remain present by default.

## Phase 2 — cherry-pick domain commits only

Use `-x` for traceability. Recommended order:

```bash
git cherry-pick -x 8c345d2
# resolve conflicts; preserve provider_limits.py, luan_giai/safety.py, generated route wrappers.

git cherry-pick -x 0b39d97
# mostly KB/YAML files; inspect for public-risk wording.

git cherry-pick -x 2fe2ec0
# reader.py use_raw support; verify it does not alter existing formation behavior.

git cherry-pick -x 3ce9efb
# prompt constraints; preserve current cache/safety wrappers.
```

If any cherry-pick introduces broad admin/payment/auth/paywall files, abort and reassess:

```bash
git cherry-pick --abort
```

## Phase 3 — conflict resolution rules

Preserve current live-safe behavior unless explicitly approved otherwise:

- Keep `be/app/services/provider_limits.py`.
- Keep `be/app/services/luan_giai/safety.py`.
- Keep generated-route safety validation before response/cache insert.
- Keep public-safe generated route error copy from `f91c746`.
- Keep provider-limit public copy and hashed-only logs.
- Keep replay/VCR bypass.
- Keep web proxy 429/503 honest retryable mapping.
- Keep public `Tử Nữ` output unless Gal/Bói-Toán explicitly approves changing policy.

Reject/flag conflict resolutions that:

- Reintroduce `Tử Tức` into public chart/generated/chat output under current policy.
- Remove safety validation from generated routes or cache reads.
- Remove provider limits / daily cap guards.
- Add admin/payment/auth migrations into this domain-only branch.
- Touch production deploy scripts/envs.

## Phase 4 — static scans before tests

```bash
# Confirm safety stack still exists
test -f be/app/services/provider_limits.py
test -f be/app/services/luan_giai/safety.py

git grep -n "assert_generated_reading_safe\|check_generation_rate_limit\|check_chat_rate_limit\|ProviderLimitError" -- be/app be/tests

# Under current public Tử Nữ policy, inspect any public-facing Tử Tức hits.
git grep -n "Tử Tức\|tu_tuc\|子息" -- be/app web/app web/components web/lib be/tests || true
```

Interpretation: test fixtures may intentionally include forbidden terms; public route/prompt/output additions need review.

## Phase 5 — test plan

Run focused backend tests first inside the nested repo:

```bash
cd ~/tools/seo-pages-team/sample_code/horoscope/be

python -m compileall app

pytest \
  tests/test_luan_giai_generated_safety.py \
  tests/test_llm_cache_e2e_2004.py \
  tests/test_generated_route_observability.py \
  tests/test_provider_limits.py \
  tests/test_wuxing_501.py
```

Then run relevant reader/formations/domain tests:

```bash
pytest \
  tests/test_reader_conditions.py \
  tests/test_reader_integration.py \
  tests/test_cach_cuc_giap_cung.py \
  tests/test_tinh_duyen_parallel.py
```

If feasible, run full backend suite:

```bash
pytest
```

Top-level web/proxy checks if any web/proxy files changed:

```bash
cd ~/tools/seo-pages-team
npm test
npm run build
```

No live provider calls. No generated+chat live smoke unless Gal separately approves.

## Phase 6 — review artifact

If tests pass, create a concise artifact:

```bash
REPORT=/tmp/sample_code_domain_reconciliation_candidate_$(date +%Y%m%d%H%M).txt
cat > "$REPORT" <<'REPORT_EOF'
# Sample-code domain reconciliation candidate

Branch:
Nested HEAD:
Base:
Cherry-picked commits:

Scope included:
Scope excluded:

Naming policy:
Safety stack preservation evidence:
Tests:
Known risks:
Requested reviews: Gal + Bói-Toán + Reviewer.
REPORT_EOF
```

Then report only pointer + bullets to Gal.

## Phase 7 — commit/push, still no deploy

Only after the candidate passes local checks:

```bash
git status --short
git add <intentional files only>
git commit -m "chore: reconcile human upstream domain signals"
git push -u boss chore/reconcile-human-upstream-domain-20260506
```

Do not merge to `main`, `master`, or deploy. Request no-deploy review first.

## Rollback / cleanup

If the branch goes bad:

```bash
git cherry-pick --abort  # during conflict
# or, after commits but before push:
git switch fix/generated-route-safe-error-details-20260505
git branch -D chore/reconcile-human-upstream-domain-20260506
```

Never use destructive cleanup against other agents' work without Gal approval.
