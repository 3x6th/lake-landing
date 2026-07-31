import { Ref, useEffect, useState } from 'react';

interface AsciiFishermanProps {
  className?: string;
  elementRef?: Ref<SVGSVGElement>;
  source?: string;
}

interface AsciiGlyph {
  character: string;
  column: number;
  row: number;
}

interface AsciiSample {
  columns: number;
  glyphs: AsciiGlyph[];
  rows: number;
  rowHeight: number;
  viewBoxHeight: number;
  viewBoxWidth: number;
}

type AsciiStatus = 'loading' | 'ready' | 'failed';

const ASCII_GLYPH_RAMP = ' .·:+*#@';
/*
 * How much of the source width the interlude shows, measured from the left.
 *
 * The engraving is authored already framed — its ink runs from 3.7% to 96.6%
 * of the width with even margins on all four sides — so it needs no crop. It
 * was cropped to 0.87 once, which cut off the rod tip and the whole fishing
 * line and left the fisherman holding a bare stick; both layers sampled from
 * the same ratio, so the crossfade still registered and the loss was invisible
 * in review.
 *
 * The constant stays because it is one third of a contract. Any re-crop has to
 * move all three of these together or the engraving and its ASCII stop sitting
 * on the same pixels through the crossfade:
 *
 *   1. this ratio
 *   2. `.fisherman-art__viewport { aspect-ratio }`  = 1536 * ratio / 1024
 *   3. `.fisherman-art__source { width }`           = 100% / ratio
 */
const CROP_RATIO = 1;
/* The intrinsic aspect of /fishman.png: 1536 x 1024. */
const SOURCE_ASPECT_RATIO = 1.5;
/*
 * The phone grid.
 *
 * This was 64, which is a legible fill ratio carried by an illegible number of
 * samples. Measured against the shipped build at 390x844: 64 columns gives a
 * 64x21 grid, 1344 cells and 140 glyphs — 10.4% fill, the same density as
 * desktop, but the hat, the face, the hull and the rod line each end up with a
 * handful of marks and the eye cannot assemble them. On the owner's phone the
 * whole passage read as empty.
 *
 * Candidates were sampled from the real PNG through this exact code path and
 * rendered at the real mobile art width (84vw). 88 and 92 recover the rod
 * diagonal but leave the hat a single blob and the hull broken. 96 is the
 * first count where all four read: brim and crown separate, the torso holds
 * its block, the hull is one continuous stroke, and the line drops off the rod
 * tip. Past it the gain is detail rather than legibility, and the added
 * samples are mostly faint water crossing TRANSPARENT_LUMINANCE, which
 * competes with the subject at this size instead of supporting it.
 *
 * There is a floor under this and 96 sits above it. The glyph size follows
 * `rowHeight`, so more columns means smaller glyphs: at 96 the rendered type
 * is 6.4px at a 360px viewport, 7.0px at 390 and 7.3px at 412, while 104 falls
 * to 5.9px at 360. 96 also divides cleanly — 96x32 is exactly the 3:1 cell the
 * sampler assumes, with no rounding in the row count.
 */
const MOBILE_COLUMNS = 96;
const DESKTOP_COLUMNS = 120;
const MOBILE_QUERY = '(max-width: 699px)';
const AREA_SAMPLE_SIZE = 2;
const TRANSPARENT_LUMINANCE = 24;
const ASCII_CONTRAST_GAMMA = 0.65;
/*
 * The luminance that maps to the heaviest glyph in the ramp.
 *
 * This is a property of /fishman.png, not a general constant. Normalizing
 * against 255 assumes a cell somewhere reaches white, and this engraving never
 * does: sampled at the shipped 120x40 grid its brightest cell is 131, p99 is
 * 73.5 and p90 is 30.7. Against a 255 ceiling the brightest cell in the whole
 * image resolves to '+', so '*', '#' and '@' could never be emitted once and
 * 90% of the glyphs were the two faintest characters — the figure crossed the
 * transition as scattered dots instead of a fisherman.
 *
 * 110 sits just under the measured ceiling so the densest passages — hat, face,
 * hull — reach the top of the ramp while the sparse water stays sparse. The
 * normalized value is clamped because cells above the peak would otherwise run
 * off the end of the ramp.
 *
 * Replacing fishman.png means re-measuring this. Sample the new file at 120x40
 * and set it near the p99 of the cells above TRANSPARENT_LUMINANCE.
 */
const ASCII_PEAK_LUMINANCE = 110;
const imagePromises = new Map<string, Promise<HTMLImageElement>>();

const loadImage = (source: string) => {
  const cachedImage = imagePromises.get(source);

  if (cachedImage) {
    return cachedImage;
  }

  const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    let isSettled = false;

    const resolveOnce = () => {
      if (!isSettled) {
        isSettled = true;
        resolve(image);
      }
    };
    const rejectOnce = () => {
      if (!isSettled) {
        isSettled = true;
        reject(new Error(`Unable to decode decorative image: ${source}`));
      }
    };

    /*
     * `load` says the bytes arrived. `decode()` says there is a bitmap. The
     * sampler needs the bitmap, so `load` cannot settle this on its own.
     *
     * This used to set `decoding = 'async'` and resolve on whichever of `load`
     * and `decode()` came first. On WebKit that is always `load`, and WebKit
     * honours the async hint literally: `drawImage` of an image that has
     * loaded but not yet decoded draws nothing, and does not block waiting for
     * it. `getImageData` then came back entirely zero, every cell fell under
     * TRANSPARENT_LUMINANCE, no glyph was ever pushed, and the component
     * rendered an empty `<svg>` carrying `data-ascii-status="ready"` — the
     * failure state that looks most like success. On an iPhone the signature
     * was simply absent, in Safari and in Chrome for iOS alike, because both
     * are WebKit. Blink decodes synchronously inside `drawImage`, so desktop
     * Chrome never showed it, and no column count could: the glyph list was
     * empty at every grid size.
     *
     * Measured in WKWebView against this page, sampling /fishman.png at the
     * shipped 96-column grid: settling on `load` with the async hint gives a
     * peak cell luminance of 0. Awaiting `decode()` gives 137.93 and a full
     * glyph set, and so does dropping the hint and settling on `load`.
     *
     * Both halves of that measurement are used. `decode()` is the guarantee
     * and is now the only thing that resolves this promise on an engine that
     * has it; the hint is gone because `load` is still the fallback where
     * `decode()` is missing or refuses, and that fallback is only sound if the
     * engine was never told to decode lazily. Nothing is lost by dropping it:
     * this image is never inserted into the document, so it has no
     * presentation decode to schedule.
     */
    const handleLoad = () => {
      if (typeof image.decode !== 'function') {
        resolveOnce();
      }
    };

    image.onload = handleLoad;
    image.onerror = rejectOnce;
    image.src = source;

    if (typeof image.decode === 'function') {
      void image.decode().then(resolveOnce, () => {
        /*
         * WebKit has historically rejected `decode()` for images that did
         * arrive intact. An arrived image is still worth sampling, and with
         * the async hint gone this is the path measured good above.
         */
        if (image.complete && image.naturalWidth > 0) {
          resolveOnce();
        } else {
          rejectOnce();
        }
      });
    }
  });

  imagePromises.set(source, imagePromise);
  void imagePromise.catch(() => {
    imagePromises.delete(source);
  });

  return imagePromise;
};

const getColumnCount = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(MOBILE_QUERY).matches
    ? MOBILE_COLUMNS
    : DESKTOP_COLUMNS;

const sampleImage = (
  image: HTMLImageElement,
  columns: number
): AsciiSample | null => {
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;

  if (!sourceWidth || !sourceHeight) {
    return null;
  }

  const croppedWidth = Math.floor(sourceWidth * CROP_RATIO);
  const croppedAspectRatio = croppedWidth / sourceHeight;
  const rows = Math.max(
    1,
    Math.round(columns / (croppedAspectRatio * 2))
  );
  const canvas = document.createElement('canvas');
  const sampleWidth = columns * AREA_SAMPLE_SIZE;
  const sampleHeight = rows * AREA_SAMPLE_SIZE;
  const context = canvas.getContext('2d', { willReadFrequently: true });

  if (!context) {
    return null;
  }

  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(
    image,
    0,
    0,
    croppedWidth,
    sourceHeight,
    0,
    0,
    sampleWidth,
    sampleHeight
  );

  const pixels = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
  const glyphs: AsciiGlyph[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 0;

      for (
        let sampleY = 0;
        sampleY < AREA_SAMPLE_SIZE;
        sampleY += 1
      ) {
        for (
          let sampleX = 0;
          sampleX < AREA_SAMPLE_SIZE;
          sampleX += 1
        ) {
          const pixelX = column * AREA_SAMPLE_SIZE + sampleX;
          const pixelY = row * AREA_SAMPLE_SIZE + sampleY;
          const pixelIndex = (pixelY * sampleWidth + pixelX) * 4;

          red += pixels[pixelIndex];
          green += pixels[pixelIndex + 1];
          blue += pixels[pixelIndex + 2];
          alpha += pixels[pixelIndex + 3];
        }
      }

      const sampleArea = AREA_SAMPLE_SIZE * AREA_SAMPLE_SIZE;
      const averageAlpha = alpha / sampleArea / 255;
      const luminance =
        (0.2126 * (red / sampleArea) +
          0.7152 * (green / sampleArea) +
          0.0722 * (blue / sampleArea)) *
        averageAlpha;

      if (luminance < TRANSPARENT_LUMINANCE) {
        continue;
      }

      const normalizedLuminance = Math.min(
        1,
        (luminance - TRANSPARENT_LUMINANCE) /
          (ASCII_PEAK_LUMINANCE - TRANSPARENT_LUMINANCE)
      );
      const contrastAdjustedLuminance = Math.pow(
        normalizedLuminance,
        ASCII_CONTRAST_GAMMA
      );
      const glyphIndex = Math.min(
        ASCII_GLYPH_RAMP.length - 1,
        Math.floor(
          contrastAdjustedLuminance * ASCII_GLYPH_RAMP.length
        )
      );
      const character = ASCII_GLYPH_RAMP[glyphIndex];

      if (character !== ' ') {
        glyphs.push({
          character,
          column,
          row,
        });
      }
    }
  }

  const viewBoxHeight = columns / croppedAspectRatio;

  return {
    columns,
    glyphs,
    rows,
    rowHeight: viewBoxHeight / rows,
    viewBoxHeight,
    /*
     * The glyphs occupy columns 0..`columns`, which is the cropped region. The
     * box is widened by the same ratio the stylesheet widens this <svg> by, so
     * one glyph column keeps covering one column of the visible viewport.
     */
    viewBoxWidth: columns / CROP_RATIO,
  };
};

export const AsciiFisherman = ({
  className = '',
  elementRef,
  source = '/fishman.png',
}: AsciiFishermanProps) => {
  const [columns, setColumns] = useState(getColumnCount);
  const [sample, setSample] = useState<AsciiSample | null>(null);
  const [status, setStatus] = useState<AsciiStatus>('loading');

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      setColumns(event.matches ? MOBILE_COLUMNS : DESKTOP_COLUMNS);
    };

    mediaQuery.addEventListener('change', handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener('change', handleBreakpointChange);
    };
  }, []);

  useEffect(() => {
    let isCurrent = true;

    void loadImage(source)
      .then((image) => {
        if (!isCurrent) {
          return;
        }

        const nextSample = sampleImage(image, columns);

        if (!nextSample) {
          setSample(null);
          setStatus('failed');
          return;
        }

        setSample(nextSample);
        setStatus('ready');
      })
      .catch(() => {
        if (isCurrent) {
          setSample(null);
          setStatus('failed');
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [columns, source]);

  const classes = ['ascii-fisherman', className].filter(Boolean).join(' ');

  return (
    <svg
      ref={elementRef}
      aria-hidden="true"
      className={classes}
      data-ascii-columns={sample?.columns ?? columns}
      data-ascii-status={status}
      focusable="false"
      preserveAspectRatio="none"
      viewBox={
        sample
          ? `0 0 ${sample.viewBoxWidth} ${sample.viewBoxHeight}`
          : /*
             * Before the first sample lands, hold the same box the sample will
             * produce: `croppedAspectRatio` is the source aspect times the
             * crop, so this is that geometry stated ahead of the pixels.
             */
            `0 0 ${columns / CROP_RATIO} ${
              columns / (SOURCE_ASPECT_RATIO * CROP_RATIO)
            }`
      }
    >
      {sample?.glyphs.map(({ character, column, row }) => (
        <text
          key={`${row}-${column}`}
          fontSize={sample.rowHeight * 1.02}
          x={column + 0.5}
          y={(row + 0.78) * sample.rowHeight}
        >
          {character}
        </text>
      ))}
    </svg>
  );
};
