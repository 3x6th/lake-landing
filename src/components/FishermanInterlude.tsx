import { useCallback, useEffect, useRef } from 'react';
import { useNearViewport } from '../hooks/useNearViewport';
import {
  formatStyleNumber,
  interpolateWindow,
  useScrollStage,
} from '../hooks/useScrollStage';
import { UiCopy } from '../siteContent';
import { AsciiFisherman } from './AsciiFisherman';
import {
  TEAR_BAND_COUNT,
  tearBandActivity,
  tearBandSlip,
} from './fishermanTear';

interface FishermanInterludeProps {
  content: UiCopy['hero'];
}

const ENGRAVING_PEAK = 0.82;
const ASCII_PEAK = 0.86;

const TEAR_BANDS = Array.from({ length: TEAR_BAND_COUNT }, (_, band) => band);

/*
 * How far the two brand inks are thrown either side of a slipping band, as a
 * fraction of that band's own slip. The fringe is therefore widest where the
 * tear is widest and vanishes with it, which is the point: it is a property of
 * the displacement rather than a colour laid on top of one. The ember is thrown
 * less far than the lake green — they are two displacements, not a symmetric
 * outline.
 *
 * The cap is what keeps this a fringe. The glyphs are JetBrains Mono at around
 * a fiftieth of the art's width, so their strokes are barely more than a pixel
 * wide; throw an ink three pixels and it clears the stroke entirely and the
 * band turns solid green instead of gaining a green edge.
 *
 * A 270th of the art's width is the window between two engines. Blink honours
 * the fractional offset, so anything past about three pixels on a 720px frame
 * is a second, coloured copy of the glyph rather than an edge on it. WebKit
 * truncates `drop-shadow` offsets to whole CSS pixels — measured: 2.5px becomes
 * 2px, 1.8px becomes 1px, 0.44px becomes nothing — so anything under a pixel is
 * simply not drawn there. 1/270 lands at 2.7px on a 720px desktop frame and
 * 1.2px on a 328px phone: an edge in Blink, and at least one pixel of one in
 * WebKit at the height of the tear.
 */
const FRINGE_RATIO = 0.055;
const EMBER_RATIO = 0.72;
const FRINGE_CAP_RATIO = 1 / 270;

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
  const asciiRef = useRef<HTMLDivElement>(null);
  const bandRefs = useRef<(SVGSVGElement | null)[]>([]);
  /*
   * What was last written to each band and to the engraving's mask. `filter`
   * and `mask-image` are the only two properties here that are not composited,
   * so a write to either is a repaint; re-writing an unchanged value would
   * repaint the whole tear every frame of the passage, including the two thirds
   * of it where nothing is torn at all.
   */
  const lastFilters = useRef<string[]>([]);
  const lastMask = useRef('');
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
    const asciiPresence = interpolateWindow(progress, 0.46, 0.74);
    const brandProgress = interpolateWindow(progress, 0.56, 0.78);

    engraving.style.opacity = formatStyleNumber(
      Math.min(engravingEntrance, engravingExit)
    );
    /*
     * The crossfade moved off this element and onto the bands below, because a
     * band has to be able to reach full presence while the rest of the picture
     * is still arriving. The group is held at the peak the single layer used to
     * animate towards, and each band carries the fraction of it — so a band at
     * rest is at `asciiPresence * ASCII_PEAK`, exactly the value one unsliced
     * layer used to be given.
     */
    ascii.style.opacity = formatStyleNumber(ASCII_PEAK);
    brandLine.style.opacity = formatStyleNumber(brandProgress);
    brandLine.style.transform = `translateY(${formatStyleNumber(
      (1 - brandProgress) * 10
    )}px)`;

    /*
     * The art box is measured, not assumed, because the fringe is a length and
     * the slip is a percentage. Reading it here is free: the scroll stage has
     * just taken the stage's own rectangle, so layout is already clean, and
     * nothing above this line has written to it.
     */
    const artWidth = ascii.clientWidth;
    const maskStops: string[] = [];
    let torn = false;

    for (const band of TEAR_BANDS) {
      const activity = tearBandActivity(progress, band);
      const slip = tearBandSlip(progress, band);
      const element = bandRefs.current[band];

      if (activity > 0) {
        torn = true;
      }

      /*
       * Two stops per band, so the hole this band opens in the engraving has
       * the band's own hard edges. Interpolating between band centres instead
       * was cheaper and read as a soft vignette over the picture rather than as
       * the picture being cut into strips, which is the whole point.
       */
      const alpha = `rgba(0,0,0,${formatStyleNumber(1 - activity)})`;

      maskStops.push(
        `${alpha} ${formatStyleNumber((band / TEAR_BAND_COUNT) * 100)}%`,
        `${alpha} ${formatStyleNumber(((band + 1) / TEAR_BAND_COUNT) * 100)}%`
      );

      if (!element) {
        continue;
      }

      /*
       * A band's own presence is the crossfade's, pulled towards full by however
       * much the tear has taken it. At activity zero this is the crossfade and
       * nothing else, which is what makes both ends of the passage identical to
       * the untorn frame rather than merely close to it.
       */
      element.style.opacity = formatStyleNumber(
        asciiPresence + (1 - asciiPresence) * activity
      );
      element.style.transform = slip
        ? `translateX(${formatStyleNumber(slip)}%)`
        : '';

      /*
       * The fringe, as two inks thrown either side of the band by different
       * amounts. Both are blue-poor and neither is blue-dominant, and the paper
       * ink they sit behind is neutral, so every pixel the tear can produce has
       * red and green at least as strong as blue: green and amber fringes are
       * reachable and cyan and magenta are not, by construction rather than by
       * choosing pleasant numbers. `drop-shadow` puts them behind the glyphs, so
       * they show on the edges of the displacement and nowhere else.
       */
      const cap = artWidth * FRINGE_CAP_RATIO;
      const fringe = Math.max(
        -cap,
        Math.min(cap, (slip / 100) * artWidth * FRINGE_RATIO)
      );
      const filter =
        Math.abs(fringe) < 0.05
          ? ''
          : `drop-shadow(${formatStyleNumber(fringe)}px 0 0 var(--tear-lake))` +
            ` drop-shadow(${formatStyleNumber(
              -fringe * EMBER_RATIO
            )}px 0 0 var(--tear-ember))`;

      if (lastFilters.current[band] !== filter) {
        lastFilters.current[band] = filter;
        element.style.filter = filter;
      }
    }

    /*
     * The engraving is taken away underneath the tear rather than left showing
     * through it, so a torn band reads as the picture having been replaced by
     * its own ASCII rather than as characters printed over it. The mask is
     * removed outright when nothing is torn: an untorn frame carries no mask,
     * no filter and no transform, and is therefore the same frame the passage
     * drew before any of this existed.
     */
    const mask = torn
      ? `linear-gradient(to bottom, ${maskStops.join(',')})`
      : '';

    if (lastMask.current !== mask) {
      lastMask.current = mask;

      if (mask) {
        engraving.style.setProperty('-webkit-mask-image', mask);
        engraving.style.setProperty('mask-image', mask);
      } else {
        engraving.style.removeProperty('-webkit-mask-image');
        engraving.style.removeProperty('mask-image');
      }
    }
  }, []);

  const reset = useCallback(() => {
    engravingRef.current?.style.removeProperty('opacity');
    engravingRef.current?.style.removeProperty('-webkit-mask-image');
    engravingRef.current?.style.removeProperty('mask-image');
    asciiRef.current?.style.removeProperty('opacity');
    brandLineRef.current?.style.removeProperty('opacity');
    brandLineRef.current?.style.removeProperty('transform');
    lastMask.current = '';

    for (const band of TEAR_BANDS) {
      const element = bandRefs.current[band];

      lastFilters.current[band] = '';
      element?.style.removeProperty('opacity');
      element?.style.removeProperty('transform');
      element?.style.removeProperty('filter');
    }
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
            {/* One blending group for the whole glyph field. The bands inside
                composite normally against each other and only the group is
                screened onto the water, so slicing the layer costs one blend,
                not fourteen. */}
            <div
              ref={asciiRef}
              className="fisherman-art__layer fisherman-art__source fisherman-art__ascii"
            >
              {isNearViewport
                ? TEAR_BANDS.map((band) => (
                    <AsciiFisherman
                      key={band}
                      elementRef={(element) => {
                        bandRefs.current[band] = element;
                      }}
                      className="fisherman-art__ascii-band"
                      rowBand={[band, TEAR_BAND_COUNT]}
                    />
                  ))
                : null}
            </div>
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
