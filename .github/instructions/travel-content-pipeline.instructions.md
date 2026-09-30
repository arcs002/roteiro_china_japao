---
description: Rules for planning, researching, and writing travel content in pesquisa markdown files.
applyTo: "pesquisa/**/*.md"
---

# Travel Content Pipeline

Use these rules whenever the task touches city, attraction, day, or aprofundamento markdown files.

## General

- `pesquisa/perfil-viajantes.md` is mandatory input before planning or writing.
- `pesquisa/voos.md` is the calendar anchor. Do not trust rounded or inferred dates when the flights say otherwise.
- The guide must feel personalized to the actual traveler, dates, and useful time available in each stop.
- Treat approved long-form models such as `pesquisa/cidades/02-xian.expandido.md` and `pesquisa/atracoes/exercito-terracota.expandido.md` as quality references for depth.

## City and Attraction Pages

- Plan before writing. Do not jump straight into prose.
- Use the mirrored skills in `.github/skills/` for the same staged workflow defined in `CLAUDE.md`.
- Never assume modules such as nightlife, food, shopping, or seasonal activity are irrelevant without checking real evidence.
- Gastronomy, shopping, and nightlife sections should name real places when the workflow calls for them, not only categories.
- Keep research confidence visible when facts are not fully confirmed.

## City Day Structure

- City pages contain `## Dia N` summaries, not the full hour-by-hour itinerary.
- Each `## Dia N` must include narrative logic, a compact sequence block, logistics, and a `<!--BRIEF-DIA-->` comment.
- The hour-by-hour expansion belongs in `pesquisa/dias/*.md` and should be generated from the brief.

## Mandatory Modules and Guardrails

- For city pages, `O que esta acontecendo` is mandatory even when no major festival is found. Fall back to holidays, seasonal conditions, harvests, light, or recurring phenomena.
- The day-summary structure is mandatory for city pages.
- Secret/local-gem style sections need multiple distinct places rather than a single overdeveloped example.
- Depth depends on the place complexity, traveler relevance, and real useful time in the itinerary.

## Aprofundamento Pages

- `pesquisa/aprofundamento/**` uses the `travel-deepdive-writer` workflow.
- These pages are reference material rather than date-bound itinerary content, so do not force the city/attraction pipeline onto them.

## Review Expectations

- Avoid generic blog language, interchangeable sections, and shallow summaries.
- Prefer structure and specificity over volume for its own sake.
- If profile data or research inputs are incomplete, call that out instead of inventing details.