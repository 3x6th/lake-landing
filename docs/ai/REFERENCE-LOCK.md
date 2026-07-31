# Ozero Dev reference lock

This document records the visual references and the decisions extracted from
them. It is a constraint, not a collage brief.

## Reference blend

### Monopo Saigon

- Use: editorial restraint, oversized typography, precise art direction,
  confident negative space.
- Avoid: copying its layout or ornamental details literally.

### Active Theory

- Use: immersive near-black canvas, sparse light, cinematic depth, a feeling
  that the environment is alive without becoming a game UI.
- Avoid: WebGL spectacle that competes with the sales message.

### Phantom Studios

- Use: sharp monochrome framing, mono metadata, quiet technical confidence,
  simple linework.
- Avoid: turning the interface into a terminal or a developer dashboard.

### Pipe

- Use: clear B2B hierarchy, warm accent against black, disciplined split
  compositions, direct calls to action.
- Avoid: generic SaaS cards, dashboards, and borrowed fintech language.

### XData Group

- Use: full-bleed moving atmosphere, dark-water pacing, bold transitions
  between editorial sections.
- Avoid: coordinate overlays, dense pseudo-technical decorations, scattered
  copy, and competing effects.

## Locked synthesis

The final direction is **Cinematic Engineering (70%) + Poetic Technology
(30%)**.

The site should feel like a nocturnal lake observed by a disciplined engineering
studio: black water, an engraved fisherman, restrained submerged green and
amber light, paper-white type, and exact mono labels.

The fisherman is a brand signature, not a mascot. It appears exactly once, in
its own dedicated passage, dissolves into a real image-derived ASCII
interpretation during one transition, and must not repeat as decoration
throughout the page.

That passage is deliberately **not** the hero. Amended 2026-07-31 — see
`docs/ai/reviews/LOD-9-art-direction.md`. Sharing the hero stage with the water
forced three visual systems to overlap at partial opacity, and none of them
read. The signature now owns a full-bleed band of its own between the work and
process sections, and the hero carries water and words only.

## Composition rules

- Keep the left side of the desktop hero calm enough for real HTML copy, but
  never so dark that the water stops being visible. The atmosphere is the
  point; a scrim that erases it defeats the direction.
- Give the fisherman and boat their own full-bleed passage below the hero,
  composed with generous negative space rather than tucked into a corner.
- Prefer one continuous atmospheric world over a stack of unrelated effects.
  Two systems must not compete inside one viewport.
- Use one signature scroll transformation only: engraving to image-derived
  ASCII, in one place, once.
- Maintain large quiet areas between high-information sections.
- Use full-bleed imagery for atmosphere and sharp editorial frames for content.
- Keep primary copy and actions readable without waiting for animation.

## Explicit rejections

- Cyan cyberpunk palettes.
- Giant pseudo-terminal layouts.
- Coordinate grids and decorative telemetry.
- Generic glass cards and glossy 3D blobs.
- Stock team photography or invented client logos.
- Excessive parallax, scroll-jacking, or animation on every element.
- Text, UI, logos, or fake interface elements baked into generated media.

## Acceptance test

If the page could plausibly belong to an AI template marketplace after removing
the fisherman, the direction is not specific enough. If the motion distracts
from “Java-first talent in 1–3 weeks,” it is too loud.
