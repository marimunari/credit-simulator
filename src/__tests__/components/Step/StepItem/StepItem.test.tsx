// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import StepItem from '@/src/components/Step/StepItem/StepItem';

// external libs
import { render, screen } from '@testing-library/react';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('StepItem component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  it('renders with correct label and circle content when current', () => {
    mockTheme(false);
    render(
      <StepItem
        index={0}
        label="Primeira etapa"
        isCurrent={true}
        isCompleted={false}
        isLast={false}
      />
    );

    const container = screen.getByTestId('step-item-0');
    expect(container).toBeInTheDocument();

    const circle = screen.getByTestId('step-circle-0');
    expect(circle).toHaveTextContent('1');

    const label = screen.getByTestId('step-label-0');
    expect(label).toHaveTextContent('Primeira etapa');

    const line = screen.getByTestId('step-line-0');
    expect(line).toBeInTheDocument();
  });

  it('renders without line when isLast is true', () => {
    mockTheme(false);
    render(
      <StepItem index={2} label="Última etapa" isCurrent={false} isCompleted={true} isLast={true} />
    );

    const container = screen.getByTestId('step-item-2');
    expect(container).toBeInTheDocument();

    const line = screen.queryByTestId('step-line-2');
    expect(line).toBeNull();
  });

  it('renders empty circle content when not current', () => {
    mockTheme(false);
    render(
      <StepItem
        index={1}
        label="Segunda etapa"
        isCurrent={false}
        isCompleted={false}
        isLast={false}
      />
    );

    const circle = screen.getByTestId('step-circle-1');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveTextContent('');
  });
});
