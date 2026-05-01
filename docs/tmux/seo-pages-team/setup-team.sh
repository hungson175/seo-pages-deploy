#!/bin/bash

# SEO Pages Team - Automated Setup Script
# Creates a tmux session with 6 OpenCode instances (PO, SM, TL, BE, FE, QA)

set -e  # Exit on error

PROJECT_ROOT="${PROJECT_ROOT:-$(pwd)}"
SESSION_NAME="${SESSION_NAME:-seo-pages-team}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPTS_DIR="$SCRIPT_DIR/prompts"

# Auto-scale window width based on number of panes
# CRITICAL: MIN_WIDTH_PER_PANE must be >= 40 to prevent WebSocket floods
NUM_PANES=6
MIN_WIDTH_PER_PANE=60  # Minimum 40, recommended 60+
WINDOW_WIDTH=$((NUM_PANES * MIN_WIDTH_PER_PANE))
WINDOW_HEIGHT=50

# Enforce minimum width constraint
if [ "$MIN_WIDTH_PER_PANE" -lt 40 ]; then
    echo "ERROR: MIN_WIDTH_PER_PANE must be >= 40 (currently $MIN_WIDTH_PER_PANE)"
    echo "Narrow panes cause terminal instability from text wrapping."
    exit 1
fi

echo "Starting SEO Pages Team Setup..."
echo "Project Root: $PROJECT_ROOT"
echo "Session Name: $SESSION_NAME"

# 1. Check if session already exists
if tmux has-session -t $SESSION_NAME 2>/dev/null; then
    echo "Session '$SESSION_NAME' already exists!"
    read -p "Kill existing session and create new one? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        tmux kill-session -t $SESSION_NAME
        echo "Killed existing session"
    else
        echo "Aborted. Use 'tmux attach -t $SESSION_NAME' to attach"
        exit 0
    fi
fi

# 2. Start new tmux session
echo "Creating tmux session '$SESSION_NAME'..."
cd "$PROJECT_ROOT"
tmux new-session -d -s $SESSION_NAME

# 3. Create 6-pane layout
echo "Creating 6-pane layout..."
tmux split-window -h -t $SESSION_NAME
tmux split-window -h -t $SESSION_NAME
tmux split-window -h -t $SESSION_NAME
tmux split-window -h -t $SESSION_NAME
tmux split-window -h -t $SESSION_NAME
tmux select-layout -t $SESSION_NAME even-horizontal

# 4. Resize for proper pane widths (auto-scaled)
echo "Resizing window to ${WINDOW_WIDTH}x${WINDOW_HEIGHT} (${NUM_PANES} panes × ${MIN_WIDTH_PER_PANE} chars)..."
tmux resize-window -t $SESSION_NAME -x $WINDOW_WIDTH -y $WINDOW_HEIGHT

# 5. Set pane titles and role names
tmux select-pane -t $SESSION_NAME:0.0 -T "PO"
tmux select-pane -t $SESSION_NAME:0.1 -T "SM"
tmux select-pane -t $SESSION_NAME:0.2 -T "TL"
tmux select-pane -t $SESSION_NAME:0.3 -T "BE"
tmux select-pane -t $SESSION_NAME:0.4 -T "FE"
tmux select-pane -t $SESSION_NAME:0.5 -T "QA"

tmux set-option -p -t $SESSION_NAME:0.0 @role_name "PO"
tmux set-option -p -t $SESSION_NAME:0.1 @role_name "SM"
tmux set-option -p -t $SESSION_NAME:0.2 @role_name "TL"
tmux set-option -p -t $SESSION_NAME:0.3 @role_name "BE"
tmux set-option -p -t $SESSION_NAME:0.4 @role_name "FE"
tmux set-option -p -t $SESSION_NAME:0.5 @role_name "QA"

# 6. Get pane IDs
echo "Getting pane IDs..."
PANE_IDS=$(tmux list-panes -t $SESSION_NAME -F "#{pane_id}")
PO_PANE=$(echo "$PANE_IDS" | sed -n '1p')
SM_PANE=$(echo "$PANE_IDS" | sed -n '2p')
TL_PANE=$(echo "$PANE_IDS" | sed -n '3p')
BE_PANE=$(echo "$PANE_IDS" | sed -n '4p')
FE_PANE=$(echo "$PANE_IDS" | sed -n '5p')
QA_PANE=$(echo "$PANE_IDS" | sed -n '6p')

echo "Pane IDs:"
echo "  PO (Pane 0): $PO_PANE"
echo "  SM (Pane 1): $SM_PANE"
echo "  TL (Pane 2): $TL_PANE"
echo "  BE (Pane 3): $BE_PANE"
echo "  FE (Pane 4): $FE_PANE"
echo "  QA (Pane 5): $QA_PANE"

# 7. Verify tm-send is installed globally
echo "Verifying tm-send installation..."

if command -v tm-send >/dev/null 2>&1; then
    echo "tm-send is installed at: $(which tm-send)"
else
    echo ""
    echo "ERROR: tm-send is not installed!"
    echo ""
    echo "tm-send is a GLOBAL tool that must be installed to ~/.local/bin/tm-send"
    echo "It is NOT project-specific - one installation serves all projects."
    echo ""
    echo "Install it first, then re-run this script."
    echo ""
    exit 1
fi

# 8. Verify SessionStart hook is configured
echo "Verifying SessionStart hook..."
HOOK_FILE="$PROJECT_ROOT/.claude/hooks/session_start_team_docs.py"
SETTINGS_FILE="$PROJECT_ROOT/.claude/settings.json"

if [ ! -f "$HOOK_FILE" ]; then
    echo ""
    echo "WARNING: SessionStart hook not found at $HOOK_FILE"
    echo ""
    echo "Without this hook, agents will lose context after auto-compact!"
    echo ""
    echo "To fix:"
    echo "  1. Copy hook template:"
    echo "     cp ~/.claude/skills/tmux-team-creator/hooks/session_start_team_docs.py \\"
    echo "        $PROJECT_ROOT/.claude/hooks/"
    echo "  2. Edit TEAM_CONFIGS in the hook file for your team"
    echo "  3. Ensure .claude/settings.json has SessionStart hook configured"
    echo ""
fi

if [ ! -f "$SETTINGS_FILE" ]; then
    echo "WARNING: .claude/settings.json not found"
    echo "SessionStart hook may not be configured."
    echo ""
fi

# 9. Start OpenCode in each pane
echo "Starting OpenCode in all panes..."
tmux send-keys -t $SESSION_NAME:0.0 "cd $PROJECT_ROOT && opencode" C-m
tmux send-keys -t $SESSION_NAME:0.1 "cd $PROJECT_ROOT && opencode" C-m
tmux send-keys -t $SESSION_NAME:0.2 "cd $PROJECT_ROOT && opencode" C-m
tmux send-keys -t $SESSION_NAME:0.3 "cd $PROJECT_ROOT && opencode" C-m
tmux send-keys -t $SESSION_NAME:0.4 "cd $PROJECT_ROOT && opencode" C-m
tmux send-keys -t $SESSION_NAME:0.5 "cd $PROJECT_ROOT && opencode" C-m

# 10. Wait for OpenCode to start
echo "Waiting 20 seconds for OpenCode instances..."
sleep 20

# 11. Initialize roles (Two-Enter Rule + 0.3s sleep)
echo "Initializing agent roles..."
tmux send-keys -t $SESSION_NAME:0.0 "/init-role PO" C-m
sleep 0.3
tmux send-keys -t $SESSION_NAME:0.0 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.1 "/init-role SM" C-m
sleep 0.3
tmux send-keys -t $SESSION_NAME:0.1 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.2 "/init-role TL" C-m
sleep 0.3
tmux send-keys -t $SESSION_NAME:0.2 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.3 "/init-role BE" C-m
sleep 0.3
tmux send-keys -t $SESSION_NAME:0.3 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.4 "/init-role FE" C-m
sleep 0.3
tmux send-keys -t $SESSION_NAME:0.4 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.5 "/init-role QA" C-m
sleep 0.3
tmux send-keys -t $SESSION_NAME:0.5 C-m

# 12. Wait for initialization
echo "Waiting 15 seconds for role initialization..."
sleep 15

# 13. Summary
echo ""
echo "Setup Complete!"
echo ""
echo "Session: $SESSION_NAME"
echo "Project: $PROJECT_ROOT"
echo ""
echo "SEO Pages Team Roles:"
echo "  +--------+--------+--------+--------+--------+--------+"
echo "  | PO     | SM     | TL     | BE     | FE     | QA     |"
echo "  | Pane 0 | Pane 1 | Pane 2 | Pane 3 | Pane 4 | Pane 5 |"
echo "  +--------+--------+--------+--------+--------+--------+"
echo ""
echo "Mission: Build SEO pages for Vietnamese divination apps"
echo "  Priority: Tử Vi → Gieo Quẻ → Tứ Trụ"
echo ""
echo "Next steps:"
echo "  1. Attach: tmux attach -t $SESSION_NAME"
echo "  2. Boss provides Sprint Goal to PO"
echo "  3. Team executes Sprint"
echo "  4. SM facilitates Retrospective"
echo ""
echo "To detach: Ctrl+B, then D"
echo "To kill: tmux kill-session -t $SESSION_NAME"
echo ""

# 14. Move cursor to PO pane
tmux select-pane -t $SESSION_NAME:0.0
echo "Cursor in Pane 0 (PO)."
