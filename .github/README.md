# Copilot Migration Map

This repository keeps the Claude setup untouched and adds a GitHub Copilot mirror.

Mapping:

- `.claude/agents/*.md` -> `.github/agents/*.agent.md`
- `.claude/skills/<name>/SKILL.md` -> `.github/skills/<name>/SKILL.md`
- `.claude/skills/<name>/...` helper assets -> `.github/skills/<name>/...`
- `CLAUDE.md` repo instructions -> `.github/copilot-instructions.md` plus `.github/instructions/*.instructions.md`

Notes:

- Git branches and git worktrees remain Git-native. There is no special Copilot file format for them.
- `dist/` remains generated output.
- `.claude/settings.local.json` is Claude-specific permission config and was not migrated because Copilot does not use the same mechanism.
- `.claude/launch.json` is not a Copilot customization file. If you want it promoted into standard VS Code debug config later, move it to `.vscode/launch.json` intentionally rather than folding it into Copilot customizations.