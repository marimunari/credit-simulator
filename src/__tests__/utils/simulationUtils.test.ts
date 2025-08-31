// utils
import { validateLoanForm, checkFormInvalid } from '@/src/utils/simulationUtils';

describe('validateLoanForm', () => {
  it('should return no errors when amount and term are valid', () => {
    const result = validateLoanForm('10000', '12');
    expect(result).toEqual({});
  });

  it('should return error for empty amount', () => {
    const result = validateLoanForm('', '12');
    expect(result).toEqual({ amount: 'Informe o valor do empréstimo.' });
  });

  it('should return error for zero amount', () => {
    const result = validateLoanForm('0', '12');
    expect(result).toEqual({ amount: 'Informe o valor do empréstimo.' });
  });

  it('should return error for empty term', () => {
    const result = validateLoanForm('10000', '');
    expect(result).toEqual({ term: 'Informe o prazo de pagamento.' });
  });

  it('should return error for zero term', () => {
    const result = validateLoanForm('10000', '0');
    expect(result).toEqual({ term: 'Informe o prazo de pagamento.' });
  });

  it('should return both errors when amount and term are invalid', () => {
    const result = validateLoanForm('', '');
    expect(result).toEqual({
      amount: 'Informe o valor do empréstimo.',
      term: 'Informe o prazo de pagamento.'
    });
  });

  it('should return error for non-numeric amount', () => {
    const result = validateLoanForm('abc', '12');
    expect(result).toEqual({ amount: 'Informe um valor válido para o empréstimo.' });
  });

  it('should return error for non-numeric term', () => {
    const result = validateLoanForm('10000', 'abc');
    expect(result).toEqual({ term: 'Informe um prazo válido de pagamento.' });
  });
});

describe('checkFormInvalid', () => {
  it('should return false for valid amount, term and not pending', () => {
    expect(checkFormInvalid('10000', '12', false)).toBe(false);
  });

  it('should return true for empty amount', () => {
    expect(checkFormInvalid('', '12', false)).toBe(true);
  });

  it('should return true for empty term', () => {
    expect(checkFormInvalid('10000', '', false)).toBe(true);
  });

  it('should return true for zero amount', () => {
    expect(checkFormInvalid('0', '12', false)).toBe(true);
  });

  it('should return true for zero term', () => {
    expect(checkFormInvalid('10000', '0', false)).toBe(true);
  });

  it('should return true when isPending is true', () => {
    expect(checkFormInvalid('10000', '12', true)).toBe(true);
  });

  it('should return false when amount and term are valid and isPending is false', () => {
    expect(checkFormInvalid('10000', '12', false)).toBe(false);
  });
});
