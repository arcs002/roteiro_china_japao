---
description: Rules for editing the markdown build pipeline and SPA shell.
applyTo: "build/**"
---

# Build and Site Architecture

Use these rules when editing the renderer, validators, registry builder, SPA shell, client router, styles, or service worker.

## Source of Truth

- `pesquisa/**/*.md` is the source of truth for guide content.
- `dist/` is generated output. Regenerate it instead of editing it by hand.

## Build Responsibilities

- `build/build.js` orchestrates validation, registry generation, page rendering, and shell copying.
- `build/build-registry.js` aggregates front matter into the runtime registry.
- `build/render-page.js` and `build/render-modules.js` render section indexes and section pages.
- `build/validate.js` should fail on structural errors and only warn on softer metadata gaps when that is the existing behavior.

## Rendering Constraints

- Pages render as route folders and section fragments, not as one long concatenated document.
- Research-only sections such as image notes, sources, or place-finding traces must stay filtered out of reader-facing output.
- Preserve the stable slug behavior for `Dia N` sections and other section routes.

## SPA Shell

- `site/app.js` is the router and client cache entry point.
- `site/sw.js` is responsible for offline caching of the shell and content fragments.
- Preserve the low-data/offline-first behavior of the current architecture.

## Editing Style

- Favor deterministic build-time behavior over client-side runtime complexity.
- Keep changes compatible with the existing zero-dependency Node build unless there is a strong reason to change that.