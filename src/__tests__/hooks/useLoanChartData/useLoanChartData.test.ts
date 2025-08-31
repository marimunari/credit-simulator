// custom hooks
import { useLoanChartData } from '@/src/hooks/useLoanChartData/useLoanChartData';

// external libs
import { renderHook } from '@testing-library/react';

describe('useLoanChartData', () => {
  it('should generate correct chart data for known inputs', () => {
    const principal = 10000;
    const months = 2;
    const annualInterestRate = 12;
    const monthlyPayment = 5060.44;

    const { result } = renderHook(() =>
      useLoanChartData(principal, months, monthlyPayment, annualInterestRate)
    );

    const barData = result.current.generateBarChartData;
    const lineData = result.current.generateLineChartData;

    expect(barData.length).toBe(2);
    expect(lineData.length).toBe(2);

    expect(barData[0]).toMatchObject({
      month: '1',
      principal: expect.any(Number),
      interest: expect.any(Number),
      payment: expect.any(Number)
    });

    expect(lineData[0]).toMatchObject({
      month: '1',
      interest: expect.any(Number)
    });

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const expectedInterestFirstMonth = principal * monthlyInterestRate;

    expect(barData[0].interest).toBeCloseTo(expectedInterestFirstMonth, 2);
    expect(lineData[0].interest).toBeCloseTo(expectedInterestFirstMonth, 2);

    const expectedPrincipalFirstMonth = monthlyPayment - expectedInterestFirstMonth;

    expect(barData[0].principal).toBeCloseTo(expectedPrincipalFirstMonth, 2);
  });

  it('should return empty arrays for zero months or principal', () => {
    const { result } = renderHook(() => useLoanChartData(0, 0, 0, 10));

    expect(result.current.generateBarChartData).toEqual([]);
    expect(result.current.generateLineChartData).toEqual([]);
  });

  it('should handle zero interest rate correctly', () => {
    const principal = 10000;
    const months = 2;
    const annualInterestRate = 0;
    const monthlyPayment = 5000;

    const { result } = renderHook(() =>
      useLoanChartData(principal, months, monthlyPayment, annualInterestRate)
    );

    const barData = result.current.generateBarChartData;
    const lineData = result.current.generateLineChartData;

    expect(barData.length).toBe(2);
    expect(lineData.length).toBe(2);

    expect(barData[0].interest).toBe(0);
    expect(lineData[0].interest).toBe(0);
  });

  it('should handle a larger number of months correctly', () => {
    const principal = 10000;
    const months = 12;
    const annualInterestRate = 12;
    const monthlyPayment = 8791.59;

    const { result } = renderHook(() =>
      useLoanChartData(principal, months, monthlyPayment, annualInterestRate)
    );

    const barData = result.current.generateBarChartData;
    const lineData = result.current.generateLineChartData;

    expect(barData.length).toBe(12);
    expect(lineData.length).toBe(12);

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const expectedInterestFirstMonth = principal * monthlyInterestRate;
    expect(barData[0].interest).toBeCloseTo(expectedInterestFirstMonth, 2);
    expect(lineData[0].interest).toBeCloseTo(expectedInterestFirstMonth, 2);
  });
});
