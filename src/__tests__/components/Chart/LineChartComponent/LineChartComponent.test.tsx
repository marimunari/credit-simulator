// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import LineChartComponent from '@/src/components/Chart/LineChartComponent/LineChartComponent';

// external libs
import { render, screen } from '@testing-library/react';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

const MOCK_DATA = [
  { month: 'Jan', interest: 100 },
  { month: 'Feb', interest: 120 },
  { month: 'Mar', interest: 90 }
];

describe('LineChartComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  it('renders title and container correctly and accessibility attributes', () => {
    setupMockTheme(false);
    render(<LineChartComponent data={MOCK_DATA} />);

    const section = screen.getByLabelText(/gráfico de linhas da evolução dos juros/i);
    expect(section).toBeInTheDocument();

    const title = screen.getByTestId('line-chart-title');
    expect(title).toHaveTextContent(/evolução dos juros/i);
  });
});
