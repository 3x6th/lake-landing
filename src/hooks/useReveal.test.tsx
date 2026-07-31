import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Language } from '../siteContent';
import { useReveal } from './useReveal';

const RevealHarness = ({ language = 'en' }: { language?: Language }) => {
  useReveal(language);

  return (
    <div>
      <p data-reveal data-testid="first" />
      <p data-reveal data-testid="second" />
    </div>
  );
};

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

/**
 * jsdom reports a zero rect for every element, which reads as off-screen. This
 * puts the harness's targets either inside or below the viewport.
 */
const stubOnScreen = (onScreen: boolean) => {
  vi.spyOn(
    HTMLElement.prototype,
    'getBoundingClientRect'
  ).mockReturnValue({
    bottom: onScreen ? 200 : 3000,
    height: 100,
    left: 0,
    right: 100,
    toJSON: () => ({}),
    top: onScreen ? 100 : 2900,
    width: 100,
    x: 0,
    y: onScreen ? 100 : 2900,
  });
};

describe('useReveal', () => {
  beforeEach(() => {
    mockMotionPreference(false);
    window.innerWidth = 1440;
    window.innerHeight = 900;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reveals a target when it intersects, then stops observing it', () => {
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    let notify: ((entries: unknown[]) => void) | undefined;

    vi.stubGlobal(
      'IntersectionObserver',
      class {
        disconnect = disconnect;
        observe = observe;
        unobserve = unobserve;

        constructor(callback: (entries: unknown[]) => void) {
          notify = callback;
        }
      }
    );

    const { getByTestId } = render(<RevealHarness />);
    const first = getByTestId('first');

    expect(observe).toHaveBeenCalledTimes(2);
    expect(first).not.toHaveClass('is-revealed');

    notify?.([
      { isIntersecting: true, target: first },
      { isIntersecting: false, target: getByTestId('second') },
    ]);

    expect(first).toHaveClass('is-revealed');
    expect(getByTestId('second')).not.toHaveClass('is-revealed');
    expect(unobserve).toHaveBeenCalledWith(first);
    expect(unobserve).toHaveBeenCalledTimes(1);
  });

  it('reveals everything if observer callbacks never arrive', () => {
    vi.useFakeTimers();
    const disconnect = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        disconnect = disconnect;
        observe = vi.fn();
        unobserve = vi.fn();
      }
    );

    const { getByTestId } = render(<RevealHarness />);

    expect(getByTestId('first')).not.toHaveClass('is-revealed');

    vi.advanceTimersByTime(2000);

    expect(getByTestId('first')).toHaveClass('is-revealed');
    expect(getByTestId('second')).toHaveClass('is-revealed');
    expect(disconnect).toHaveBeenCalled();

    vi.useRealTimers();
  });

  /*
   * The pair below is the whole contract: a locale switch must not re-animate
   * what the visitor is already reading, and fixing that must not flatten the
   * first-mount entrance into "everything visible is instantly on".
   */
  it('reveals on-screen targets synchronously when the locale changes', () => {
    const observe = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        disconnect = vi.fn();
        observe = observe;
        unobserve = vi.fn();
      }
    );
    stubOnScreen(true);

    const { getByTestId, rerender } = render(<RevealHarness language="en" />);

    expect(getByTestId('first')).not.toHaveClass('is-revealed');

    rerender(<RevealHarness language="ru" />);

    expect(getByTestId('first')).toHaveClass('is-revealed');
    expect(getByTestId('second')).toHaveClass('is-revealed');
  });

  it('still stages the entrance on first mount, even when on screen', () => {
    const observe = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        disconnect = vi.fn();
        observe = observe;
        unobserve = vi.fn();
      }
    );
    stubOnScreen(true);

    const { getByTestId } = render(<RevealHarness language="en" />);

    expect(getByTestId('first')).not.toHaveClass('is-revealed');
    expect(getByTestId('second')).not.toHaveClass('is-revealed');
    expect(observe).toHaveBeenCalledTimes(2);
  });

  it('leaves off-screen targets to the observer on a locale change', () => {
    const observe = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        disconnect = vi.fn();
        observe = observe;
        unobserve = vi.fn();
      }
    );
    stubOnScreen(false);

    const { getByTestId, rerender } = render(<RevealHarness language="en" />);
    rerender(<RevealHarness language="ru" />);

    expect(getByTestId('first')).not.toHaveClass('is-revealed');
    expect(getByTestId('second')).not.toHaveClass('is-revealed');
  });

  it('reveals everything without observing when motion is reduced', () => {
    mockMotionPreference(true);
    const construct = vi.fn();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        disconnect = vi.fn();
        observe = vi.fn();
        unobserve = vi.fn();

        constructor() {
          construct();
        }
      }
    );

    const { getByTestId } = render(<RevealHarness />);

    expect(getByTestId('first')).toHaveClass('is-revealed');
    expect(getByTestId('second')).toHaveClass('is-revealed');
    expect(construct).not.toHaveBeenCalled();
  });
});
