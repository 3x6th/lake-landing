import { useEffect, useState } from 'react';

interface AtmosphereVideoProps {
  className?: string;
  /**
   * Re-resolved whenever the viewport crosses the phone breakpoint or the
   * motion preference changes. The portrait cut is used below 700px when one
   * exists; without it the landscape clip is simply not played there, because
   * a landscape loop cropped into a phone viewport shows almost nothing.
   */
  sources: { desktop: string; mobile?: string };
}

const MOBILE_QUERY = '(max-width: 699px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const mediaQueryList = (query: string) =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function'
    ? window.matchMedia(query)
    : null;

const matches = (query: string) => mediaQueryList(query)?.matches === true;

const resolveSource = (
  sources: AtmosphereVideoProps['sources']
): string | null => {
  if (matches(REDUCED_MOTION_QUERY)) {
    return null;
  }

  if (matches(MOBILE_QUERY)) {
    return sources.mobile ?? null;
  }

  return sources.desktop;
};

/**
 * A silent, looping atmosphere layer that fades in over a still poster.
 *
 * It is additive by design: the poster underneath is a real element, so if the
 * file is missing, blocked, or the codec is unsupported, the video simply
 * never becomes visible and the page looks exactly as it does without it.
 * Nothing readable ever depends on it.
 */
export const AtmosphereVideo = ({
  className = '',
  sources,
}: AtmosphereVideoProps) => {
  const { desktop, mobile } = sources;
  const [source, setSource] = useState(() => resolveSource(sources));
  /**
   * Which file the browser has reported ready, rather than a plain boolean.
   * Comparing it against the current source means a rotation that swaps the
   * clip drops the fade by itself, instead of leaving the previous clip's
   * "playable" state applied to a file that has not loaded yet.
   */
  const [playableSource, setPlayableSource] = useState<string | null>(
    null
  );
  const isPlayable = source !== null && playableSource === source;

  useEffect(() => {
    const lists = [
      mediaQueryList(MOBILE_QUERY),
      mediaQueryList(REDUCED_MOTION_QUERY),
    ].filter((list) => list !== null);

    if (lists.length === 0) {
      return undefined;
    }

    /*
     * Rotating a phone crosses the breakpoint without remounting anything, so
     * the source has to be recomputed here or a 9:16 cut keeps playing inside
     * a 16:9 frame over a landscape poster.
     *
     * Callers build `sources` inline — DepthBand passes a fresh object literal
     * on every render — so this effect depends on the two strings rather than
     * on the object, which would never be referentially stable.
     */
    const sync = () => {
      setSource(resolveSource({ desktop, mobile }));
    };

    lists.forEach((list) => {
      list.addEventListener('change', sync);
    });

    sync();

    return () => {
      lists.forEach((list) => {
        list.removeEventListener('change', sync);
      });
    };
  }, [desktop, mobile]);

  if (!source) {
    return null;
  }

  return (
    <video
      aria-hidden="true"
      autoPlay
      className={`atmosphere-video ${
        isPlayable ? 'atmosphere-video--playable' : ''
      } ${className}`.trim()}
      disablePictureInPicture
      loop
      muted
      onCanPlay={() => setPlayableSource(source)}
      onError={() => setPlayableSource(null)}
      playsInline
      preload="metadata"
      src={source}
      tabIndex={-1}
    />
  );
};
