// system
import { useRouter } from 'next/navigation';

// custom hooks
import { useRouteGuard } from '@/src/hooks/useRouteGuard/useRouteGuard';

// contexts
import { useSimulation } from '@/src/contexts/SimulationContext/SimulationContext';

// external libs
import { renderHook } from '@testing-library/react';

// mocks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/src/contexts/SimulationContext/SimulationContext', () => ({
  useSimulation: jest.fn()
}));

describe('useRouteGuard', () => {
  const replaceMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });
    replaceMock.mockClear();
  });

  it('does not redirect while loading', () => {
    (useSimulation as jest.Mock).mockReturnValue({
      isLoading: true,
      birthDate: null,
      loanData: { amount: null, term: null },
      setBirthDate: jest.fn(),
      setLoanData: jest.fn()
    });

    const condition = jest.fn(() => false);
    renderHook(() => useRouteGuard(condition, '/redirect'));

    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('does not redirect if condition is true', () => {
    (useSimulation as jest.Mock).mockReturnValue({
      isLoading: false,
      birthDate: null,
      loanData: { amount: null, term: null },
      setBirthDate: jest.fn(),
      setLoanData: jest.fn()
    });

    const condition = jest.fn(() => true);
    renderHook(() => useRouteGuard(condition, '/redirect'));

    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('redirects if not loading and condition is false', () => {
    (useSimulation as jest.Mock).mockReturnValue({
      isLoading: false,
      birthDate: null,
      loanData: { amount: null, term: null },
      setBirthDate: jest.fn(),
      setLoanData: jest.fn()
    });

    const condition = jest.fn(() => false);
    renderHook(() => useRouteGuard(condition, '/redirect'));

    expect(replaceMock).toHaveBeenCalledWith('/redirect');
  });
});
