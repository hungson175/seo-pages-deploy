# Horoscope Reference Notes

Reference repo: `sample_code/horoscope` cloned from `https://github.com/VinhHung1999/horoscope`.
Commit inspected: `c363054 feat(packages): seed basic+full on FastAPI startup (2102)`.

## Files Inspected

- `web/app/page.tsx` — 3-step birth form and form → chart flow.
- `web/app/reading/[chartId]/page.tsx` — chart reading shell, sidebar chart preview, tabs, chat, cache flow.
- `web/components/ChartSVG.tsx` — 12-palace SVG grid renderer.
- `web/app/api/can-chi/route.ts` — frontend proxy to backend Can Chi endpoint.
- `be/app/routers/canchi.py` + `be/app/services/lunar.py` — actual solar→lunar year and Can Chi logic.
- `web/lib/chartTypes.ts` — chart data contract.

## What To Reuse For `/lap-la-so/`

### 1. Form Pattern

Use a 3-step flow:

1. Name + gender + optional place.
2. Solar birth day/month/year + 12 địa chi birth-hour chips.
3. Confirmation card with Can Chi preview and submit CTA.

Strong UX details to copy conceptually: progress steps, Vietnamese helper text, error copy in “Thầy” tone, mobile fixed action bar, 12-hour chip grid, and confirmation summary before generating chart.

### 2. Chart Visualization

`ChartSVG.tsx` renders a 4×4 SVG board with the center 2×2 area as the Thiên Bàn and 12 outside cells as palaces. Palace order is mapped by chi coordinates:

`Tỵ Ngọ Mùi Thân / Thìn _ _ Dậu / Mão _ _ Tuất / Dần Sửu Tý Hợi`.

Good ideas to port lightly:

- parchment/ivory background + gold grid;
- Mệnh and Thân markers;
- center box with name, Can Chi year, hour, âm dương, mệnh/cục;
- main stars centered, auxiliary/malefic stars split left/right;
- optional tam-hợp/opposite-cung hover lines.

For this SEO repo, keep it smaller: a preview chart inside `/lap-la-so/`, no full reading workspace.

### 3. Data Flow

Reference flow is:

`form → POST /api/chart → backend cast_chart → chartId → /reading/[chartId] → GET chart + LLM sections`.

Our MVP should be:

`form → client-side iztro generateChart → render chart preview + 3 free insights on same /lap-la-so/ page`.

No auth, no backend chart store, no database, no `/reading/[chartId]` route for MVP.

### 4. Can Chi Logic

The web route is only a proxy. Actual logic:

- Convert solar date to lunar date via `LunarDate.fromSolarDate`.
- Compute Can Chi from lunar year with 1984 as Giáp Tý base:
  - can index = `(lunarYear - 1984) % 10`
  - chi index = `(lunarYear - 1984) % 12`
- Handle birth-hour keys separately, including `Ty_som` vs `Ty_muon`.

For our repo, either use `iztro`/lunar helper if already sufficient, or implement a tiny client-safe Can Chi preview utility. Do not add backend just for Can Chi.

## What Not To Copy

- Auth/login.
- Full FastAPI backend.
- DB/cache schema.
- LLM reading tabs, chat, PDF export.
- Massive reading page shell.

## Proposed MVP Spec For This Repo

`/lap-la-so/` should become a high-converting SEO tool page:

- Keep indexed SEO copy, FAQ, HowTo, and compliance disclaimer.
- Replace current mock with 3-step reference-inspired form.
- Generate iztro chart client-side after submit.
- Render a compact 12-palace grid preview.
- Show 3 free insights: Mệnh cung, primary stars, Cục/Can Chi summary.
- Add CTA below preview: paid deep reading/app handoff later.
- Store nothing; no auth; no database.

Implementation sequence:

1. Extract local `BirthForm` component from current `lap-la-so/client.tsx`.
2. Add `src/lib/can-chi.ts` for preview labels if iztro output is not enough.
3. Adapt `src/components/chart/palace-grid.tsx` toward the reference 4×4 palace layout.
4. Add E2E coverage: form validation, submit generates chart preview, disclaimer visible.
