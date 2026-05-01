# STORY-016: H1 and Meta Tag Optimization

**Status:** FINAL — Sprint 3 P1

## Overview

Implement competitor-driven H1 and meta tag optimization across all page types. Formula: `[Action] + [Keyword] + [Benefit/Emotional]`.

## H1 Formula

### Forecast Pages (`/tuvi/{slug}`)

**Template**: `Xem tử vi tuổi {animal} năm {year} {gender} — {primary_star} {brightness_meaning}`

**Brightness mapping**:
- minh → "sáng rõ, vận mệnh hanh thông"
- hãm → "bị hãm, cần kiên nhẫn"
- bình → "bình hòa, cần nỗ lực"

**Examples**:
- `Xem tử vi tuổi Tý 2026 nam — Tử Vi minh, vận mệnh hanh thông`
- `Xem tử vi tuổi Dần 2025 nữ — Thái Dương bình, cần nỗ lực`

**Rules**:
- One H1 per page only
- Keyword (animal + year + gender) in first 60 characters
- H1 ≠ title (can be similar but not identical)
- Natural Vietnamese, no keyword stuffing

### Star Pages (`/sao/{star}`)

**Template**: `Sao {star} trong tử vi — Ý nghĩa, vị trí và ảnh hưởng`

**Example**: `Sao Tử Vi trong tử vi — Ý nghĩa, vị trí và ảnh hưởng`

### Quẻ Pages (`/que/{slug}`)

**Template**: `Quẻ {name} — Giải đoán ý nghĩa và ứng dụng Kinh Dịch`

**Example**: `Quẻ Kiển Vì Thiên — Giải đoán ý nghĩa và ứng dụng Kinh Dịch`

### Tool Page (`/lap-la-so/`)

**Template**: `Lập lá số tử vi online — Miễn phí, chính xác, 3 luận giải đầu tiên`

## Meta Description Formula

**Template**: `{Benefit} + {Differentiator} + {CTA}`

**Rules**:
- 150–160 characters
- Include primary keyword
- Include "miễn phí" or "online" for CTR
- End with soft CTA: "Tham khảo ngay!" or "Xem chi tiết!"

### Forecast Meta Description

**Template**: `Xem tử vi chi tiết tuổi {animal} {year} {gender}. Luận giải 12 cung, sự nghiệp, tài lộc, tình duyên miễn phí. Tham khảo ngay!`

**Example**: `Xem tử vi chi tiết tuổi Tý 2026 nam. Luận giải 12 cung, sự nghiệp, tài lộc, tình duyên miễn phí. Tham khảo ngay!`

### Star Meta Description

**Template**: `Tìm hiểu ý nghĩa sao {star} trong lá số tử vi. Vị trí, độ sáng và ảnh hưởng đến vận mệnh. Tham khảo chi tiết!`

## Implementation

### BE Responsibility

- Generate H1 and meta description during content pipeline
- Store in `pages` table: `h1`, `meta_description` columns
- Use iztro data for dynamic values (star names, brightness)

### FE Responsibility

- Render H1 from Supabase data (not hardcoded)
- Use `metadata` export from Next.js for meta tags
- Ensure H1 is visible (not hidden or replaced by CSS)

### Current State vs Target

| Element | Current | Target (Sprint 3) |
|---------|---------|-------------------|
| H1 (forecast) | `Tử Vi {displayName}` | `Xem tử vi tuổi {animal} năm {year} {gender} — {star} {brightness}` |
| Meta title | `Tử Vi {slug} - Xem Chi Tiết` | `Xem tử vi tuổi {animal} {year} {gender} — {star} {brightness}` |
| Meta description | Static template | Dynamic: benefit + differentiator + CTA |

## Acceptance Criteria

- [ ] All forecast pages have unique H1 following formula
- [ ] All forecast pages have unique meta description (150–160 chars)
- [ ] H1 includes keyword in first 60 characters
- [ ] Meta description includes "miễn phí" or "online"
- [ ] One H1 per page, no duplicates
- [ ] H1 and title are similar but not identical
- [ ] Star and quẻ pages follow their H1 templates
- [ ] Tool page H1 optimized for conversion

## Technical Constraints

- **Character limits**: H1 < 70 chars ideally; meta 150–160 chars
- **No duplication**: Each page must have unique H1 and meta
- **No hidden H1**: H1 must be visible to users, not just SEO
- **Vietnamese**: Natural language, no awkward keyword stuffing

---

*Spec length: ~90 lines. Ready for BE/FE TDD.*
