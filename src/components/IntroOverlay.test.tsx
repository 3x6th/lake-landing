import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { IntroOverlay } from './IntroOverlay';

const mockMotionPreference = (matches: boolean) => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      addEventListener: vi.fn(),
      matches,
      removeEventListener: vi.fn(),
    })
  );
};

describe('IntroOverlay', () => {
  beforeEach(() => {
    mockMotionPreference(false);
    window.sessionStorage.clear();
    document.documentElement.className = '';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('types the wordmark, then lifts and leaves the document alone', async () => {
    vi.useFakeTimers();
    const { container } = render(<IntroOverlay />);

    expect(container.querySelector('.intro-overlay')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('is-intro-open');

    // Each phase schedules the next only after React has re-rendered, so the
    // clock is advanced in slices rather than one jump.
    for (let tick = 0; tick < 80; tick += 1) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(100);
      });
    }

    expect(container.querySelector('.intro-overlay')).not.toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('is-intro-open');
    expect(window.sessionStorage.getItem('ozero.intro-played')).toBe('true');
  });

  it('renders nothing when the visitor prefers reduced motion', () => {
    mockMotionPreference(true);

    const { container } = render(<IntroOverlay />);

    expect(container.querySelector('.intro-overlay')).not.toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('is-intro-open');
  });

  it('can be skipped with a key press', async () => {
    vi.useFakeTimers();
    const { container } = render(<IntroOverlay />);

    expect(container.querySelector('.intro-overlay')).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(
      container.querySelector('.intro-overlay--lifting')
    ).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(container.querySelector('.intro-overlay')).not.toBeInTheDocument();
  });

  it('does not play a second time in the same session', () => {
    window.sessionStorage.setItem('ozero.intro-played', 'true');

    const { container } = render(<IntroOverlay />);

    expect(container.querySelector('.intro-overlay')).not.toBeInTheDocument();
  });

  it('is hidden from assistive technology while it plays', () => {
    vi.useFakeTimers();
    const { container } = render(<IntroOverlay />);

    expect(container.querySelector('.intro-overlay')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });
});
