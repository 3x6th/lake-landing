import { useEffect, useRef } from 'react';
import { Language } from '../siteContent';

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
 * Whether the element currently crosses the viewport at all.
 *
 * Deliberately cruder than the observer's own thresholds: this only decides
 * whether the visitor can already see something, so any overlap counts.
 */
const isOnScreen = (element: Element) => {
  const bounds = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return bounds.bottom > 0 && bounds.top < viewportHeight;
};

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
 *
 * Takes `language` because switching locale remounts most targets: list keys
 * are content-based, so React replaces those DOM nodes with fresh ones that
 * carry no `is-revealed` class. Without re-running here, CSS would hold every
 * replacement at opacity 0 for good.
 */
export const useReveal = (language: Language) => {
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll(REVEAL_SELECTOR)
    );
    const isLanguageChange = hasMountedRef.current;

    hasMountedRef.current = true;

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

    /*
     * A locale switch replaces the nodes the visitor is currently reading, and
     * the replacements arrive with no `is-revealed` class. Waiting for the
     * observer to hand it back means the section they are looking at fades out
     * and back in for no reason. So on a switch — never on first mount, where
     * the staged entrance is the whole point — anything already on screen is
     * revealed in the same frame it is created, and the observer is left to
     * stage everything below the fold exactly as before.
     */
    if (isLanguageChange) {
      targets.forEach((target) => {
        if (isOnScreen(target)) {
          target.classList.add(REVEALED_CLASS);
        }
      });
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
      if (!target.classList.contains(REVEALED_CLASS)) {
        observer.observe(target);
      }
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
  }, [language]);
};
