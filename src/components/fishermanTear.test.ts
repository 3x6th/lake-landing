import { describe, expect, it } from 'vitest';
import {
  TEAR_BAND_COUNT,
  TEAR_END,
  TEAR_START,
  tearAmplitude,
  tearBandActivity,
  tearBandSlip,
} from './fishermanTear';

const BANDS = Array.from({ length: TEAR_BAND_COUNT }, (_, band) => band);

const readFrame = (progress: number) =>
  BANDS.map((band) => [
    tearBandActivity(progress, band),
    tearBandSlip(progress, band),
  ]);

const loudestBand = (progress: number) =>
  BANDS.reduce((loudest, band) =>
    tearBandActivity(progress, band) > tearBandActivity(progress, loudest)
      ? band
      : loudest
  );

const widestSlip = (progress: number) =>
  Math.max(...BANDS.map((band) => Math.abs(tearBandSlip(progress, band))));

describe('fishermanTear', () => {
  /*
   * The clean-frame guarantee, at the arithmetic. Nothing outside the tear's
   * own window may displace, digitise or tint anything: before it opens and
   * after it closes the passage has to be the frame it was before the tear
   * existed, not a frame that merely looks like it.
   */
  it('leaves every band untouched outside its own window', () => {
    for (const progress of [0, 0.1, TEAR_START, TEAR_END, 0.9, 1]) {
      for (const band of BANDS) {
        expect(tearBandActivity(progress, band)).toBe(0);
        expect(tearBandSlip(progress, band)).toBe(0);
      }
    }
  });

  it('swells to a single peak in the middle of the passage and settles at both ends', () => {
    expect(tearAmplitude(TEAR_START)).toBe(0);
    expect(tearAmplitude(TEAR_END)).toBe(0);
    expect(tearAmplitude((TEAR_START + TEAR_END) / 2)).toBeCloseTo(1, 10);

    /* Zero slope at both ends: the tear settles into a clean frame rather than
       arriving at one. A step of a thousandth of the stage may not move the
       amplitude by more than a thousandth of itself. */
    expect(tearAmplitude(TEAR_START + 0.001)).toBeLessThan(0.001);
    expect(tearAmplitude(TEAR_END - 0.001)).toBeLessThan(0.001);
  });

  it('rolls the tear line down the frame as the passage advances', () => {
    const travelled = [0.3, 0.4, 0.5, 0.6, 0.68].map(loudestBand);

    for (let step = 1; step < travelled.length; step += 1) {
      expect(travelled[step]).toBeGreaterThan(travelled[step - 1]);
    }

    expect(travelled[0]).toBeLessThan(3);
    expect(travelled[travelled.length - 1]).toBeGreaterThan(
      TEAR_BAND_COUNT - 4
    );
  });

  it('opens widest mid-passage and closes towards both ends', () => {
    const peak = widestSlip((TEAR_START + TEAR_END) / 2);

    expect(peak).toBeGreaterThan(widestSlip(0.3));
    expect(peak).toBeGreaterThan(widestSlip(0.66));
    expect(widestSlip(0.3)).toBeGreaterThan(0);
    expect(widestSlip(0.66)).toBeGreaterThan(0);
  });

  it('leans opposite ways either side of the line', () => {
    const progress = 0.48;
    const line = loudestBand(progress);
    const above = tearBandSlip(progress, line);
    const below = tearBandSlip(progress, line + 1);

    expect(Math.sign(above)).toBe(-Math.sign(below));
    expect(above).not.toBe(0);
    expect(below).not.toBe(0);
  });

  /*
   * Reversibility, which is the reason this is arithmetic rather than a clip.
   * The same scroll positions read on the way down and on the way back up have
   * to produce the same frame, not a similar one — there is no state to unwind
   * because there is no state.
   */
  it('reads the same frame going up as going down', () => {
    const stops = [0.24, 0.31, 0.38, 0.45, 0.52, 0.59, 0.66, 0.72];
    const down = stops.map(readFrame);
    const up = [...stops].reverse().map(readFrame).reverse();

    expect(up).toEqual(down);
  });
});
