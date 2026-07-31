# Hero and interlude loop brief

Generation runs in the Higgsfield web UI / connector. The CLI cannot be used:
it rejects every video model on this account with
`{"error_type":"free_trial_model_requires_plan","plan_type":"plus"}`, verified
against `kling3_0`, `kling3_0_turbo` and `wan2_7`.

## Settings for every clip

| Setting | Value |
|---|---|
| Duration | 5s (8s also fine if the model offers it) |
| Sound | off |
| Aspect | 16:9 for desktop and both interludes, 9:16 for mobile |
| Camera | locked — no pan, push, zoom, orbit or cut |
| Start image | use the matching WebP below so the loop starts on the poster frame |

Using the existing WebP as the start image matters: the page paints the poster
first and swaps to the video, so a matching first frame makes the handoff
invisible.

## 1. Hero, desktop — 16:9

Start image: `public/media/hero/hero-water-desktop.webp`
Save as: `public/media/hero/hero-water-desktop.mp4`

> Extreme macro cinematography of a black lake surface at night, camera locked
> and completely static. Slow gentle swell and subtle physically plausible
> interference moving across black-on-black liquid folds. Sparse submerged
> moss-green and burnt-amber iridescence concentrated in the lower-right and
> center-right. The left 45 percent stays deep quiet near-black negative space.
> Filmic grain, real optical caustics, restrained, architectural, editorial,
> contemporary design-studio quality. Motion is slow and continuous so the clip
> loops seamlessly. No people, no fisherman, no boat, no animals, no text, no
> letters, no logo, no UI, no coordinates, no grid, no glowing sphere, no neon
> cyan, no glossy CGI blob, no lens flare, no camera movement, no zoom, no cuts.

## 2. Hero, mobile — 9:16

Start image: `public/media/hero/hero-water-mobile.webp`
Save as: `public/media/hero/hero-water-mobile.mp4`

> Vertical extreme macro cinematography of a black lake surface at night,
> camera locked and completely static. The upper third stays quiet near-black
> negative space. A single slow ripple line drifts through the middle, and
> moss-green and burnt-amber caustics breathe in the lower third. Filmic grain,
> real optical caustics, restrained, editorial, contemporary design-studio
> quality. Motion is slow and continuous so the clip loops seamlessly. No
> people, no fisherman, no boat, no animals, no text, no letters, no logo, no
> UI, no coordinates, no grid, no glowing sphere, no neon cyan, no glossy CGI
> blob, no lens flare, no camera movement, no zoom, no cuts.

## 3. Interlude one — 16:9, placed after the work section

Save as: `public/media/interlude/depth-01.mp4`

> Extreme macro cinematography of black water seen from just above the surface,
> camera locked and completely static. Very slow drifting folds with almost no
> highlight, as if the light is far below. One faint moss-green reflection
> passes slowly through the frame and fades. Overwhelmingly dark, restrained,
> tactile, filmic grain, editorial, contemporary design-studio quality. Motion
> is slow and continuous so the clip loops seamlessly. No people, no boat, no
> animals, no text, no letters, no logo, no UI, no coordinates, no grid, no
> neon, no glossy CGI, no lens flare, no camera movement, no cuts.

## 4. Interlude two — 16:9, placed before the contact section

Save as: `public/media/interlude/depth-02.mp4`

> Extreme macro cinematography of black water at night, camera locked and
> completely static, viewed closer than the previous shot. Dense slow
> interference across the whole frame with burnt-amber light diffusing from the
> lower edge. Deep, quiet, tactile, filmic grain, restrained, editorial,
> contemporary design-studio quality. Motion is slow and continuous so the clip
> loops seamlessly. No people, no boat, no animals, no text, no letters, no
> logo, no UI, no coordinates, no grid, no neon cyan, no glossy CGI, no lens
> flare, no camera movement, no cuts.

## After download

Drop the files at the paths above, then fill the matching slot in
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

Nothing else changes. The hero already renders the loop over its WebP poster
and keeps the poster if the file cannot play; an unfilled band renders
nothing at all. The slots exist so the page never requests a file that is not
there.

Then re-encode to keep each loop under the 2.5MB budget:

```bash
ffmpeg -y -i input.mp4 -an -c:v libx264 -crf 30 -preset slow \
  -pix_fmt yuv420p -movflags +faststart output.mp4
```

Record model, date and job IDs in `ASSET-PROVENANCE.md`.

## Exclusions

Every prompt keeps the exclusion list already approved in `ASSET-PROVENANCE.md`
for the still generations: no people, boats, objects, baked-in text or UI,
coordinates, terminal decoration, cyan or purple neon, spheres, or glossy CGI.
`DESIGN.md` additionally forbids any words, logos or interface baked into
media, because all copy must stay live HTML.
