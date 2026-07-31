import { useCallback, useEffect, useRef } from 'react';
import { useNearViewport } from '../hooks/useNearViewport';
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
  /*
   * AsciiFisherman fetches the megabyte engraving itself, in JS, to sample its
   * pixels — `loading="lazy"` on the image below cannot defer that, because
   * the script request happens first and the image then just hits cache. So
   * the sampler is not mounted until this passage is close. The section, the
   * stage and the layout are unchanged either way, so the scroll stage still
   * measures the same 200vh of travel from first paint.
   */
  const [artRef, isNearViewport] = useNearViewport<HTMLDivElement>();

  const write = useCallback((progress: number) => {
    const engraving = engravingRef.current;
    const ascii = asciiRef.current;
    const brandLine = brandLineRef.current;

    if (!engraving || !ascii || !brandLine) {
      return;
    }

    /*
     * Every window is the original one shifted 0.12 earlier; none of the spans
     * changed. The engraving used to wait until 0.12 of the stage's travel
     * before it began to appear, which left roughly a third of a viewport of
     * black between the last mark of the research band and the first mark of
     * the fisherman — long enough to read as a failed load rather than a pause.
     *
     * The rhythm is preserved exactly: arrive over 0.20, hold for 0.12,
     * transform over 0.24/0.28, resolve over 0.22, with the brand line still
     * overlapping the tail of the ASCII by 0.06. The transformation itself is
     * not compressed; the whole passage simply starts as the band arrives and
     * finishes with more tail instead of more approach.
     */
    const engravingEntrance = interpolateWindow(
      progress,
      0.02,
      0.22,
      ENGRAVING_PEAK
    );
    const engravingExit =
      ENGRAVING_PEAK * (1 - interpolateWindow(progress, 0.34, 0.58));
    const brandProgress = interpolateWindow(progress, 0.56, 0.78);

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

  useEffect(() => {
    if (!isNearViewport) {
      return;
    }

    /*
     * `write` bails out while the ASCII layer is absent, and the stage only
     * takes a new reading on scroll or resize. That is fine when the layer
     * arrives during a scroll, but not when a reload restores the visitor
     * mid-passage: the layer would then wait for the next scroll event to be
     * given its opacity. One synthetic read settles it.
     */
    window.dispatchEvent(new Event('scroll'));
  }, [isNearViewport]);

  const classes = [
    'fisherman-interlude',
    prefersReducedMotion ? 'fisherman-interlude--reduced' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={stageRef} className={classes}>
      <div className="fisherman-interlude__stage">
        <div className="fisherman-art" aria-hidden="true" ref={artRef}>
          <div className="fisherman-art__viewport">
            {/* The dimensions are the asset's intrinsic 1536x1024: CROP_RATIO
                is 1, so the whole engraving is in frame. The viewport's
                aspect-ratio already reserves the space, but every image
                states its own box. */}
            <img
              ref={engravingRef}
              className="fisherman-art__layer fisherman-art__source fisherman-art__engraving"
              src="/fishman.png"
              alt=""
              width="1536"
              height="1024"
              loading="lazy"
              decoding="async"
            />
            {isNearViewport ? (
              <AsciiFisherman
                elementRef={asciiRef}
                className="fisherman-art__layer fisherman-art__source fisherman-art__ascii"
              />
            ) : null}
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
