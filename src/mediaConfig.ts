/**
 * Atmospheric loops. See docs/ai/MEDIA-BRIEF.md for the prompts, settings and
 * exact filenames these are generated with.
 *
 * Every slot stays `null` until its file exists, and is filled in the same
 * commit that adds the file. Pointing at a file that is not there would
 * degrade correctly — the hero keeps its poster, a band renders nothing — but
 * it would also request a missing URL on every page load, so the switch is
 * explicit rather than incidental.
 */
export const heroVideoSources: {
  desktop: string;
  mobile?: string;
} | null = {
  desktop: '/media/hero/hero-water-desktop.mp4',
};

export const interludeBands: {
  afterWork: string | null;
  beforeContact: string | null;
} = {
  afterWork: '/media/interlude/depth-01.mp4',
  beforeContact: '/media/interlude/depth-02.mp4',
};
