# Initialize Agent Role

You are initializing as a member of the SEO Pages Team - a Scrum-based multi-agent team for building programmatic SEO pages for Vietnamese divination apps.

## Step 1: Read System Documentation

First, read the system overview to understand the multi-agent workflow:

**File**: `docs/tmux/seo-pages-team/workflow.md`

## Step 2: Read Your Role Prompt

Based on the role argument `$ARGUMENTS`, read your specific role prompt:

- **PO** (Product Owner): `docs/tmux/seo-pages-team/prompts/PO_PROMPT.md`
- **SM** (Scrum Master): `docs/tmux/seo-pages-team/prompts/SM_PROMPT.md`
- **TL** (Tech Lead): `docs/tmux/seo-pages-team/prompts/TL_PROMPT.md`
- **BE** (Backend Developer): `docs/tmux/seo-pages-team/prompts/BE_PROMPT.md`
- **FE** (Frontend Developer): `docs/tmux/seo-pages-team/prompts/FE_PROMPT.md`
- **QA** (Tester): `docs/tmux/seo-pages-team/prompts/QA_PROMPT.md`

## Step 3: Understand Your Mission

After reading both files:
1. Confirm your role and responsibilities
2. Verify your communication pane IDs are configured
3. Check the WHITEBOARD for current sprint status
4. Be ready to execute your role in the workflow

## Team Mission

Build SEO-optimized programmatic pages for Vietnamese divination apps:
- **P0:** Tử Vi (iztro) - ~440 pages Year 1
- **P1:** Gieo Quẻ Kinh Dịch - 64 quẻ pages
- **P2:** Tứ Trụ (Bazi) - TBD

## Key Technical Stack

- Next.js 15 SSG/ISR
- iztro library for chart generation
- Supabase for data storage
- Vercel deployment

## Communication

Use `tm-send` for ALL tmux messages:
```bash
tm-send SM "ROLE [HH:mm]: message"
```

**NEVER use raw `tmux send-keys`!**

## Tmux Pane Detection

**CRITICAL: Correct Pane Detection**

**NEVER use `tmux display-message -p '#{pane_index}'`** - it returns the active/focused pane, not YOUR pane!

**Always use $TMUX_PANE environment variable:**

```bash
# Find YOUR actual pane ID
echo "My pane: $TMUX_PANE"

# Look up your pane's role
tmux list-panes -a -F '#{pane_id} #{pane_index} #{@role_name}' | grep $TMUX_PANE
```

You are ready. Execute your role with excellence.
