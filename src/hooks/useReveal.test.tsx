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

describe('useReveal', () => {
  beforeEach(() => {
    mockMotionPreference(false);
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
