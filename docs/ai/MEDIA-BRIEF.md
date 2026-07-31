# Hero media brief — stills and loops

Supersedes the water direction in `ASSET-PROVENANCE.md`. That brief produced
the asset now in the repository, and it produced exactly what it asked for:
"mostly in the lower-right", "the left 45 percent stays deep, quiet near-black",
then "desaturated and darkened" after the LOD-2 review. The result is a dark
frame with the material pushed into one corner. Neither reference behaves that
way — monopo fills the whole frame with light and sets white type straight on
top of it, and XData keeps its liquid dark but gives it strong speculars and
readable form. Neither has a dead half.

**Everything here is generated in the Higgsfield web connector.** The CLI is
blocked on this account for both video and images:
`{"error_type":"free_trial_model_requires_plan","plan_type":"plus"}`, verified
against `kling3_0`, `kling3_0_turbo`, `wan2_7` and `nano_banana_2`.

## Order of work

Everything descends from the first still, so it is worth being fussy about
that one and quick about the rest.

| # | Generate | From | Keep? |
| --- | --- | --- | --- |
| 1 | Hero still 16:9 | prompt only | yes — `hero-water-desktop.webp` |
| 2 | Hero still 9:16 | prompt, with 1 as reference | yes — `hero-water-mobile.webp` |
| 3 | Hero loop desktop | **start frame: 1** | yes — `hero-water-desktop.mp4` |
| 4 | Hero loop mobile | **start frame: 2** | yes — `hero-water-mobile.mp4` |
| 5 | Interlude still A | prompt, with 1 as reference | no — working file |
| 6 | Interlude still B | prompt, with 1 as reference | no — working file |
| 7 | Interlude loop one | **start frame: 5** | yes — `depth-01.mp4` |
| 8 | Interlude loop two | **start frame: 6** | yes — `depth-02.mp4` |

Six files reach the repository; steps 5 and 6 exist only to feed 7 and 8.

If a still gets rejected at step 1, everything after it is wasted, so run the
three checks below before moving on.

## The correction, in one line

Lighter, closer, slower. The water is a **material that fills the frame**, not
a highlight sitting in a corner of a black rectangle.

| Was | Now |
| --- | --- |
| Near-black, energy at x 58–92% | Mid-dark with real luminance range across the whole frame |
| Left 45% empty black | Light varies everywhere; the left is *quieter*, never dead |
| Choppy interference, small ripples | Large slow swells, silk-like, few edges |
| Iridescence sparse and dim | Iridescence is the subject — soft, luminous, unmissable |
| Camera near the surface | Camera at the surface, shallow depth of field |

Keep: no people, no boat, no text, no UI, no coordinates, no cyan or purple
neon, no glossy CGI blob, no lens flare, no stock-photo look.

## 1. Hero still, desktop — 16:9, 2K

Save as: `public/media/hero/hero-water-desktop.webp`

> Extreme macro photograph of a dark lake surface at night, lens almost
> touching the water, shallow depth of field. Large slow swells fill the entire
> frame — smooth, silk-like, unbroken, no choppy ripples and no small
> interference. Submerged light glows through the water from below in moss
> green shifting into warm amber, luminous and soft-edged, present across the
> whole frame and strongest through the centre and right. The left side is
> quieter and cooler but still clearly lit — never empty black. Deep charcoal
> and petrol-green midtones rather than pure black, with a real range from
> shadow to highlight. Fine silver film grain, true optical caustics,
> sophisticated, tactile, editorial, contemporary design-studio quality. No
> people, no boat, no animals, no text, no letters, no logo, no UI, no
> coordinates, no grid, no neon cyan, no purple, no glossy CGI blob, no lens
> flare, no stock-photo look.

Judge a candidate on three things before accepting it:

1. Cover the right half with your hand. Does the left half still look like
   something? If it reads as a black rectangle, reject it.
2. Squint. Do you see a few big soft shapes, or lots of small busy ones? It
   should be a few big ones.
3. Is there anywhere the eye rests that is neither pure black nor a highlight?
   There should be plenty.

## 2. Hero still, portrait — 9:16, 2K

Save as: `public/media/hero/hero-water-mobile.webp`

Same treatment, recomposed rather than cropped:

> Vertical extreme macro photograph of a dark lake surface at night, lens
> almost touching the water, shallow depth of field. One large slow swell
> crosses the frame diagonally, smooth and silk-like. Submerged moss-green and
> warm amber light glows through the water, softest in the upper third and
> strongest through the lower half. Deep charcoal and petrol-green midtones
> rather than pure black, with a real range from shadow to highlight. Fine
> silver film grain, true optical caustics, editorial, contemporary
> design-studio quality. No people, no boat, no animals, no text, no letters,
> no logo, no UI, no coordinates, no grid, no neon cyan, no purple, no glossy
> CGI blob, no lens flare.

The upper third stays softer because the headline sits there — but "softer"
means gentler light, not black.

## 3. Hero loop — 16:9 and 9:16

Start image: the accepted still from 1 and 2, so the poster-to-video handoff is
invisible.
Save as: `public/media/hero/hero-water-desktop.mp4`, `hero-water-mobile.mp4`

Duration 5s (8s if offered), sound off, camera locked — no pan, push, zoom,
orbit or cut.

> The water breathes. One very slow swell travels across the frame and the
> submerged light shifts with it, brightening and dimming gently. Motion is
> continuous and unhurried so the clip loops seamlessly with no visible
> restart. Nothing else moves. No camera movement, no zoom, no cuts, no new
> objects entering frame.

## 4. Interlude loops — 16:9

Save as: `public/media/interlude/depth-01.mp4`,
`public/media/interlude/depth-02.mp4`

These sit between editorial sections and should be quieter than the hero, so
the hero stays the loudest moment.

**These need a still first as well, and it is a two-step.** Text-to-video
straight from a prompt would work, but each independent generation invents its
own water — its own tint, grain and surface. Three separately generated clips
read as three different lakes, and `REFERENCE-LOCK.md` asks for one continuous
atmospheric world. So each interlude still is generated *from the accepted hero
still*, and the loop is then generated from that.

Note the two fields are not the same thing:

- **Reference image**, on an image model — "make something like this". A soft
  influence on style and subject.
- **Start frame**, on a video model — the clip literally begins on that exact
  frame. A hard constraint.

### 4a. Interlude stills — intermediate only

Generate with the **accepted hero 16:9 still attached as a reference image**.
These are working files: they are start frames for the loops and are never
committed. The bands render no poster, and a black band on a near-black page is
invisible anyway.

Interlude one, cooler and dimmer:

> The same dark lake surface as the reference, same material, same grain, but
> quieter: dimmer overall, cooler, the submerged light moss green rather than
> amber, spread evenly instead of concentrated. Large slow smooth swells, no
> choppy ripples. Deep charcoal and petrol-green midtones. No people, no boat,
> no text, no letters, no logo, no UI, no neon, no glossy CGI, no lens flare.

Interlude two, warmer and closer:

> The same dark lake surface as the reference, same material, same grain, but
> closer and warmer: the lens nearer the water, the submerged light burnt amber
> rather than green, diffusing up from the lower edge. Large slow smooth
> swells, no choppy ripples. Deep charcoal midtones. No people, no boat, no
> text, no letters, no logo, no UI, no neon, no glossy CGI, no lens flare.

Making one green and one amber is what stops the two bands reading as the same
clip shown twice.

### 4b. Interlude loops

Each interlude still becomes the **start frame** of its loop. Same settings as
the hero: 5s, sound off, camera locked.

> The water breathes. One very slow swell crosses the frame and the submerged
> light shifts gently with it. Motion is continuous and unhurried so the clip
> loops seamlessly with no visible restart. Nothing else moves. No camera
> movement, no zoom, no cuts, no new objects entering frame.

## After download

Drop each file at the path above, then fill the matching slot in
`src/mediaConfig.ts` in the same commit:

```ts
export const heroVideoSources = {
  desktop: '/media/hero/hero-water-desktop.mp4',
  mobile: '/media/hero/hero-water-mobile.mp4',
};

export const interludeBands = {
  afterWork: '/media/interlude/depth-01.mp4',
  beforeContact: '/media/interlude/depth-02.mp4',
};
```

The stills need no config: they replace the existing files at the same paths.

Re-encode each loop to stay under the 2.5MB budget:

```bash
ffmpeg -y -i input.mp4 -an -c:v libx264 -crf 30 -preset slow \
  -pix_fmt yuv420p -movflags +faststart output.mp4
```

Then record model, date and job IDs in `ASSET-PROVENANCE.md`.

## The scrim moves with the art

The hero scrim in `src/App.css` is currently tuned for an asset whose left side
is already black. A lighter asset needs the opposite treatment: a real scrim
behind the copy column for contrast, and nothing across the rest. That is a CSS
change to make once the new stills land, not something to guess at now.
