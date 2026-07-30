# Ozero Dev design-system pointer

Status: **authoritative mirror**

The first UI/UX Pro Max database result for this project was rejected during
art direction. It proposed a generic cyan SaaS palette, Inter typography,
rounded shadow cards, glass surfaces, testimonials, and invented conversion
claims. None of those recommendations are approved for Ozero Dev.

The authoritative source is [`../../DESIGN.md`](../../DESIGN.md). Product truth
and prohibited claims live in [`../../PRODUCT.md`](../../PRODUCT.md).

## Implementation tokens

```css
:root {
  --color-abyss: #050706;
  --color-deep-water: #0a100e;
  --color-paper: #f1f2ed;
  --color-mist: #a8b0a9;
  --color-graphite: #252b28;
  --color-lake-glow: #b8ff78;
  --color-ember-glow: #ff8a48;

  --font-sans: "Onest", Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1.25rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 5rem;
  --space-3xl: 7.5rem;
  --space-4xl: 10rem;

  --radius-sharp: 0;
  --radius-pill: 999px;
}
```

## Non-negotiable rules

- Near-black water is the primary material; chroma remains submerged and rare.
- Onest serves display/body copy; JetBrains Mono serves only genuine metadata
  and the one image-derived ASCII transformation.
- Content frames are sharp. Primary/ghost actions are full pills. No generic
  medium-radius SaaS cards.
- No glassmorphism, cyan cyberpunk, coordinate wallpaper, terminal cosplay, or
  glossy 3D blobs.
- No pricing, founder/team section, technology-logo wall, testimonials, client
  logos, or invented results.
- English is primary; Russian has full semantic parity.
- Animation never carries essential meaning and must provide a static
  reduced-motion path.
- The connected UI/UX database is research input. It never overrides
  `PRODUCT.md` or `DESIGN.md`.
