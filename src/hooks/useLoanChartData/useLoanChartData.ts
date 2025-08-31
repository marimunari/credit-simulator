// system
import { useMemo } from 'react';

// types
export type BarChartData = {
  /* The month to which the data refers (e.g., 'January', 'February', etc.) */
  month: string;

  /* The principal value of the loan for the specific month */
  principal: number;

  /* The interest amount paid for the specific month */
  interest: number;

  /* The total payment made in the specific month (principal + interest) */
  payment: number;
};

export type LineChartData = {
  /* The month to which the data refers (e.g., 'January', 'February', etc.) */
  month: string;

  /* The interest amount paid for the specific month */
  interest: number;
};

type LoanChartData = {
  /* Array of data for the bar chart */
  generateBarChartData: BarChartData[];

  /* Array of data for the line chart */
  generateLineChartData: LineChartData[];
};

export const useLoanChartData = (
  principal: number,
  months: number,
  monthlyPayment: number,
  annualInterestRate: number
): LoanChartData => {
  /**
   * Method responsible for generating data for the bar chart (principal, interest, total payment per month).
   *
   * @returns {BarChartData[]}
   */
  const generateBarChartData: BarChartData[] = useMemo<BarChartData[]>(() => {
    const data: BarChartData[] = [];
    let remainingPrincipal: number = principal;
    const monthlyInterestRate: number = annualInterestRate / 12 / 100;

    for (let i: number = 1; i <= months; i++) {
      const interestPayment: number = remainingPrincipal * monthlyInterestRate;
      const principalPayment: number = monthlyPayment - interestPayment;
      remainingPrincipal -= principalPayment;

      data.push({
        month: String(i),
        principal: principalPayment,
        interest: interestPayment,
        payment: principalPayment + interestPayment
      });
    }

    return data;
  }, [principal, monthlyPayment, months, annualInterestRate]);

  /**
   * Method responsible for generating data for the line chart (interest evolution per month).
   *
   * @returns {LineChartData[]}
   */
  const generateLineChartData: LineChartData[] = useMemo<LineChartData[]>(() => {
    const data: LineChartData[] = [];
    let remainingPrincipal: number = principal;
    const monthlyInterestRate: number = annualInterestRate / 12 / 100;

    for (let i: number = 1; i <= months; i++) {
      const interestPayment: number = remainingPrincipal * monthlyInterestRate;
      remainingPrincipal -= monthlyPayment - interestPayment;

      data.push({
        month: String(i),
        interest: interestPayment
      });
    }

    return data;
  }, [principal, monthlyPayment, months, annualInterestRate]);

  return { generateBarChartData, generateLineChartData };
};
