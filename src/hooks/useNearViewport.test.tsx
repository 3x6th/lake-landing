import { render } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useNearViewport } from './useNearViewport';

const GateHarness = () => {
  const [ref, isNear] = useNearViewport<HTMLDivElement>();

  return (
    <div data-testid="frame" ref={ref}>
      {isNear ? <p data-testid="payload" /> : null}
    </div>
  );
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useNearViewport', () => {
  it('withholds the payload until the frame approaches, then keeps it', () => {
    const disconnect = vi.fn();
    const observe = vi.fn();
    let notify: ((entries: unknown[]) => void) | undefined;
    let options: IntersectionObserverInit | undefined;

    vi.stubGlobal(
      'IntersectionObserver',
      class {
        disconnect = disconnect;
        observe = observe;
        unobserve = vi.fn();

        constructor(
          callback: (entries: unknown[]) => void,
          init?: IntersectionObserverInit
        ) {
          notify = callback;
          options = init;
        }
      }
    );

    const { queryByTestId, getByTestId } = render(<GateHarness />);

    expect(queryByTestId('payload')).not.toBeInTheDocument();
    expect(observe).toHaveBeenCalledWith(getByTestId('frame'));
    expect(options?.rootMargin).toBe('200px 0px');

    act(() => {
      notify?.([{ isIntersecting: false }]);
    });

    expect(queryByTestId('payload')).not.toBeInTheDocument();

    act(() => {
      notify?.([{ isIntersecting: true }]);
    });

    expect(queryByTestId('payload')).toBeInTheDocument();
    expect(disconnect).toHaveBeenCalled();

    // Leaving again must not tear the payload back out.
    act(() => {
      notify?.([{ isIntersecting: false }]);
    });

    expect(queryByTestId('payload')).toBeInTheDocument();
  });

  it('mounts immediately when the browser has no observer', () => {
    vi.stubGlobal('IntersectionObserver', undefined);

    const { queryByTestId } = render(<GateHarness />);

    expect(queryByTestId('payload')).toBeInTheDocument();
  });
});
