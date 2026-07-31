import { clampProgress } from '../hooks/useScrollStage';

/**
 * The vertical-hold tear that runs through the signature passage.
 *
 * Every value here is a pure function of the stage's 0–1 scroll progress, which
 * is what makes the effect reversible for nothing: scrolling back up re-reads
 * the same progress and therefore recomputes the same frame. No clock, no
 * playhead, no state to rewind. That is the whole reason this is arithmetic and
 * not a video file.
 *
 * The picture is split into `TEAR_BAND_COUNT` fixed horizontal bands. The bands
 * partition the glyph field by row, so at rest their union is exactly the
 * untorn image — there is no seam to hide and nothing to reassemble. A rolling
 * line travels down through them; each band reads its own displacement and its
 * own digitisation from where that line currently is.
 */

/*
 * Fourteen bands is the coarsest comb that still reads as a tear rather than as
 * a wipe. It divides both grids without a remainder worth caring about: the
 * desktop 120x40 sample gives bands of two and three glyph rows, the mobile
 * 96x32 sample gives bands of two and three as well, and every row belongs to
 * exactly one band at both sizes.
 */
export const TEAR_BAND_COUNT = 14;

/*
 * The tear opens after the engraving has arrived and closes as the ASCII
 * completes, so it spans the handover instead of decorating either end.
 *
 * Against the crossfade windows in FishermanInterlude: the engraving is at its
 * full 0.82 from 0.22 to 0.34 and gone by 0.58; the ASCII arrives between 0.46
 * and 0.74. The tear starts at 0.24 with the engraving whole, peaks at 0.48
 * where the engraving is at 0.34 and the ASCII has barely begun, and is closed
 * again by 0.72, just before the ASCII settles. The visitor therefore sees the
 * picture tear open while it is still a picture, and the glyphs arrive first
 * inside the tear.
 */
export const TEAR_START = 0.24;
export const TEAR_END = 0.72;

/*
 * How many bands either side of the line are disturbed. 2.2 puts roughly four
 * and a half bands — a third of the frame — in the tear at any one moment, which
 * is a television artefact rather than a full-frame effect.
 */
const TEAR_REACH = 2.2;

/*
 * How abruptly a band's slip changes sign as the line passes it, in bands.
 *
 * A hard sign flip is what a real vertical hold does, and it is also a
 * single-frame jump of the full slip width, which on a slow scroll reads as a
 * dropped frame rather than as an artefact. 0.55 spreads the flip over roughly
 * one band of travel — about 3% of the stage, some thirty pixels of scrolling —
 * so it snaps without tearing the frame rate along with the picture.
 */
const TEAR_FLIP = 0.55;

/*
 * The two sides of the line are not mirrored. The trailing side slips less, so
 * the tear leans, the way a picture rolls out of sync in one direction.
 */
const TEAR_COUNTER = 0.62;

/*
 * Peak horizontal slip, as a percentage of the art's own width.
 *
 * A band never reaches all of it. The kernel is at its strongest exactly where
 * the lean is changing sign, so the product of the two tops out near 0.64 of
 * this figure, about one glyph column in eight — measured, not guessed: at 720
 * pixels of art the worst-displaced band moves roughly fifty pixels.
 */
export const TEAR_MAX_SLIP = 11;

/*
 * A fixed per-band gain. The rolling kernel is smooth, and a smooth kernel on
 * its own displaces the bands in a clean arc — a wave, not a tear. These
 * alternating strong and weak gains are what make neighbouring bands disagree,
 * which is the whole visual signature of a comb. They are constant per band, so
 * the same rows always misbehave in the same way and the effect stays
 * deterministic in progress.
 */
const BAND_SLIP_GAIN = [
  1, 0.55, 0.82, 0.4, 0.95, 0.68, 1, 0.48, 0.88, 0.6, 1, 0.42, 0.76, 0.9,
];

const tearTravel = (progress: number) =>
  clampProgress((progress - TEAR_START) / (TEAR_END - TEAR_START));

/**
 * The tear's overall strength: zero before it opens, zero after it closes, one
 * in the middle. A smoothstep run up and back down, rather than a triangle,
 * because it leaves at zero with zero slope — the frame does not merely reach a
 * clean state at each end, it settles into one.
 *
 * `sin²` draws almost the same curve to three decimal places and was the first
 * choice, but `sin(π)` is 1.2e-16 rather than zero in doubles, so the passage
 * ended on an amplitude of 1.5e-32 instead of on nothing. Nothing downstream
 * could have seen the difference. The point is that "clean at both ends" should
 * be a fact about the arithmetic and not a rounding.
 */
export const tearAmplitude = (progress: number) => {
  const travel = tearTravel(progress);
  const swell = travel < 0.5 ? travel * 2 : (1 - travel) * 2;

  return swell * swell * (3 - 2 * swell);
};

/*
 * Where the rolling line is, in band coordinates. It starts a full reach above
 * the first band and finishes a full reach below the last, so the tear enters
 * the frame from off-picture and leaves the same way rather than materialising
 * inside it.
 */
const tearLine = (progress: number) =>
  -TEAR_REACH +
  tearTravel(progress) * (TEAR_BAND_COUNT - 1 + 2 * TEAR_REACH);

const bandDistance = (progress: number, band: number) =>
  band - tearLine(progress);

/**
 * How thoroughly the line has taken this band, 0–1. It drives the digitisation:
 * the ASCII is pushed towards full presence inside the band and the engraving is
 * masked away underneath it, so the tear is where the transformation happens
 * rather than something drawn over the top of it.
 *
 * Two independent things force this to zero at both ends of the passage — the
 * amplitude envelope and the line being out of reach of every band — so a clean
 * frame does not depend on either one of them alone.
 */
export const tearBandActivity = (progress: number, band: number) => {
  const distance = bandDistance(progress, band);

  if (Math.abs(distance) >= TEAR_REACH) {
    return 0;
  }

  return (
    tearAmplitude(progress) *
    0.5 *
    (1 + Math.cos((Math.PI * distance) / TEAR_REACH))
  );
};

/**
 * How far this band slips sideways, as a percentage of the art's width.
 * Positive is to the right. Bands ahead of the line and bands behind it lean
 * opposite ways, which is what makes the line read as a line.
 */
export const tearBandSlip = (progress: number, band: number) => {
  const activity = tearBandActivity(progress, band);

  if (activity === 0) {
    return 0;
  }

  const lean = Math.tanh(bandDistance(progress, band) / TEAR_FLIP);

  return (
    activity *
    (lean < 0 ? lean * TEAR_COUNTER : lean) *
    BAND_SLIP_GAIN[band] *
    TEAR_MAX_SLIP
  );
};
