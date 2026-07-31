import { render, waitFor } from '@testing-library/react';
import { useCallback, useRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  formatStyleNumber,
  interpolateWindow,
  useScrollStage,
} from './useScrollStage';

const ScrollStageHarness = () => {
  const stageRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLParagraphElement>(null);

  const write = useCallback((progress: number) => {
    const marker = markerRef.current;

    if (!marker) {
      return;
    }

    const revealed = interpolateWindow(progress, 0.25, 0.75);

    marker.style.opacity = formatStyleNumber(revealed);
    marker.style.transform = `translateY(${formatStyleNumber(
      (1 - revealed) * 10
    )}px)`;
  }, []);

  const reset = useCallback(() => {
    markerRef.current?.style.removeProperty('opacity');
    markerRef.current?.style.removeProperty('transform');
  }, []);

  const { isReleased, prefersReducedMotion } = useScrollStage(stageRef, {
    reset,
    write,
  });

  return (
    <section
      ref={stageRef}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      data-released={isReleased ? 'true' : 'false'}
    >
      <p
        ref={markerRef}
        data-testid="marker"
        style={{ opacity: 0.4, transform: 'translateY(4px)' }}
      />
    </section>
  );
};

const createBounds = (top: number, bottom: number) => ({
  bottom,
  height: 1900,
  left: 0,
  right: 1440,
  toJSON: () => ({}),
  top,
  width: 1440,
  x: 0,
  y: top,
});

describe('useScrollStage', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        addEventListener: vi.fn(),
        matches: false,
        removeEventListener: vi.fn(),
      })
    );
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) =>
        window.setTimeout(() => callback(performance.now()), 0)
      )
    );
    vi.stubGlobal(
      'cancelAnimationFrame',
      vi.fn((handle: number) => {
        window.clearTimeout(handle);
      })
    );
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 900,
    });
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(
      1900
    );
  });

  it('writes progress to the stage target without touching the stage element', async () => {
    const bounds = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue(createBounds(-250, 1650));
    const { container, getByTestId } = render(<ScrollStageHarness />);
    const stage = container.querySelector('section');
    const marker = getByTestId('marker');

    // -250 / (1900 - 900) = 0.25 progress, the start of the reveal window.
    await waitFor(() => {
      expect(marker).toHaveStyle({
        opacity: '0',
        transform: 'translateY(10px)',
      });
    });
    expect(stage).not.toHaveAttribute('style');
    expect(stage).toHaveAttribute('data-released', 'false');

    bounds.mockReturnValue(createBounds(-500, 1400));
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(marker).toHaveStyle({
        opacity: '0.5',
        transform: 'translateY(5px)',
      });
    });

    bounds.mockReturnValue(createBounds(-750, 1150));
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(marker).toHaveStyle({
        opacity: '1',
        transform: 'translateY(0px)',
      });
    });
  });

  it('reports release once the stage bottom reaches the viewport', async () => {
    const bounds = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue(createBounds(-250, 1650));
    const { container } = render(<ScrollStageHarness />);

    await waitFor(() => {
      expect(container.querySelector('section')).toHaveAttribute(
        'data-released',
        'false'
      );
    });

    bounds.mockReturnValue(createBounds(-1000, 900));
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(container.querySelector('section')).toHaveAttribute(
        'data-released',
        'true'
      );
    });
  });

  it('does not schedule progress frames in reduced-motion mode', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        addEventListener: vi.fn(),
        matches: true,
        removeEventListener: vi.fn(),
      })
    );
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      createBounds(0, 900)
    );
    const { container, getByTestId } = render(<ScrollStageHarness />);

    await waitFor(() => {
      expect(container.querySelector('section')).toHaveAttribute(
        'data-reduced-motion',
        'true'
      );
      expect(getByTestId('marker').style.opacity).toBe('');
      expect(getByTestId('marker').style.transform).toBe('');
    });

    window.dispatchEvent(new Event('scroll'));

    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });
});
