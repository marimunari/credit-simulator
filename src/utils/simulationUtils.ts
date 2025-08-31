// interfaces
export interface FormErrors {
  /* Error message related to the loan amount field */
  amount?: string;

  /* Error message related to the loan term field (e.g., number of months) */
  term?: string;
}

/**
 * Method responsible for validating loan amount and term.
 *
 * @param {string} amount - Loan amount string.
 * @param {string} term - Loan term string.
 * @returns {FormErrors}
 */
export const validateLoanForm = (amount: string, term: string): FormErrors => {
  const errors: FormErrors = {};

  const parsedAmount = Number(amount);
  if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    errors.amount = !amount
      ? 'Informe o valor do empréstimo.'
      : Number.isNaN(parsedAmount)
        ? 'Informe um valor válido para o empréstimo.'
        : 'Informe o valor do empréstimo.';
  }

  const parsedTerm = Number(term);
  if (!term || Number.isNaN(parsedTerm) || parsedTerm <= 0) {
    errors.term = !term
      ? 'Informe o prazo de pagamento.'
      : Number.isNaN(parsedTerm)
        ? 'Informe um prazo válido de pagamento.'
        : 'Informe o prazo de pagamento.';
  }

  return errors;
};

/**
 * Method responsible for checking if the form is invalid.
 *
 * @param {string} amount - Loan amount string.
 * @param {string} term - Loan term string.
 * @param {boolean} isPending - Loading state.
 * @returns {boolean}
 */
export const checkFormInvalid = (amount: string, term: string, isPending: boolean): boolean => {
  const parsedAmount = Number(amount);
  const parsedTerm = Number(term);
  return !amount || !term || parsedAmount <= 0 || parsedTerm <= 0 || isPending;
};
