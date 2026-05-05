# Generated Readings + Chat Live Monitoring Guard — 2026-05-05

Status: **live on OCI** after emergency fix.

Scope: Bói Toán `/reading/{chartId}` generated tabs and mobile chat. This is an operations guard, not a new feature release.

## Current live shape

- Web image: `boitoan-web:5cb5eeba`
- API image: `boitoan-api:cea1f8c`
- Real-web image: `boitoan-real-web:29e1989`
- Generated readings mode: `live`
- Chat UI: enabled
- LLM model: `gpt-4o-mini`
- Provider key: set in OCI env, redacted; **not** MoMo enterprise key
- Production host: OCI, not Vercel

## User-facing acceptance gates

Daily spot check should prove:

1. Mobile homepage form accepts Sơn / Nam / `1984-05-17` / `Tý sớm (00:00-00:59)`.
2. `/reading/{chartId}` opens with chart first on mobile.
3. Clicking `Luận giải` shows real generated text, not only `Chưa tạo được luận giải`.
4. Generated text contains visible safety framing: `tham khảo`, `không phải lời tiên đoán`, `không khẳng định tương lai`.
5. Generated text has no `Tử Tức`, `tu_tuc`, `子息`, deterministic, medical, legal, financial, death, or `giải hạn` claims.
6. Clicking `Hỏi` shows a usable input; sending a question returns a visible answer.
7. Chat output has no internal tool trace, no provider error, no `Thầy/con` voice, and no forbidden claims.
8. `/reading/` remains noindex/private and disallowed in robots.

## Quick live health command

Run from repo root; do not print env files or secrets.

```bash
ssh oci-sg 'echo "containers:"; \
  docker ps --format "{{.Names}} {{.Image}} {{.Status}}" | grep -E "boitoan-(web|api|real-web)"; \
  echo "recent_api_error_counts:"; \
  docker logs --since 30m boitoan-api-1 2>&1 | awk '\''/Generated reading failed safety validation/{gr++} /provider failed|all 3 attempts failed|ERROR|Traceback|Exception/{err++} /POST \/chat|GET \/chart\//{req++} END{printf "requests_seen=%d generated_safety_fail=%d error_like=%d\n", req+0, gr+0, err+0}'\''; \
  echo "recent_api_tail_sanitized:"; \
  docker logs --since 5m boitoan-api-1 2>&1 | tail -40 | sed -E "s/sk-[A-Za-z0-9_-]+/sk-REDACTED/g"'
```

Current baseline from 2026-05-05 10:34 +07:

- `boitoan-api:cea1f8c` healthy
- `boitoan-web:5cb5eeba` running
- `boitoan-real-web:29e1989` healthy
- recent 30m: `generated_safety_fail=0`, `error_like=0`
- recent LLM calls returned HTTP 200


## Scheduled smoke implementation

Source-safe script added in `scripts/boitoan-live-generated-smoke.mjs` and exposed as:

```bash
npm run smoke:boitoan-live-generated
```

Default behavior:

- Opens `https://boitoan.com.vn` with a mobile viewport.
- Uses the fixed Boss/Gal sample: Sơn / Nam / `1984-05-17` / `Tý sớm`.
- Submits the chart form and verifies `/reading/{chartId}`.
- Verifies chart-first mobile order.
- Clicks `Luận giải` and requires real generated text, not the retry-only fallback.
- Clicks `Hỏi`, sends one short question, and requires `/api/chat` 200 plus a visible answer.
- Runs forbidden-output scans for `Tử Tức`, deterministic, medical, legal, financial, death, `giải hạn`, internal tool traces, and teacher/con wording.
- Writes JSON + PNG screenshots under `/tmp/boitoan_live_generated_smoke_<timestamp>/`.

Useful env overrides:

```bash
BOITOAN_BASE_URL=https://boitoan.com.vn \
BOITOAN_LIVE_SMOKE_CHAT=1 \
BOITOAN_LIVE_SMOKE_GENERATED=1 \
npm run smoke:boitoan-live-generated
```

Cost note: the generated sections are cache-backed by chart signature, but chat sends a real provider request. For cron, start with every 6 hours or daily until rate limits/cost budgets are approved.

## Cost watch

Signals:

- API logs: count `POST https://api.openai.com/v1/chat/completions` per hour.
- OpenAI dashboard: check daily spend and request volume for the personal project key.
- DB cache hit rate: many repeated generated sections should become `llm_cache HIT`; repeated misses for same signature are suspicious.

Initial expectation:

- One first-time generated `Luận giải` can call multiple LLM sections in parallel.
- One chat turn can call the model multiple times because tool rounds/final JSON are used.
- If traffic grows, add a cheap quota/rate limiter before expanding access.

Alert thresholds for first 24h:

- Any sudden spike above expected manual/Boss testing volume.
- `provider failed`, `RateLimitError`, or repeated timeout logs.
- More than 2 generated safety failures in 30 minutes.
- User-visible `Chưa tạo được luận giải` after provider is healthy.

## Output-quality watch

Sample generated tab + chat answer at least daily for:

- No `Tử Tức` / `tu_tuc` / `子息`.
- No deterministic phrasing: `chắc chắn`, `nhất định`, `100%`, `định mệnh`.
- No medical/legal/financial/death/`giải hạn` claims.
- No internal traces: `Tools được gọi`, `search_kb`, provider names, stack traces.
- No teacher/master glyph/copy in user-facing chat: `Thầy`, `con`.
- Vietnamese-only, no mixed-language artifacts.

## Rollback / kill switches

Use only if live product regresses. Do not print secrets.

### Disable generated tabs at web proxy

Set:

```env
REAL_TUVI_GENERATED_READINGS_MODE=safe-fallback
```

Then restart web only. This makes the web proxy return safe retryable fallback for generated tabs without touching API.

### Hide chat UI again

Set:

```env
REAL_TUVI_CHAT_ENABLED=false
```

Then restart web only. This hides chat entrypoints again.

### Disable API provider

If provider key is compromised or cost spikes, remove/rotate `LUAN_GIAI_LLM_API_KEY` in the secure OCI env and restart API. Never print the key.

## Next hardening backlog

- Add automated scheduled live smoke that writes artifacts to `/tmp` and alerts Gal on failure.
- Add rate limiting per chart/session for chat and generated retries.
- Add metrics for LLM call count, latency, cache hit/miss, safety validation failures.
- Add language-quality sanitizer for mixed-language responses.
- Add CMO/Bói-Toán review sample pack after 24h live traffic.
