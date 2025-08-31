// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import LoadingSpinner from '@/src/components/LoadingSpinner/LoadingSpinner';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

// external libs
import { render, screen } from '@testing-library/react';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('LoadingSpinner component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  it('renders the spinner with correct base classes', () => {
    mockTheme(false);
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      'fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center'
    );
  });

  it('applies light mode styles when darkMode is false', () => {
    mockTheme(false);
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('bg-white');
    expect(spinner).not.toHaveClass('bg-[#2C2C2C]');
  });

  it('applies dark mode styles when darkMode is true', () => {
    mockTheme(true);
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('bg-[#2C2C2C]');
    expect(spinner).not.toHaveClass('bg-white');
  });

  it('applies additional className passed as prop', () => {
    mockTheme(false);
    render(<LoadingSpinner className="custom-class" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('custom-class');
  });

  it('has correct accessibility attributes', () => {
    mockTheme(false);
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveAttribute('role', 'status');
    expect(spinner).toHaveAttribute('aria-label', 'Carregando');
  });
});
