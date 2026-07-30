import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

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

describe('cinematic hero experience', () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockMotionPreference();
  });

  it('renders readable English copy and the email CTA before motion', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'ozero.dev' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    const navigation = screen.getByRole('navigation', {
      name: 'Site navigation',
    });
    expect(
      within(navigation).getByRole('link', { name: 'Projects' })
    ).toBeInTheDocument();
    expect(
      within(navigation).getByRole('link', { name: 'Contacts' })
    ).toBeInTheDocument();
    expect(
      within(navigation).getByRole('link', { name: 'Vacancy' })
    ).toHaveClass('nav-link--vacancy');
    expect(screen.getByRole('button', { name: 'RU' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
    expect(
      screen.getByText(
        'Java-first engineers and focused product squads, ready to join in one to three weeks.'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute(
      'href',
      'mailto:javadevtechlead@gmail.com'
    );
  });

  it('updates the hero and CTA when the locale changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'RU' }));

    expect(
      screen.getByText(
        'Java-разработчики и продуктовые команды, готовые подключиться за одну–три недели.'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Написать нам' })).toHaveAttribute(
      'href',
      'mailto:javadevtechlead@gmail.com'
    );
    expect(document.documentElement).toHaveAttribute('lang', 'ru');
  });

  it('keeps the readable hero in reduced-motion mode', () => {
    mockMotionPreference(true);
    const { container } = render(<App />);

    expect(container.querySelector('.hero-experience')).toHaveAttribute(
      'data-reduced-motion',
      'true'
    );
    expect(screen.getByRole('link', { name: 'Contact us' })).toBeVisible();
    expect(
      container.querySelector('[data-ascii-status]')
    ).toBeInTheDocument();
  });
});
