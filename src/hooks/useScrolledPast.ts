import { useEffect, useState } from 'react';

/**
 * True once the document has scrolled past `threshold` pixels.
 *
 * The navigation scrim used to key off hero release, which left the fixed bar
 * transparent while the proof rail scrolled underneath it at narrower
 * viewports. Keying off the scroll offset instead makes the scrim appear as
 * soon as anything can pass beneath the bar, at every viewport.
 */
export const useScrolledPast = (threshold: number) => {
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    const update = () => {
      setHasScrolledPast(window.scrollY > threshold);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [threshold]);

  return hasScrolledPast;
};
