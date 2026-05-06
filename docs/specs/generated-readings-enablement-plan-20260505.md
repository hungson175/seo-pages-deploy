# Generated readings enablement plan — 2026-05-05

Status: **Phase 1–3 complete; production live; active monitoring only**.

This file started as the no-deploy enablement plan. As of 2026-05-06, the
production truth is the Phase 2/3 status below: generated readings are live on
OCI with provider limits deployed. Historical pre-live sections are retained for
provenance and must not be read as current blockers.

### Phase 1 — COMPLETE (2026-05-06)

All Phase 1 criteria verified — 14/14 backend tests pass, all web proxy tests pass:

- ✅ Provider config abstraction: `LuanGiaiLLMConfig` + `get_llm_config()` in `common.py`, env-driven with `LUAN_GIAI_LLM_*` + `DEEPSEEK_API_KEY` fallback
- ✅ VCR/replay guard: `ReplayLLMClient` + `LUAN_GIAI_LLM_REPLAY_PATH`, fixture at `tests/fixtures/llm_replay/tinh_cach_section.json`
- ✅ Domain safety validator: `safety.py` — rejects Tử Tức, deterministic/death/medical/legal/guarantee claims, requires tham khảo + conditional framing
- ✅ Provider limits: `provider_limits.py` — per-IP/chart rate limits, daily cap, `wrap_provider_client`
- ✅ Web proxy: safe-fallback short-circuit works, no paywall/package JSON leak, rate limit → honest copy
- ✅ No secrets in logs/errors (explicit `sk-` not-in-repr checks)

### Phase 2 — COMPLETE (verified 2026-05-06)

Production is live with `REAL_TUVI_GENERATED_READINGS_MODE=live` and `LUAN_GIAI_LLM_API_KEY` set in OCI env. Model: `gpt-4o-mini`. Provider limits deployed. Live monitoring doc at `generated-readings-live-monitoring-20260505.md` covers health checks, smoke tests, rollback procedures.

### Phase 3 — ACTIVE MONITORING

Production enablement is live. Ongoing monitoring per `generated-readings-live-monitoring-20260505.md`:
- Live smoke script: `scripts/boitoan-live-generated-smoke.mjs`
- Health check: SSH to OCI, check container status + API error logs
- Rollback: set `REAL_TUVI_GENERATED_READINGS_MODE=safe-fallback`, restart web

## Current production truth

- Live web image: `boitoan-web:af726fbb`.
- Real app/API images: `boitoan-api:4d2c5e7`, `boitoan-real-web:29e1989`.
- `REAL_TUVI_GENERATED_READINGS_MODE=live` — generated readings are enabled.
- API has `LUAN_GIAI_LLM_API_KEY` set (OpenAI-compatible, `sk-proj-` prefix), model `gpt-4o-mini`.
- Provider key is NOT the MoMo enterprise key. Do not print or commit any key.

## Pre-live root cause of missing real generated tabs — RESOLVED

Generated readings already exist in `sample_code/horoscope/be/app/routers/chart.py`:

- `/chart/{chart_id}/luan_giai/tinh_cach`
- `/chart/{chart_id}/luan_giai/su_nghiep`
- `/chart/{chart_id}/luan_giai/tinh_duyen`
- `/chart/{chart_id}/luan_giai/dai_van/{idx}`
- `/chart/{chart_id}/luan_giai/tieu_han/{dai_idx}/{year_offset}`
- `/chart/{chart_id}/luan_giai/cung/{chi}`

Those routes call `cached_llm_compose()` and then section generators in `be/app/services/luan_giai/*`.

The provider client is hard-coded in `be/app/services/luan_giai/common.py`:

```python
api_key = os.getenv("DEEPSEEK_API_KEY")
base_url = "https://api.deepseek.com"
model = "deepseek-chat"
```

So production needs both:

1. web proxy safe-fallback mode disabled or changed away from `safe-fallback`; and
2. API container receives an approved `DEEPSEEK_API_KEY` or code is updated to support an approved OpenAI-compatible provider/env mapping.

## Pre-live access/provider decision — RESOLVED by Option B

One of these must be true:

### Option A — preferred for minimal code

- Add an approved DeepSeek key to `/opt/boitoan/.env` as `DEEPSEEK_API_KEY`.
- Keep value secret; never echo it.
- Restart API and web with `REAL_TUVI_GENERATED_READINGS_MODE` unset or set to a future explicit `live` value.

### Option B — provider abstraction before env change

- Update backend to support env-driven OpenAI-compatible config:
  - `LUAN_GIAI_LLM_API_KEY`
  - `LUAN_GIAI_LLM_BASE_URL`
  - `LUAN_GIAI_LLM_MODEL`
  - keep `DEEPSEEK_API_KEY` as backward-compatible fallback.
- Then use an approved key/provider in OCI env.

Local env has some non-enterprise personal/provider key names available, but they are not printed here. Do **not** use `MOMO_ENTERPRISE_ANTHROPIC_API_KEY`; this is not a MoMo company project.

## Risk notes

- `tinh_cach` makes 4 parallel LLM calls.
- `su_nghiep` makes 5 parallel LLM calls.
- `tinh_duyen` makes 7 parallel LLM calls.
- Tokens are currently high (`max_tokens` up to 16k/14k/12k per section). Enabling all tabs at once can be slow/costly.
- Results are DB-cached in `chart_readings` by `(signature, tab, section, cache_version)` through `cached_llm_compose()`.
- First request can be slow; UI must keep honest slow/fail copy and retry per tab.

## TDD/VCR implementation gate before live

1. Provider-config tests in backend:
   - no key -> explicit safe error, no secret in message/log.
   - key present -> OpenAI-compatible client uses configured base/model.
   - fallback to `DEEPSEEK_API_KEY` remains supported.

2. VCR/replay guard:
   - Add recorded/mocked integration for one `tinh_cach` section response.
   - Default tests must replay/mock, not call live provider.
   - Live record mode must require an explicit env flag, e.g. `LUAN_GIAI_LIVE_RECORD=1`.

3. Domain safety validator:
   - Reject `Tử Tức`, `tu_tuc`, `子息`.
   - Reject deterministic/death/medical/financial/legal/giải hạn/guarantee language.
   - Require `tham khảo` / `không phải lời tiên đoán` / conditional framing.
   - For generated tab launch, Bói-Toán + Reviewer must pass sample outputs.

4. Web/proxy tests:
   - safe-fallback mode still works and remains honest.
   - live mode does not short-circuit.
   - provider 5xx maps to honest fail state, no pseudo-reading body.
   - no paywall/package JSON leak.

5. Blackbox before deploy:
   - staging/OCI loopback only first.
   - create chart -> open reading -> click `Tìm hiểu bản thân`.
   - verify generated body is real, not fallback, min 300 words/tab if domain gate keeps that requirement.
   - verify `/reading` stays `noindex,nofollow`, private cache, 0 `Tử Tức`.

## Recommended phased rollout

### Phase 1 — backend/provider readiness, no production live calls

- Implement provider config abstraction and tests.
- Add replay/mocked provider integration for one generated tab.
- Add domain safety validator for generated outputs.
- Keep production `REAL_TUVI_GENERATED_READINGS_MODE=safe-fallback`.

### Phase 2 — staging live smoke with bounded cost

- Add approved provider key to staging/OCI loopback only.
- Disable safe-fallback only for staging web.
- Run one chart + one `tinh_cach` tab smoke.
- Save sanitized evidence only: status, word count, safety checks, response time, cache hit on second request. No birth data/key/raw prompt in public report.

### Phase 3 — production enablement decision

- If staging live smoke passes SEO/CMO/Bói-Toán/Reviewer gates, deploy exact API/web env change.
- Start with `tinh_cach` only if code supports per-tab gating; otherwise keep all tabs disabled until cost/latency accepted.
- Keep retryable fail state as fallback.

## Historical recommendation — SUPERSEDED

The original recommendation was to avoid flipping production before Phase 1.
That is now superseded: Phase 1–3 have been completed and production is live.
Future work should follow the live monitoring guard, cost/output watch, and
rollback procedures in `generated-readings-live-monitoring-20260505.md`.

## CMO trust/copy acceptance added after Phase 1 approval

Before any production enablement, send the exact SHA and artifact to CMO. Acceptance must prove:

- **Success state:** visible line says `Luận giải được tạo từ lá số đã an lập; nội dung mang tính tham khảo, không khẳng định tương lai.`
- **Slow state:** calm/progress-honest copy says `Bói Toán đang viết phần luận giải này từ lá số của bạn. Thường mất vài giây; đừng đóng trang.`
- **Fail state:** honest retryable copy says `Chưa tạo được luận giải. Lá số của bạn đã được an lập; vui lòng thử tạo lại phần này.` and preserves chart access.
- **No pseudo-reading fallback:** when generation fails, do not render generic reading body as if it were a real generated reading.
- **No provider/API leakage:** hide raw provider errors, package/paywall JSON, stack traces, status codes, or retry internals from users.
- **Per-tab failure only:** one failed tab must not blank the chart or other tabs.
- **Safety language:** no deterministic, medical, financial, legal, death, `giải hạn`, guarantee, or `Tử Tức` claims.
