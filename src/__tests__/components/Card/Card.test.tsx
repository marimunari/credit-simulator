// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import Card from '@/src/components/Card/Card';

// external libs
import { render, screen } from '@testing-library/react';

// mocks
import { useThemeMock } from '@/src/__mocks__/useTheme.mock';

jest.mock('@/src/contexts/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('Card component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMockTheme = (darkMode = false) => {
    (useTheme as jest.Mock).mockReturnValue(useThemeMock(darkMode));
  };

  const ICON = <svg data-testid="icon-svg" />;
  const DESC_ICON = <svg data-testid="desc-icon-svg" />;

  it('renders title and value correctly', () => {
    setupMockTheme(false);
    render(<Card title="Revenue" value="1000" icon={ICON} />);

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  it('renders icon container with the icon', () => {
    setupMockTheme(false);
    render(<Card title="Revenue" value="1000" icon={ICON} />);

    const iconContainer = screen.getByTestId('icon-container');
    expect(iconContainer).toBeInTheDocument();
    expect(screen.getByTestId('icon-svg')).toBeInTheDocument();
  });

  it('renders description and description icon when provided', () => {
    setupMockTheme(false);
    render(
      <Card
        title="Users"
        value={250}
        icon={ICON}
        description="Active users this month"
        descriptionIcon={DESC_ICON}
      />
    );

    const descriptionContainer = screen.getByTestId('description-container');
    expect(descriptionContainer).toBeInTheDocument();
    expect(screen.getByText('Active users this month')).toBeInTheDocument();

    const descriptionIcon = screen.getByTestId('description-icon');
    expect(descriptionIcon).toBeInTheDocument();
    expect(screen.getByTestId('desc-icon-svg')).toBeInTheDocument();
  });

  it('applies correct classes for default variant in light mode', () => {
    setupMockTheme(false);
    render(<Card title="Stats" value={123} icon={ICON} variant="default" />);
    const card = screen.getByRole('region');
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('text-gray-900');
  });

  it('applies correct classes for highlight variant in dark mode', () => {
    setupMockTheme(true);
    render(<Card title="Stats" value={123} icon={ICON} variant="highlight" />);
    const card = screen.getByRole('region');
    expect(card).toHaveClass('bg-[#FFFBEB]');
    expect(card).toHaveClass('text-[#FF7F32]');
  });
});
