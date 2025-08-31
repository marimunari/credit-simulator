// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import BarChartComponent from '@/src/components/Chart/BarChartComponent/BarChartComponent';

// external libs
import { render, screen } from '@testing-library/react';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

const MOCK_DATA = [
  { month: 'Jan', payment: 1000 },
  { month: 'Feb', payment: 1200 },
  { month: 'Mar', payment: 900 }
];

describe('BarChartComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  it('renders title and container with correct text and accessibility attributes', () => {
    setupMockTheme(false);
    render(<BarChartComponent data={MOCK_DATA} />);

    const section = screen.getByLabelText(/gráfico de barras de evolução de pagamento/i);
    expect(section).toBeInTheDocument();

    const title = screen.getByText(/evolução de pagamento/i);
    expect(title).toBeInTheDocument();
  });
});
