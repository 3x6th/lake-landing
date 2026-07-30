import { RefObject, useEffect, useRef, useState } from 'react';

interface HeroProgressTargets {
  asciiRef: RefObject<SVGSVGElement | null>;
  brandLineRef: RefObject<HTMLParagraphElement | null>;
  engravingRef: RefObject<HTMLImageElement | null>;
}

interface UseHeroProgressOptions {
  onReleaseChange?: (isReleased: boolean) => void;
}

interface HeroProgressState {
  isReleased: boolean;
  prefersReducedMotion: boolean;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const getReducedMotionPreference = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

const interpolateWindow = (
  progress: number,
  start: number,
  end: number,
  maximum = 1
) => clampProgress((progress - start) / (end - start)) * maximum;

const formatStyleNumber = (value: number) =>
  String(Number(value.toFixed(4)));

export const useHeroProgress = (
  heroRef: RefObject<HTMLElement | null>,
  {
    asciiRef,
    brandLineRef,
    engravingRef,
  }: HeroProgressTargets,
  { onReleaseChange }: UseHeroProgressOptions = {}
): HeroProgressState => {
  const [isReleased, setIsReleased] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getReducedMotionPreference
  );
  const releaseStateRef = useRef(false);
  const releaseCallbackRef = useRef(onReleaseChange);

  useEffect(() => {
    releaseCallbackRef.current = onReleaseChange;
  }, [onReleaseChange]);

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
    const hero = heroRef.current;
    const engraving = engravingRef.current;
    const ascii = asciiRef.current;
    const brandLine = brandLineRef.current;

    if (!hero || !engraving || !ascii || !brandLine) {
      return undefined;
    }

    const updateReleaseState = (nextReleaseState: boolean) => {
      if (nextReleaseState !== releaseStateRef.current) {
        releaseStateRef.current = nextReleaseState;
        setIsReleased(nextReleaseState);
        releaseCallbackRef.current?.(nextReleaseState);
      }
    };

    if (prefersReducedMotion) {
      engraving.style.removeProperty('opacity');
      ascii.style.removeProperty('opacity');
      brandLine.style.removeProperty('opacity');
      brandLine.style.removeProperty('transform');

      const updateReducedMotionRelease = () => {
        updateReleaseState(hero.getBoundingClientRect().bottom <= 1);
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

      const bounds = hero.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const scrollDistance = Math.max(hero.offsetHeight - viewportHeight, 1);
      const progress = clampProgress(-bounds.top / scrollDistance);
      const engravingEntrance = interpolateWindow(
        progress,
        0.35,
        0.52,
        0.64
      );
      const engravingExit =
        0.64 * (1 - interpolateWindow(progress, 0.66, 0.86));
      const engravingOpacity = Math.min(
        engravingEntrance,
        engravingExit
      );
      const asciiOpacity = interpolateWindow(
        progress,
        0.66,
        0.86,
        0.76
      );
      const brandProgress = interpolateWindow(progress, 0.88, 0.98);

      engraving.style.opacity = formatStyleNumber(engravingOpacity);
      ascii.style.opacity = formatStyleNumber(asciiOpacity);
      brandLine.style.opacity = formatStyleNumber(brandProgress);
      brandLine.style.transform = `translateY(${formatStyleNumber(
        (1 - brandProgress) * 8
      )}px)`;

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
  }, [
    asciiRef,
    brandLineRef,
    engravingRef,
    heroRef,
    prefersReducedMotion,
  ]);

  return {
    isReleased,
    prefersReducedMotion,
  };
};
