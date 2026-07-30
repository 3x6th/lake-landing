# LOD-4 experience review

## Result

The cinematic hero implementation at commit `45e4a1b`, with first-viewport
offer alignment at `e9dacaf`, is accepted for the experience milestone.

- Motion review: **APPROVE**
- Independent launch review: **APPROVE WITH NON-BLOCKING NOTES**
- Remaining blocking findings: none

## Delivered behavior

- The approved desktop, 4:3, and portrait black-water posters are used as
  responsive media.
- The first viewport states the truthful Java-first offer and one-to-three-week
  start window in both English and Russian.
- Water has one restrained 22-second transform-only drift.
- `public/fishman.png` appears once and crossfades into luminance-derived ASCII.
- ASCII uses an 8% right crop, 120/64 columns, 2×2 area averaging, threshold
  24, gamma 0.65, and the ` .·:+*#@` ramp.
- The scroll passage writes opacity/transform directly to three cached
  compositor targets through one coalesced animation frame.
- Reduced motion uses normal flow, static water, static ASCII, and no
  continuous animation-frame work.
- The old typing/deleting cursor sequence and fixed blurred fisherman
  background were removed.

## Verification

The final implementation passed:

```text
npm run check                  3 files, 6 tests passed
npm run build                  success
npm audit --audit-level=high   0 vulnerabilities
git diff --check               success
```

Browser inspection used the in-app browser without Playwright. Console output
contained no application warnings or errors.

Evidence:

- `docs/ai/evidence/experience/hero-1440x900-top.jpg`
- `docs/ai/evidence/experience/hero-1440x900-engraving.jpg`
- `docs/ai/evidence/experience/hero-1440x900-ascii.jpg`
- `docs/ai/evidence/experience/hero-1280x800-top.jpg`
- `docs/ai/evidence/experience/hero-1024x768-top.jpg`
- `docs/ai/evidence/experience/hero-390x844-top.jpg`
- `docs/ai/evidence/experience/hero-360x800-top.jpg`

The Browser surface did not expose a reduced-motion emulation control.
Verification therefore combined static inspection of the media query with a
focused test proving that reduced motion clears inline narrative styles and
does not schedule `requestAnimationFrame`. Playwright and host-OS preference
mutation were intentionally not used.

## Non-blocking follow-up

- Add a deterministic success-path unit test for the exact ASCII sampler if the
  component is later refactored.
- Make the Java-first team-extension offer and one-to-three-week start clearer
  during LOD-6.
- Replace the legacy visual system below the hero during the content milestone;
  current Impeccable advisories are concentrated in those older sections.
