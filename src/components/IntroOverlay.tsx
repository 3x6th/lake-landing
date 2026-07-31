import { useCallback, useEffect, useState } from 'react';

const WORDMARK = 'ozero.dev';
const TYPE_STEP_MS = 58;
const HOLD_MS = 480;
const ERASE_STEP_MS = 30;
const LIFT_MS = 520;
const SESSION_KEY = 'ozero.intro-played';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type Phase = 'typing' | 'holding' | 'erasing' | 'lifting' | 'done';

const shouldPlay = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  ) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(SESSION_KEY) !== 'true';
  } catch {
    // Private mode can throw on storage access. Playing once is harmless.
    return true;
  }
};

/**
 * A single-pass curtain: the wordmark types in, erases, and the curtain lifts
 * to the hero, which has been in the DOM underneath the whole time.
 *
 * This deliberately runs once per session and never returns. An earlier
 * version of this site looped a type-and-delete effect on the hero headline
 * itself, which `plans/001-fisherman-ascii-hero.md` removed as dated. A
 * one-shot intro that gets out of the way is a different device from a
 * permanent one attached to the page's own heading.
 *
 * It is skippable by click, tap or any key, absent entirely under
 * `prefers-reduced-motion`, and hidden from assistive technology — the real
 * heading below is what gets announced.
 */
export const IntroOverlay = () => {
  const [isEnabled] = useState(shouldPlay);
  const [phase, setPhase] = useState<Phase>('typing');
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  const skip = useCallback(() => {
    setPhase((current) =>
      current === 'done' || current === 'lifting' ? current : 'lifting'
    );
  }, []);

  useEffect(() => {
    if (!isEnabled || phase === 'done') {
      return undefined;
    }

    if (phase === 'typing') {
      const step = window.setTimeout(() => {
        if (visibleCharacters >= WORDMARK.length) {
          setPhase('holding');

          return;
        }

        setVisibleCharacters((count) => count + 1);
      }, TYPE_STEP_MS);

      return () => window.clearTimeout(step);
    }

    if (phase === 'holding') {
      const hold = window.setTimeout(
        () => setPhase('erasing'),
        HOLD_MS
      );

      return () => window.clearTimeout(hold);
    }

    if (phase === 'erasing') {
      const step = window.setTimeout(() => {
        if (visibleCharacters <= 0) {
          setPhase('lifting');

          return;
        }

        setVisibleCharacters((count) => count - 1);
      }, ERASE_STEP_MS);

      return () => window.clearTimeout(step);
    }

    const lift = window.setTimeout(() => setPhase('done'), LIFT_MS);

    return () => window.clearTimeout(lift);
  }, [isEnabled, phase, visibleCharacters]);

  useEffect(() => {
    if (!isEnabled || phase === 'done') {
      return undefined;
    }

    // Scroll must skip too. The curtain locks page scrolling while it plays,
    // so without this a wheel or trackpad gesture — the likeliest first thing
    // a visitor does — is the one input that does nothing.
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchmove', skip, { passive: true });

    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
    };
  }, [isEnabled, phase, skip]);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    if (phase === 'done') {
      try {
        window.sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // Storage is optional; the intro simply replays next time.
      }

      document.documentElement.classList.remove('is-intro-open');

      return undefined;
    }

    document.documentElement.classList.add('is-intro-open');

    return () => {
      document.documentElement.classList.remove('is-intro-open');
    };
  }, [isEnabled, phase]);

  if (!isEnabled || phase === 'done') {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`intro-overlay ${
        phase === 'lifting' ? 'intro-overlay--lifting' : ''
      }`}
    >
      <p className="intro-overlay__wordmark">
        {WORDMARK.slice(0, visibleCharacters)}
        <span
          className={`intro-overlay__caret ${
            phase === 'holding' ? 'intro-overlay__caret--blinking' : ''
          }`}
        />
      </p>
    </div>
  );
};
