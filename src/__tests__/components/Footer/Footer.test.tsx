// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import Footer from '@/src/components/Footer/Footer';

// external libs
import { render, screen } from '@testing-library/react';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('Footer component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  it('renders footer with logo and copyright text in light mode', () => {
    setupMockTheme(false);
    render(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    const logo = screen.getByTestId('footer-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', 'Logo da Creditas');

    const currentYear = new Date().getFullYear();
    const copyright = screen.getByTestId('footer-copyright');
    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveTextContent(`© ${currentYear} Creditas Soluções Financeiras Ltda.`);

    expect(footer.className).toContain('bg-white');
  });

  it('renders footer with correct styles in dark mode', () => {
    setupMockTheme(true);
    render(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    expect(footer.className).toContain('bg-[#1D1D1D]');

    const copyright = screen.getByTestId('footer-copyright');
    expect(copyright).toHaveClass('text-[#F1F3F2]');
  });
});
