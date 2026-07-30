import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('legacy landing after the Vite migration', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the English experience with the public hero asset', () => {
    const { container } = render(<App />);

    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(container.querySelector('.background-image')).toHaveStyle({
      backgroundImage: 'url(/fishman.png)',
    });
  });
});
