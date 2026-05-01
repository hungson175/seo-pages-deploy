# SEO Pages Team - WHITEBOARD

## Current Status

**Sprint:** Sprint 3 - Planning
**Phase:** Sprint 3 Planning (SM facilitating, PO approved scope)
**Sprint Dates:** Sprint 3 TBD (2 weeks)
**Sprint Goal:** Render iztro charts with full 12-palace grid UI, deploy to Vercel production, complete birth-year forecast content, and implement competitor quick-wins (H1, lang, meta, trust)

**Status:** 
- **SPRINT 1 ACCEPTED by PO (18:38)** ✅
- **SPRINT 2 OFFICIALLY CLOSED (19:57)** ✅ — **100% COMPLETE (4/4 stories)**
- **SPRINT 3: APPROVED by PO (22:08), SM facilitating Sprint 3 Planning**
- **Vercel token: OBTAINED (19:47)** — Sprint 3 P0 unblocked
- **Competitor analysis: INTEGRATED (20:50)** — 6 new stories added to backlog
- **Bói-Toán consultant: RECEIVED & INTEGRATED (19:05)**
- SEO consultant: Pending
- **CMO consultant: RECEIVED (22:11)** — AItuvi + Tuvi.vn competitor research. Key insight: /lap-la-so/ conversion spine priority, 144 birth-year pages viable, add 50-100 star/palace pages before massive matrix
- **LLM Provider: DECIDED (22:12)** — Claude (Anthropic), budget ~$5-20 APPROVED. Awaiting Boss API key.
- **Supabase: DECIDED (22:12)** — New free project. TL/BE to create.
- **Next:** Boss provides ANTHROPIC_API_KEY → Sprint 3 Planning completion → Dev commitment → Sprint 3 execution
**Last Updated:** 2026-05-01

---

## Sprint 2 Results (CLOSED)

| Story | Priority | Status | Key Metrics |
|-------|----------|--------|-------------|
| STORY-010 | P0 | ✅ ACCEPTED | Lighthouse 100/95-100/96/100 |
| STORY-011 | P1 | ✅ ACCEPTED (partial) | iztro infrastructure done |
| STORY-012a | P1 | ✅ ACCEPTED | 12-24 pages, 1,369 words/page |
| STORY-013 | P2 | ✅ ACCEPTED | 6-page scaffold |

**Live Deploy:** https://hungson175.github.io/seo-pages-deploy/ (129 pages)

---

## Sprint 3 Proposed Scope

### P0 - Critical
- **STORY-011b:** iztro UI rendering (dynamic import, SVG chart, 12-palace grid)
- **Vercel Production Deploy:** boitoan.vn (token ready)

### P1 - High Priority
- **STORY-012b:** Remaining 72+ birth-year forecast pages (from 96 total)
- **STORY-016:** H1 optimization per competitor formula (quick win)

### P2 - Medium Priority
- **STORY-015:** HTML lang="vi" fix (XS)
- **STORY-018:** Meta tag template system (S)
- **STORY-019:** Trust signals in footer (XS)
- **STORY-017:** Internal linking matrix (M)

### P3 - Future
- **STORY-020:** Daily auto-articles (Sprint 4+)

---

## Competitor Insights (OPC 2026-05-01)

1. **tuvi.vn NOINDEXES year pages** → We SHOULD index all forecast pages for long-tail SEO
2. **aituvi.com uses AI positioning** → We should leverage AI in our positioning
3. **tuvi.vn ranks on category pages with deep internal linking** → Build internal linking matrix
4. **H1 formula:** [action] + [keyword] + [benefit/emotional] → Apply to all pages
5. **html lang="vi" required** → aituvi has lang="en" (mistake we avoid)
6. **Schema.org:** WebSite + Article + FAQPage + BreadcrumbList → Comprehensive coverage

Full analysis: `~/Vaults/my-pkm/wiki/projects/seo_consultant/competitor-analysis-aituvi-tuvi-vn-20260501.md`

---

## Key Decisions

1. **Priority Order:** Tử Vi → Gieo Quẻ → Tứ Trụ
2. **Tech Stack:** Next.js 15 SSG/ISR + iztro + Supabase + Vercel
3. **Content Strategy:** iztro JSON → LLM → 80%+ unique pages
4. **SEO Focus:** Vietnamese slugs, schema markup, Core Web Vitals
5. **Sprint 1 Scope:** Foundation only (correct call)
6. **Sprint 2 Scope:** Lighthouse + iztro infra + birth-year MVP + Gieo Quẻ scaffold
7. **Sprint 3 Preview:** iztro UI + Vercel prod + remaining forecasts + competitor quick wins

---

## Metrics Targets

| Metric | Target |
|--------|--------|
| Indexed pages | >80% |
| Organic impressions (Month 1) | >1,000 |
| Organic impressions (Month 3) | >10,000 |
| Free tool → paid conversion | >5% |
| Lighthouse mobile | ≥90 |
| Core Web Vitals (LCP) | <2.5s |

---

## Notes

- Boss directive (2026-05-01): Build Tử Vi SEO pages first. Start with `/lap-la-so/` and birth-year forecast template.
- Bói Toán consultant provided domain specs (~440 pages Year 1)
- SEO consultant providing technical specs (pending)
- Both pillars active: Chạm Quẻ (ongoing) + Tử Vi (newly activated)
- Sprint 1 scope: STORY-001 (SSG foundation) + STORY-002-shell (/lap-la-so/ shell). STORY-003 queued for Sprint 2.
- Sprint 2 P0: Lighthouse ≥90 mobile. Sprint 2 P1: iztro integration + birth-year pipeline.
- PO cross-domain awareness expanded: SEO, Marketing, Bói Toán, TikTok.
- OPC competitor analysis integrated: 6 new backlog stories, key insights applied.
- Vercel token obtained proactively for Sprint 3 production deploy.
