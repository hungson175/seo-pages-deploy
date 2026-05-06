# Sample Code Upstream Reconciliation Checklist — 2026-05-06

Status: **drafted, no-deploy**. This is a planning/checklist artifact only.

Scope: reconcile Boss human-team upstream `sample_code/horoscope` (`origin/main@2fe2ec0`, reviewed from `da799ef..2fe2ec0`) with the current live-safe generated-readings stack (`f91c746` lineage). Do **not** fast-forward, merge, deploy, or run provider-consuming smoke from this document alone.

## Current known heads

- Top-level SEO Pages branch: `chore/generated-readings-enable-plan-20260505`, latest checked commit `076d3ec4`.
- Nested current Boss/live-safe branch: `sample_code/horoscope@f91c746` (`fix/generated-route-safe-error-details-20260505`).
- Human upstream fetched: `sample_code/horoscope origin/main@2fe2ec0`.
- Full upstream review artifact: `/tmp/sample_code_human_update_review_202605061211.txt`.

## Non-negotiable gates before any integration

1. **No production deploy from human `origin/main` as-is.** It lacks the current generated-readings safety/provider-limit stack.
2. **Preserve public generated-reading guardrails:** no `Tử Tức`/`tu_tuc`/`子息`, deterministic, medical/legal/financial/death/`giải hạn`, raw provider errors, prompts, stack traces, costs, tokens, or internal tool traces.
3. **Preserve live provider cost/rate guards:** per-IP/per-chart limits, daily provider cap, public-safe 429/503 copy, hashed-only logs, replay/VCR bypass.
4. **No scheduled provider-consuming smoke/cron** until Gal explicitly approves cost/alert transport.
5. **No admin/payment launch** without separate DB migration, env, credentials, privacy/security, and QA release plan.

## Lane A — Domain cherry-picks worth evaluating

Potentially useful upstream changes:

- `be/app/services/dai_van_signals.py` — structured Đại Vận prompt signals:
  - bộ chính tinh classifier,
  - cát/sát count,
  - Nam/Bắc Đẩu 5+5 split.
- `be/app/services/luan_giai/dai_van.py` prompt/cache update aligned to the 3-step methodology.
- 24 Tuần/Triệt formation YAML + markdown files under `be/data/kb/standard-research/...`.
- `be/app/services/reader.py` `use_raw` support for Tuần/Triệt formation matching.
- Prompt constraints in `tinh_cach.py`, `su_nghiep.py`, `tinh_duyen.py` to prevent tabs I–III from mentioning Đại vận/Tiểu vận.

Checklist:

- [ ] Create a reconciliation branch from current live-safe nested branch, not from human `origin/main`.
- [ ] Cherry-pick domain commits in isolation, preferably:
  - `8c345d2` Đại Vận methodology,
  - `0b39d97` Tuần/Triệt formations,
  - `2fe2ec0` `use_raw` formation matching,
  - `3ce9efb` no Đại/Tiểu vận in tabs I–III.
- [ ] Resolve conflicts while preserving current safety files and generated route wrappers.
- [ ] Ask `boi-toan-consultant` for domain review before coding beyond mechanical cherry-pick.
- [ ] Run backend tests for reader/formations/luan_giai plus generated safety tests.

## Lane B — Safety preservation checklist

The human upstream does **not** include these current live-safe artifacts/behaviors:

- `be/app/services/provider_limits.py`.
- `be/app/services/luan_giai/safety.py`.
- Generated safety tests and provider-limit tests.
- Generated-route public-safe error detail handling from `f91c746`.
- Generated-tab observability/progress and chat latency/progress stack.

Checklist:

- [ ] Confirm every generated route still calls safety validation before cache response and before DB insert.
- [ ] Confirm unsafe cached rows are sanitized/rejected before response.
- [ ] Confirm provider/rate limit wrappers still protect live OpenAI-compatible client calls.
- [ ] Confirm replay/VCR tests bypass live provider budgets.
- [ ] Confirm web proxy still maps 429/503 to honest retryable UI, not pseudo-reading fallback.
- [ ] Confirm public error bodies never leak provider/cost/token/prompt/safety internals.
- [ ] Confirm provider/cost watch still parses logs and returns no-alert baseline.

Minimum tests before review:

- [ ] Backend generated safety suite.
- [ ] Backend provider limits suite.
- [ ] Backend generated route observability/error suite.
- [ ] Full backend test suite if feasible.
- [ ] Top-level `npm test` and `npm run build` if proxy/web files are affected.

## Lane C — `Tử Nữ` vs `Tử Tức` arbitration

Human upstream changed canonical palace naming back to `Tử Tức`:

- `chart_engine.py` uses `Tử Tức`.
- `chart.py` normalizes legacy `Tử Nữ` payloads back to `Tử Tức`.
- `reader.py` maps `tu_nu`/`tu_tuc` to `Tử Tức`.

This conflicts with current SEO/live public gate where `Tử Tức` is blocked and `Tử Nữ` is required in public output.

Checklist:

- [ ] Escalate to Bói-Toán domain consultant before accepting upstream naming.
- [ ] If current public rule remains, preserve/restore `Tử Nữ` in all public chart/generated/chat/proxy outputs.
- [ ] If domain decides upstream `Tử Tức` is correct, update SEO/content/safety gates explicitly and run compliance review before any public exposure.
- [ ] Do not silently mix names; choose one public policy and encode tests.

Default recommendation until arbitration: **preserve current public `Tử Nữ` gate**.

## Lane D — Admin/payment/app scope separation

Human upstream adds major product-app features outside the SEO Pages default scope:

- VietQR/SePay payment intents and webhook.
- Admin roles, bootstrap admin, dev-login.
- Admin dashboards and chart_readings edit/delete.
- User soft-delete, chart ownership, same-session claiming.
- GA4 analytics and payment funnel events.
- Large paywall/reading/sidebar UX changes.

Checklist before any app/admin/payment release:

- [ ] Separate Gal/Boss approval that this app scope is desired now.
- [ ] DB migration plan and rollback plan for `payment_intents`, `users.role`, `users.deleted_at`, `users.is_promoted`.
- [ ] Env checklist: `SEPAY_*`, `BOOTSTRAP_ADMIN_EMAIL`, `DEV_LOGIN_*`, `NEXT_PUBLIC_GA4_MEASUREMENT_ID`.
- [ ] Security review for admin edit/delete endpoints and dev-login disabled in production.
- [ ] Privacy review for user/payment/admin data surfaces.
- [ ] QA plan for payment confirmed/expired/webhook/manual force-confirm.
- [ ] Confirm no impact to SEO pages, `/reading` noindex/private posture, and generated-reading safety.

## Proposed next step

Open a **no-deploy nested reconciliation branch** and start with Lane A only (domain cherry-picks), while explicitly carrying forward Lane B safety files/tests. Hold Lane C for Bói-Toán arbitration and hold Lane D for separate product approval.
