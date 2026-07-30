import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AsciiFisherman } from './AsciiFisherman';

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
});
