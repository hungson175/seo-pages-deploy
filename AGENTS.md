# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router project for Vietnamese Tử Vi/Kinh Dịch SEO pages.

- `src/app/` — routes, layouts, sitemap, robots, and page entrypoints.
- `src/content/` — canonical route lists and SEO content databases for forecasts, stars, and quẻ pages.
- `src/components/` — reusable UI, JSON-LD, chart, and trust components.
- `src/lib/` — metadata/H1 templates, slug utilities, content pipeline, Supabase helpers, and iztro helpers.
- `src/types/` — shared TypeScript types.
- `tests/` — Vitest integration/story tests and QA notes.
- `e2e/` — Playwright browser checks.
- `docs/specs/` — active product specs. Old tmux-team files are archived under `docs/archive/old-tmux-team/` only.

Primary goal: ship indexable SEO content pages; do not prioritize horoscope-app infrastructure unless explicitly requested.

TuVi algorithms, terminology, and calculation behavior must be read from the approved reference repo in `sample_code/horoscope/` before implementation. Do not invent astrology logic. For the current roadmap, keep `/tu-vi/` and birth-year pages static/server-rendered; `/lap-la-so/` is a static SEO landing page unless Boss explicitly reopens app scope.

For visual direction, study `docs/reference/horoscope-ui-theme.md`; it distills the approved `sample_code/horoscope/web` ivory/indigo/gold/vermillion manuscript theme. For generated images, follow `docs/reference/generated-images-policy.md`: use selective hero/OG images, not unique AI art on every pSEO page.

## Build, Test, and Development Commands

- `npm run dev` — start local dev server on port `3347`.
- `npm run build` — generate sitemaps, then build the app.
- `npm run start` — serve the production build.
- `npm run deploy:vercel` — deploy production using ignored `.env.vercel` (`VERCEL_TOKEN`).
- `npm test` — run Vitest tests.
- `npm run test:watch` — run Vitest in watch mode.
- `npx playwright test` — run E2E tests in `e2e/`.

Run `npm test` and `npm run build` before handoff.

## Coding Style & Naming Conventions

Use TypeScript and React functional components. Prefer explicit types for exports. Use 2-space indentation and focused modules. File names should be lowercase kebab-case, e.g. `meta-templates.ts`, `reading-process.tsx`.

Vietnamese URL slugs must be lowercase, hyphen-separated, and diacritic-stripped. Keep route allow-lists in `src/content/routes.json` + `src/content/routes.ts`.

## Testing Guidelines

Vitest covers unit/integration tests; Playwright covers browser-level SEO, responsive, and performance checks. Name tests by behavior or story, e.g. `slug.test.ts`, `seo-requirements.spec.ts`.

For SEO content changes, verify: no placeholders, one H1, `lang="vi"`, indexable metadata, schema, and visible “tham khảo” disclaimer.

## SEO Quality Gate & Legacy Pages

Never publish unreviewed, thin, or template-only SEO pages. If a route was previously reachable but is not approved for indexing, gate it deliberately:

1. Remove it from `sitemap.xml` and any segmented sitemap such as `stars.xml`.
2. Prevent unsafe generation with `dynamicParams = false` or an equivalent allow-list.
3. Add an explicit `301` redirect to the nearest useful hub, e.g. gated `/sao/*` pages redirect to `/tu-vi/`, to preserve backlink equity.
4. Add targeted Vitest/Playwright checks for approved pages, gated pages, sitemap contents, and redirect status.

Only re-enable a gated page after rich content, domain review, compliance review, and passing tests.


## Company Brain & Durable Knowledge

For OPC/company work, use SBrain/gbrain, not MyPKM. Load the global skill at `~/.claude/skills/use-sbrain/SKILL.md` when writing durable company knowledge. Canonical company memory lives under `~/data/sbrain/wiki` entity pages.

Workflow: search with `gbrain`, update the canonical entity compiled truth above the first body `---`, append source-cited evidence under `## Timeline`, run `~/data/sbrain/bin/sbrain-sync`, then commit the SBrain repo. If you cannot safely write/commit, send Gal an exact patch/update request. MyPKM is legacy/personal unless Boss explicitly asks for it.

Key references: `~/data/sbrain/CLAUDE.md`, `~/data/sbrain/wiki/RESOLVER.md`, `~/data/sbrain/wiki/schema.md`, and `~/data/sbrain/wiki/concepts/brain/sbrain-agent-write-protocol.md`.

## Commit & Pull Request Guidelines

History uses `feat:`, `fix:`, `security:`, `chore:`, and story commits like `STORY-012a: ...`. Commit often: git history is the primary past-progress tracker, so save each meaningful working checkpoint with a clear message after tests/builds pass. PRs should include summary, affected routes, test results, screenshots for visual changes, and relevant docs/story IDs.

## Security & Agent Instructions

Do not commit or print `.env*`, Supabase credentials, or Vercel tokens. Local Kimi coding-plan credentials may live in ignored `./.env`; use them only if an LLM call is truly required. Any LLM-facing code must include unit tests plus VCR-style recorded/mocked integration tests. Ignore archived tmux-team prompts. This repo is now solo-owned: PO means Product Owner + Coder. There is no SM/TL/FE/BE/QA routing; plan and execute directly. Default progress reporting goes to Gallagher/OPC via `tm-send -s opc-research opc-consultant "..."` when that role exists, or the active Gal/OPC pane if roles changed. Send concise daily status to Gal with: shipped commits/tests, current task, blockers, next action, and any ungating approvals needed. Do not report directly to Boss/Telegram for routine work. Escalate to Boss only when Boss explicitly asks, or when a concrete Boss action/decision/login/payment/credential is required to unblock development. Ask Gallagher/OPC when product strategy is unclear. If Tử Vi/Kinh Dịch domain guidance conflicts or a technical/content issue needs expert domain arbitration, discuss directly with `boi-toan-consultant` before coding further.
