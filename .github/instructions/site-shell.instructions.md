---
description: Rules for editing the SPA shell, router, styles, and service worker.
applyTo: "site/**"
---

# Site Shell Architecture

Use these rules when editing the static SPA shell.

- `site/app.js` owns routing, content loading, and image caching behavior.
- `site/sw.js` owns offline support for the shell and content fragments.
- Preserve the low-data, cache-first behavior that supports roaming and offline reading.
- Prefer build-time page structure over adding client-side complexity.
- Keep the visual/editorial system consistent with the existing `.mag` direction unless the task explicitly asks for a redesign.