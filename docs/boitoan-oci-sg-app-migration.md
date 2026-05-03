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

No Dockerfile exists yet. Proposed Dockerfile should mirror the root Next standalone pattern:

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start", "--", "-p", "3000"]
```

P1 improvement: add conditional `output: 'standalone'` to `sample_code/horoscope/web/next.config.mjs` and switch runner to `node server.js`.

### FastAPI backend (`sample_code/horoscope/be`)

No Dockerfile exists yet. Proposed Dockerfile:

```dockerfile
FROM python:3.13-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app
COPY data ./data
COPY alembic ./alembic
COPY scripts ./scripts
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Use Python 3.13 to match `pyproject.toml` (`requires-python >=3.13`). If package wheels fail on ARM64, fallback is `python:3.13` non-slim or add build deps in a separate builder stage.

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

No OCI DNS switch, Caddy change, or production deployment was performed.
