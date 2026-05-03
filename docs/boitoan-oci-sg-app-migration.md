# Bói Toán OCI-SG app migration prep

Date: 2026-05-03
Branch: `feat/boitoan-oci-sg-app-migration`
Owner: PO/App Lead
Infra lead: John

## Current app topology

`boitoan.com.vn` top-level app (`seo-pages-team`) currently serves static SEO pages directly and proxies the real Tử Vi app:

- `/lap-la-so`, `/reading/*`, `/quyen-rieng-tu`: proxied HTML from `REAL_TUVI_ORIGIN` (currently Vercel real app fallback).
- `/real-tuvi-assets/*`: proxied real-app static assets.
- `/api/*`: proxied to `REAL_TUVI_API_ORIGIN` (currently Railway backend fallback) with safety rewrites.

For OCI-SG, removing Vercel/Railway assumptions requires three app services, not just one:

1. `web`: this SEO/public Next.js app.
2. `real-web`: `sample_code/horoscope/web` Next.js app used as the upstream for `/lap-la-so` and `/reading` HTML/assets.
3. `api`: `sample_code/horoscope/be` FastAPI backend used by `/api/*`.

## App env contract

Server-only env vars for `web`:

```bash
REAL_TUVI_ORIGIN=http://real-web:3000
REAL_TUVI_API_ORIGIN=http://api:8000
PRIVACY_CONTACT_EMAIL=<approved monitored email, optional>
NODE_ENV=production
```

Defaults remain current external services so local/dev behavior does not change unless env overrides are set.

Server-only env vars for `real-web`:

```bash
BACKEND_URL=http://api:8000
NODE_ENV=production
```

Server-only env vars for `api`:

```bash
FRONTEND_ORIGINS=https://boitoan.com.vn,http://web:3000,http://real-web:3000
# LLM/API keys live only in /opt/boitoan/.env, never git/logs.
```

## Dockerfile status

### Top-level SEO/public app

Prepared in repo root:

- `Dockerfile` uses Node 22 Alpine multi-stage build.
- `NEXT_OUTPUT_STANDALONE=true` enables Next standalone output only for Docker builds.
- `.dockerignore` excludes `.env*`, `node_modules`, `.next`, test artifacts, and nested repo env/venv files.

Build command:

```bash
docker build -t boitoan-web:<sha> .
```

Run command for local smoke:

```bash
docker run --rm -p 3000:3000 \
  -e REAL_TUVI_ORIGIN=http://host.docker.internal:3001 \
  -e REAL_TUVI_API_ORIGIN=http://host.docker.internal:8000 \
  boitoan-web:<sha>
```

### Real Tử Vi frontend (`sample_code/horoscope/web`)

Prepared in Boss private `sample_code/horoscope` branch `feat/oci-sg-docker-templates` at commit `a54de42`:

- `sample_code/horoscope/web/Dockerfile`: Node 22 Alpine multi-stage build with Next standalone runner, non-root user, and `/lap-la-so` healthcheck.
- `sample_code/horoscope/web/.dockerignore`: excludes env, build, cache, node_modules, and local screenshot artifacts while keeping public image assets.
- `sample_code/horoscope/web/next.config.mjs`: `NEXT_OUTPUT_STANDALONE=true` enables standalone output for Docker builds and keeps `/lap-la-so` source-side alias available for OCI shadow smoke.

### FastAPI backend (`sample_code/horoscope/be`)

Prepared in Boss private `sample_code/horoscope` branch `feat/oci-sg-docker-templates` at commit `a54de42`:

- `sample_code/horoscope/be/Dockerfile`: Python 3.13 slim multi-stage build, builder-stage `build-essential gcc` for ARM64/Python 3.13 wheel risk, venv copied into non-root runtime, `/health` healthcheck, `uvicorn app.main:app`.
- `sample_code/horoscope/be/.dockerignore`: excludes env, venv, Python caches, local browser artifacts, and tests.
- Runtime requires `DATABASE_URL` from `/opt/boitoan/.env`; secrets must never be committed or printed.
- The API image includes `alembic.ini` and `alembic/` so John can run schema migration from the same image before full shadow smoke:

```bash
docker compose run --rm api alembic upgrade head
docker compose up -d api real-web web
```

Run `alembic upgrade head` against the OCI-SG shadow/staging DB before `/api/chart` smoke. Do not rely on empty-DB startup; the FastAPI lifespan seed expects the migrated `packages` table.
- PDF Chromium remains P2 unless `CHROME_EXECUTABLE_PATH`/system browser dependencies are installed and tested.

## Compose shadow skeleton

```yaml
services:
  web:
    image: boitoan-web:${APP_SHA}
    restart: unless-stopped
    env_file: .env
    environment:
      REAL_TUVI_ORIGIN: http://real-web:3000
      REAL_TUVI_API_ORIGIN: http://api:8000
    ports:
      - "127.0.0.1:17120:3000"
    depends_on:
      - real-web
      - api

  real-web:
    image: boitoan-real-web:${APP_SHA}
    restart: unless-stopped
    env_file: .env
    environment:
      BACKEND_URL: http://api:8000
    expose:
      - "3000"
    depends_on:
      - api

  api:
    image: boitoan-api:${APP_SHA}
    restart: unless-stopped
    env_file: .env
    environment:
      FRONTEND_ORIGINS: https://boitoan.com.vn,http://web:3000,http://real-web:3000
    expose:
      - "8000"
```

John owns the final `/opt/boitoan/docker-compose.yml` and Caddy wiring.
John confirmed local OCI-SG git checkout/build path: `/opt/boitoan/releases/seo-pages-team`, build ARM64 images locally by SHA, no registry credentials. Compose should publish `web` on `127.0.0.1:17120` for smoke and also join `outline-hosting_outline-net` with shared-network alias `boitoan-web`. If Gal later approves a Caddy shadow route, Caddy should reverse proxy `boitoan-web:3000`, not host `127.0.0.1`.

## Vercel/Railway assumptions to remove

- Root `REAL_TUVI_ORIGIN` was hard-coded to Vercel real app. It is now env-overridable.
- Root `REAL_TUVI_API_ORIGIN` was hard-coded to Railway. It is now env-overridable.
- `sample_code/horoscope/web` already uses `BACKEND_URL` for most API routes; set it to `http://api:8000` in compose.
- `sample_code/horoscope/web/app/api/chart/[chartId]/pdf-v2/route.ts` has Vercel-specific chromium logic. For OCI shadow, mark PDF export as P2 unless browser deps are installed and tested.

## Shadow smoke checklist

Before DNS switch, run against OCI shadow host/port or hosts-file override:

1. `curl -I http://<shadow-host>:17120/` returns 200.
2. `curl -I http://<shadow-host>:17120/tu-vi/` returns 200.
3. `curl -I http://<shadow-host>:17120/lap-la-so/` returns 200.
4. Playwright form flow: `/lap-la-so` → submit sample birth data → `/reading/{chartId}` opens.
5. API smoke: `POST /api/chart` returns 200 JSON and `Tử Nữ`, with 0 `Tử Tức` / `tu_tuc` / `子息`.
6. Locked-tab smoke: click `Sự nghiệp & nguồn lực`; must not show `Không thể tải luận giải`; fallback copy appears if tab is still locked.
7. `/reading/{chartId}` has `noindex,nofollow` and private/no-store posture.
8. `robots.txt` keeps `/reading/` and `/api/` disallowed.
9. Static SEO pages still have one H1, `lang=vi`, canonical, schema, and no placeholder copy.
10. No secrets in Docker logs, Caddy logs, or app HTML.

Reusable smoke command from the top-level repo:

```bash
BASE_URL=http://127.0.0.1:17120 npm run smoke:boitoan-shadow
```

If the web service is only reachable on OCI-SG loopback, run through an SSH tunnel:

```bash
ssh -N -L 127.0.0.1:18120:127.0.0.1:17120 oci-sg
BASE_URL=http://127.0.0.1:18120 npm run smoke:boitoan-shadow
```

The smoke script covers route status, robots private-route disallows, API `/chart`,
`Tử Nữ`/legacy `Tử Tức` leakage, `/reading/{chartId}` noindex/nofollow, locked
tab API fallback header/body, no paywall marker leaks, and the browser form flow.

## Handoff to John

PO can provide images or build contexts after hotfix review. John should decide:

- whether OCI builds images locally from git checkout or pulls from a registry;
- exact Caddy network path (`127.0.0.1:17120`, shared Docker network, or dedicated Caddy route);
- where `/opt/boitoan/.env` lives and file permissions;
- rollback image/tag retention.

## Verification on this branch

Run on 2026-05-03 after the P0 `/lap-la-so` hotfix deploy:

- `git diff --check`
- `npx vitest run tests/real-tuvi-proxy.test.ts` → 10/10 PASS.
- `npm test` → 260/260 PASS.
- `npm run build` → PASS, 115 generated static pages.
- `NEXT_OUTPUT_STANDALONE=true npm run build` → PASS and `.next/standalone/server.js` exists.
- `docker build -t boitoan-web:e52119bb-oci-prep .` → PASS; log `/tmp/boitoan_oci_docker_build_202605032201.log`.
- Docker container smoke: `boitoan-web:e52119bb-oci-prep` served `/tu-vi/` with HTTP 200 on `127.0.0.1:3348`.
- Reviewer PASS/no blocker for prep commit `30ec1651`: `/tmp/seo_pages_oci_sg_migration_prep_30ec1651_review_202605032205.txt`.
- Nested real-web/api Docker template commit `a54de42` pushed to Boss private `boi-toan-horoscope` branch `feat/oci-sg-docker-templates`.
- Nested verification: `git diff --check`; `docker build -t boitoan-real-web:704a95a-oci-template ./web` PASS; `docker build -t boitoan-api:704a95a-oci-template ./be` PASS; local Docker network smoke with ephemeral Postgres showed API `/health` PASS and real-web `/lap-la-so` PASS.
- DB migration follow-up: API Dockerfile now copies `alembic.ini` + `alembic/`; local Docker network smoke ran `alembic upgrade head` from the API image against an empty ephemeral Postgres before API boot, then API `/health` PASS and `/chart` POST PASS with 0 `Tử Tức` and `Tử Nữ` present.
- Shadow smoke script follow-up: `scripts/boitoan-shadow-smoke.mjs` added and first run through an SSH tunnel to OCI-SG `127.0.0.1:17120` showed the baseline shadow routes/form/API pass, but locked generated tabs returned upstream 503 (`all 3 attempts failed`) instead of the safe fallback. The top-level proxy now maps these paid/generated-tab 5xx failures to the existing safe fallback with `x-boitoan-proxy-fallback: locked-reading`. After John rebuilt shadow web from `d6ac432b`, the smoke script still needed a realistic UI wait because the fallback appears after client hydration/network work. The script now waits up to `SHADOW_SMOKE_UI_WAIT_MS` (default 15s) for fallback/error text after tab click and waits for form fields/buttons before filling/clicking. SSH-tunneled run against OCI-SG loopback PASSed all checks, artifact `/tmp/boitoan_oci_shadow_smoke_uiwait_20260504003146.json`.

No OCI DNS switch, Caddy change, or production deployment was performed.
