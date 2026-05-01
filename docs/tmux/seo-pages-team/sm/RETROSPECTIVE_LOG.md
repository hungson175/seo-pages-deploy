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
2. **Progressive approach worked** — Foundation first (STORY-001), stretch goal (STORY-002-shell). Delivered on time without overcommitment.
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

## Sprint History

| Sprint | Date | Key Learnings | Prompt Changes | Status |
|--------|------|---------------|----------------|--------|
| 1 | 2026-05-01 | Interface contracts prevent role blur; AC checklist before TDD reduces rework | None (monitoring) | Complete ✅ |

*(No sprints completed yet)*

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
