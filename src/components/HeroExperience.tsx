import { Language, UiCopy } from '../siteContent';

interface HeroExperienceProps {
  contactHref: string;
  content: UiCopy['hero'];
  language: Language;
}

/**
 * Water and words only. The engraving-to-ASCII signature lives in
 * FishermanInterlude, so nothing here competes with the offer, and the hero
 * needs no scroll driver at all.
 */
export const HeroExperience = ({
  contactHref,
  content,
  language,
}: HeroExperienceProps) => {
  const heroTitleId = `hero-title-${language}`;

  return (
    <section
      className="hero-experience"
      aria-labelledby={heroTitleId}
    >
      <div className="hero-experience__stage">
        <div className="hero-experience__atmosphere" aria-hidden="true">
          <picture className="hero-water">
            <source
              media="(max-width: 699px)"
              srcSet="/media/hero/hero-water-mobile.webp"
            />
            <source
              media="(max-aspect-ratio: 4 / 3)"
              srcSet="/media/hero/hero-water-4x3.webp"
            />
            <img
              className="hero-water__image"
              src="/media/hero/hero-water-desktop.webp"
              alt=""
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          <div className="hero-water__scrim" />
        </div>

        <div className="hero-experience__copy">
          <h1 id={heroTitleId}>{content.headline}</h1>
          <p className="hero-experience__offer">
            {content.valueProposition}
          </p>
          <div className="hero-experience__actions">
            <a
              className="hero-button hero-button--primary"
              href={contactHref}
            >
              {content.primaryCta}
            </a>
            <a
              className="hero-button hero-button--ghost"
              href="#work"
            >
              {content.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
