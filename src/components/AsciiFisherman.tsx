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
const MOBILE_COLUMNS = 64;
const DESKTOP_COLUMNS = 120;
const MOBILE_QUERY = '(max-width: 699px)';
const AREA_SAMPLE_SIZE = 2;
const TRANSPARENT_LUMINANCE = 24;
const ASCII_CONTRAST_GAMMA = 0.65;
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

    image.decoding = 'async';
    image.onload = resolveOnce;
    image.onerror = rejectOnce;
    image.src = source;

    if (typeof image.decode === 'function') {
      void image.decode().then(resolveOnce, rejectOnce);
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

      const normalizedLuminance =
        (luminance - TRANSPARENT_LUMINANCE) /
        (255 - TRANSPARENT_LUMINANCE);
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
