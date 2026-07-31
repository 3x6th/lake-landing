import { useEffect } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const REVEAL_SELECTOR = '[data-reveal]';
const REVEALED_CLASS = 'is-revealed';

/**
 * Hidden targets must never be able to stay hidden. If observer callbacks are
 * throttled or never delivered — a backgrounded tab does exactly this — every
 * remaining target is revealed once this elapses.
 */
const FAILSAFE_DELAY = 2000;

/**
 * Reveals section structure once, as it enters the viewport.
 *
 * One observer for the whole document rather than a hook per component, and
 * each element is unobserved as soon as it fires, so nothing keeps running
 * behind the visitor. Reveals the structure only — headings, rows, steps —
 * never body copy, which DESIGN.md forbids animating.
 *
 * Under `prefers-reduced-motion` no observer is created at all; the elements
 * are marked revealed immediately and CSS drops the transition.
 */
export const useReveal = () => {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll(REVEAL_SELECTOR)
    );

    if (targets.length === 0) {
      return undefined;
    }

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia(REDUCED_MOTION_QUERY).matches;

    if (
      prefersReducedMotion ||
      typeof IntersectionObserver !== 'function'
    ) {
      targets.forEach((target) => {
        target.classList.add(REVEALED_CLASS);
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(REVEALED_CLASS);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05,
      }
    );

    targets.forEach((target) => {
      observer.observe(target);
    });

    const failsafe = window.setTimeout(() => {
      targets.forEach((target) => {
        target.classList.add(REVEALED_CLASS);
      });
      observer.disconnect();
    }, FAILSAFE_DELAY);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);
};
