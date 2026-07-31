import { RefObject, useEffect, useRef, useState } from 'react';

/**
 * How far ahead of the viewport a deferred passage starts loading. Enough lead
 * time for a loop to be decoding before it is seen, short enough that someone
 * who never scrolls that far never pays for it.
 */
const NEAR_VIEWPORT_MARGIN = '200px 0px';

/**
 * Defers heavy, purely atmospheric media until its own passage is close.
 *
 * The element the returned ref is attached to is always rendered, so the space
 * is reserved and nothing shifts when the content arrives. Once near, it stays
 * near — the flag never goes back to false and the observer is dropped, since
 * the point is one deferred load rather than continuous visibility tracking.
 *
 * Without IntersectionObserver the content mounts immediately: deferring is an
 * optimisation, never a precondition for the page being complete.
 */
export const useNearViewport = <T extends Element>(): [
  RefObject<T | null>,
  boolean,
] => {
  const ref = useRef<T>(null);
  const [isNear, setIsNear] = useState(
    () => typeof IntersectionObserver !== 'function'
  );

  useEffect(() => {
    const element = ref.current;

    if (isNear || !element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        setIsNear(true);
        observer.disconnect();
      },
      { rootMargin: NEAR_VIEWPORT_MARGIN }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isNear]);

  return [ref, isNear];
};
