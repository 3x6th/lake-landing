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

The `h1` column double-checks the display token **on desktop only**:
144/1440, 128/1280 and 102.4/1024 are all exactly `10vw`, which is
`DESIGN.md`'s declared `clamp(3.8rem, 10vw, 9.5rem)` rendering as declared.

The two phone figures are **not** that token. 66.3px and 61.2px are `17vw`
from the art-directed mobile override at `src/App.css:1388`,
`clamp(3.6rem, 17vw, 5.5rem)`. The declared token would give 60.8px at 390px —
its `3.8rem` floor. An earlier version of this file claimed both rows proved
token compliance, which its own numbers disprove; the launch review caught it.
`DESIGN.md` § Layout permits an art-directed mobile treatment, and the
exception is now recorded in the typography amendment rather than implied here.

These numbers were also measured with overlay scrollbars. See the note on
full-bleed blocks below.

## One measured caveat on the desktop numbers — since closed

**Closed in `20c3aa8`.** Kept here as history, because the measurement is
useful and the trap is easy to reintroduce.

When these frames were taken, a **classic** scrollbar — Windows and Linux
Chrome — put about 8px of scrollable overflow on the desktop viewports: at
1280 the launch review measured `scrollWidth` 1273 against `clientWidth` 1265.
Every full-bleed block used the `width: 100vw; left: 50%; margin-left: -50vw`
idiom, and `100vw` includes the scrollbar, so each was laid out ~7.5px wider
than the content box while `body { overflow-x: hidden }` hid the consequence.

All five blocks are direct children of a padding-free `main.page-content`, so
they now use `width: 100%` and the overflow is structurally impossible rather
than merely absent. Re-measured at 1440: `scrollWidth === clientWidth === 1440`
with zero overflowing elements.

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

## These frames show posters, not playing video

Two separate reviews found capture faults here, and both are recorded rather
than quietly re-shot.

The art director found that headless Chrome launched with `--disable-gpu`
**silently declines to decode video**. It does not error and it does not warn;
the `<video>` simply never paints. The water visible in the hero frames is
therefore `hero-water-desktop.webp` — the real poster underneath, and a state a
visitor genuinely sees before the loop fades in — not `hero-water-desktop.mp4`.
No frame in this set is evidence that a video plays.

The launch review then found that the five **EN** frames were additionally
captured before the poster itself had decoded: every EN file was 40–45% smaller
on disk than its RU twin and the hero read near-black, which would have
evidenced layout but not art direction. They were re-taken, and the capture now
asserts `HTMLImageElement.complete` and a non-zero `naturalWidth` on
`.hero-water__image` before the shutter and prints the result next to each
frame. A capture pipeline that cannot tell a dark composition from an
undecoded one is not evidence.

That is also why no depth-band frame is included. A band captured under
`--disable-gpu` would have been a black rectangle, and filing that as evidence
of an atmospheric pause would have been worse than filing nothing. The bands
were confirmed playing separately, in a GPU-enabled run, by the art director.

Anyone re-running this must drop `--disable-gpu` and assert
`video.paused === false` before trusting a frame that is supposed to contain
motion.

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
