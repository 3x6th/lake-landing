import { useRef } from 'react';
import { useHeroProgress } from '../hooks/useHeroProgress';
import { Language, UiCopy } from '../siteContent';
import { AsciiFisherman } from './AsciiFisherman';

interface HeroExperienceProps {
  contactHref: string;
  content: UiCopy['hero'];
  language: Language;
  onReleaseChange: (isReleased: boolean) => void;
}

export const HeroExperience = ({
  contactHref,
  content,
  language,
  onReleaseChange,
}: HeroExperienceProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const engravingRef = useRef<HTMLImageElement>(null);
  const asciiRef = useRef<SVGSVGElement>(null);
  const brandLineRef = useRef<HTMLParagraphElement>(null);
  const { isReleased, prefersReducedMotion } = useHeroProgress(
    heroRef,
    {
      asciiRef,
      brandLineRef,
      engravingRef,
    },
    {
      onReleaseChange,
    }
  );
  const heroTitleId = `hero-title-${language}`;
  const classes = [
    'hero-experience',
    isReleased ? 'hero-experience--released' : '',
    prefersReducedMotion ? 'hero-experience--reduced' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      ref={heroRef}
      className={classes}
      aria-labelledby={heroTitleId}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
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
          <h1 id={heroTitleId}>{content.typingTexts[0]}</h1>
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

        <div className="fisherman-art" aria-hidden="true">
          <div className="fisherman-art__viewport">
            <img
              ref={engravingRef}
              className="fisherman-art__layer fisherman-art__source fisherman-art__engraving"
              src="/fishman.png"
              alt=""
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
          className="hero-experience__brand-line"
          aria-hidden="true"
        >
          {content.tagline}
        </p>
      </div>
    </section>
  );
};
