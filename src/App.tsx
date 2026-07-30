import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { HeroExperience } from './components/HeroExperience';
import {
  CONTACT_EMAIL,
  LANGUAGE_STORAGE_KEY,
  Language,
  projects,
  services,
  uiCopy,
  vacancy,
} from './siteContent';

interface VacancyGroupProps {
  title: string;
  items: string[];
}

const resolveDefaultLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return 'en';
  }

  const locales = [navigator.language, ...(navigator.languages ?? [])];
  return locales.some((locale) => locale.toLowerCase().startsWith('ru'))
    ? 'ru'
    : 'en';
};

const resolveInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return resolveDefaultLanguage();
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLanguage === 'ru' || storedLanguage === 'en') {
    return storedLanguage;
  }

  return resolveDefaultLanguage();
};

const VacancyGroup: React.FC<VacancyGroupProps> = ({ title, items }) => (
  <article className="vacancy-card">
    <h4>{title}</h4>
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </article>
);

function App() {
  const [language, setLanguage] = useState<Language>(resolveInitialLanguage);
  const [isCopied, setIsCopied] = useState(false);
  const [isHeroReleased, setIsHeroReleased] = useState(false);
  const copyFeedbackTimeoutRef = useRef<number | null>(null);
  const content = uiCopy[language];
  const vacancyContent = vacancy[language];
  const projectTechAriaLabel =
    language === 'ru' ? 'Технологии проекта' : 'Project technologies';

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(
    () => () => {
      if (copyFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(copyFeedbackTimeoutRef.current);
      }
    },
    []
  );

  const copyEmail = async () => {
    let copiedSuccessfully = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        copiedSuccessfully = true;
      } catch {
        copiedSuccessfully = false;
      }
    }

    if (!copiedSuccessfully) {
      const textArea = document.createElement('textarea');
      textArea.value = CONTACT_EMAIL;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copiedSuccessfully = document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    if (copiedSuccessfully) {
      setIsCopied(true);
      if (copyFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(copyFeedbackTimeoutRef.current);
      }
      copyFeedbackTimeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 1800);
    }
  };

  return (
    <div className="App" id="top">
      <header
        className={`top-nav ${isHeroReleased ? 'top-nav--solid' : ''}`}
      >
        <nav className="main-nav" aria-label={content.navAriaLabel}>
          <a className="nav-link" href="#services">
            {content.nav.services}
          </a>
          <a className="nav-link" href="#projects">
            {content.nav.projects}
          </a>
          <a className="nav-link nav-link--vacancy" href="#vacancy">
            {content.nav.vacancy}
          </a>
          <a className="nav-link" href="#contacts">
            {content.nav.contacts}
          </a>
        </nav>

        <div
          className="language-switch"
          role="group"
          aria-label={content.languageSwitcherAriaLabel}
        >
          {(['ru', 'en'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              className={`language-button ${language === lang ? 'active' : ''}`}
              onClick={() => setLanguage(lang)}
              aria-pressed={language === lang}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main className="page-content">
        <HeroExperience
          contactEmail={CONTACT_EMAIL}
          content={content.hero}
          language={language}
          onReleaseChange={setIsHeroReleased}
        />

        <section id="services" className="section">
          <div className="glass-panel">
            <h2>{content.sections.services}</h2>
            <p className="section-subtitle">{content.servicesSubtitle}</p>
            <div className="card-grid">
              {services.map((service) => (
                <article className="info-card" key={service.title.en}>
                  <h3>{service.title[language]}</h3>
                  <p>{service.description[language]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="glass-panel">
            <h2>{content.sections.projects}</h2>
            <p className="section-subtitle">{content.projectsSubtitle}</p>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.name.en}>
                  <h3>{project.name[language]}</h3>
                  <p>{project.description[language]}</p>
                  <ul className="tech-list" aria-label={projectTechAriaLabel}>
                    {project.tech.map((tech) => (
                      <li className="tech-chip" key={tech}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="vacancy" className="section">
          <div className="glass-panel">
            <h2>{content.sections.vacancy}</h2>
            <p className="section-subtitle">{content.vacancySubtitle}</p>
            <h3 className="vacancy-role">{vacancyContent.title}</h3>
            <div className="vacancy-grid">
              <VacancyGroup
                title={vacancyContent.responsibilitiesHeading}
                items={vacancyContent.responsibilities}
              />
              <VacancyGroup
                title={vacancyContent.requirementsHeading}
                items={vacancyContent.requirements}
              />
              <VacancyGroup
                title={vacancyContent.niceToHaveHeading}
                items={vacancyContent.niceToHave}
              />
              <VacancyGroup
                title={vacancyContent.conditionsHeading}
                items={vacancyContent.conditions}
              />
            </div>
          </div>
        </section>

        <section id="contacts" className="section">
          <div className="glass-panel contacts-panel">
            <h2>{content.sections.contacts}</h2>
            <p className="section-subtitle">{content.contacts.description}</p>
            <div className="contact-email-row">
              <a
                className="email-link"
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={content.contacts.emailAriaLabel}
              >
                {CONTACT_EMAIL}
              </a>
              <button
                type="button"
                className="copy-icon-button"
                onClick={copyEmail}
                aria-label={content.contacts.copyButtonLabel}
                title={content.contacts.copyButtonLabel}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="10" height="10" rx="2" />
                  <path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                </svg>
              </button>
            </div>
            <div className="contact-actions">
              <span
                className={`copy-feedback ${isCopied ? 'visible' : ''}`}
                role="status"
                aria-live="polite"
              >
                {content.contacts.copiedLabel}
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        {`© ${new Date().getFullYear()} ozero.dev - ${content.footerSuffix}`}
      </footer>
    </div>
  );
}

export default App;
