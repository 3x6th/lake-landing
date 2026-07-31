---
name: Ozero Dev
description: Deep engineering, moving with the quiet force of water.
colors:
  abyss: "#050706"
  deep-water: "#0A100E"
  paper: "#F1F2ED"
  mist: "#A8B0A9"
  graphite: "#252B28"
  lake-glow: "#B8FF78"
  ember-glow: "#FF8A48"
typography:
  display:
    fontFamily: "Onest, Arial, sans-serif"
    fontSize: "clamp(3.8rem, 10vw, 9.5rem)"
    fontWeight: 350
    lineHeight: 0.86
    letterSpacing: "-0.065em"
  lede:
    fontFamily: "Onest, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2.5rem)"
    fontWeight: 350
    lineHeight: 1.22
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Onest, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 6rem)"
    fontWeight: 350
    lineHeight: 0.94
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Onest, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 2.8vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Onest, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sharp: "0px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "48px"
  2xl: "80px"
  3xl: "120px"
  4xl: "160px"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.abyss}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
---

# Design System: Ozero Dev

## Overview

**Creative North Star: “The Nocturnal Lake Observatory”**

Ozero Dev feels like a serious engineering studio encountered at the edge of a
black lake after dark: precise, quiet, deep, and alive beneath the surface. The
visual world combines cinematic water, one code-native engraving-to-ASCII
transformation, and disciplined editorial typography. The page refuses the category default
of blue SaaS cards, technology-logo walls, neon terminal decoration, and vague
“innovation” copy.

The visitor should remember one material: black water carrying a precise,
barely visible image. The existing fisherman engraving may appear once as a
small brand artifact that is sampled into structured ASCII in the browser.
It must never become a large literal fishing scene or the dominant sales image.

**Key Characteristics:**

- Water as a material field that fills the frame, not a generic dark-mode
  background and not a highlight in the corner of a black rectangle.
- White editorial type with extremely restrained lake-green and ember light.
- Sharp content geometry paired with full-pill actions.
- One cinematic motion system; quiet, readable sections around it.
- Real product evidence presented without glossy card chrome.

## Colors

The interface is neutral and mineral; chroma belongs primarily to light moving
inside hero media.

**Amended 2026-07-31.** "Near-black" was read literally and produced a hero
that is mostly empty black with the material pushed into one corner. The
interface stays near-black; the *water* does not. Hero media carries a real
range from shadow to highlight, with submerged green and amber light present
across the whole frame. Neither reference behaves otherwise: monopo fills the
frame with light and sets white type on top of it, and XData keeps its liquid
dark but gives it form and speculars. See `docs/ai/MEDIA-BRIEF.md`.

### Primary

- **Abyss:** the page canvas and primary dark field.
- **Paper:** all high-emphasis type and the primary CTA surface.

### Secondary

- **Lake Glow:** a rare green-yellow optical reflection used inside media,
  focus indicators, and no more than one small live signal per viewport.
- **Ember Glow:** a warm counter-light used only in atmospheric media and
  selected case imagery.

### Neutral

- **Deep Water:** raised dark bands and media fallbacks.
- **Mist:** secondary copy that must retain accessible contrast.
- **Graphite:** hairlines and quiet surface separation.

**The Submerged Color Rule.** Green and ember behave like light under water.
They never become gradient buttons, colorful cards, or decorative badges.

## Typography

**Display Font:** Onest, with Arial and sans-serif fallbacks
**Body Font:** Onest, with Arial and sans-serif fallbacks
**Label/Mono Font:** JetBrains Mono, with system monospace fallbacks

**Character:** Onest gives English and Cyrillic the same contemporary,
engineering-led voice without impersonating a terminal. JetBrains Mono appears
only where the content is genuinely metadata, an index, or the ASCII
transformation.

### Hierarchy

- **Display:** light-to-regular variable weight, viewport-scaled, tightly
  tracked; the hero wordmark only.
- **Lede:** the hero's offer statement, and nothing else. The one role whose
  job is meaning rather than voice.
- **Headline:** light variable weight with compact leading; section theses.
- **Title:** 1.25–2rem, regular weight; service and case titles.
- **Body:** 1–1.2rem, regular, 1.55 leading, maximum 68 characters.
- **Label:** 0.75rem mono, uppercase, tracked; indices and operational facts.

**The Whispered Authority Rule.** Large type grows through scale and negative
space, never through heavy weight, outline effects, or gradient fill.

**Amended 2026-07-31.** Two roles were added to the frontmatter. `title` was
already described in this list but had never been tokenized, so every case and
service heading was an untracked literal. `lede` is new, and it exists because
the hero had a hole where its most important sentence lives.

The hero sets `ozero.dev` at up to 152px and then dropped straight to a 26px
paragraph — a 5.8× cliff with the offer stranded at the bottom of it. Nothing
in the ramp could catch it. `headline` at 6rem would have rivalled the
wordmark; `title` at 2rem is too quiet to carry the page's primary claim. So
the rung between them is now named. `PRODUCT.md` Principle 1 asks that the
offer be legible before the experience is cinematic, and the first entry under
Do's below asks for the offer and CTA in the first viewport; neither was
reachable without this role.

The wordmark keeps `display`. The brand is still the largest thing on the
page — the offer is simply no longer the smallest.

Two deliberate exceptions stay off the ramp.

`.intro-overlay__wordmark` (`src/App.css:104`) sets the entry curtain at
`clamp(2.25rem, 5.5vw, 4.25rem)`. It is a single transient element that never
coexists with page type, and tokenizing a role for one overlay would be worse
than the exception.

**Below 699px the hero overrides both `display` and `lede`**, to
`clamp(3.6rem, 17vw, 5.5rem)` and `1.3rem`. The § Layout rule that mobile uses
an art-directed vertical crop rather than a shrunken desktop composition
applies to type as well: the declared `display` floor of `3.8rem` is tuned to
a wide measure, and `17vw` is what keeps the wordmark proportionate to a
portrait frame. This is recorded because the launch review found the `lede`
token being quoted as universal when it holds on desktop only — the viewport
class carrying most traffic was the one where it was untrue.

## Layout

The page uses a twelve-column fluid grid with a maximum content width of
1440px. Gutters are 20px on phones, 32px on tablets, 48px on laptops, and 64px
on large desktops. Section rhythm is deliberately varied: the hero is
full-viewport, proof is compressed, case work is expansive, and the final CTA
returns to a single quiet field.

The hero owns at least one viewport and may use a longer sticky stage for the
engraving-to-ASCII transition. It must not hijack native scrolling. Text,
actions, and essential meaning stay in semantic HTML above all media.

Desktop compositions use asymmetry and controlled empty water. Mobile uses an
art-directed vertical crop rather than shrinking the desktop composition.
Nothing essential may depend on hover, video playback, or a precise viewport
ratio.

## Elevation & Depth

The system uses no conventional card shadows. Depth comes from image focus,
tonal separation, film grain, hairlines, and slow parallax confined to the hero
stage. Navigation may use a subtle dark scrim when content passes beneath it,
but blurred glass is not a general surface language.

**The Flat Evidence Rule.** Case studies are treated as editorial evidence,
not floating dashboard cards.

## Shapes

Content frames, screenshots, section boundaries, and dividers are sharp.
Primary and ghost actions are full pills. No intermediate “friendly SaaS”
radius is allowed. Organic shapes come only from water, light, and generated
media—not from arbitrary CSS blobs.

## Components

### Buttons

- **Shape:** full pill with a minimum 44px hit target.
- **Primary:** Paper surface, Abyss text, compact label, no gradient.
- **Ghost:** transparent with a quiet Paper hairline.
- **Hover / Focus:** small contrast shift and a visible Lake Glow focus ring;
  no large translation or magnetic cursor.

### Cards / Containers

- **Corner Style:** sharp.
- **Background:** transparent or Deep Water.
- **Shadow Strategy:** none.
- **Border:** one-pixel Graphite hairline when separation is required.
- **Internal Padding:** 20–48px depending on breakpoint.

### Navigation

The wordmark sits left, a minimal section index occupies the center/right, and
the EN/RU switch remains immediately reachable. Navigation is transparent over
the hero, then receives a restrained dark scrim. Mobile navigation is a compact
semantic menu, not an icon-only mystery interaction.

### Signature Hero Stage

A real video or generated atmospheric loop carries black water and controlled
iridescent reflection. The fisherman, if used, remains a small separate line-art
layer rather than a generated photoreal subject. A code-native ASCII layer,
derived from the real image pixels rather than a decorative contour texture,
crossfades in during one scroll
passage. Hero copy and CTA remain HTML and never appear baked into media.

## Do's and Don'ts

### Do:

- **Do** make the offer and primary CTA understandable in the first viewport.
- **Do** preserve real black water and authored imagery as the visual driver.
- **Do** show Taska and the AI assistant as honest work in progress.
- **Do** provide desktop, 4:3, vertical, poster, and reduced-motion treatments.
- **Do** keep focus, keyboard, zoom, and text contrast fully functional.
- **Do** use slow cinematic motion for atmosphere and fast motion for controls.

### Don't:

- **Don't** reproduce XData's coordinate wallpaper or dense pseudo-technical
  labels.
- **Don't** turn ASCII into a site-wide terminal theme.
- **Don't** use cyan SaaS gradients, generic glass cards, or glowing borders.
- **Don't** animate every section or attach motion to ordinary body copy.
- **Don't** invent customers, metrics, testimonials, delivery outcomes, or
  completed-project status.
- **Don't** expose founders, personal profiles, or a dead contact address.
