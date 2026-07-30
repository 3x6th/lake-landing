import { useEffect, useRef, useState } from 'react';
import './App.css';
import { ContentExperience } from './components/ContentExperience';
import { HeroExperience } from './components/HeroExperience';
import {
  createMailtoHref,
  LANGUAGE_STORAGE_KEY,
  Language,
  uiCopy,
} from './siteContent';

const resolveInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const storedLanguage = window.localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    );

    if (storedLanguage === 'ru' || storedLanguage === 'en') {
      return storedLanguage;
    }
  }

  return 'en';
};

function App() {
  const [language, setLanguage] = useState<Language>(
    resolveInitialLanguage
  );
  const [isHeroReleased, setIsHeroReleased] = useState(false);
  const mobileNavigationRef = useRef<HTMLDetailsElement>(null);
  const content = uiCopy[language];
  const navigationItems = [
    { href: '#offers', label: content.nav.offers },
    { href: '#work', label: content.nav.work },
    { href: '#process', label: content.nav.process },
    { href: '#faq', label: content.nav.faq },
    { href: '#contact', label: content.nav.contact },
  ];

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const closeMobileNavigation = () => {
    if (mobileNavigationRef.current) {
      mobileNavigationRef.current.open = false;
    }
  };

  return (
    <div className="App" id="top">
      <header
        className={`top-nav ${isHeroReleased ? 'top-nav--solid' : ''}`}
      >
        <a className="nav-wordmark" href="#top" aria-label="Ozero Dev">
          ozero.dev
        </a>

        <nav className="main-nav" aria-label={content.navAriaLabel}>
          {navigationItems.map((item) => (
            <a className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <details className="mobile-nav" ref={mobileNavigationRef}>
          <summary>{content.nav.menu}</summary>
          <nav
            className="mobile-nav__links"
            aria-label={`${content.navAriaLabel} — ${content.nav.menu}`}
          >
            {navigationItems.map((item) => (
              <a
                href={item.href}
                key={item.href}
                onClick={closeMobileNavigation}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </details>

        <div
          className="language-switch"
          role="group"
          aria-label={content.languageSwitcherAriaLabel}
        >
          {(['ru', 'en'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              className={`language-button ${
                language === lang ? 'active' : ''
              }`}
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
          contactHref={createMailtoHref(content.contact.subject)}
          content={content.hero}
          language={language}
          onReleaseChange={setIsHeroReleased}
        />
        <ContentExperience content={content} language={language} />
      </main>
    </div>
  );
}

export default App;
