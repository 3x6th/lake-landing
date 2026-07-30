# 001 — Build the fisherman-to-ASCII hero passage

- **Status**: DONE
- **Commit**: 428dbe3
- **Implementation**: 45e4a1b
- **Severity**: HIGH
- **Category**: Narrative motion and reduced motion
- **Estimated scope**: 6–8 files, roughly 500–800 lines including tests

## Problem

The current hero is a static full-screen fisherman image with a generic
type/delete loop. It does not use the approved black-water media, does not
contain the promised ASCII transformation, and blurs the entire background
after a fixed scroll threshold.

```tsx
// src/App.tsx:130 — current
<div className={`App ${isScrolled ? 'scrolled' : ''}`} id="top">
  <div
    className="background-image"
    style={{
      backgroundImage: 'url(/fishman.png)',
    }}
    aria-hidden="true"
  />
  <div className="background-overlay" aria-hidden="true" />
```

```tsx
// src/App.tsx:175 — current
<main className="page-content">
  <section className="section hero-section">
    <div className="hero-classic">
      <TypingAnimation texts={heroTypingTexts} />
      <p className="subtitle">
        We build digital solutions that flow like water
      </p>
    </div>
  </section>
```

```css
/* src/App.css:22 — current */
.background-image {
  position: fixed;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.42;
  filter: blur(0);
  transform: scale(1);
  transition: filter 0.35s ease, transform 0.35s ease, opacity 0.35s ease;
  z-index: -2;
}
```

```tsx
// src/components/TypingAnimation.tsx:23 — current
useEffect(() => {
  const currentText = rotatingTexts[textIndex];
  // types, waits, deletes, and loops forever
}, [displayText, isDeleting, textIndex, rotatingTexts]);
```

This creates a dated “typing portfolio” effect and makes the generated
fisherman illustration dominate the sales message. The generated
`hero-signal-*.webp` experiments are explicitly rejected and must not enter the
page.

## Target

Create one controlled native-scroll passage named `HeroExperience`:

- The first viewport immediately communicates the offer and exposes the email
  CTA as semantic HTML. English and Russian use the active locale.
- The background is the approved near-black water texture:
  `hero-water-desktop.webp`, `hero-water-4x3.webp`, and the separately
  art-directed `hero-water-mobile.webp`.
- The water drifts continuously through transform-only CSS. It does not become
  a procedural blob and does not require WebGL.
- `public/fishman.png` appears as a restrained engraving on the lower right and
  crossfades into a pixel-registered ASCII rendering derived from the same
  image's luminance. The ASCII is real sampled image data, not a fake contour,
  matrix rain, random characters, typing, or flicker.
- Desktop stage height is `210vh`; mobile stage height is `180vh`. A sticky
  `100svh` visual stage owns the passage without intercepting native scroll.
- Scroll progress is normalized from the hero root inside one
  `requestAnimationFrame` per frame. Cached element refs receive direct
  compositor-only inline styles: opacity for the engraving and ASCII, plus
  opacity and transform for the brand line. Do not query the DOM or update
  React state continuously while scrolling.
- Fisherman and ASCII share one grid cell and exactly the same image box,
  object-fit, object-position, and right-side 8% crop so the fishing-line edge
  does not drift between layers.
- Use the exact scroll windows:
  - fisherman opacity `0 → 0.64` at progress `0.35–0.52`
  - fisherman holds at `0.64` through `0.66`
  - fisherman opacity `0.64 → 0` at `0.66–0.86`
  - ASCII opacity `0 → 0.76` at `0.66–0.86`
  - brand line opacity `0 → 1` and `translateY(8px) → 0` at `0.88–0.98`
- Desktop fisherman box: width `clamp(320px, 29vw, 520px)`, right `5vw`,
  bottom `10vh`. Mobile: width `74vw`, right `-2vw`, bottom `8vh`.
- ASCII sampling:
  - draw the image once to an offscreen canvas after decode
  - crop the final 8% of source width
  - sample a `120`-column grid on desktop and `64` columns on mobile
  - use area averaging or a one-pixel blur before sampling
  - luminance below `24` is transparent
  - apply contrast gamma `0.65` to normalized post-threshold luminance before
    selecting a glyph so thin engraving strokes remain legible
  - glyph ramp is exactly ` .·:+*#@`
  - glyph positions are fixed; output color is `#F1F2ED`
  - regenerate only when the desktop/mobile sampling breakpoint changes
- Water keyframes run for `22s`, `linear`, `infinite alternate`:

```css
/* target: desktop */
@keyframes hero-water-drift {
  0% {
    transform: translate3d(-2px, -1px, 0) scale(1.012);
  }
  50% {
    transform: translate3d(3px, 2px, 0) scale(1.018);
  }
  100% {
    transform: translate3d(-1px, 3px, 0) scale(1.014);
  }
}
```

On mobile use `translate3d(-1px, -1px, 0)`,
`translate3d(2px, 2px, 0)`, and `translate3d(0, 3px, 0)` with scale never above
`1.014`.

- Navigation receives a solid `#050706` scrim after the hero releases:
  `opacity 220ms cubic-bezier(0.16, 1, 0.3, 1)` in and `180ms` out. No blur and
  no translation.
- `prefers-reduced-motion: reduce` uses normal document flow, no sticky stage,
  no animated water, no scroll transformation, and one static ASCII artifact
  next to readable hero copy. Navigation may use a `120ms` opacity transition.

## Repo conventions to follow

- Product truth and prohibited claims come from `PRODUCT.md`.
- Art direction, colors, crop rules, and typography come from `DESIGN.md`.
- Use the existing `Language` type and `uiCopy` locale flow from
  `src/siteContent.ts`; do not add hard-coded English-only visible copy.
- Keep global styles in `src/index.css`; keep hero and component styling in
  `src/App.css` for this milestone.
- Keep the reachable email imported from the single `CONTACT_EMAIL` constant.
- Components use named TypeScript prop interfaces and React function
  components, as in the current code.
- Prefer browser APIs and CSS. Do not add Motion or another dependency unless
  native scroll plus one rAF cannot meet the target.

## Steps

1. Add `src/hooks/useHeroProgress.ts`. Observe the hero root with passive
   `scroll` and `resize` listeners, coalesce work into one rAF, calculate
   normalized progress, and write direct compositor styles to cached engraving,
   ASCII, and brand-line refs. Expose only discrete state needed for navigation
   or accessibility. In reduced motion, clear inline motion styles and use an
   isolated passive release-threshold check with no progress rAF. Clean up all
   listeners, timers, and pending frames.
2. Add `src/components/AsciiFisherman.tsx`. Decode `/fishman.png`, crop its
   rightmost 8%, sample luminance into the prescribed fixed grid, and render a
   decorative, `aria-hidden` ASCII layer whose box is pixel-registered with the
   engraving. Handle image failure without affecting hero copy or CTA.
3. Add `src/components/HeroExperience.tsx`. Build semantic headline, offer
   sentence, mailto CTA, ambient water `<picture>`, engraving/ASCII grid, and
   final brand line. The media stack is decorative and never owns readable
   copy.
4. Replace the legacy background and `TypingAnimation` hero integration in
   `src/App.tsx`. Remove the old continuous scroll-state effect if no longer
   needed. Preserve the language switch and below-hero content for later
   milestones.
5. Remove `src/components/TypingAnimation.tsx` once unused. Remove `.cursor`,
   `.typing-animation`, and old fixed-background blur rules.
6. Add exact hero, responsive, and reduced-motion CSS to `src/App.css`. Keep the
   upper `38–42%` of mobile nearly black and begin visible color below `58%`.
   Desktop text stays in the left `8–46vw`; optical energy stays in the lower
   right.
7. Add focused tests for static readable copy/CTA, locale changes, ASCII image
   failure, and reduced-motion-safe rendering where practical. Do not create
   timing-fragile tests for individual animation frames.

## Boundaries

- Do not touch the services, work, vacancy, or contact information
  architecture beyond selectors required to release the hero.
- Do not use or restore rejected `hero-signal-*.webp` assets.
- Do not generate another fisherman. Use `public/fishman.png`.
- Do not add matrix rain, random ASCII, terminal chrome, scan lines, type/delete
  text, flicker, neon glow, particle fields, coordinate wallpaper, or animated
  body-section entrances.
- Do not animate `filter`, `backdrop-filter`, layout dimensions, or box-shadow.
- Do not add WebGL, canvas-per-frame water, video, or new dependencies.
- Do not install or use Playwright.
- Preserve all untracked files under `public/media/taska-screanshots/`.
- If the files have drifted from commit `428dbe3` in a way that conflicts with
  this plan, stop and report instead of improvising.

## Verification

- **Mechanical**:
  - `npm run check` exits `0`.
  - `npm run build` exits `0`.
  - `npm audit --audit-level=high` reports no high or critical vulnerabilities.
  - `git diff --check` exits `0`.
- **Browser**:
  - Use the in-app browser, not Playwright.
  - Capture 1440×900 and 390×844 screenshots at progress `0`, around `0.55`,
    and around `0.9`.
  - Confirm the fisherman and ASCII occupy the same image box with no visible
    jump during crossfade.
  - Confirm upper mobile copy has clear contrast and the water/color weight is
    below the fold midpoint.
  - Inspect console logs; there are no runtime errors or repeated image decode
    failures.
- **Feel check**:
  - Normal wheel/touch scroll remains native; the stage does not trap input.
  - Water motion is barely perceptible over several seconds and never reads as
    a zoom effect.
  - The fisherman is absent initially, appears once, then resolves into stable
    ASCII. Nothing types, flickers, rains, or glows.
  - The offer and email CTA are readable before the visual reveal begins.
  - With reduced motion enabled, the page uses normal flow, the water is
    static, and a static ASCII artifact remains visible without requiring
    scroll.
- **Done when**: the hero is serious and legible in the first viewport, the
  black-water field feels alive, the real fisherman transforms into
  pixel-registered ASCII exactly once, all content remains usable without
  motion, and all mechanical/browser checks pass.
