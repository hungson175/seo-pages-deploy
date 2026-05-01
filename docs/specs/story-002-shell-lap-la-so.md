# STORY-002-shell: /lap-la-so/ Free Tool Page (Shell)

**Scope:** Form UI, layout, and schema only. iztro chart rendering is OUT OF SCOPE for Sprint 1.

## Overview

Build the shell of the `/lap-la-so/` free lá số tử vi generator page — the highest search-volume keyword (65K monthly searches). This story delivers the user-facing form, page structure, schema markup, and conversion CTA. The interactive iztro chart and insight generation will be implemented in Sprint 2 (STORY-002-full).

## Architecture

### Route & Layout

- Route: `/lap-la-so/` (no dynamic segments)
- Layout group: `(tool)` — isolated from `(main)` to allow distinct navigation and footer treatment
- Page type: `'use client'` for form interactivity; everything else server-rendered

### Form Design

**Input fields:**
- `name` (text) — Vietnamese name, optional for chart generation but required for personalization
- `birth_date` (date picker) — day/month/year, validated to reasonable range (1900–today)
- `birth_time` (select/dropdown) — 12 two-hour time periods (Tý, Sửu, Dần, ...), mapped to index 0–11
- `gender` (radio/select) — Nam / Nữ

**UX requirements:**
- Inline validation with Vietnamese error messages
- Submit button triggers form state change (no server round-trip for shell)
- Loading state placeholder for future chart generation
- Mobile-first: stacked inputs, large touch targets

### Visual Structure

```
/lap-la-so/
├── Hero section: Tool title + value proposition
├── Form section: 4 inputs + submit
├── Chart placeholder: Empty state with instruction text
├── Insights placeholder: "Nhập thông tin để xem luận giải" message
├── CTA section: Paid deep reading upsell (static placeholder)
└── FAQ section: 5–7 accordion items
```

### Schema Markup

| Schema | Purpose |
|--------|---------|
| HowTo | Step-by-step guide: "Cách lập lá số tử vi" |
| FAQPage | Common questions about tử vi and the tool |
| Service | Describes the free tool + paid deep reading service |

All schemas must include `"inLanguage": "vi"`.

## Data Model

No new tables required for the shell. Form state is client-side only.

For Sprint 2 (chart integration), the `pages` table will store:
- `tool_config` (jsonb) — form defaults, FAQ content, CTA copy
- `faq_items` (jsonb array) — question/answer pairs for FAQPage schema

## API Endpoints

No API endpoints for the shell. Form submission is client-side only.

Sprint 2 will add:
- `POST /api/generate-chart` — accepts form data, returns iztro SVG + JSON metadata
- `POST /api/generate-insights` — LLM pipeline for 3 free insights

## Acceptance Criteria

- [ ] `/lap-la-so/` route renders with `(tool)` layout group
- [ ] Form with 4 inputs (name, birth_date, birth_time, gender) styled with Tailwind
- [ ] Inline validation with Vietnamese error messages
- [ ] Chart placeholder visible after form submission
- [ ] Insights placeholder visible after form submission
- [ ] CTA section for paid deep reading with placeholder copy
- [ ] FAQ section with 5–7 accordion items
- [ ] HowTo + FAQPage + Service schema markup injected as JSON-LD
- [ ] Mobile responsive (tested at 375px and 768px breakpoints)
- [ ] Lighthouse mobile score ≥ 90
- [ ] **Explicitly NOT included**: iztro chart SVG, real-time insights, API integration

## Technical Constraints

- Client JS budget: < 200 KB for this page (form state + accordion + placeholders)
- Accessibility: Form labels linked to inputs, error announcements via `aria-live`
- Performance: Form fields lazy-loaded below fold if needed; no blocking third-party scripts
- SEO: Page must be crawlable — schema and static content render without JavaScript
- Article 320: Include `"tham khảo"` disclaimer in FAQ and CTA sections

## FE / BE Work Split

| Layer | Owner | Deliverable |
|-------|-------|-------------|
| Form UI + validation | FE | React form component with client-side state |
| Layout + styling | FE | `(tool)` layout, Vietnamese aesthetic (dark navy + gold accents) |
| Schema markup | FE | JSON-LD components for HowTo, FAQPage, Service |
| FAQ content | BE | Seed FAQ data in Supabase `pages` table |
| CTA copy | BE | Seed CTA placeholder copy in Supabase |

---

*Spec finalized for Sprint 1 (shell only). Length: ~120 lines. Ready for FE breakdown.*
