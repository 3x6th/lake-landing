# Generated asset provenance

## Source

- Original repository asset: `public/fishman.png`
- Higgsfield media ID: `a01757b8-93d4-40d3-9653-b87e2499a953`
- Source treatment: identity/composition reference only; generated output retains
  the engraved fisherman, boat, rod, and monochrome linework.

## Higgsfield concept study

Model: `nano_banana_2`
Format: 16:9, 2K
Date: 2026-07-30

Generation jobs:

- `7f6bc93f-21a3-4013-b696-d4a0e9451deb`
- `0b95c5d7-2c80-476d-be08-ba7ef5ad235c`
- `35f070f7-aa67-4ed2-aee1-9c635a0fc436`

Prompt:

> Create THREE distinct high-end website hero concept stills as a cohesive
> visual study. Use the supplied fisherman engraving as the source subject and
> preserve the recognizable bearded fisherman, wooden boat, fishing rod, and
> etched monochrome linework. Each concept is 16:9 and must reserve clean
> negative-space BLACK WATER on the LEFT for live HTML copy, with the subject on
> the RIGHT. Direction 1: intimate right-side engraving, quiet low ripples.
> Direction 2: more monumental lower-right silhouette with wide upper-left
> darkness. Direction 3: smaller distant boat in lower-right with a single
> luminous wake. Shared art direction: premium nocturnal cinematic lake,
> near-black water, physically plausible subtle movement implied, sparse
> submerged iridescent light shifting only between moss/lake green and warm
> amber, crisp paper-white engraved subject, silver film grain, editorial
> technology studio, quiet authority, locked camera composition. No words, no
> letters, no UI, no logos, no coordinates, no terminal overlay, no cyan/blue
> cyberpunk, no glossy 3D blob, no extra people, no fantasy scenery.

Raw result URLs are recoverable from the job IDs above. They are intentionally
not committed because the three contact sheets total more than 20 MB.

## Rejected concept exports

The first concept study was rejected after visual review: it amplified the
fisherman into a literal vintage fishing illustration and did not meet the
required serious engineering-studio tone. Its four temporary WebP exports must
not be used in the product.

The correction is to make black water and an abstract signal the primary visual
system. The original `public/fishman.png`, if used at all, stays a small separate
line-art/ASCII layer rather than being regenerated as the hero subject.

## Corrected concept study

Model: `nano_banana_2`
Format: 16:9, 2K
Date: 2026-07-30

Generation jobs:

- `bde081df-445f-450c-91c5-e91565890d3c` — macro black-water field
- `4d8f2d51-8b70-4e81-9634-01406ad8ac4f` — abstract liquid signal field

Macro-water prompt:

> Premium website hero background for a serious European B2B software
> engineering studio, 16:9. Extreme macro cinematography of a black lake
> surface at night, camera almost touching the water, no visible shoreline or
> sky. Black-on-black liquid folds and subtle physically plausible
> interference; only sparse submerged moss-green and burnt-amber iridescence,
> mostly in the lower-right and center-right. The left 45 percent stays deep,
> quiet near-black negative space for live HTML typography. Sophisticated,
> architectural, restrained, tactile, editorial, contemporary design-studio
> quality, filmic grain, real optical caustics, no fantasy. Absolutely no
> people, fisherman, boat, animals, text, letters, logo, UI, coordinates, grid,
> glowing sphere, neon cyan, glossy CGI blob, product render, lens flare,
> stock-photo look.

Rejected signal-field prompt:

> Premium abstract website hero background for a serious European B2B software
> engineering studio, 16:9. A nocturnal liquid signal field inspired by water
> but not a literal landscape: ultra-thin engraved wave filaments emerge from
> near-blackness, transition into a sparse analog interference pattern, then
> disappear again. Composition feels precise and engineered, not sci-fi:
> paper-white micro-lines with very restrained lake-green and warm amber
> spectral edges, energy concentrated in the lower-right third, broad quiet
> black field on the left for live HTML copy. Flat editorial depth mixed with
> subtle physical texture, sophisticated European motion-design still, calm
> authority. Absolutely no people, fisherman, boat, objects, text, letters,
> logo, UI, terminal, coordinates, circuit board, neon cyan, purple, 3D sphere,
> glossy blob, stock illustration.

Both prompts explicitly exclude people, boats, objects, baked-in UI, terminal
decoration, coordinates, cyan/purple neon, spheres, and glossy CGI. The final
production export is selected only after visual review.

The macro-water result was selected as the primary visual because it reads as a
material atmosphere rather than an illustration or software template. The
signal-field result was rejected as generic contour-line imagery and has no
production export. The ASCII transition is generated in the browser from the
original fisherman pixels.

## Water, regenerated 2026-07-31

The earlier water is superseded. It was dark, empty on the left and put its
material in one corner, which the LOD-9 review traced to the brief rather than
to the model — see `docs/ai/MEDIA-BRIEF.md` for the corrected direction.

Generated through the Higgsfield **web connector**, not the CLI. The CLI
rejects both video and image models on this account with
`{"error_type":"free_trial_model_requires_plan","plan_type":"plus"}`, verified
against `kling3_0`, `kling3_0_turbo`, `wan2_7` and `nano_banana_2`.

Supplied by the user:

| File | Delivered as | Notes |
| --- | --- | --- |
| hero still, 16:9 | PNG 1376×768 | start frame for the hero clip |
| hero still, 9:16 | PNG 1536×2752 | native portrait, not a crop |
| hero clip | MP4 1924×1076, 8.04s, 24fps, 15.5MB | second take; loops natively |
| interlude one | MP4 1928×1076, 8.04s, 13.8MB | cooler, green |
| interlude two | MP4 1928×1076, 8.04s, 18.0MB | warmer, amber |

The first hero clip did not loop — first-versus-last-frame PSNR 21.9 — and was
replaced with a take that does, scoring 36.5. That replacement matters for more
than the seam; see the encoding note below.

**Job IDs are not recorded.** They were not captured at generation time and the
CLI cannot list connector jobs on this account. Anyone re-deriving these assets
should retrieve them from the Higgsfield web history and fill this table in.

### Processing

Posters were cut from **frame 0 of the supplied clip**, not from the supplied
PNG. The clip frame is larger (1924×1076 against 1376×768) and is by definition
the frame the video starts on, so the poster-to-video handoff is invisible.

```bash
# poster masters
ffmpeg -i hero-water-desktop.mp4 -vf "select=eq(n\,0)" -vframes 1 master.png
ffmpeg -i master.png -vf "crop=1912:1076:6:0"    desktop.png   # 16:9
ffmpeg -i master.png -vf "crop=1434:1076:245:0"  4x3.png       # 4:3, centred
ffmpeg -i master.png -vf "crop=605:1076:598:0"   mobile.png    # 9:16, on the bloom
cwebp -q 86 <each> -o <each>.webp
```

Dark smooth gradients are the worst case for h264: it discards the film grain
and replaces it with blocking. Two things fix that, and only one of them is an
encoder setting.

**A clip that loops natively is worth more than any encoder flag.** A clip that
does not loop has to be rebuilt as a ping-pong — played forward, then reversed
with the duplicated boundary frame trimmed — which makes the seam exact by
construction but doubles the running time, halving the bitrate available at any
given file size. The hero was first shipped that way at CRF 32 and came out
visibly grainy: SSIM 0.861 against source at 2267KB. The replacement clip loops
on its own, so at almost the same size it scores **0.984**. Same bytes, nine
CRF steps of quality, entirely because the material did not have to be played
twice.

Encoder settings, for dark water specifically:

```bash
-c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p \
-x264-params "aq-mode=3:aq-strength=1.1:psy-rd=1.0,0.15" \
-movflags +faststart
```

`aq-mode=3` biases bitrate toward dark regions, which is where every artefact
in this footage lives.

### Final takes

Every clip was regenerated to loop on its own, using the same picture in both
`start_image` and `end_image` so the last frame is forced back to the first.
Seams before and after:

| Clip | First take | Final take |
| --- | --- | --- |
| hero, landscape | 21.9 | 36.5 |
| hero, portrait | — | 36.1 |
| interlude one | 23.4 | 36.2 |
| interlude two | 20.3 | 43.3 |

No clip needs a ping-pong any more, so each runs its native 8s and spends its
whole bitrate on one pass of the material. The interludes show the effect most
plainly: `depth-01` fell from 2408KB to **1028KB** while its fidelity rose to
SSIM 0.989, because it no longer has to encode the same eight seconds twice.

Shipped, all straight through with no seam repair:

| File | Width | CRF | Size | SSIM |
| --- | --- | --- | --- | --- |
| `hero-water-desktop.mp4` | 1600 | 23 | 2386KB | 0.984 |
| `hero-water-mobile.mp4` | 900 | 23 | 1520KB | 0.989 |
| `depth-01.mp4` | 1280 | 24 | 1029KB | 0.989 |
| `depth-02.mp4` | 1280 | 24 | 992KB | 0.986 |

Total media payload 6.0MB, against 74MB of supplied source.

The raw `-loop.mp4` deliveries are working files and are not committed. They
remain retrievable from the Higgsfield web history.

## Production exports

- `public/media/hero/hero-water-desktop.webp` — 2752×1536 primary 16:9 poster
- `public/media/hero/hero-water-4x3.webp` — 2048×1536 authored 4:3 crop
- `public/media/hero/hero-water-mobile.webp` — 864×1536 portrait crop

### Portrait crop, re-cut 2026-07-31

The original authored 9:16 export was near-black across its upper two thirds,
with a trace of water only in the lower-right corner. It could not carry the
mobile hero at any scrim setting.

It was re-cut from the existing 2752×1536 master rather than regenerated, so
no new model call was involved and provenance is unchanged:

```bash
dwebp hero-water-desktop.webp -o master.png
ffmpeg -i master.png -vf "crop=864:1536:1250:0" mobile-crop.png
cwebp -q 86 mobile-crop.png -o hero-water-mobile.webp
```

The x offset of 1250 centres the crop on the region holding the ripple line
and the moss-green caustics, giving a quiet upper third for copy and optical
energy in the lower third.

Exports use WebP quality 86. The rejected fisherman-heavy WebPs, signal-field
exports, and raw PNG
working files were removed after visual verification; the documented
Higgsfield job IDs remain the recoverable source.

## Video preflight

At generation time the connected Higgsfield workspace reported a Plus plan,
four available credits, and no unlimited-generation allowance. The least
expensive valid 3-second 16:9 video preflight was 4.5 credits, so no video job
was submitted. This avoided a failed or paid-overage render. The hero component
keeps media behind a replaceable layer so a future loop can be added without
changing the content or accessibility structure.

## Social preview card, 2026-07-31

`public/media/social/og-cover.jpg` — 1200×630, 89KB.

Composed from assets already in the repository, not generated. A link preview
should look like the page it links to, and a new model call would have added a
fourth asset to keep in step with the water for no gain.

- Background: `public/media/hero/hero-water-desktop.webp`, the shipped hero
  poster, `object-position: 62% 50%` so the card keeps the moss-green and amber
  caustics that the hero leads with.
- Scrim: the same two-axis wash as `.hero-water__scrim` — protect the type on
  the left, leave the water its optical energy on the right.
- Type: real Onest 300 and JetBrains Mono 500, the site's own faces, inlined as
  base64 into a throwaway card so the render could not fall back to Arial.

Rendered through the DevTools Protocol at 1200×630 with `deviceScaleFactor: 2`,
then downsampled to 1200×630 so the wordmark stays crisp, and encoded at JPEG
quality 88. `document.fonts.status` was asserted `loaded` and the water image
asserted decoded before the capture, because a card that silently renders in a
fallback face is worse than no card.

The card carries two claims and both are authorized: "Java-first team
extension" is `PRODUCT.md` § Positioning, and "one engineer or a small squad ·
realistic start in 1–3 weeks" is `CONTENT-BRIEF.md` § Approved public proof.
The word "realistic" is baked in deliberately — the claim is not authorized
without it.

It replaces `fishman.png` as `og:image`, which was 1536×1024, so every social
scraper cropped it to an unintended composition, and 1.03MB fetched on every
share.

## Taska case captures, replaced 2026-07-31

Owner-supplied product screenshots, not generated. Preserved untracked in
`private-assets/taska-source-v2/` alongside the superseded first pair in
`private-assets/taska-source/`, which is kept rather than deleted so the
decision stays reversible.

| Published file | Source | Native |
| --- | --- | --- |
| `public/media/cases/taska-board.webp` | `taska-source-v2/img_4-board.png` | 999×702, ratio 1.42 |
| `public/media/cases/taska-projects.webp` | `taska-source-v2/img_3-projects.png` | 713×450, ratio 1.58 |

Encoded with `cwebp -q 86`, the same setting as the hero posters. **No crop.**
Unlike the first pair, neither capture carries empty background, so the
published frame is the whole capture at its native ratio — which is what
CONTENT-BRIEF asks for and what the first pair could not deliver.

### Why the first pair was replaced

Measured from the sources, background detected as the modal grey value rather
than assumed black:

```
img_2.png (board)     989×898  ink ends row 617  31.2% empty  ratio 1.60
img_1.png (projects) 1234×768  ink ends row 300  60.8% empty  ratio 4.10
```

The projects capture was three fifths empty. Publishing it whole wasted most of
the frame; cropping the emptiness left a 4.10 strip that, in the 0.75fr column
of an asymmetric spread, rendered a 1234px-wide interface at 0.34 scale. Both
were tried and rejected. The geometry admitted no third answer, because a 1.60
and a 4.10 asset cannot share a row and be simultaneously comparable in height,
legible, and complete.

The replacement pair removes the constraint rather than working around it.

### A handling note worth keeping

The owner delivered these by dropping them into `public/media/cases/`. Vite
copies the whole of `public/` into `dist/` regardless of whether anything
references a file, so all five arrived one build away from being served at
`https://ozero.dev/media/cases/…`, uncurated. One of them had already reached a
local `dist/`. They were moved out before any build was published.

This is the same trap recorded in CONTENT-BRIEF about `img.png`: **anything
that must not be served cannot live in `public/`, and being unreferenced is not
protection.** Incoming source material belongs in `private-assets/`.

## depth-02 regenerated, 2026-07-31

The shipped `depth-02.mp4` froze. Measured as the mean absolute difference
against the previous frame, motion collapsed from 1.03 to 0.245 in a single
frame at about t=6.79s and then decayed to 0.001, so the last ~1.25s of an 8s
clip were a still image. On a looping band that reads as the page hanging.

Nothing in the four SSIM and PSNR numbers already recorded here would have
caught it: those measure encode fidelity and the loop seam, both of which were
fine. A clip can be a faithful encode with a perfect seam and still stop
moving. The owner caught it by watching the page.

Replaced with a fresh generation from the Higgsfield web connector rather than
repaired. Repair would have meant cutting the dead tail and hunting for a new
loop point, which trades a frozen second for a visible jump every 8 seconds.

```bash
ffmpeg -i depth-02-loop-fix.mp4 -vf "scale=1280:-2,format=yuv420p" \
  -c:v libx264 -crf 24 -preset slow \
  -x264-params "aq-mode=3:aq-strength=1.1:psy-rd=1.0,0.15" \
  -an -movflags +faststart depth-02.mp4
```

| | before | after |
| --- | --- | --- |
| size | 992KB | 1153KB |
| duration | 8.04s | 8.04s |
| resolution | 1280x714 | 1280x714 |
| **min frame delta** | **0.001** | **0.233** |
| max frame delta | — | 2.393 |
| loop seam PSNR | 43.3 | 40.39 |

161KB heavier and 2.9dB down on the seam, both accepted: the clip now moves for
its whole length, and 40dB is still well clear of a visible cut. The band is
proximity-gated so this is not first-load weight.

**Add a motion floor to the checks for any future clip.** Encode fidelity and
seam quality say nothing about whether the picture is still alive:

```bash
ffmpeg -i clip.mp4 -vf "tblend=all_mode=difference,signalstats,\
metadata=print:key=lavfi.signalstats.YAVG:file=-" -f null -
```
