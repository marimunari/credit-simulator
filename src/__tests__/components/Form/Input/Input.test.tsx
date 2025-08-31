// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import Input from '@/src/components/Form/Input/Input';

// external libs
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('Input component', () => {
  const label = 'Full name';
  const id = 'fullName';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  it('renders label and input correctly', () => {
    mockTheme(false);
    render(<Input label={label} id={id} />);

    const labelElement = screen.getByTestId('input-label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(label);

    const inputElement = screen.getByTestId('input-element');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', id);
    expect(inputElement).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders required asterisk if required is true', () => {
    mockTheme(false);
    render(<Input label={label} id={id} required />);

    const requiredAsterisk = screen.getByTestId('input-required');
    expect(requiredAsterisk).toBeInTheDocument();
    expect(requiredAsterisk).toHaveTextContent('*');
  });

  it('renders error message and sets aria attributes correctly', () => {
    mockTheme(false);
    const errorMessage = 'Campo obrigatório';
    render(<Input label={label} id={id} error={errorMessage} />);

    const errorElement = screen.getByTestId('input-error');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMessage);

    const inputElement = screen.getByTestId('input-element');
    expect(inputElement).toHaveAttribute('aria-invalid', 'true');
    expect(inputElement).toHaveAttribute('aria-describedby', `${id}-error`);
  });

  it('passes additional props to input element', () => {
    mockTheme(false);
    render(<Input label={label} id={id} placeholder="Digite seu nome" maxLength={20} />);

    const inputElement = screen.getByTestId('input-element');
    expect(inputElement).toHaveAttribute('placeholder', 'Digite seu nome');
    expect(inputElement).toHaveAttribute('maxLength', '20');
  });

  it('accepts and calls onChange handler', async () => {
    mockTheme(false);
    const handleChange = jest.fn();
    render(<Input label={label} id={id} onChange={handleChange} />);

    const inputElement = screen.getByTestId('input-element');
    await userEvent.type(inputElement, 'John');

    expect(handleChange).toHaveBeenCalled();
  });
});
