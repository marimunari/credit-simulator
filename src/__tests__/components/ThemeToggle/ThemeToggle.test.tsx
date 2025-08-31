// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import ThemeToggle from '@/src/components/ThemeToggle/ThemeToggle';

// external libs
import { render, screen, fireEvent } from '@testing-library/react';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('ThemeToggle component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTheme = (darkMode = false) => {
    const mockThemeReturn = useThemeMock(darkMode);
    (useTheme as jest.Mock).mockReturnValue(mockThemeReturn);
    return mockThemeReturn;
  };

  it('renders with light mode styles and moon icon when darkMode is false', () => {
    mockTheme(false);
    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveAttribute('aria-label', 'Ativar modo escuro');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with dark mode styles and sun icon when darkMode is true', () => {
    mockTheme(true);
    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-[#1D1D1D]');
    expect(button).toHaveAttribute('aria-label', 'Ativar modo claro');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('calls toggleDarkMode on button click', () => {
    const { toggleDarkMode } = mockTheme(false);

    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');

    fireEvent.click(button);

    expect(toggleDarkMode).toHaveBeenCalledTimes(1);
  });
});
