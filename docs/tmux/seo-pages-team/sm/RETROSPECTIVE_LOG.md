# Retrospective Log

**Owned by:** SM
**Last Updated:** 2026-05-01

---

## Sprint 0 — Initialization (No Retro)

- Team initialized on 2026-05-01
- All roles read their prompts and workflow
- No sprint executed yet
- First retrospective will follow Sprint 1

---

## Sprint 1 — Foundation Delivery (2026-05-01)

### Sprint Outcome
- **STORY-001**: PO ACCEPTED ✅ — Next.js 15 SSG scaffold, 125 pages, JSON-LD, sitemaps, slugs
- **STORY-002-shell**: PO ACCEPTED ✅ — /lap-la-so/ form UI, validation, FAQ, schemas
- **DoD**: ALL 7 gates cleared (Code, Tests 33/33, TL Review, QA Validation, Build, Lighthouse proxy, PO Accept)
- **Team velocity**: XL + L (descoped to shell) completed in single sprint

### What Went Well
1. **Spec discipline held** — TL specs <200 lines, zero code samples. BE/FE had creative freedom, TL review was meaningful (not rubber-stamping).
2. **Progressive approach worked** — Foundation first (STORY-001), stretch goal (STORY-002-shell). Delivered on time.
3. **TDD culture strong** — RED→GREEN→REFACTOR maintained. 33/33 tests passing. Intentional RED tests for BE.
4. **Communication protocol effective** — tm-send + two-step response rule (ACK then COMPLETE) kept alignment tight. Zero missed handoffs.
5. **QA early preparation** — QA wrote test cases before implementation, enabling fast validation turnaround after TL review.
6. **Self-correction** — FE proactively identified and fixed 2 AC gaps (ServiceSchema, segmented sitemaps) before QA caught them, then fixed all 3 QA issues rapidly.

### What Could Improve
1. **Role boundaries blurred** — BE modified 3 FE route files for Next.js 15 async params typing. Justified (build-critical) but broke the BE-stays-in-BE-lane protocol. Two overlapping allow-list files also created review confusion.
2. **AC gaps found post-implementation** — FE discovered ServiceSchema and segmented sitemap gaps AFTER implementing, not during spec review or TDD. Suggests AC checklist discipline could be tighter.
3. **Lighthouse headless limitation** — Could not measure actual Lighthouse scores in dev environment. Proxy indicators (106-109 KB, build green) were strong but unverified.
4. **No real data layer** — Supabase is types-only with zero real data fetching. This is acceptable for Sprint 1 foundation but is the biggest technical risk for Sprint 2 scaling.

### Root Cause Analysis (SM)
| Issue | Root Cause | Impact |
|-------|-----------|--------|
| BE touched FE files | No clear interface contract for dynamic route params between BE data layer and FE routing | Review surprises, role confusion |
| AC gaps post-impl | FE may have skipped systematic AC checklist review before implementation | Rework, QA cycle extension |
| Lighthouse headless | No CI/CD pipeline with Chrome for automated scoring | Acceptance risk, manual verification needed |

### Action Items (1-2 max — FOCUS OVER COMPLETENESS)

#### Action Item 1: BE→FE Interface Contract + Single Source of Truth
**Target:** TL (spec) + BE/FE (implementation)
**What:** TL writes a formal interface contract in Sprint 2 spec defining:
- Data shapes passed from BE to FE dynamic routes
- Error handling and fallback behavior
- Single source of truth for all allow-lists and data contracts (consolidate src/lib/allow-list.ts + src/lib/data/allow-lists.ts)
**Why:** Prevents BE from touching FE files, eliminates duplicate data sources, enables parallel BE/FE work in Sprint 2
**Verification:** In Sprint 2, check that BE never modifies FE route files and allow-list has exactly one source file

#### Action Item 2: AC Checklist Review Gate
**Target:** BE + FE
**What:** Before writing any implementation code, each dev MUST:
1. Read the story's acceptance criteria from SPRINT_BACKLOG.md
2. Create a personal checklist of every AC item
3. Cross-check against TL spec for any implied ACs
4. Only start TDD after AC checklist is complete
**Why:** Prevents post-implementation gap discovery, reduces rework, speeds up QA
**Verification:** In Sprint 2, SM spot-checks whether devs reference AC checklist in their first ACK message (e.g., "AC checklist reviewed, starting TDD now")

### Sprint 2 Tech Debt (Non-blocking, TL/PO logged)
- ISR configuration
- Full Supabase integration with real data fetching
- Hub index pages (/tuvi, /sao, /que)
- Metadata typo fix
- Remove duplicate next.config.js
- OG URL full path fix
- CI/CD Lighthouse check in build pipeline
- Deploy to Vercel preview + Lighthouse baseline

### Prompt Updates
**None for Sprint 1.** Per SM prompt guidelines: "Add only after 2-3 sprints of recurring issues." Both observed issues (role boundaries, AC gaps) occurred once. Will monitor in Sprint 2 before adding to prompts.

### SM Observations Logged
- IMPROVEMENT_BACKLOG.md items #1 and #2 (both Sprint 1)

---

## Sprint 2 — Pipeline + Performance (2026-05-01)

### Sprint Outcome
- **STORY-012a**: PO ACCEPTED ✅ — Birth-year forecast pipeline MVP, 56/56 tests, 1,369 words, Art.320 compliant
- **STORY-011**: PO ACCEPTED ✅ (partial) — iztro integration pipeline, 21/21 tests, 3 insights, UI deferred to Sprint 3
- **STORY-013**: PO ACCEPTED ✅ — Gieo Quẻ scaffold, 6/6 tests, 6 pages generated
- **STORY-010**: PO ACCEPTED ✅ — Lighthouse ≥90 mobile, deployed to GitHub Pages, actual audit: 95-100 across all categories
- **DoD**: ALL gates cleared for all 4 stories
- **Team velocity**: P0 + P1 + P1 + P2 all completed and accepted

### What Went Well
1. **Interface contract worked** — BE stayed in src/lib/, never touched FE files. Single source of truth for data contracts. Role boundaries clean.
2. **AC Checklist Gate effective** — 4 spot checks PASS (FE×2, BE×2). No AC gaps found post-implementation. Devs reviewed ACs before TDD consistently.
3. **Parallel execution** — BE and FE both worked simultaneously on STORY-012a and STORY-011 with clear scope separation.
4. **Proactive QA** — 116 test cases prepared before implementation completed, enabling fast validation turnaround.
5. **Rapid issue resolution** — BE fixed extract.ts Error→null in minutes after TL review. TL re-approved immediately.
6. **Flexible deploy resolution** — When Vercel auth blocked, TL assessed alternatives, PO made decisive call (GitHub Pages accepted), team executed in minutes.
7. **Lighthouse excellence** — FE optimizations achieved 100/95-100/96/100 on actual deployed URL. Core Web Vitals all green.
8. **Bói-Toán domain integration** — Consultant spec incorporated into ACs seamlessly. Content validated for Art.320, domain rules, NO Western astrology.

### What Could Improve
1. **Vercel auth dependency** — No Vercel token configured blocked STORY-010 until PO decision on GitHub Pages alternative. Should have credential readiness check at Sprint start.
2. **iztro UI deferred** — STORY-011 acceptance is partial (pipeline only, no chart rendering). Sprint 3 will carry significant UI work.
3. **Supabase still mock** — seed.ts does not connect to real database. Sprint 3 needs real data layer.
4. **Lighthouse CI not automated** — Actual Lighthouse was manual. Sprint 3 needs CI/CD pipeline.

### Root Cause Analysis (SM)
| Issue | Root Cause | Impact |
|-------|-----------|--------|
| Vercel auth blocked deploy | No credential readiness check at Sprint Planning | STORY-010 acceptance delayed, required PO intervention |
| iztro UI deferred | 467KB bundle + dynamic import complexity exceeded 2-week capacity | Partial acceptance, Sprint 3 P0 overload risk |
| Supabase mock | Real DB connection requires environment config + migrations | Data layer not production-ready |

### Action Items for Sprint 3

#### Action Item 1: Credential Readiness Check at Sprint Start
**Target:** SM + TL
**What:** Before committing to any deploy-dependent story, SM must verify:\n1. Deploy credentials available (Vercel token, GitHub Pages permissions, etc.)\n2. Environment variables configured\n3. Alternative deploy path identified if primary blocked\n**Why:** Prevents deploy blockers mid-sprint\n**Verification:** In Sprint 3 Planning, SM asks TL: "Deploy credentials ready? Alternative path identified?" before locking scope.

#### Action Item 2: iztro UI Rendering as Sprint 3 P0
**Target:** TL + FE
**What:** TL writes STORY-011b spec early (before Sprint 3 Planning) covering:\n- next/dynamic with ssr: false\n- SVG chart renderer component\n- Client-side iztro integration\n- Mobile chart performance (<1s render)\n**Why:** STORY-011b is Sprint 3's biggest technical risk. Early spec enables FE to start immediately.\n**Verification:** TL has STORY-011b spec ready before Sprint 3 Planning.

### Sprint 3 Tech Debt (Carried Forward)
- Vercel production deploy (boitoan.vn) — P0
- iztro UI rendering (STORY-011b) — P0
- Scale content pipeline to 72+ pages (STORY-012b) — P1
- ISR configuration — P1
- Full Supabase integration — P1
- Segmented sitemaps, hub pages, metadata fixes — P2
- CI/CD Lighthouse check — P3

### Prompt Updates
**None for Sprint 2.** Both active improvements (#1 Interface Contract, #2 AC Checklist Gate) were effective in Sprint 2. Will monitor in Sprint 3 — if still effective after 3 sprints, add to prompts.

### SM Observations Logged
- IMPROVEMENT_BACKLOG.md items (all resolved or moved to active)

---

## Sprint History

| Sprint | Date | Key Learnings | Prompt Changes | Status |
|--------|------|---------------|----------------|--------|
| 1 | 2026-05-01 | Interface contracts prevent role blur; AC checklist before TDD reduces rework | None (monitoring) | Complete ✅ |
| 2 | 2026-05-01 | Credential readiness prevents deploy blockers; early spec for high-risk stories | None (monitoring) | Complete ✅ |

---

## Format

```
## Sprint N — [Date]

### What Went Well
-

### What Could Improve
-

### Action Items (1-2 max)
1.
2.

### Prompt Updates
- File: `prompts/XXX_PROMPT.md`
- Change:
- Rationale:
```
