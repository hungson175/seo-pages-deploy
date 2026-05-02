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

## Commit & Pull Request Guidelines

History uses `feat:`, `fix:`, `security:`, `chore:`, and story commits like `STORY-012a: ...`. PRs should include summary, affected routes, test results, screenshots for visual changes, and relevant docs/story IDs.

## Security & Agent Instructions

Do not commit or print `.env*`, Supabase credentials, or Vercel tokens. Local Kimi coding-plan credentials may live in ignored `./.env`; use them only if an LLM call is truly required. Any LLM-facing code must include unit tests plus VCR-style recorded/mocked integration tests. Ignore archived tmux-team prompts. This is now a single-coder repo inside the larger OPC/company context; ask Gallagher/OPC via `tm-send -s opc-research opc-consultant "..."` only when product strategy is unclear.
