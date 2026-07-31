import { useNearViewport } from '../hooks/useNearViewport';
import { AtmosphereVideo } from './AtmosphereVideo';

interface DepthBandProps {
  source: string | null;
}

/**
 * A full-bleed atmospheric pause between editorial sections. Carries no copy
 * and no controls, so a visitor loses nothing when it is absent — which is
 * why an unfilled slot renders nothing at all rather than an empty band.
 *
 * Both bands sit below the fold, and `autoPlay` overrides `preload="metadata"`
 * into a full download, so the clip is only mounted once the band approaches.
 * The band itself always renders, so its height is reserved from first paint
 * and nothing below it moves when the loop arrives.
 */
export const DepthBand = ({ source }: DepthBandProps) => {
  const [bandRef, isNearViewport] = useNearViewport<HTMLDivElement>();

  if (!source) {
    return null;
  }

  return (
    <div className="depth-band" aria-hidden="true" ref={bandRef}>
      {/* The same landscape clip on phones, deliberately. A band carries no
          composition to protect and no poster to mismatch, so a cropped
          stretch of moving water beats an empty frame. The hero does the
          opposite: it waits for a real portrait cut. */}
      {isNearViewport ? (
        <AtmosphereVideo
          className="depth-band__video"
          sources={{ desktop: source, mobile: source }}
        />
      ) : null}
    </div>
  );
};
