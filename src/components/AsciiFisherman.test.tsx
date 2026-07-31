import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AsciiFisherman } from './AsciiFisherman';

/* 1536 x 1024. The engraving is authored already framed — its ink reaches
   96.6% of the width — so CROP_RATIO is 1 and the visible aspect is the
   asset's own. A crop of 0.87 once cut the rod tip and the fishing line off
   invisibly, because both layers cropped alike and stayed registered. */
const EXPECTED_VISIBLE_ASPECT_RATIO = 1536 / 1024;

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
