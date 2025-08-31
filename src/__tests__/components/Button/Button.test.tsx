// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import Button from '@/src/components/Button/Button';

// external libs
import { render, screen, fireEvent } from '@testing-library/react';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('Button component', () => {
  const BUTTON_TEXT = 'Button Text';
  const PRIMARY_TEXT = 'Primary Button';
  const SECONDARY_TEXT = 'Secondary Button';
  const DISABLED_TEXT = 'Disabled Button';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  it('renders the button with correct text', () => {
    mockTheme(false);
    render(<Button>{BUTTON_TEXT}</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(BUTTON_TEXT);
  });

  it('calls onClick handler when clicked', () => {
    mockTheme(false);
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>{BUTTON_TEXT}</Button>);
    const button = screen.getByTestId('button');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct classes for primary variant in light mode', () => {
    mockTheme(false);
    render(<Button variant="primary">{PRIMARY_TEXT}</Button>);
    const button = screen.getByTestId('button');

    expect(button).toHaveClass('bg-[#4F9E00]');
    expect(button).toHaveClass('text-white');
  });

  it('applies correct classes for secondary variant in dark mode', () => {
    mockTheme(true);
    render(<Button variant="secondary">{SECONDARY_TEXT}</Button>);
    const button = screen.getByTestId('button');

    expect(button).toHaveClass('bg-[#2C2C2C]');
    expect(button).toHaveClass('text-[#F1F3F2]');
  });

  it('disables the button and applies disabled styles when disabled prop is true', () => {
    mockTheme(false);
    render(<Button disabled>{DISABLED_TEXT}</Button>);
    const button = screen.getByTestId('button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveClass('cursor-not-allowed');
  });
});
