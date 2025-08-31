// utils
import {
  calculateMonthlyPayment,
  formatCurrency,
  parseCurrencyInput,
  getAnnualInterestRate
} from '@/src/utils/loanCalculations';

describe('calculateMonthlyPayment', () => {
  it('should calculate correct monthly payment with interest', () => {
    const result = calculateMonthlyPayment(100000, 12, 10);
    expect(result).toBeCloseTo(8791.59, 2);
  });

  it('should return 0 for invalid inputs', () => {
    expect(calculateMonthlyPayment(NaN, 12, 10)).toBe(0);
    expect(calculateMonthlyPayment(100000, 0, 10)).toBe(0);
    expect(calculateMonthlyPayment(100000, 12, -1)).toBe(0);
    expect(calculateMonthlyPayment(-100000, 12, 10)).toBe(0);
  });

  it('should return principal / months when interest rate is 0', () => {
    expect(calculateMonthlyPayment(12000, 12, 0)).toBe(1000);
  });
});

describe('formatCurrency', () => {
  it('should format number to BRL currency', () => {
    expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
  });

  it('should format zero value', () => {
    expect(formatCurrency(0)).toBe('R$ 0,00');
  });

  it('should format negative values correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-R$ 1.234,56');
  });
});

describe('parseCurrencyInput', () => {
  it('should parse BRL currency string to number', () => {
    expect(parseCurrencyInput('R$ 1.234,56')).toBeCloseTo(1234.56);
  });

  it('should return 0 for invalid input', () => {
    expect(parseCurrencyInput('')).toBe(0);
    expect(parseCurrencyInput('abc')).toBe(0);
    expect(parseCurrencyInput('R$abc')).toBe(0);
    expect(parseCurrencyInput('R$1.234,56')).toBeCloseTo(1234.56);
    expect(parseCurrencyInput('1.234,56')).toBeCloseTo(1234.56);
  });
});

describe('getAnnualInterestRate', () => {
  const now = new Date();

  it('should return 5% for age <= 25', () => {
    const birthDate = new Date(now.getFullYear() - 23, now.getMonth(), now.getDate());
    expect(getAnnualInterestRate(birthDate)).toBe(5);
  });

  it('should return 3% for age between 26 and 40', () => {
    const birthDate = new Date(now.getFullYear() - 35, now.getMonth(), now.getDate());
    expect(getAnnualInterestRate(birthDate)).toBe(3);
  });

  it('should return 2% for age between 41 and 60', () => {
    const birthDate = new Date(now.getFullYear() - 50, now.getMonth(), now.getDate());
    expect(getAnnualInterestRate(birthDate)).toBe(2);
  });

  it('should return 4% for age > 60', () => {
    const birthDate = new Date(now.getFullYear() - 65, now.getMonth(), now.getDate());
    expect(getAnnualInterestRate(birthDate)).toBe(4);
  });

  it('should return 0 for null or future date', () => {
    expect(getAnnualInterestRate(null)).toBe(0);
    const futureDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    expect(getAnnualInterestRate(futureDate)).toBe(0);
  });

  it('should handle exact age boundary conditions', () => {
    const birthDate = new Date(now.getFullYear() - 25, now.getMonth(), now.getDate());
    expect(getAnnualInterestRate(birthDate)).toBe(5);

    const birthDate35 = new Date(now.getFullYear() - 26, now.getMonth(), now.getDate());
    expect(getAnnualInterestRate(birthDate35)).toBe(3);
  });
});
