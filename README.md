# SEO Pages

Next.js SEO-content site for Bói Toán/Tử Vi. The current goal is simple: ship indexable Vietnamese pages with real divination content, not rebuild the separate horoscope app.

## Important Paths

- `src/app/` — App Router pages, layouts, robots, and sitemap entrypoints.
- `src/content/` — canonical route lists and SEO content databases.
- `src/components/` — reusable rendering components, JSON-LD, chart UI, and trust blocks.
- `src/lib/` — utilities: metadata, H1/meta templates, slug/casing, LLM/content pipeline, Supabase, iztro helpers.
- `tests/` — Vitest integration/story tests and QA notes.
- `e2e/` — Playwright browser checks.
- `docs/specs/` — active product/technical specs.
- `docs/archive/old-tmux-team/` — preserved historical team docs; not active operating instructions.

## Commands

```bash
npm run dev      # local dev server on :3347
npm test         # Vitest suite
npm run build    # generate public sitemaps + production build
npx playwright test --project=chromium
```

Before handoff, run `npm test` and `npm run build`.
