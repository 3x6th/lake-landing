import { useCallback, useRef } from 'react';
import {
  formatStyleNumber,
  interpolateWindow,
  useScrollStage,
} from '../hooks/useScrollStage';
import { UiCopy } from '../siteContent';
import { AsciiFisherman } from './AsciiFisherman';

interface FishermanInterludeProps {
  content: UiCopy['hero'];
}

const ENGRAVING_PEAK = 0.82;
const ASCII_PEAK = 0.86;

/**
 * The one signature passage. The engraving arrives alone, the browser samples
 * its own pixels into ASCII, and the brand line resolves. Nothing else on the
 * page carries the fisherman, and nothing else animates inside this band.
 */
export const FishermanInterlude = ({
  content,
}: FishermanInterludeProps) => {
  const stageRef = useRef<HTMLElement>(null);
  const engravingRef = useRef<HTMLImageElement>(null);
  const asciiRef = useRef<SVGSVGElement>(null);
  const brandLineRef = useRef<HTMLParagraphElement>(null);

  const write = useCallback((progress: number) => {
    const engraving = engravingRef.current;
    const ascii = asciiRef.current;
    const brandLine = brandLineRef.current;

    if (!engraving || !ascii || !brandLine) {
      return;
    }

    const engravingEntrance = interpolateWindow(
      progress,
      0.12,
      0.34,
      ENGRAVING_PEAK
    );
    const engravingExit =
      ENGRAVING_PEAK * (1 - interpolateWindow(progress, 0.46, 0.7));
    const brandProgress = interpolateWindow(progress, 0.68, 0.9);

    engraving.style.opacity = formatStyleNumber(
      Math.min(engravingEntrance, engravingExit)
    );
    ascii.style.opacity = formatStyleNumber(
      interpolateWindow(progress, 0.46, 0.74, ASCII_PEAK)
    );
    brandLine.style.opacity = formatStyleNumber(brandProgress);
    brandLine.style.transform = `translateY(${formatStyleNumber(
      (1 - brandProgress) * 10
    )}px)`;
  }, []);

  const reset = useCallback(() => {
    engravingRef.current?.style.removeProperty('opacity');
    asciiRef.current?.style.removeProperty('opacity');
    brandLineRef.current?.style.removeProperty('opacity');
    brandLineRef.current?.style.removeProperty('transform');
  }, []);

  const { prefersReducedMotion } = useScrollStage(stageRef, {
    reset,
    write,
  });

  const classes = [
    'fisherman-interlude',
    prefersReducedMotion ? 'fisherman-interlude--reduced' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={stageRef} className={classes}>
      <div className="fisherman-interlude__stage">
        <div className="fisherman-art" aria-hidden="true">
          <div className="fisherman-art__viewport">
            <img
              ref={engravingRef}
              className="fisherman-art__layer fisherman-art__source fisherman-art__engraving"
              src="/fishman.png"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <AsciiFisherman
              elementRef={asciiRef}
              className="fisherman-art__layer fisherman-art__source fisherman-art__ascii"
            />
          </div>
        </div>

        <p
          ref={brandLineRef}
          className="fisherman-interlude__brand-line"
        >
          {content.tagline}
        </p>
      </div>
    </section>
  );
};
