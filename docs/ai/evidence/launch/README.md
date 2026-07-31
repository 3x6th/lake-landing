# LOD-9 launch evidence

Captured 2026-07-31 against the dev server at the tip of `codex/lod-launch`.

## Viewport matrix

`*-top-*` is the first viewport at each required size, in both languages.

| Viewport | EN | RU |
| --- | --- | --- |
| 1440×900 | `launch-1440x900-top-en.jpg` | `launch-1440x900-top-ru.jpg` |
| 1280×800 | `launch-1280x800-top-en.jpg` | `launch-1280x800-top-ru.jpg` |
| 1024×768 | `launch-1024x768-top-en.jpg` | `launch-1024x768-top-ru.jpg` |
| 390×844 | `launch-390x844-top-en.jpg` | `launch-390x844-top-ru.jpg` |
| 360×800 | `launch-360x800-top-en.jpg` | `launch-360x800-top-ru.jpg` |

Sections: `launch-1440x900-offers-ru.jpg`, `launch-1440x900-faq-ru.jpg`,
`launch-390x844-offers-ru.jpg`,
`launch-1440x900-interlude-engraving-en.jpg`,
`launch-1440x900-interlude-ascii-en.jpg`.

## No horizontal overflow

`CONTENT-BRIEF.md` requires no horizontal overflow at any required viewport.
Each frame was captured with `documentElement.scrollWidth` and `clientWidth`
read in the same pass, and every pair was equal:

```
1440×900  sw=1440 cw=1440    h1 144px
1280×800  sw=1280 cw=1280    h1 128px
1024×768  sw=1024 cw=1024    h1 102.4px
 390×844  sw=390  cw=390     h1 66.3px
 360×800  sw=360  cw=360     h1 61.2px
```

The `h1` column double-checks the display token: 144/1440, 128/1280 and
102.4/1024 are all exactly `10vw`, and the two phone sizes are exactly `17vw`
from the mobile override. That is `DESIGN.md`'s declared
`clamp(3.8rem, 10vw, 9.5rem)` rendering as declared.

## How these were captured, and one earlier set that was wrong

Through the Chrome DevTools Protocol, driving a headless Chrome with
`Emulation.setDeviceMetricsOverride`. Not Playwright, which `AGENTS.md`
forbids, and no new dependency — Node 24 ships a WebSocket client.

Three things had to be right, and each was wrong first:

1. **`--window-size` cannot produce a small viewport.** Chrome clamps its
   window to a platform minimum (~518px here) and then crops the screenshot to
   the requested size. A first set of 360 and 390 frames was captured that way
   and showed the hero apparently overflowing. It was not overflowing; the page
   had been laid out at ~518px and photographed through a 360px window. Those
   frames were discarded and re-taken. Device metrics override sets the real
   layout viewport, which is why the numbers above can be quoted.
2. **`scroll-behavior: smooth`** (`src/App.css:19`) means a programmatic
   `scrollTo` animates, so reading `scrollY` straight after returns 0 and a
   retry loop restarts the animation forever. Section frames use
   `behavior: 'instant'`, and the capture asserts the landed position is within
   60px of the target before writing a file — a section frame can never
   silently be a picture of the top of the page.
3. **Headless throttles `requestAnimationFrame`** on a page it considers
   occluded, and the interlude writes its opacity from a scroll-driven frame
   callback. The passage photographed pure black until Chrome was started with
   backgrounding disabled and `Emulation.setFocusEmulationEnabled`. The two
   interlude frames carry the layer opacities that were read at capture time:
   engraving `0.82` / ascii `0` for the engraving frame, engraving `0` /
   ascii `0.86` for the ASCII frame.

## What the interlude frames show

`launch-1440x900-interlude-engraving-en.jpg` is the evidence for the crop fix.
The rod tip and the full fishing line into the water — the 147px that
`CROP_RATIO = 0.87` had been discarding — are present, with the ripple where
the line meets the surface. `launch-1440x900-interlude-ascii-en.jpg` shows the
same geometry surviving the transformation into ASCII, with the brand line
resolved beneath it.

## Not covered here

- Real-device rotation for `AtmosphereVideo`'s source swap. The media-query
  subscription is unit-tested; an actual phone rotation is not.
- `prefers-reduced-motion` frames.
- The deployed site. These are dev-server captures.
