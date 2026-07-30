# LOD-2 art-direction review

Verdict: **APPROVE concept; poster refinements required before experience work**

The independent art-director approved the corrected system—macro black water as
the environment, the original fisherman as a restrained separate artifact, and
one real image-to-ASCII transition—as materially stronger and more credible than
the rejected literal fisherman generations.

## Blocking findings

- Reduce the AI-liquid appearance by lowering color saturation and midtones.
- Treat the shader as subtle displacement of the real texture, not as a new
  procedural blob.
- Keep the engraving and ASCII output pixel-registered.
- Generate ASCII from `public/fishman.png` luminance; do not use contour art,
  matrix rain, typing, or random flicker.
- Sequence water, engraving, ASCII, and copy so they do not peak together.
- Art-direct mobile separately rather than using a central desktop crop.

## Locked implementation values

- Desktop optical energy: `x 58–92%`, `y 52–88%`.
- Mobile: upper 40% nearly black; water energy begins below roughly 58%.
- Color reflections cover no more than 8–10% of the image.
- Water drift: 18–26 second cycle, 3–6px desktop displacement, 2–4px mobile,
  scale no higher than 1.02.
- Fisherman peak opacity: 0.58–0.70; exclude the final 7–9% of the source image
  to prevent the fishing line from reading as a UI divider.
- ASCII: 112–132 columns desktop, 56–72 mobile, character ramp
  ` .·:+*#@`, luminance below 24/255 transparent.
- Reduced motion: static poster, normal document scroll, one static ASCII
  artifact, no water deformation.

## Resolution

- Desktop and 4:3 water exports were desaturated and darkened.
- The portrait poster was rebuilt as a separate black-first composition with
  the water field restricted to the lower portion.
- The generated contour/signal exports were removed.
- The hero storyboard now specifies code-native luminance sampling of the
  original engraving.

The final visual approval still depends on browser screenshots from the
implemented experience milestone.
