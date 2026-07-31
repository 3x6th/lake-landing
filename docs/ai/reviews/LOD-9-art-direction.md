# LOD-9 art-direction correction

Verdict: **REQUEST CHANGES against the shipped LOD-4/LOD-6 experience**

The content and claims are sound. The visual system is not delivering what
`DESIGN.md` describes, and the causes are specific and measurable rather than a
matter of taste.

## Blocking findings

### 1. The hero scrim duplicates art direction the asset already contains

`public/media/hero/hero-water-desktop.webp` is a strong asset. Inspected
directly, its left ~45% is already pure black and its optical energy already
sits in the right/lower-right at roughly `x 58–92%` — exactly the composition
the LOD-2 review specified.

`.hero-water__scrim` (`src/App.css:313`) then applies that same left-to-right
darkening a second time: `rgba(5,7,6,.98) → .88 at 26% → .2 at 58%`, plus a
vertical wash of `.88 → .12 at 42% → .22`, over an image already held at
`opacity: .92`.

The negative space is therefore produced twice, and the second pass also eats
into the right side where the detail lives. The result is not "near-black
water" but an almost empty frame. **The asset does the art direction; the scrim
should only protect legibility.**

### 2. The portrait crop carries almost no water

`hero-water-mobile.webp` (864×1536) is near-black across its upper ~68%, with a
faint trace of water only in the lower-right corner. Even with the scrim
removed entirely, the mobile hero would read as a black rectangle. The authored
9:16 crop lost the material.

Correction: re-cut the portrait crop from the 2752×1536 master, centred on the
water-rich region rather than on a compositionally safe but empty area.

### 3. Display typography is 1.6× smaller than the declared token

`DESIGN.md` frontmatter declares display type at
`clamp(3.8rem, 10vw, 9.5rem)` — up to 152px. `src/App.css:346` ships
`clamp(3.8rem, 8vw, 6rem)` — capped at 96px. The "Whispered Authority Rule"
states that large type grows through scale and negative space, never weight.
At 96px with weight 350 it grows through neither.

### 4. Three visual systems occupy one stage

Water, engraving, and ASCII all render inside the same 210vh sticky hero at
peak opacities of 0.92, 0.64, and 0.76 over near-black. The LOD-2 review already
required that they "not peak together"; overlapping them in one viewport is a
stronger version of the same fault. None of the three reads.

This is why the engraving-to-ASCII passage is relocated out of the hero — see
the amendments in `REFERENCE-LOCK.md` and `HERO-STORYBOARD.md`. The intent of
both documents is preserved: the fisherman still appears exactly once, still
transforms exactly once, and is still a signature rather than a mascot. Only
its location changes.

### 5. The navigation scrim keys off the wrong event

`.top-nav--solid` is driven by hero release, so at 1024×768 the proof rail
scrolls through a transparent fixed navbar. Evidence:
`docs/ai/evidence/content/content-1024-offers.jpg`.

### 6. The Taska screenshot is the loudest element on the page — needs a decision

The raw capture carries indigo/violet product chrome against a near-black
mineral palette. `DESIGN.md` § Submerged Color Rule reserves chroma for light
inside media, and the reference lock rejects generic SaaS surfaces. As shipped,
the single most saturated thing on the page belongs to a different brand.

**This one is not fixed, deliberately.** A tone treatment was implemented and
then reverted: `CONTENT-BRIEF.md` states the screenshots stay "sharp and
unmodified: no mock device, skew, glow, recolor, rounded chrome, or violet site
accent", and a saturation filter is a recolor. The content contract outranks an
art-direction preference, so the capture ships exactly as the product renders
it.

Resolving this properly needs an owner decision, not a CSS filter. The options
are to amend the content contract to permit a neutral tone treatment, to
recapture Taska under a darker theme if the product has one, or to accept the
clash as honest evidence.

## Non-blocking findings

- Nothing below the hero moves. Nine sections carry only `150ms` hover colour
  transitions, against a reference whose documented motion personality is
  patient `0.8–1.25s` easing.
- The research band leaves a large dead left column at 1440.
- `README.md` is still Create React App boilerplate, as flagged in the LOD-5
  and LOD-6 content review.

## Owner decision, 2026-07-31: the Taska frames ship whole

The re-run of this review raised a second blocking finding: the published case
screenshots ship mostly empty background. Measured from the private sources,
`img_1.png` carries real content only in rows 0–300 of 768, so 61% of the
projects frame is empty indigo, and `img_2.png` ends at row 617 of 898, so 31%
of the board frame is empty.

Two corrections were implemented and both were rejected by the owner on sight.

Cropping the frame in CSS removed the void but left a 4.1:1 strip in a 0.75fr
column, about 415px wide and 101px tall, rendering a 1234px-wide interface at
0.34 scale. Illegible, and it read as a mistake rather than as evidence.

Moving the strip to full width below the board made it legible at roughly 1.05
scale, but it cut the board out of the same screen. That broke the thing the
spread exists for: seeing the issue board and the project workspaces at once,
in one row.

The geometry does not admit a clean answer. The board is 1.60 and the projects
view is 4.10, so in a shared row they cannot be simultaneously comparable in
height, legible, and complete. The owner chose to keep the original
composition — both screens side by side, each shown whole, including the empty
field beneath the projects view.

**This overruled a blocking art-direction finding, deliberately.** It was
recorded here rather than resolved quietly.

### Resolved the same day, by removing the constraint

The owner then supplied new captures, which is the one move neither correction
could make. The published pair is now a 1.42 board and a 1.58 projects screen,
neither carrying any empty background:

```
board     999×702  ratio 1.42   Taska Platform, ten issues, four members
projects  713×450  ratio 1.58   four workspaces with descriptions
```

Close enough in proportion to share a row at comparable height, complete, and
uncropped at every viewport. The projects view now renders at 0.60 of native
instead of 0.34. The finding is closed on its merits rather than by decision,
and the override above is spent.

Two things fell out of the swap. The `aspect-ratio: 4 / 5` that the phone rule
forced on the primary had to go — against the new capture it cropped
horizontally about the centre and hid the To Do and Done columns outright. It
had only ever worked by zooming past the old capture's dead margin, so it was
compensating for the defect rather than art-directing anything. And the board
now shows real Taska development work — `Kanban drag-and-drop transitions`,
`Board column count is off by one` — instead of seeded demo data, which is
materially stronger evidence for a product labelled `IN DEVELOPMENT`.

The chroma question in finding 6 is also quieter as a result: the new captures
carry the same product chrome but no longer devote most of their area to an
empty indigo field.

## Amendment record

`REFERENCE-LOCK.md` § Locked synthesis and § Composition rules, and
`HERO-STORYBOARD.md` § Scroll sequence, were amended on 2026-07-31 to move the
single engraving-to-ASCII transformation out of the hero into its own
full-bleed passage between the work and process sections.

`AGENTS.md` ranks both documents above implementation and requires that a
conflict stop the conflicting work and defer upward. The amendment is recorded
here rather than applied silently, and is reversible by reverting one commit.
