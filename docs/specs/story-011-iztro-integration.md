# STORY-011: iztro Chart Integration for /lap-la-so/

**Status:** FINAL — Sprint 2 P1

## Overview

Integrate the iztro library into the `/lap-la-so/` tool page to generate interactive tử vi charts after form submission. Chart renders client-side only; no server rendering.

## Architecture

### iztro Integration Strategy

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Library | `iztro` (core) + custom SVG renderer | Core library provides astrolabe JSON data; custom renderer for styling control |
| Loading | `next/dynamic` with `ssr: false` | iztro is browser-only; prevents SSR errors and reduces initial bundle |
| Bundle impact | Lazy-loaded chunk | Initial page stays ~108 KB; iztro loads only after form submission |
| Localization | `vi-VN` locale | iztro supports Vietnamese; confirmed in package |

### Data Flow

```
User submits form → FE validates inputs → FE calls iztro.bySolar() 
→ iztro returns astrolabe JSON → FE renders custom SVG chart 
→ Display 3 free insight placeholders
```

### Input Mapping

| Form Field | iztro Parameter | Transform |
|------------|-----------------|-----------|
| `birth_date` | `date` string (YYYY-MM-DD) | Direct pass |
| `birth_time` | `timeIndex` (0–11) | Direct pass (Tý=0, Sửu=1, ...) |
| `gender` | `gender` | `nam` → `'male'`, `nữ` → `'female'` |
| `name` | N/A | Display only, not sent to iztro |

### Chart Rendering — 12-Palace Grid

iztro returns astrolabe data as a 12-palace grid (12 cung). The chart renderer must display:

- **12 palaces** arranged in a 4×3 or circular grid (Tử Vi traditional layout)
- **Major stars** (14 sao chính) with brightness indicators (độ sáng: minh, hãm, bình)
- **Palace names**: Mệnh, Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc, Nô Bộc, Thiên Di, Tật Ách, Tài Bạch, Tử Tức, Phu Thê, Huynh Đệ
- **Four transformations** (Tứ Hóa): Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ positioned correctly

**Rendering requirements:**
- **Output format**: SVG (preferred over canvas for accessibility and styling)
- **Styling**: Tailwind CSS classes, Vietnamese aesthetic (dark navy + gold)
- **Star/palace rules**: Each star has fixed palace associations; brightness affects interpretation
- **Accessibility**: `aria-label` on chart regions, keyboard-focusable elements, aria-live for chart summary
- **Responsive**: Scale SVG to container width; minimum readable size on mobile (375px)

### 3 Free Insights + Paid CTA Structure

After chart renders, display 3 free insight cards based on Bói-Toán domain rules:

1. **Mệnh Cung Verdict** — Overall destiny reading from Mệnh cung
   - Primary star + brightness level (minh/hãm/bình)
   - Key transformation (Hóa Lộc/Quyền/Khoa/Kỵ) in Mệnh
   - One-sentence verdict on life trajectory

2. **Life Area Teaser** — Highlight one critical palace
   - Rotate based on year: career (Quan Lộc), wealth (Tài Bạch), love (Phu Thê), health (Tật Ách)
   - 2-sentence teaser showing specific star combinations
   - Ends with: "Xem chi tiết 12 cung trong luận giải đầy đủ"

3. **Lucky Element** — Five Elements (Ngũ Hành) analysis
   - Element class of birth year (Kim, Mộc, Thủy, Hỏa, Thổ)
   - Compatible/incompatible elements for current year
   - Lucky color/number suggestion

Each insight:
- 2–3 sentences max
- Based on actual iztro palace/star data (not generic)
- Uses Vietnamese Tử Vi terminology (NO Western astrology terms)

**Paid Upsell CTA** appears after 3 insights:
- Headline: "Luận Giải Trọn Đờii — 99.000đ"
- Features list:
  - Full 12-cung detailed analysis
  - Decadal fortune (Đại Vận) breakdown
  - Monthly forecast (Lưu Niên) for current year
  - PDF download for offline reading
- Button: "Mua Ngay — 99.000đ"
- Trust signals: "Đã có 1.200+ ngườii mua" (social proof placeholder)
- Disclaimer: "* Kết quả chỉ mang tính chất tham khảo, không phải lờii tiên đoán"

### Error Handling

- Invalid date/time → show inline error (already in form validation)
- iztro calculation error → display friendly message: "Không thể tạo lá số. Vui lòng kiểm tra thông tin nhập."
- Rendering timeout → show fallback text description of chart
- Missing palace data → render available palaces, hide empty ones with explanatory note

## Data Model

No new database tables. Chart data is ephemeral (client-side only).

Optional: Cache recent charts in `localStorage` (key: hash of inputs) to avoid recalculation.

## API Endpoints

No API endpoints. iztro runs entirely in the browser.

## Acceptance Criteria

- [ ] iztro installed as dependency
- [ ] Form inputs correctly mapped to iztro parameters
- [ ] Chart renders via `next/dynamic` with `ssr: false`
- [ ] SVG chart styled with Tailwind (dark navy + gold)
- [ ] Chart is responsive and readable on mobile (375px+)
- [ ] Chart displays 12-palace grid with correct palace names (Mệnh, Phụ Mẫu, etc.)
- [ ] Major stars shown with brightness indicators (minh/hãm/bình)
- [ ] Four transformations (Tứ Hóa) positioned correctly
- [ ] 3 free insight cards visible after chart renders:
  - [ ] Mệnh Cung Verdict (primary star + brightness + transformation)
  - [ ] Life Area Teaser (rotating palace: career/wealth/love/health)
  - [ ] Lucky Element (Five Elements analysis)
- [ ] Each insight based on actual palace/star data from iztro
- [ ] NO Western astrology terms (zodiac, horoscope, etc.)
- [ ] Paid upsell CTA: full 12-cung + decadal + monthly + PDF
- [ ] Price: 99.000đ with social proof placeholder
- [ ] Error handling for invalid inputs, calculation failures, missing palace data
- [ ] Article 320 disclaimer visible near chart
- [ ] Lighthouse mobile score on `/lap-la-so/` remains ≥ 90 (iztro chunk lazy-loaded)
- [ ] First Load JS on `/lap-la-so/` initial load < 150 KB (iztro not in initial bundle)

## Technical Constraints

- **Bundle budget**: Initial load < 150 KB; iztro chunk loaded on demand
- **No SSR**: iztro must never execute during server render
- **No canvas**: SVG preferred for accessibility and styling control
- **Performance**: Chart render < 1s on mid-tier mobile device
- **Accessibility**: Screen-reader friendly summary of chart (aria-live region)

## BE / FE Work Split

| Task | Owner | Deliverable |
|------|-------|-------------|
| Install iztro | BE | `package.json` updated, build passes |
| Input mapping | FE | Transform form data to iztro params |
| Dynamic import wrapper | FE | `next/dynamic` with loading skeleton |
| SVG chart renderer | FE | Custom React component rendering iztro JSON as SVG |
| Mobile responsive | FE | SVG scales, text readable at 375px |
| Error handling | FE | Graceful fallback for calculation errors |
| Performance test | FE | Verify bundle split, measure render time |

## Dependencies

- `iztro` — core astrolabe calculation library
- `react-iztro` (optional) — pre-built React component; evaluate if styling flexibility is sufficient

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| iztro bundle too large | Medium | High | Dynamic import + code splitting |
| SVG rendering slow on mobile | Medium | Medium | Optimize SVG complexity; add loading state |
| Vietnamese localization gaps | Low | Medium | Test with vi-VN locale; fallback to zh-CN if needed |
| Custom SVG renderer complexity | Medium | High | Evaluate react-iztro first; fallback to custom if styling insufficient |

---

*Spec length: ~130 lines. Ready for FE TDD.*
