import { RefObject, useEffect, useRef, useState } from 'react';

interface UseScrollStageOptions {
  /**
   * Receives 0–1 progress through the stage's scroll travel, once per frame.
   * Write only compositor properties here: opacity and transform.
   */
  write: (progress: number) => void;
  /**
   * Clears whatever `write` set. Called instead of `write` when the visitor
   * prefers reduced motion, so CSS alone decides the resting appearance.
   */
  reset: () => void;
  onReleaseChange?: (isReleased: boolean) => void;
}

interface ScrollStageState {
  isReleased: boolean;
  prefersReducedMotion: boolean;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const getReducedMotionPreference = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const clampProgress = (value: number) =>
  Math.min(1, Math.max(0, value));

export const interpolateWindow = (
  progress: number,
  start: number,
  end: number,
  maximum = 1
) => clampProgress((progress - start) / (end - start)) * maximum;

export const formatStyleNumber = (value: number) =>
  String(Number(value.toFixed(4)));

/**
 * Drives one sticky scroll stage. Scroll and resize are coalesced into a
 * single animation frame, and progress is written straight to the DOM so no
 * React state changes while scrolling.
 *
 * Under `prefers-reduced-motion` no frame is ever scheduled: the hook falls
 * back to a cheap threshold check for release state only.
 */
export const useScrollStage = (
  stageRef: RefObject<HTMLElement | null>,
  { write, reset, onReleaseChange }: UseScrollStageOptions
): ScrollStageState => {
  const [isReleased, setIsReleased] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getReducedMotionPreference
  );
  const releaseStateRef = useRef(false);
  const callbacksRef = useRef({ write, reset, onReleaseChange });

  useEffect(() => {
    callbacksRef.current = { write, reset, onReleaseChange };
  }, [onReleaseChange, reset, write]);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return undefined;
    }

    const updateReleaseState = (nextReleaseState: boolean) => {
      if (nextReleaseState !== releaseStateRef.current) {
        releaseStateRef.current = nextReleaseState;
        setIsReleased(nextReleaseState);
        callbacksRef.current.onReleaseChange?.(nextReleaseState);
      }
    };

    if (prefersReducedMotion) {
      callbacksRef.current.reset();

      const updateReducedMotionRelease = () => {
        updateReleaseState(stage.getBoundingClientRect().bottom <= 1);
      };
      const initialThresholdCheck = window.setTimeout(
        updateReducedMotionRelease,
        0
      );

      window.addEventListener('scroll', updateReducedMotionRelease, {
        passive: true,
      });
      window.addEventListener('resize', updateReducedMotionRelease, {
        passive: true,
      });

      return () => {
        window.clearTimeout(initialThresholdCheck);
        window.removeEventListener('scroll', updateReducedMotionRelease);
        window.removeEventListener('resize', updateReducedMotionRelease);
      };
    }

    let animationFrame: number | null = null;

    const updateProgress = () => {
      animationFrame = null;

      const bounds = stage.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const scrollDistance = Math.max(stage.offsetHeight - viewportHeight, 1);

      callbacksRef.current.write(clampProgress(-bounds.top / scrollDistance));
      updateReleaseState(bounds.bottom <= viewportHeight + 1);
    };

    const scheduleProgressUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', scheduleProgressUpdate, {
      passive: true,
    });
    window.addEventListener('resize', scheduleProgressUpdate, {
      passive: true,
    });
    scheduleProgressUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleProgressUpdate);
      window.removeEventListener('resize', scheduleProgressUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [prefersReducedMotion, stageRef]);

  return {
    isReleased,
    prefersReducedMotion,
  };
};
