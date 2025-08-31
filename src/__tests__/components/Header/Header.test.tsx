// system
import React from 'react';
import { render, screen } from '@testing-library/react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import Header from '@/src/components/Header/Header';

// internal icons
import LightModePrimaryLogo from '@/src/assets/icons/primary_logo.svg';
import DarkModePrimaryLogo from '@/src/assets/icons/primary_logo_dark.svg';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('next/image', () => require('../../../__mocks__/nextImage.mock'));

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('Header component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  it('renders header with light mode logo and correct classes', () => {
    mockTheme(false);
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('bg-white');
    expect(header).toHaveClass('border-b');

    const logo = screen.getByTestId('header-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', 'Logo Creditas — página inicial');
    expect(logo).toHaveAttribute('src', LightModePrimaryLogo.src);
  });

  it('renders header with dark mode logo and correct classes', () => {
    mockTheme(true);
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('bg-[#1D1D1D]');
    expect(header).toHaveClass('border-b');

    const logo = screen.getByTestId('header-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', 'Logo Creditas — página inicial');
    expect(logo).toHaveAttribute('src', DarkModePrimaryLogo.src);
  });

  it('renders navigation with correct aria-label', () => {
    mockTheme(false);
    render(<Header />);

    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    expect(nav).toBeInTheDocument();
  });
});
