# STORY-011b: iztro Chart UI Rendering

**Status:** DRAFT — Early spec for Sprint 3 Planning

## Overview

Complete the iztro integration by rendering an interactive 12-palace tử vi chart on `/lap-la-so/`. Sprint 2 built the data pipeline (extract, map, insights). Sprint 3 delivers the actual SVG chart visualization and interactive features.

## Architecture

### Component Hierarchy

```
LapLaSoClient (page)
├── FormSection (existing)
├── ChartSection (NEW)
│   ├── PalaceGrid — 12-palace layout
│   ├── StarTooltip — hover details
│   └── PalaceDetail — click-to-expand
├── InsightCards (existing — refine)
└── PaidCTA (existing — refine)
```

### SVG Chart Strategy

**Decision**: Custom SVG renderer (not react-iztro)
- **Rationale**: Full styling control for dark navy + gold aesthetic
- **Output**: Responsive SVG, scales to container
- **Accessibility**: aria-label per palace, keyboard navigation

### Data Flow (Sprint 3)

```
Form submit → mapFormToIztro() → extractIztroData() 
→ extractChartData() → generateInsights() 
→ render PalaceGrid SVG + InsightCards
```

All existing from Sprint 2. Sprint 3 adds the **render layer**.

## Chart Specification

### 12-Palace Layout

Traditional Tử Vi grid (4×3 or circular). MVP: 4×3 grid for simplicity.

```
┌─────────┬─────────┬─────────┬─────────┐
│ Tử Tức  │ Phu Thê │ Huynh Đệ│ Mệnh    │
│ (9)     │ (10)    │ (11)    │ (0)     │
├─────────┼─────────┼─────────┼─────────┤
│ Tài Bạch│         │         │ Phụ Mẫu │
│ (8)     │         │         │ (1)     │
├─────────┼─────────┼─────────┼─────────┤
│ Tật Ách │         │         │ Phúc Đức│
│ (7)     │         │         │ (2)     │
├─────────┼─────────┼─────────┼─────────┤
│ Thiên Di│ Nô Bộc  │ Quan Lộc│ Điền Trạch
│ (6)     │ (5)     │ (4)     │ (3)     │
└─────────┴─────────┴─────────┴─────────┘
```

### Palace Card Content

Each palace cell displays:
- **Palace name** (top, bold)
- **Major stars** (center, with brightness indicator)
  - Minh: gold color, bold
  - Hãm: muted gray
  - Bình: normal weight
- **Minor stars** (bottom, smaller text)
- **Transformation** (if present): colored badge

### Interactive Features (MVP)

1. **Hover**: Tooltip showing star details + meaning
2. **Click**: Expand palace details (modal or inline)
3. **Zoom**: Pinch-to-zoom on mobile, scroll on desktop

### Styling

- Background: `bg-navy-800` with `border-navy-700`
- Palace header: `text-gold-400`
- Major star (minh): `text-gold-300 font-bold`
- Major star (hãm): `text-navy-400`
- Major star (bình): `text-navy-200`
- Minor stars: `text-navy-500 text-xs`
- Transformation badge: `bg-gold-700 text-gold-100`

## Insight Cards Refinement

### Current State (Sprint 2)
- 3 cards: Mệnh Cung, Life Area, Lucky Element
- Template-based text

### Sprint 3 Improvements
- Add **star icons** or **palace mini-map** to each card
- **Dynamic CTA** based on insight type
  - Mệnh Cung → "Xem chi tiết 12 cung"
  - Life Area → "Xem [palace name] chi tiết"
  - Lucky Element → "Xem phong thủy phù hợp"

## Paid CTA Refinement

### Features List (from Bói-Toán spec)
- Full 12-cung detailed analysis
- Decadal fortune (Đại Vận) breakdown
- Monthly forecast (Lưu Niên)
- PDF download

### Pricing
- 99.000đ
- Social proof: "Đã có 1.200+ ngườii mua" (placeholder)

## Performance Requirements

- Chart render: < 1s on mid-tier mobile
- SVG size: < 50 KB gzipped
- Lazy load: Chart only renders after form submission
- Bundle: iztro chunk < 500 KB (already known)

## Accessibility

- aria-label on each palace cell
- keyboard navigation (Tab through palaces, Enter to expand)
- aria-live for chart load completion
- Screen reader summary: "Lá số tử vi 12 cung đã tạo xong. Mệnh cung có sao [name]."

## Acceptance Criteria

- [ ] 12-palace grid renders correctly with all palace names
- [ ] Major stars displayed with brightness color coding
- [ ] Minor stars listed below major stars
- [ ] Four transformations shown as colored badges
- [ ] Hover tooltip shows star details
- [ ] Click expands palace details
- [ ] Chart responsive on mobile (375px+)
- [ ] Chart render < 1s on mobile
- [ ] Accessibility: keyboard navigation + screen reader
- [ ] Insight cards refined with star icons/palace map
- [ ] Paid CTA with full feature list
- [ ] Lighthouse mobile score remains ≥ 90

## BE / FE Work Split

| Task | Owner | Deliverable |
|------|-------|-------------|
| PalaceGrid SVG component | FE | React component rendering 12-palace SVG |
| StarTooltip component | FE | Hover tooltip with star details |
| PalaceDetail modal | FE | Click-to-expand palace information |
| Insight card refinement | FE | Updated cards with icons/maps |
| Responsive styling | FE | Mobile-first CSS/Tailwind |
| Accessibility | FE | ARIA labels, keyboard nav |
| Performance test | FE | Verify render time < 1s |

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| SVG complexity too high | Medium | High | Start with simple grid, iterate |
| iztro bundle slows chart | Medium | Medium | Dynamic import + loading state |
| Mobile rendering issues | Medium | Medium | Test on actual devices early |
| Accessibility gaps | Low | Medium | axe DevTools validation |

## Dependencies

- `iztro` — already installed (Sprint 2)
- `chart-extractor.ts` — already implemented (Sprint 2)
- `insights.ts` — already implemented (Sprint 2)

## Technical Constraints

- **No canvas**: SVG only for accessibility
- **No SSR**: Chart client-side only (dynamic import)
- **Bundle budget**: Initial load < 150 KB
- **Performance**: Render < 1s, no layout shift (CLS < 0.1)

---

*Spec length: ~140 lines. Architecture-level, zero code samples. Ready for Sprint 3 Planning.*
