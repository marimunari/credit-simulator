'use client';

// system
import React, { useState, useEffect, useTransition, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

// contexts
import { useSimulation } from '@/src/contexts/SimulationContext/SimulationContext';
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// custom hooks
import { useRouteGuard } from '@/src/hooks/useRouteGuard/useRouteGuard';

// internal components
import Input from '@/src/components/Form/Input/Input';
import Button from '@/src/components/Button/Button';
import LoadingSpinner from '@/src/components/LoadingSpinner/LoadingSpinner';

// utils
import { validateLoanForm, checkFormInvalid, FormErrors } from '@/src/utils/simulationUtils';

// types
type VariantClass = 'container' | 'header' | 'description';
type ThemeVariantClasses = 'light' | 'dark';

export default function LoanDetailsPage() {
  const router = useRouter();
  const { birthDate, loanData, setLoanData } = useSimulation();
  const { darkMode } = useTheme();

  const [isPending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [amount, setAmount] = useState<string>('');
  const [term, setTerm] = useState<string>('');

  const baseContainerClasses = 'w-full max-w-md mx-auto flex flex-col gap-6 px-4 py-10';
  const headerBaseClasses = 'text-2xl font-bold mb-2';
  const descriptionBaseClasses = 'mb-4';

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      container: 'bg-white text-gray-900',
      header: 'text-gray-900',
      description: 'text-gray-600'
    },
    dark: {
      container: 'bg-[#2C2C2C] text-[#F1F3F2]',
      header: 'text-[#F1F3F2]',
      description: 'text-[#F1F3F2]'
    }
  };

  useRouteGuard(() => !!birthDate, '/simulation/personal-data');

  useEffect(() => {
    initializeLoanForm();
  }, [loanData, birthDate]);

  /**
   * Method responsible for initializing the form fields if there is data.
   *
   * @returns {void}
   */
  const initializeLoanForm = (): void => {
    if (loanData.amount !== null && loanData.term !== null) {
      setAmount(loanData.amount);
      setTerm(String(loanData.term));
    }
  };

  /**
   * Method responsible for validating form inputs and continuing to the summary page.
   *
   * @returns {void}
   */
  const handleContinue = (): void => {
    const errors: FormErrors = validateLoanForm(amount, term);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoanData({ amount, term: Number(term) });

      startTransition(() => {
        router.push('/simulation/summary');
      });
    }
  };

  /**
   * Method responsible for navigating back to the personal data page.
   *
   * @returns {void}
   */
  const handleBack = (): void => {
    startTransition(() => {
      router.push('/simulation/personal-data');
    });
  };

  const isFormInvalid: boolean = checkFormInvalid(amount, term, isPending);

  /**
   * Method responsible for handling Enter key press to trigger the proper action.
   *
   * @param {KeyboardEvent} e - Keyboard event object
   * @returns {void}
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
    if (e.key === 'Enter') {
      if (!isFormInvalid) {
        handleContinue();
      } else {
        handleBack();
      }
    }
  };

  return (
    <>
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50 min-h-screen"
          role="status"
          aria-label="Carregando"
        >
          <LoadingSpinner />
        </div>
      )}

      <main
        className={`${baseContainerClasses} ${
          darkMode ? variantClasses.dark.container : variantClasses.light.container
        }`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <header>
          <h1
            className={`${headerBaseClasses} ${
              darkMode ? variantClasses.dark.header : variantClasses.light.header
            }`}
          >
            Detalhes do empréstimo
          </h1>
          <p
            className={`${descriptionBaseClasses} ${
              darkMode ? variantClasses.dark.description : variantClasses.light.description
            }`}
          >
            Informe o valor desejado e o prazo de pagamento para continuarmos.
          </p>
        </header>

        <Input
          label="Valor do empréstimo"
          id="loanAmount"
          type="text"
          placeholder="100.000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={formErrors.amount}
          required
          disabled={isPending}
        />

        <Input
          label="Prazo de pagamento (meses)"
          id="loanTerm"
          type="number"
          placeholder="12"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          error={formErrors.term}
          required
          disabled={isPending}
        />

        <div className="flex justify-between gap-4 mt-6">
          <Button
            variant="secondary"
            onClick={handleBack}
            className="w-2/5 h-10"
            disabled={isPending}
            aria-disabled={isPending}
          >
            Voltar
          </Button>

          <Button
            variant="primary"
            onClick={handleContinue}
            className="w-3/5 h-10"
            disabled={isFormInvalid}
            aria-disabled={isFormInvalid}
          >
            Simular
          </Button>
        </div>
      </main>
    </>
  );
}
