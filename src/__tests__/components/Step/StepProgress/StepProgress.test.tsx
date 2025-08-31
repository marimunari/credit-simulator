// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import StepProgress from '@/src/components/Step/StepProgress/StepProgress';

// external libs
import { render, screen } from '@testing-library/react';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('StepProgress component', () => {
  const steps = ['First step', 'Second step', 'Third step'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  it('renders the StepProgress component and all step items', () => {
    mockTheme(false);
    const currentStep = 1;

    render(<StepProgress steps={steps} currentStep={currentStep} />);

    const progress = screen.getByTestId('step-progress');
    expect(progress).toBeInTheDocument();

    steps.forEach((_, index) => {
      const stepItem = screen.getByTestId(`step-item-${index}`);
      expect(stepItem).toBeInTheDocument();
    });

    steps.forEach((stepLabel, index) => {
      const stepItem = screen.getByTestId(`step-item-${index}`);
      if (index === currentStep) {
        expect(stepItem).toHaveAttribute('aria-current', 'step');
      } else {
        expect(stepItem).not.toHaveAttribute('aria-current');
      }
    });

    steps.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
