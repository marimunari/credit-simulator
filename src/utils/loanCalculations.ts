/**
 * Method responsible for calculating the monthly payment of a loan.
 *
 * @param {number} principal - The total loan amount
 * @param {number} months - The total number of months
 * @param {number} annualInterestRate - The annual interest rate (in %)
 * @returns {number}
 */
export const calculateMonthlyPayment = (
  principal: number,
  months: number,
  annualInterestRate: number
): number => {
  if (
    isNaN(principal) ||
    isNaN(months) ||
    isNaN(annualInterestRate) ||
    principal <= 0 ||
    months <= 0 ||
    annualInterestRate < 0
  )
    return 0;

  const monthlyRate = annualInterestRate / 12 / 100;
  if (monthlyRate === 0) return principal / months;

  const compoundFactor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * compoundFactor) / (compoundFactor - 1);
};

/**
 * Method responsible for formatting a number as BRL currency.
 *
 * @param {number} value - The numeric value to format
 * @returns {string}
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Method responsible for parsing a currency input string into a numeric value.
 *
 * @param {string} value - The input string (ex: "R$ 100.000,50")
 * @returns {number}
 */
export const parseCurrencyInput = (value: string): number => {
  if (!value) return 0;

  const clean = value.replace(/[^\d,,-.]/g, '').replace(/\./g, '');
  const normalized = clean.replace(',', '.');
  const num = parseFloat(normalized);

  return isNaN(num) ? 0 : num;
};

/**
 * Method responsible for determining the annual interest rate based on the user's age.
 *
 * @param {Date | null} birthDate - The user's birth date
 * @returns {number}
 */
export const getAnnualInterestRate = (birthDate: Date | null): number => {
  if (!birthDate) return 0;

  const today = new Date();
  if (birthDate > today) return 0;

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age <= 25) return 5;
  if (age <= 40) return 3;
  if (age <= 60) return 2;
  return 4;
};
