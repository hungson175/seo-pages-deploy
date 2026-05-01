# STORY-012b: Birth-Year Forecast Content Pipeline (Scale)

**Status:** FINAL — Sprint 3 P1

## Overview

Scale the Sprint 2 MVP pipeline to generate content for 72+ birth-year forecast pages. The pipeline infrastructure is already built (extract, generate, validate, seed). Sprint 3 applies it at scale with competitor-driven enhancements.

## Architecture

### Scale Target

| Metric | Sprint 2 (MVP) | Sprint 3 (Scale) |
|--------|----------------|------------------|
| Pages | 12–24 | 72–96 |
| Coverage | 1 animal or 1 year | All animals + all years |
| Content | Template-based | LLM-generated (competitor advantage) |
| H1 optimization | Basic | Competitor formula |
| Meta description | Static | Dynamic per page |

### Content Coverage

**12 animals × 4 years × 2 genders = 96 total pages**
- Sprint 3 target: 72+ pages (all animals, all years, both genders)
- If 96 is too many for one sprint: prioritize by search volume
- Fallback: 48 pages (all animals, 2 years, both genders)

### Pipeline Reuse

Sprint 2 pipeline stages remain unchanged:
1. iztro JSON extraction
2. LLM content generation (with domain rules)
3. Article 320 + uniqueness validation
4. Supabase seeding (UPSERT)
5. Static generation

**Sprint 3 additions**:
- H1 formula injection per page
- Dynamic meta description generation
- Internal linking seed data (for future Sprint 4)

## Competitor Enhancements

### H1 Formula (STORY-016)

Each page title follows: `[Action] + [Keyword] + [Benefit]`

**Template**: `Xem tử vi tuổi {animal} năm {year} {gender} — {primary_star} {brightness}`

**Examples**:
- `Xem tử vi tuổi Tý 2026 nam — Tử Vi minh, vận mệnh hanh thông`
- `Xem tử vi tuổi Dần 2025 nữ — Thái Dương bình, cần kiên nhẫn`

**Rules**:
- Include primary star and brightness from iztro data
- Keep under 60 characters where possible
- Always in Vietnamese, no diacritics in URL (slug stays stripped)

### Meta Description Formula

**Template**: `{Benefit} + {Differentiator} + {CTA}`

**Example**: `Xem tử vi chi tiết tuổi Tý 2026 nam mạng. Luận giải 12 cung, sự nghiệp, tình duyên miễn phí. Tham khảo ngay!`

**Rules**:
- 150–160 characters
- Include year, animal, gender
- Include "miễn phí" for CTR
- End with soft CTA

### Schema Enhancement

Already implemented: Article + FAQPage + BreadcrumbList

**Sprint 3 addition**: Ensure FAQPage questions include year/animal for uniqueness:
- `Tử vi tuổi {animal} năm {year} có tốt không?`
- `Sao {primary_star} độ sáng {brightness} có ý nghĩa gì?`

## Data Model

Same as Sprint 2 (`pages` table), with additional fields:
- `h1_formula`: Generated H1 text
- `meta_description`: Dynamic meta description
- `primary_star`: From iztro data (for internal linking)
- `linked_pages`: Array of related slugs (seed for Sprint 4)

## Acceptance Criteria

- [ ] Pipeline generates content for 72+ forecast pages
- [ ] Each page has unique H1 following competitor formula
- [ ] Each page has unique meta description (150–160 chars)
- [ ] Content length: 1,200–1,500 words per page
- [ ] Article 320 compliance maintained
- [ ] Uniqueness ≥ 80% across all pages
- [ ] All pages indexed (no NOINDEX on forecast pages)
- [ ] Build time < 2 minutes for 72+ pages
- [ ] Supabase seeding completes without errors

## Technical Constraints

- **Build time**: 72 pages should not exceed 2 minutes (currently < 1 min for 129)
- **LLM cost**: Monitor API usage; batch generation preferred
- **Idempotency**: UPSERT ensures re-runs are safe
- **Rollback**: Can delete all forecast rows and re-generate

## BE / FE Work Split

| Task | Owner | Deliverable |
|------|-------|-------------|
| Scale pipeline to 72+ pages | BE | Run generation for all animal/year/gender combos |
| H1 formula injection | BE | Generate H1 per page using iztro data |
| Meta description generation | BE | Dynamic meta per page |
| Supabase seeding at scale | BE | Batch insert 72+ rows |
| Page template (no changes) | FE | Reuse Sprint 2 template |
| Schema injection (no changes) | FE | Reuse Sprint 2 components |
| Build verification | FE | Confirm all 72+ pages render |

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| LLM API rate limits | Medium | High | Batch with delays; use local LLM fallback |
| Build time > 2 min | Low | Medium | Already < 1 min for 129 pages |
| Content quality drops at scale | Medium | High | Sample review every 20 pages |
| Supabase batch insert fails | Low | Medium | Chunk inserts into batches of 50 |

---

*Spec length: ~120 lines. Ready for BE TDD.*
