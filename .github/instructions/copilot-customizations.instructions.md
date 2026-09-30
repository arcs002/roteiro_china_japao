---
description: Rules for maintaining the Copilot customization mirror for this repository.
applyTo: ".github/**"
---

# Copilot Customization Mirror

This repository keeps the original Claude setup intact under `.claude/` and mirrors the reusable parts under `.github/` for GitHub Copilot.

Rules:

- Do not delete or rewrite `.claude/**` as part of Copilot migration work unless the user explicitly asks for dual maintenance changes.
- Prefer keeping agent and skill names aligned between `.claude/` and `.github/` so the workflow vocabulary stays stable.
- When a Claude skill is updated later, mirror the corresponding change to `.github/skills/` rather than inventing a new Copilot-only name.
- When a Claude agent is updated later, mirror it to `.github/agents/*.agent.md` with the same behavior and description.
- Keep repo-wide persistent guidance in `.github/copilot-instructions.md` concise, and move detailed operational logic into instruction or skill files.