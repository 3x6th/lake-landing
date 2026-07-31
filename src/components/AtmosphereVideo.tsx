import { useState } from 'react';

interface AtmosphereVideoProps {
  className?: string;
  /**
   * Resolved once on mount. The portrait cut is used below 700px when one
   * exists; without it the landscape clip is simply not played there, because
   * a landscape loop cropped into a phone viewport shows almost nothing.
   */
  sources: { desktop: string; mobile?: string };
}

const MOBILE_QUERY = '(max-width: 699px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const matches = (query: string) =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(query).matches;

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
  const [source] = useState(() => resolveSource(sources));
  const [isPlayable, setIsPlayable] = useState(false);

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
      onCanPlay={() => setIsPlayable(true)}
      onError={() => setIsPlayable(false)}
      playsInline
      preload="metadata"
      src={source}
      tabIndex={-1}
    />
  );
};
