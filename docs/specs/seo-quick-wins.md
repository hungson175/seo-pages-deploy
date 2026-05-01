# SEO Quick Wins — Competitor Analysis Integration

**Status:** DRAFT — Sprint 3 Quick Wins

## Overview

Incorporate competitor analysis insights (tuvi.vn, aituvi.com) into technical architecture. Focus on quick wins that require minimal code changes but significant SEO impact.

## Quick Wins (Minimal Code Changes)

### 1. lang="vi" — ALREADY IMPLEMENTED ✅

Current state: `<html lang="vi">` present in `layout.tsx`
- Confirmed in deployed build
- aituvi.com has `lang="en"` — competitor mistake we avoid

### 2. Index/Noindex Strategy

| Page Type | robots | Rationale |
|-----------|--------|-----------|
| Forecast (`/tuvi/*`) | `index, follow` | Long-tail SEO gold. tuvi.vn NOINDEXES these — we INDEX |
| Star (`/sao/*`) | `index, follow` | Educational content, high search volume |
| Quẻ (`/que/*`) | `index, follow` | 64 quẻ pages, unique content |
| Tool (`/lap-la-so/`) | `index, follow` | Conversion funnel entry point, rich content |
| Homepage (`/`) | `index, follow` | Branded + generic terms |
| Form-only pages (future) | `noindex, follow` | Thin content, no SEO value |

**Implementation**: Set at layout level with per-page overrides:
- Default: `index, follow`
- Tool page: keep `index, follow` (it has content, schema, FAQ — not just a form)
- Any future form-only pages: `noindex, follow`

### 3. Meta Tag Template (H1 Formula)

**Formula**: `[Action] + [Keyword] + [Benefit/Emotional]`

**Examples by page type**:

| Page Type | Template | Example |
|-----------|----------|---------|
| Forecast | `Xem tử vi [animal] [year] [gender] — [benefit]` | `Xem tử vi tuổi Tý 2026 nam — Luận giải vận mệnh chi tiết` |
| Star | `Sao [star name] — Ý nghĩa và ảnh hưởng` | `Sao Tử Vi — Ý nghĩa và ảnh hưởng trong lá số` |
| Quẻ | `Quẻ [name] — Giải đoán ý nghĩa Kinh Dịch` | `Quẻ Kiển Vì Thiên — Giải đoán ý nghĩa Kinh Dịch` |
| Tool | `[Action] [keyword] — [benefit] [CTA]` | `Lập lá số tử vi online — Xem 3 luận giải miễn phí` |

**Meta Description Template**: `[Benefit] + [Differentiator] + [CTA]`
- Max 160 characters
- Include "miễn phí" or "online" for CTR
- End with soft CTA: "Xem ngay" or "Tham khảo"

### 4. Schema.org Enhancement — ALREADY IMPLEMENTED ✅

Current state: All required schemas present
- WebSite (homepage)
- Article (forecast/star/quẻ pages)
- FAQPage (forecast + tool pages)
- BreadcrumbList (all dynamic routes)
- HowTo (tool page)
- Service (tool page)

**Gap**: No Person schema for author. Add if we have a named expert.

## Medium Wins (Moderate Effort)

### 5. H1 Optimization

Apply formula to all page templates:
- **Forecast**: `<h1>Xem tử vi tuổi [animal] năm [year] [gender] — [primary star] [brightness]</h1>`
- **Star**: `<h1>Sao [star] trong tử vi — Ý nghĩa, vị trí và ảnh hưởng</h1>`
- **Quẻ**: `<h1>Quẻ [name] — Luận giải ý nghĩa và ứng dụng</h1>`
- **Tool**: `<h1>Lập lá số tử vi online — Miễn phí, chính xác, chi tiết</h1>`

**Rules**:
- One H1 per page
- H1 ≠ title (can be similar but not identical)
- H1 includes primary keyword within first 60 characters

### 6. Trust Signals

Already implemented:
- Article 320 disclaimer: "tham khảo" not "tiên đoán" ✅
- "Không lưu trữ thông tin cá nhân" ✅
- Professional tone: "Thầy bói nói chuyện" ✅

**Additions**:
- Last updated date on content pages
- "Được xây dựng bởi chuyên gia tử vi" (if applicable)
- User count / social proof (placeholder for now)

## Large Wins (Future Sprints)

### 7. Internal Linking Matrix

Every page links to 10+ related pages:
- Forecast → related animals, same animal different years
- Star → related stars, stars in same palace
- Quẻ → biến quẻ, related quẻ
- Tool → sample forecasts, star guides

**Effort**: Content generation + link logic. Sprint 4+.

### 8. Full Sitemap (440+ Pages)

Current: 129 pages
Target: 440+ pages (Year 1)

**Sprint 3**: Scale to ~200 pages (add more years/animals)
**Sprint 4+**: Reach 440+

## Competitor Differentiation

| Feature | tuvi.vn | aituvi.com | Bói Toán (Us) |
|---------|---------|------------|---------------|
| Year pages indexed | NOINDEX ❌ | Unknown | INDEX ✅ |
| lang attribute | vi ✅ | en ❌ | vi ✅ |
| AI positioning | No | Yes ✅ | Yes (Sprint 3) |
| Schema markup | Partial | Partial | Full ✅ |
| Internal linking | Weak | Medium | Strong (Sprint 4) |
| Free tool + paid CTA | No | No | Yes ✅ |

## Acceptance Criteria

- [ ] `lang="vi"` confirmed on all pages
- [ ] robots meta: index all content pages, noindex only thin form pages
- [ ] Meta title follows H1 formula
- [ ] Meta description ≤ 160 chars with benefit + CTA
- [ ] One H1 per page, keyword in first 60 chars
- [ ] All 6 schema types present and valid
- [ ] Article 320 disclaimer on every page
- [ ] Last updated date visible

## Technical Constraints

- **No duplicate H1/title**: Title and H1 can be similar but not identical
- **No keyword stuffing**: Natural Vietnamese language
- **Mobile-first**: All meta tags render correctly on mobile

---

*Spec length: ~100 lines. Quick wins focused. Ready for Sprint 3.*
