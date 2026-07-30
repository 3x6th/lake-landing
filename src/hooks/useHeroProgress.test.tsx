import { render, waitFor } from '@testing-library/react';
import { useRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useHeroProgress } from './useHeroProgress';

const HeroProgressHarness = () => {
  const heroRef = useRef<HTMLElement>(null);
  const engravingRef = useRef<HTMLImageElement>(null);
  const asciiRef = useRef<SVGSVGElement>(null);
  const brandLineRef = useRef<HTMLParagraphElement>(null);
  const { isReleased, prefersReducedMotion } = useHeroProgress(
    heroRef,
    {
      asciiRef,
      brandLineRef,
      engravingRef,
    }
  );

  return (
    <section
      ref={heroRef}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      data-released={isReleased ? 'true' : 'false'}
    >
      <img
        ref={engravingRef}
        data-testid="engraving"
        alt=""
        style={{ opacity: 0.4 }}
      />
      <svg
        ref={asciiRef}
        data-testid="ascii"
        style={{ opacity: 0.4 }}
      />
      <p
        ref={brandLineRef}
        data-testid="brand-line"
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

describe('useHeroProgress', () => {
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

  it('writes exact progress windows directly to compositor targets', async () => {
    const bounds = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockReturnValue(createBounds(-550, 1350));
    const { container, getByTestId } = render(<HeroProgressHarness />);
    const hero = container.querySelector('section');
    const engraving = getByTestId('engraving');
    const ascii = getByTestId('ascii');
    const brandLine = getByTestId('brand-line');

    await waitFor(() => {
      expect(engraving).toHaveStyle({ opacity: '0.64' });
      expect(ascii).toHaveStyle({ opacity: '0' });
      expect(brandLine).toHaveStyle({
        opacity: '0',
        transform: 'translateY(8px)',
      });
    });
    expect(hero).not.toHaveAttribute('style');
    expect(hero).toHaveAttribute('data-released', 'false');

    bounds.mockReturnValue(createBounds(-760, 1140));
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(engraving).toHaveStyle({ opacity: '0.32' });
      expect(ascii).toHaveStyle({ opacity: '0.38' });
    });

    bounds.mockReturnValue(createBounds(-900, 1000));
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(engraving).toHaveStyle({ opacity: '0' });
      expect(ascii).toHaveStyle({ opacity: '0.76' });
      expect(brandLine).toHaveStyle({
        opacity: '0.2',
        transform: 'translateY(6.4px)',
      });
    });

    bounds.mockReturnValue(createBounds(-1000, 900));
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      expect(hero).toHaveAttribute('data-released', 'true');
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
    const { container, getByTestId } = render(<HeroProgressHarness />);

    await waitFor(() => {
      expect(container.querySelector('section')).toHaveAttribute(
        'data-reduced-motion',
        'true'
      );
      expect(getByTestId('engraving').style.opacity).toBe('');
      expect(getByTestId('ascii').style.opacity).toBe('');
      expect(getByTestId('brand-line').style.opacity).toBe('');
      expect(getByTestId('brand-line').style.transform).toBe('');
    });

    window.dispatchEvent(new Event('scroll'));

    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });
});
