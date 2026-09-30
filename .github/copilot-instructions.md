# Guia China + Japao Copilot Instructions

This repository is a Brazilian Portuguese travel guide for a 29-day solo trip through China and Kyushu in 2026. Treat it as a book-scale editorial project, not a lightweight blog.

Core rules:

- Keep [CLAUDE.md](/Users/alexandre.roberto/repo/guia_china_japao/CLAUDE.md) and everything under `.claude/` unchanged unless the user explicitly asks to edit them.
- Use the Copilot mirror under `.github/agents/` and `.github/skills/` for workspace customizations.
- `pesquisa/**/*.md` is the content source of truth. Do not hand-edit `dist/`.
- Do not edit `guia.html` or its `.bak` variants for this project. They belong to the sibling USA/Canada guide and remain here only as reference.
- Before planning or writing any travel content, read `pesquisa/perfil-viajantes.md`. Anchor dates and transitions to `pesquisa/voos.md` rather than inferred calendars.

Travel content workflow:

1. For city or attraction pages, plan before writing.
2. Use the pipeline mirrored in `.github/skills/`: traveler profile -> `travel-content-planner` -> `travel-place-finder` / `travel-event-finder` / `travel-image-sourcing` -> `travel-brief-validator` -> `travel-page-assembler` -> `travel-content-reviewer`.
3. Write one module at a time. Never write a full city or attraction page in a single pass.
4. For city pages, both the day-summary structure and the `O que esta acontecendo` section are mandatory.
5. Preserve confidence labels such as `CONFIRMADO`, `PROVAVEL`, and `NAO CONFIRMADO` when research is uncertain.
6. For `pesquisa/aprofundamento/**`, use the `travel-deepdive-writer` workflow instead of the city/attraction pipeline.

Day architecture:

- City pages contain `## Dia N` summaries with narrative logic plus a `<!--BRIEF-DIA-->` block.
- Detailed hour-by-hour itineraries belong in `pesquisa/dias/*.md`, generated from the day brief.
- Do not reintroduce old `Roteiro hora a hora` sections into city pages.

Site and build architecture:

- The site is a static SPA assembled from markdown by `node build/build.js`.
- `build/` contains the deterministic renderer and validation pipeline.
- `site/` contains the SPA shell, service worker, and client cache logic.
- Front matter is mandatory in `pesquisa/**/*.md` according to `pesquisa/README.md`.

Working style:

- Prefer small, targeted changes that preserve the existing architecture.
- When changing repo customizations, update `.github/**` and leave `.claude/**` untouched.
- For isolated or risky work, prefer a separate git branch or git worktree.