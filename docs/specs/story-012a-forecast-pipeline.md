# STORY-012a: Birth-Year Forecast Content Pipeline (MVP)

**Status:** FINAL — Sprint 2 P1

## Overview

Build the end-to-end content generation pipeline for birth-year forecast pages. Sprint 2 delivers the **pipeline** (infrastructure + validation), not the full 96 pages. Target: 12–24 MVP pages with real content.

## Architecture

### Pipeline Stages

```
Allow-list slugs → iztro JSON generation → LLM content generation 
→ Uniqueness validation → Article 320 compliance check 
→ Supabase seed → Static page render → QA validation
```

### Stage 1: Data Source (iztro)

For each `{animal, year, gender}` combination:
- Call iztro to generate astrolabe JSON (build-time or script)
- Extract: major stars, palace positions, brightness levels, four transformations
- This JSON becomes the **unique seed** for LLM content generation

### Stage 2: LLM Content Generation

- **Input**: iztro JSON + animal + year + gender
- **Domain rules to inject into prompt**:
  - **Tam Hợp Phái**: Explain three harmonious combinations (Thân-Tý-Thìn, Dần-Ngọ-Tuất, etc.) when relevant
  - **Four Transformations (Tứ Hóa)**: Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ — their positions and meanings
  - **Five Elements Class (Ngũ Hành)**: Birth year element (Kim, Mộc, Thủy, Hỏa, Thổ) and yearly interactions
  - **Star Brightness**: Use độ sáng terminology (minh, hãm, bình) — never describe as "strong/weak"
  - **NO Western astrology terms**: No zodiac, horoscope, sun sign, ascendant, etc.
- **Output**: `content_json` with 5–7 sections:
  - Tổng quan năm {year}
  - Sự nghiệp & Tài lộc
  - Tình duyên & Gia đạo
  - Sức khỏe
  - Biến động quan trọng
  - Lờii khuyên (advice)
  - FAQ section
- **Tone**: "Thầy bói nói chuyện" — warm, advisory, not absolute
- **Length**: 1,200–1,500 words per page
- **Uniqueness target**: 80%+ (enforced by iztro JSON uniqueness)

### Stage 3: Compliance & Validation

- **Article 320 (MANDATORY)**: 
  - Every section uses "tham khảo" (reference) framing
  - NEVER use "tiên đoán" (prediction), "định mệnh" (fate), or absolute guarantees
  - Disclaimer visible on every page: "* Nội dung chỉ mang tính chất tham khảo, không phải lờii tiên đoán."
- **No Western astrology**: Automated check for zodiac, horoscope, sun sign, ascendant — flag and rewrite
- **No deity/sacred images**: Text only, no religious references
- **Star brightness accuracy**: Verify độ sáng terminology (minh/hãm/bình) is used correctly
- **Uniqueness check**: Compare generated content across pages; flag < 80% unique

### Stage 4: Supabase Integration

- Insert into `pages` table with `page_type: 'forecast'`
- Populate: `title`, `meta_description`, `content_json`, `faq_items`, `schema_config`
- `updated_at` set to generation timestamp

### Stage 5: Static Generation

- `generateStaticParams` reads slugs from allow-list
- Page component fetches `content_json` from Supabase at build time
- Renders sections with proper heading hierarchy (h2 per section)
- Injects Article + FAQPage + BreadcrumbList schema

## Data Model

Uses `pages` table from Supabase Integration Spec:
- `slug`: `tuoi-{animal}-{year}-{gender}`
- `page_type`: `'forecast'`
- `content_json`: `{sections: [{heading, content}]}`
- `faq_items`: `[{question, answer}]`

## MVP Scope (12–24 Pages)

**Option A (recommended):** One animal across all years/genders
- Example: All 8 pages for `tuoi-ty` (Tý) × 4 years × 2 genders = 8 pages
- Plus 4–16 additional pages for variety

**Option B:** One year across all animals/genders
- Example: All 24 pages for 2026 × 12 animals × 2 genders = 24 pages

**Selection criteria:** Choose the animal with highest search volume (verify with SEO consultant).

## API Endpoints

No external API endpoints. Content generation is a build-time or script process.

Optional: `POST /api/generate-forecast` (Edge Function) for on-demand generation — out of scope for Sprint 2.

## Acceptance Criteria

- [ ] Pipeline script/tool generates content for 12–24 forecast pages
- [ ] Each page has unique `content_json` based on iztro data
- [ ] Content length: 1,200–1,500 words per page
- [ ] Article 320: "tham khảo" used throughout; "tiên đoán" NEVER appears
- [ ] "Thầy bói nói chuyện" tone maintained
- [ ] NO Western astrology terms (zodiac, horoscope, sun sign, ascendant)
- [ ] Tam Hợp Phái referenced where relevant
- [ ] Four Transformations (Tứ Hóa) explained with positions
- [ ] Five Elements Class (Ngũ Hành) included
- [ ] Star brightness (minh/hãm/bình) terminology used correctly
- [ ] FAQ section with 2–4 items per page
- [ ] Schema markup: Article + FAQPage + BreadcrumbList
- [ ] Pages render from Supabase data (not hardcoded)
- [ ] Build passes with new pages included
- [ ] Uniqueness check: 80%+ unique across MVP pages

## Technical Constraints

- **Build time**: Adding 12–24 pages should not increase build time > 30s
- **Content generation**: May use local LLM (Ollama) or API; document cost if using API
- **Idempotency**: Pipeline can be re-run without duplicate rows (UPSERT on slug)
- **Rollback**: Can delete seeded rows and re-generate

## BE / FE Work Split

| Task | Owner | Deliverable |
|------|-------|-------------|
| iztro JSON extraction script | BE | Script that outputs astrolabe JSON per slug |
| LLM prompt template | BE | Reusable prompt with iztro JSON injection |
| Content generation pipeline | BE | Script/tool that generates and validates content |
| Supabase seeding | BE | Insert MVP pages into `pages` table |
| Page template update | FE | Dynamic route renders `content_json` sections |
| Schema injection | FE | Article + FAQPage + BreadcrumbList per forecast page |
| Uniqueness validation | QA | Cross-page comparison report |
| Article 320 compliance | QA | Check every page for "tham khảo" framing |

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| LLM content quality low | Medium | High | Manual review of MVP sample; refine prompt |
| iztro JSON too complex for LLM | Medium | Medium | Simplify JSON before injection; test with sample |
| Generation cost high | Medium | Medium | Use local LLM for MVP; monitor API costs |
| Uniqueness < 80% | Low | High | iztro JSON uniqueness guarantees content uniqueness |
| Build time increase | Low | Medium | Monitor; optimize if > 30s for 24 pages |

---

*Spec length: ~150 lines. Ready for BE/FE TDD.*
