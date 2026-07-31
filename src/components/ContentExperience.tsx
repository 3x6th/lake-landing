import { CSSProperties } from 'react';
import { createMailtoHref, Language, UiCopy } from '../siteContent';
import { FishermanInterlude } from './FishermanInterlude';

interface ContentExperienceProps {
  content: UiCopy;
  language: Language;
}

/** Staggers an item inside its group; see the [data-reveal] rule in App.css. */
const revealOrder = (index: number) =>
  ({ '--reveal-index': index }) as CSSProperties;

export const ContentExperience = ({
  content,
  language,
}: ContentExperienceProps) => (
  <>
    <section
      className="proof-rail content-shell"
      aria-label={content.proofAriaLabel}
    >
      <ul className="proof-rail__list">
        {content.proof.map((fact, index) => (
          <li
            className="proof-rail__item"
            key={fact.label}
            data-reveal
            style={revealOrder(index)}
          >
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </li>
        ))}
      </ul>
    </section>

    <section id="offers" className="content-section content-shell">
      <header className="section-heading section-heading--wide" data-reveal>
        <p className="section-label">{content.offers.label}</p>
        <h2>{content.offers.title}</h2>
        <p>{content.offers.introduction}</p>
      </header>

      <div className="offer-list">
        {content.offers.items.map((offer, index) => (
          <article
            className="offer-row"
            key={offer.title}
            data-reveal
            style={revealOrder(index)}
          >
            <div className="offer-row__lead">
              <h3>{offer.title}</h3>
              <p>{offer.summary}</p>
            </div>
            <ul className="offer-row__details">
              {offer.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <a
              className="text-link"
              href={createMailtoHref(offer.subject)}
            >
              {offer.cta}
              <span aria-hidden="true"> ↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>

    <section id="work" className="content-section work-section">
      <div className="content-shell">
        <header className="section-heading section-heading--wide" data-reveal>
          <p className="section-label">{content.work.label}</p>
          <h2>{content.work.title}</h2>
          <p>{content.work.introduction}</p>
        </header>

        <article className="taska-case" data-reveal>
          <div className="taska-case__copy">
            <p className="status-label">{content.work.taska.status}</p>
            <h3>{content.work.taska.title}</h3>
            <p>{content.work.taska.description}</p>
            <p className="case-note">{content.work.taska.note}</p>
          </div>

          <div className="taska-spread">
            <figure className="taska-spread__primary">
              <div className="case-image-frame">
                <img
                  src="/media/cases/taska-board.webp"
                  width="989"
                  height="898"
                  loading="lazy"
                  decoding="async"
                  alt={content.work.taska.boardAlt}
                />
              </div>
              <figcaption>{content.work.taska.boardCaption}</figcaption>
            </figure>
            <figure className="taska-spread__secondary">
              <div className="case-image-frame">
                <img
                  src="/media/cases/taska-projects.webp"
                  width="1234"
                  height="768"
                  loading="lazy"
                  decoding="async"
                  alt={content.work.taska.projectsAlt}
                />
              </div>
              <figcaption>{content.work.taska.projectsCaption}</figcaption>
            </figure>
          </div>
        </article>
      </div>
    </section>

    <div className="research-band">
      <article className="content-shell research-case">
        <div className="research-case__copy" data-reveal>
          <p className="status-label">{content.work.ai.status}</p>
          <h3>{content.work.ai.title}</h3>
          <p>{content.work.ai.description}</p>
        </div>

        <ol
          className="knowledge-flow"
          aria-label={content.work.ai.flowAriaLabel}
        >
          {content.work.ai.steps.map((step, index) => (
            <li
              className="knowledge-flow__step"
              key={step.title}
              data-reveal
              style={revealOrder(index)}
            >
              <span className="knowledge-flow__marker" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h4>{step.title}</h4>
                <p>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="research-case__note">{content.work.ai.note}</p>
      </article>
    </div>

    <FishermanInterlude content={content.hero} />

    <section id="process" className="content-section content-shell">
      <header className="section-heading" data-reveal>
        <p className="section-label">{content.process.label}</p>
        <h2>{content.process.title}</h2>
        <p>{content.process.introduction}</p>
      </header>

      <ol className="process-list">
        {content.process.steps.map((step, index) => (
          <li
            className="process-step"
            key={step.title}
            data-reveal
            style={revealOrder(index)}
          >
            <span className="process-step__number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>

    <section className="capability-section content-shell">
      <div className="capability-section__statement" data-reveal>
        <p className="section-label">{content.capability.label}</p>
        <h2>{content.capability.title}</h2>
        <p>{content.capability.description}</p>
      </div>
      <div className="capability-section__facts" data-reveal>
        <ul>
          {content.capability.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <p>{content.capability.note}</p>
      </div>
    </section>

    <section id="faq" className="content-section faq-section content-shell">
      <header className="section-heading" data-reveal>
        <p className="section-label">{content.faq.label}</p>
        <h2>{content.faq.title}</h2>
      </header>

      <div className="faq-list">
        {content.faq.items.map((item, index) => (
          <details
            className="faq-item"
            key={item.question}
            data-reveal
            style={revealOrder(index)}
          >
            <summary>
              <span>{item.question}</span>
              <span className="faq-item__indicator" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>

    <section id="contact" className="contact-section">
      <div className="content-shell contact-section__layout">
        <div className="contact-section__copy" data-reveal>
          <p className="section-label">{content.contact.label}</p>
          <h2>{content.contact.title}</h2>
          <p>{content.contact.description}</p>
          <a
            className="contact-link"
            href={createMailtoHref(content.contact.subject)}
            aria-label={content.contact.emailAriaLabel}
          >
            {content.contact.primaryCta}
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>

        <div className="contact-section__brief" data-reveal>
          <h3>{content.contact.includeLabel}</h3>
          <ul>
            {content.contact.includeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{content.contact.privacyNote}</p>
        </div>
      </div>
    </section>

    <footer className="site-footer content-shell">
      <p>
        © {new Date().getFullYear()} {content.footer.statement}
      </p>
      <a
        href={createMailtoHref(content.footer.careersSubject)}
        aria-label={content.footer.careersAriaLabel}
      >
        {content.footer.careersLabel}
      </a>
      <a href="#top">
        {language === 'en' ? 'Back to top ↑' : 'Наверх ↑'}
      </a>
    </footer>
  </>
);
