import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AsciiFisherman } from './AsciiFisherman';

/* 1536 x 1024. The engraving is authored already framed — its ink reaches
   96.6% of the width — so CROP_RATIO is 1 and the visible aspect is the
   asset's own. A crop of 0.87 once cut the rod tip and the fishing line off
   invisibly, because both layers cropped alike and stayed registered. */
const EXPECTED_VISIBLE_ASPECT_RATIO = 1536 / 1024;

/*
 * jsdom has no 2D context, so `sampleImage` would bail before reading a pixel
 * and every test would end at `data-ascii-status="failed"` no matter what the
 * loader did. This stands one in, lit in exactly one AREA_SAMPLE_SIZE block —
 * the top-left 2x2 — so a passing sample produces exactly one glyph and the
 * assertion can count glyphs instead of pixels.
 */
const stubSampledCanvas = () =>
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    drawImage: () => {},
    getImageData: (_x: number, _y: number, width: number, height: number) => {
      const data = new Uint8ClampedArray(width * height * 4);

      for (const [x, y] of [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
      ]) {
        data.fill(255, (y * width + x) * 4, (y * width + x) * 4 + 4);
      }

      return { data };
    },
    imageSmoothingEnabled: false,
    imageSmoothingQuality: 'low',
  } as unknown as CanvasRenderingContext2D);

describe('AsciiFisherman', () => {
  it('fails silently when the decorative source cannot be decoded', async () => {
    class FailingImage {
      decoding = 'async';
      onerror: (() => void) | null = null;
      onload: (() => void) | null = null;
      src = '';

      decode() {
        return Promise.reject(new Error('decode failed'));
      }
    }

    vi.stubGlobal('Image', FailingImage);

    const { container } = render(
      <AsciiFisherman source="/missing-fisherman.png" />
    );

    await waitFor(() => {
      expect(container.querySelector('svg')).toHaveAttribute(
        'data-ascii-status',
        'failed'
      );
    });
  });

  /*
   * The WebKit defect, as a pair.
   *
   * `load` says the bytes arrived; it does not say there is a bitmap. WebKit
   * draws nothing for an image that has loaded but not decoded, so sampling on
   * `load` returned an all-zero buffer, no cell cleared TRANSPARENT_LUMINANCE,
   * and the component published an empty `<svg data-ascii-status="ready">` —
   * the failure that looks most like success. On an iPhone the signature was
   * absent in both Safari and Chrome for iOS, because both are WebKit.
   */
  it('will not sample an image that has loaded but not decoded', async () => {
    class LoadedUndecodedImage {
      complete = true;
      naturalHeight = 1024;
      naturalWidth = 1536;
      onerror: (() => void) | null = null;
      onload: (() => void) | null = null;

      set src(_value: string) {
        queueMicrotask(() => this.onload?.());
      }

      decode() {
        return new Promise<void>(() => {});
      }
    }

    vi.stubGlobal('Image', LoadedUndecodedImage);
    stubSampledCanvas();

    const { container } = render(
      <AsciiFisherman source="/undecoded-fisherman.png" />
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 20);
    });

    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('data-ascii-status', 'loading');
    expect(svg?.querySelectorAll('text')).toHaveLength(0);
  });

  it('samples once the bitmap is decoded', async () => {
    class DecodableImage {
      complete = true;
      naturalHeight = 1024;
      naturalWidth = 1536;
      onerror: (() => void) | null = null;
      onload: (() => void) | null = null;

      set src(_value: string) {
        queueMicrotask(() => this.onload?.());
      }

      decode() {
        return new Promise<void>((resolve) => {
          setTimeout(resolve, 0);
        });
      }
    }

    vi.stubGlobal('Image', DecodableImage);
    stubSampledCanvas();

    const { container } = render(
      <AsciiFisherman source="/decodable-fisherman.png" />
    );

    await waitFor(() => {
      expect(container.querySelector('svg')).toHaveAttribute(
        'data-ascii-status',
        'ready'
      );
    });

    expect(container.querySelectorAll('text')).toHaveLength(1);
  });

  /*
   * The tear slices this component and relies on the slices adding back up to
   * the picture. The stub lights exactly one cell, at row 0, so the whole
   * partition can be counted: the first slice must own that glyph, no other
   * slice may draw it, and the geometry must not move when a slice is asked
   * for — the viewBox is the frame's, not the slice's.
   */
  it('draws each glyph in exactly one slice, without moving it', async () => {
    class DecodableImage {
      complete = true;
      naturalHeight = 1024;
      naturalWidth = 1536;
      onerror: (() => void) | null = null;
      onload: (() => void) | null = null;

      set src(_value: string) {
        queueMicrotask(() => this.onload?.());
      }

      decode() {
        return Promise.resolve();
      }
    }

    vi.stubGlobal('Image', DecodableImage);
    stubSampledCanvas();

    const bands = 14;
    const drawn: number[] = [];
    let wholeViewBox = '';

    for (let band = 0; band < bands; band += 1) {
      const { container, unmount } = render(
        <AsciiFisherman source="/sliced-fisherman.png" rowBand={[band, bands]} />
      );

      await waitFor(() => {
        expect(container.querySelector('svg')).toHaveAttribute(
          'data-ascii-status',
          'ready'
        );
      });

      drawn.push(container.querySelectorAll('text').length);
      wholeViewBox =
        container.querySelector('svg')?.getAttribute('viewBox') ?? '';
      unmount();
    }

    expect(drawn.reduce((total, count) => total + count, 0)).toBe(1);
    expect(drawn[0]).toBe(1);

    const { container } = render(
      <AsciiFisherman source="/sliced-fisherman.png" />
    );

    await waitFor(() => {
      expect(container.querySelectorAll('text')).toHaveLength(1);
    });
    expect(container.querySelector('svg')).toHaveAttribute(
      'viewBox',
      wholeViewBox
    );
  });

  /* The stylesheet half of this contract — `.fisherman-art__viewport`'s
     aspect-ratio and `.fisherman-art__source`'s width — cannot be asserted
     here: vitest resolves `App.css?raw` to an empty string. It is held by the
     comments on CROP_RATIO instead. */
  it('reserves the whole engraving, at its own aspect', () => {
    class PendingImage {
      decoding = 'async';
      onerror: (() => void) | null = null;
      onload: (() => void) | null = null;
      src = '';

      decode() {
        return new Promise<void>(() => {});
      }
    }

    vi.stubGlobal('Image', PendingImage);

    const { container } = render(
      <AsciiFisherman source="/pending-fisherman.png" />
    );
    const viewBox = container
      .querySelector('svg')
      ?.getAttribute('viewBox')
      ?.split(' ')
      .map(Number);

    expect(viewBox).toHaveLength(4);

    const [, , width, height] = viewBox as number[];

    /* The placeholder box has to be the box the sample will produce, or the
       ASCII jumps when the pixels land. */
    expect(width / height).toBeCloseTo(EXPECTED_VISIBLE_ASPECT_RATIO, 5);
  });
});
