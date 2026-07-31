import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { CONTACT_EMAIL, LANGUAGE_STORAGE_KEY } from './siteContent';

const mockMotionPreference = (prefersReducedMotion = false) => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches:
        query === '(prefers-reduced-motion: reduce)' &&
        prefersReducedMotion,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
    }))
  );
};

describe('Ozero landing experience', () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockMotionPreference();
  });

  it('uses English as the default and exposes the complete primary navigation', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'ozero.dev' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Java-first engineers and focused product squads can realistically start in one to three weeks.'
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/ready to join|usually takes/i)
    ).not.toBeInTheDocument();

    const navigation = screen.getByRole('navigation', {
      name: 'Site navigation',
    });

    [
      ['Offers', '#offers'],
      ['Work', '#work'],
      ['Process', '#process'],
      ['FAQ', '#faq'],
      ['Contact', '#contact'],
    ].forEach(([name, href]) => {
      expect(
        within(navigation).getByRole('link', { name })
      ).toHaveAttribute('href', href);
    });

    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');
  });

  it('publishes the approved facts and honest work statuses', () => {
    render(<App />);

    const proof = screen.getByRole('region', {
      name: 'Delivery facts',
    });
    expect(within(proof).getByText('≈30')).toBeInTheDocument();
    expect(within(proof).getByText('1–3 weeks')).toBeInTheDocument();
    expect(within(proof).getByText('1 engineer')).toBeInTheDocument();
    expect(within(proof).getByText('1 month')).toBeInTheDocument();

    expect(screen.getByText('IN DEVELOPMENT')).toBeInTheDocument();
    expect(
      screen.getByText('INTERNAL R&D · ANONYMIZED')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'This is an active development project, not a completed customer case.'
      )
    ).toBeInTheDocument();
  });

  it('keeps full Russian content parity and persists the locale', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'RU' }));

    const navigation = screen.getByRole('navigation', {
      name: 'Навигация по сайту',
    });

    ['Форматы', 'Проекты', 'Процесс', 'Вопросы', 'Контакты'].forEach(
      (name) => {
        expect(
          within(navigation).getByRole('link', { name })
        ).toBeInTheDocument();
      }
    );

    expect(screen.getByText('В РАЗРАБОТКЕ')).toBeInTheDocument();
    expect(
      screen.getByText('ВНУТРЕННИЙ R&D · АНОНИМИЗИРОВАНО')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Можно начать с одного специалиста?')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Управляемая разработка' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /Обсудить управляемую разработку/,
      })
    ).toHaveAttribute(
      'href',
      `mailto:${CONTACT_EMAIL}?subject=Ozero%20Dev%20%E2%80%94%20%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D1%8F%D0%B5%D0%BC%D0%B0%D1%8F%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0`
    );
    expect(screen.queryByText(/под ключ/i)).not.toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'ru');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('ru');
  });

  it('leaves no revealed block hidden after a language switch', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    // List keys are content-based, so switching locale remounts most
    // [data-reveal] nodes. Whatever marks them revealed has to run again for
    // the replacements, otherwise CSS holds them at opacity 0 permanently.
    expect(
      container.querySelectorAll('[data-reveal]:not(.is-revealed)')
    ).toHaveLength(0);

    await user.click(screen.getByRole('button', { name: 'RU' }));

    const stillHidden = Array.from(
      container.querySelectorAll('[data-reveal]:not(.is-revealed)')
    ).map((node) => node.className || node.tagName);

    expect(stillHidden).toEqual([]);
  });

  it('restores a previously selected locale', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'ru');

    render(<App />);

    expect(
      screen.getByText(
        'Реалистичный срок выхода Java-разработчика или небольшой продуктовой команды на проект — одна–три недели.'
      )
    ).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'ru');
  });

  it('derives every contact action from the configured email', () => {
    const { container } = render(<App />);
    const mailLinks = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]')
    );

    expect(mailLinks.length).toBeGreaterThanOrEqual(6);

    mailLinks.forEach((link) => {
      expect(link.href).toContain(
        `mailto:${CONTACT_EMAIL}?subject=`
      );
      expect(link.getAttribute('href')).not.toContain('undefined');
      const encodedSubject = link
        .getAttribute('href')
        ?.split('?subject=')[1];
      expect(decodeURIComponent(encodedSubject ?? '')).toMatch(
        /^Ozero Dev — /
      );
    });

    expect(
      screen.getByRole('link', { name: `Send a project inquiry to ${CONTACT_EMAIL}` })
    ).toHaveAttribute(
      'href',
      `mailto:${CONTACT_EMAIL}?subject=Ozero%20Dev%20%E2%80%94%20project%20inquiry`
    );
  });

  it('closes the mobile menu after selecting an anchor', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const menu = container.querySelector<HTMLDetailsElement>(
      '.mobile-nav'
    );

    expect(menu).not.toBeNull();
    if (!menu) {
      return;
    }

    menu.open = true;
    await user.click(
      within(menu).getByRole('link', {
        name: 'Offers',
        hidden: true,
      })
    );

    expect(menu.open).toBe(false);
  });

  it('uses optimized accessible Taska evidence and never publishes the excluded source', () => {
    const { container } = render(<App />);
    const board = screen.getByRole('img', {
      name: 'Taska dark-mode Kanban board with To Do, In Progress, and Done columns',
    });
    const projects = screen.getByRole('img', {
      name: 'Taska projects overview with three project workspaces',
    });

    expect(board).toHaveAttribute(
      'src',
      '/media/cases/taska-board.webp'
    );
    expect(board).toHaveAttribute('width', '989');
    expect(board).toHaveAttribute('height', '898');
    expect(board).toHaveAttribute('loading', 'lazy');
    expect(board).toHaveAttribute('decoding', 'async');

    expect(projects).toHaveAttribute(
      'src',
      '/media/cases/taska-projects.webp'
    );
    expect(projects).toHaveAttribute('width', '1234');
    expect(projects).toHaveAttribute('height', '768');
    expect(projects).toHaveAttribute('loading', 'lazy');
    expect(projects).toHaveAttribute('decoding', 'async');

    expect(container.innerHTML).not.toContain('taska-screanshots');
    expect(container.innerHTML).not.toContain('/img.png');
  });

  it('uses ordered flows and native FAQ disclosure without a vacancy section', () => {
    const { container } = render(<App />);

    const knowledgeFlow = screen.getByRole('list', {
      name: 'Knowledge assistant flow',
    });
    expect(knowledgeFlow.tagName).toBe('OL');
    expect(
      within(knowledgeFlow).getByText('Source library')
    ).toBeInTheDocument();
    expect(
      within(knowledgeFlow).getByText('Response with sources')
    ).toBeInTheDocument();

    expect(
      screen.getByText('A short path from the first email to useful work.')
        .closest('section')
        ?.querySelector('ol')
    ).toBeInTheDocument();
    expect(container.querySelectorAll('.faq-item')).toHaveLength(6);
    expect(container.querySelector('.faq-item')?.tagName).toBe('DETAILS');
    expect(container.querySelector('#vacancy')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /vacancy/i })
    ).not.toBeInTheDocument();
  });

  it('keeps readable content and the ASCII fisherman in reduced-motion mode', () => {
    mockMotionPreference(true);
    const { container } = render(<App />);

    expect(
      container.querySelector('.fisherman-interlude')
    ).toHaveClass('fisherman-interlude--reduced');
    expect(
      screen.getByRole('link', { name: 'Start a conversation' })
    ).toBeVisible();
    expect(
      container.querySelector('[data-ascii-status]')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Engineering capacity shaped around the work.',
      })
    ).toBeVisible();
  });
});
