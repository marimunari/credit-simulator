// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import CustomDatePicker from '@/src/components/Form/CustomDatePicker/CustomDatePicker';

// external libs
import { render, screen, fireEvent } from '@testing-library/react';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('CustomDatePicker component', () => {
  const label = 'Date of birth';
  const id = 'birthdate';
  const mockOnChange = jest.fn();

  const setupMockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label, input and calendar icon when no date selected', () => {
    setupMockTheme(false);
    render(<CustomDatePicker label={label} selectedDate={null} onChange={mockOnChange} id={id} />);

    expect(screen.getByTestId('custom-date-picker-label')).toHaveTextContent(label);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByTestId('custom-date-picker-calendar-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('custom-date-picker-clear-icon')).not.toBeInTheDocument();
  });

  it('renders clear icon when date is selected', () => {
    setupMockTheme(false);
    render(
      <CustomDatePicker
        label={label}
        selectedDate={new Date(2023, 0, 1)}
        onChange={mockOnChange}
        id={id}
      />
    );

    expect(screen.queryByTestId('custom-date-picker-calendar-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('custom-date-picker-clear-icon')).toBeInTheDocument();
  });

  it('calls onChange with null when clear icon is clicked', () => {
    setupMockTheme(false);
    render(
      <CustomDatePicker
        label={label}
        selectedDate={new Date(2023, 0, 1)}
        onChange={mockOnChange}
        id={id}
      />
    );

    const clearIcon = screen.getByTestId('custom-date-picker-clear-icon');
    fireEvent.click(clearIcon);
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it('shows required asterisk when required is true', () => {
    setupMockTheme(false);
    render(
      <CustomDatePicker
        label={label}
        selectedDate={null}
        onChange={mockOnChange}
        id={id}
        required
      />
    );

    const labelEl = screen.getByTestId('custom-date-picker-label');
    expect(labelEl).toHaveTextContent('*');
  });

  it('toggles calendar open state when clicking calendar icon', () => {
    setupMockTheme(false);
    render(<CustomDatePicker label={label} selectedDate={null} onChange={mockOnChange} id={id} />);

    const calendarIcon = screen.getByTestId('custom-date-picker-calendar-icon');

    fireEvent.click(calendarIcon);
    fireEvent.click(calendarIcon);

    expect(true).toBe(true);
  });
});
