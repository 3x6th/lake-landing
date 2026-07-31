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
