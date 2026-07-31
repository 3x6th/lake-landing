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
  mobile: string;
} | null = null;

export const interludeBands: {
  afterWork: string | null;
  beforeContact: string | null;
} = {
  afterWork: null,
  beforeContact: null,
};
