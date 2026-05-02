# SEO Pages Team - Scrum Workflow

<context>
A Scrum-based multi-agent team for building programmatic SEO pages for Vietnamese divination apps.
Priority order: Tử Vi → Gieo Quẻ Kinh Dịch → Tứ Trụ (Bazi).
</context>

**Terminology:** "Role" and "agent" are used interchangeably. Each role (PO, SM, TL, BE, FE, QA) is a Claude Code AI agent instance.

---

## Mission

Build SEO-optimized programmatic pages for Vietnamese divination apps:

| Priority | App | Target Pages | Status |
|----------|-----|--------------|--------|
| P0 | Tử Vi (iztro) | ~440 pages Year 1 | ACTIVE |
| P1 | Gieo Quẻ Kinh Dịch | 64 quẻ pages | QUEUED |
| P2 | Tứ Trụ (Bazi) | TBD | FUTURE |

---

## Scrum Framework

### Three Pillars
1. **Transparency** - All work visible in Sprint Backlog and commits
2. **Inspection** - Regular reviews and retrospectives
3. **Adaptation** - Continuous improvement through prompt updates

### ⚠️ The Two Products (CRITICAL)

**Every Scrum team produces TWO products:**

| Product | What | For AI Agent Teams |
|---------|------|-------------------|
| **1. SEO Pages** | The programmatic pages | Next.js SSG pages |
| **2. Better Team** | Team improvement | **Better Prompts** |

---

## Agent Roles

| Role | Pane | Scrum Category | Purpose |
|------|------|----------------|---------|
| PO | 0 | Product Owner | Backlog management, priorities, SEO strategy alignment |
| SM | 1 | Scrum Master | Team effectiveness, process improvement |
| TL | 2 | Developer | SEO architecture, Next.js, schema markup, technical specs |
| BE | 3 | Developer | iztro integration, data generation, LLM content pipeline |
| FE | 4 | Developer | Page templates, React components, styling |
| QA | 5 | Developer | SEO validation, content quality, E-E-A-T compliance |
| Boss | Outside | Stakeholder | Sprint goals, feedback, acceptance |

---

## ⚠️ CRITICAL: Pane Detection

**When initializing roles or detecting which pane you're in:**

**NEVER use `tmux display-message -p '#{pane_index}'`** - this returns the ACTIVE/FOCUSED pane, NOT your pane!

**Always use `$TMUX_PANE` environment variable:**

```bash
# WRONG - Returns active cursor pane
tmux display-message -p '#{pane_index}'

# CORRECT - Returns YOUR pane
echo $TMUX_PANE
tmux list-panes -a -F '#{pane_id} #{pane_index} #{@role_name}' | grep $TMUX_PANE
```

---

## Communication Protocol

### 🚨 TWO-STEP RESPONSE RULE (CRITICAL)

**Every task assignment requires TWO responses:**

1. **ACKNOWLEDGE** (immediately): "Received, starting now"
2. **COMPLETE** (when done): "Task DONE. [Summary]"

```bash
# Step 1: Agent receives task → IMMEDIATELY acknowledge
tm-send SM "TL -> SM [14:00]: Received SEO spec task. Starting now."

# Step 2: Agent completes task → Report completion
tm-send SM "TL -> SM [14:15]: SEO spec DONE. See docs/specs/tuvi-birth-year.md"
```

### Use tm-send for ALL Tmux Messages

```bash
# Correct - use tm-send with role name
tm-send SM "BE -> SM: Task complete. Ready for review."

# Forbidden - never use raw tmux send-keys
tmux send-keys -t %16 "message" C-m C-m  # NEVER!
```

### Communication Patterns

| From | To | When |
|------|-----|------|
| Boss | PO | Sprint goals, priorities, feedback |
| PO | SM | Backlog updates, priority changes |
| SM | All Devs | Sprint coordination, retrospective |
| TL | SM | Architecture decisions, blockers |
| BE/FE | TL | Technical clarifications |
| QA | SM | Testing results, quality issues |
| All | SM | Impediments, process improvements |

---

## SEO Page Specifications

### Tử Vi Pages (P0 - ACTIVE)

**Page Types:**
1. **Birth-year forecasts** (~144 pages) - 12 animals × ~6 active years × 2 genders
2. **Free tool /lap-la-so/** - Lá số tử vi generator (65K searches)
3. **Educational pages** (~34) - 14 major + 20 minor stars
4. **Annual + compatibility** (~110 pages)
5. **Life-area hubs** (~12 pages)

**Technical Stack:**
- Next.js 15 SSG/ISR
- iztro library for chart generation (SVG)
- Supabase for data storage
- Vercel deployment

**Content Requirements:**
- 1,200-1,500 words per page
- 80%+ uniqueness (iztro JSON → LLM)
- "Thầy bói nói chuyện" tone
- Art. 320 compliance ("tham khảo" not "tiên đoán")
- Vietnamese aesthetic (lotus, dragon/phoenix, dark navy + gold)

**SEO Requirements:**
- Vietnamese slugs (strip diacritics)
- FAQPage, HowTo, BreadcrumbList schema
- Segmented sitemaps (tuvi.xml, gieoque.xml)
- Core Web Vitals: LCP <2.5s, CLS <0.1

### Gieo Quẻ Pages (P1 - QUEUED)

- 64 quẻ pages
- 5-7 semantic H2s per page
- URL pattern: `/que/{id}-{name-vn}/`

### Tứ Trụ Pages (P2 - FUTURE)

- TBD based on Tử Vi success

---

## Definition of Done

A Story is "Done" when:
- [ ] Code implemented and committed
- [ ] TDD tests pass (BE/FE)
- [ ] TL code review approved
- [ ] QA SEO validation passed (schema, meta, content quality)
- [ ] Lint and build pass
- [ ] Lighthouse score ≥90 mobile
- [ ] PO accepts

---

## Sprint Workflow

### Phase 1: Sprint Planning
```
Boss → PO: Sprint Goal
PO → SM: Backlog items for Sprint
SM → All: Sprint Planning facilitation
TL → SM: Technical feasibility input
All Devs → SM: Commitment to Sprint Backlog
```

### Phase 2: Sprint Execution
```
1. TL writes Technical Spec with Acceptance Criteria
2. BE/FE write TDD tests based on spec, then implement
3. TL reviews code against spec
4. QA performs SEO validation (schema, meta, content quality)
5. SM monitors progress, removes impediments
6. PO available for clarifications
```

### Phase 3: Sprint Review
```
Developers → PO: Demo completed work
PO → Boss: Present for acceptance
Boss → PO: Feedback
PO → SM: Update backlog
```

### Phase 4: Sprint Retrospective
```
SM runs retrospective using OWN NOTES:
1. Review observations logged during sprint
2. Analyze what problems occurred
3. Pick 1-2 improvements to commit to
SM → Update prompts (if issue recurring)
SM → Document in RETROSPECTIVE_LOG.md
```

---

## Git Workflow

```bash
# Sprint branch
git checkout -b sprint_{N}

# Feature branches off sprint
git checkout -b feature_{story_id}_{description}

# After TL review + QA pass
git checkout sprint_{N}
git merge feature_{story_id}_{description}

# After Sprint Review
git checkout main
git merge sprint_{N}
```

---

## Files in This Directory

```
seo-pages-team/
├── workflow.md                    # This file
├── WHITEBOARD.md                  # Status updates
├── SPRINT_BACKLOG.md              # Current Sprint work
├── PRODUCT_BACKLOG.md             # All work items (PO owned)
├── setup-team.sh                  # Automated setup
├── sm/                            # SM's workspace
│   ├── IMPROVEMENT_BACKLOG.md     # Process issues
│   ├── RETROSPECTIVE_LOG.md       # Historical lessons
│   └── ACTION_ITEMS.md            # Improvement tracking
└── prompts/
    ├── PO_PROMPT.md               # Product Owner
    ├── SM_PROMPT.md               # Scrum Master
    ├── TL_PROMPT.md               # Tech Lead
    ├── BE_PROMPT.md               # Backend Developer
    ├── FE_PROMPT.md               # Frontend Developer
    └── QA_PROMPT.md               # Tester

# Note: Role→pane mapping is dynamic via tmux @role_name options
# Note: tm-send is a global tool at ~/.local/bin/tm-send
```

---

## Common Mistakes to Avoid

| Mistake | Correct Approach |
|---------|------------------|
| Using `tmux send-keys` | Use `tm-send ROLE "message"` |
| Skipping TDD | Write tests FIRST, then implement |
| PO making technical decisions | Consult TL for technical input |
| SM writing code | SM facilitates, developers implement |
| Skipping retrospective | SM ensures retro after every Sprint |
| Ignoring SEO requirements | QA validates schema, meta, content quality |

---

## Key Principle

> "Build SEO pages that rank AND convert. Quality over quantity. Every page must deliver value to Vietnamese users seeking divination guidance."
