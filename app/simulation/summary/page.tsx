'use client';

// system
import React, { JSX, useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';

// contexts
import { useSimulation } from '@/src/contexts/SimulationContext/SimulationContext';
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// custom hooks
import { useLoanChartData } from '@/src/hooks/useLoanChartData/useLoanChartData';
import { useRouteGuard } from '@/src/hooks/useRouteGuard/useRouteGuard';

// internal components
import Button from '@/src/components/Button/Button';
import Card, { CardProps } from '@/src/components/Card/Card';
import LoadingSpinner from '@/src/components/LoadingSpinner/LoadingSpinner';
import BarChartComponent from '@/src/components/Chart/BarChartComponent/BarChartComponent';
import LineChartComponent from '@/src/components/Chart/LineChartComponent/LineChartComponent';

// utils
import {
  calculateMonthlyPayment,
  formatCurrency,
  getAnnualInterestRate,
  parseCurrencyInput
} from '@/src/utils/loanCalculations';

// external icons
import { FaDollarSign, FaMoneyBillWave, FaPercentage } from 'react-icons/fa';

// types
type VariantClass = 'container' | 'title' | 'cards' | 'charts' | 'actions';
type ThemeVariantClasses = 'light' | 'dark';

export default function SummaryPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { birthDate, loanData } = useSimulation();
  const { darkMode } = useTheme();

  useRouteGuard(
    () => birthDate != null && loanData.amount != null && loanData.term != null,
    '/simulation/personal-data'
  );

  const principal = loanData.amount ? parseCurrencyInput(loanData.amount) : 0;
  const months = loanData.term ?? 0;
  const annualInterestRate = getAnnualInterestRate(birthDate);
  const monthlyPayment = calculateMonthlyPayment(principal, months, annualInterestRate);

  const { generateBarChartData, generateLineChartData } = useLoanChartData(
    principal,
    months,
    monthlyPayment,
    annualInterestRate
  );

  const cardData: CardProps[] = [
    {
      title: 'Valor das parcelas',
      value: formatCurrency(monthlyPayment),
      icon: <FaDollarSign size={22} />,
      description: 'Garantia do seu carro',
      descriptionIcon: <FaMoneyBillWave size={14} />
    },
    {
      title: 'Valor Total a Pagar',
      value: formatCurrency(monthlyPayment * months),
      icon: <FaMoneyBillWave size={22} />
    },
    {
      title: 'Total de Juros',
      value: formatCurrency(monthlyPayment * months - principal),
      icon: <FaPercentage size={22} />,
      variant: 'highlight',
      description: 'Taxa aplicada',
      descriptionIcon: <FaPercentage size={14} />
    }
  ];

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      container: 'bg-white text-gray-900',
      title: 'text-gray-900 text-3xl font-semibold mb-6 text-center',
      cards: 'grid grid-cols-1 md:grid-cols-3 gap-6 text-center',
      charts: 'flex flex-col sm:flex-row gap-8 border border-gray-200 rounded-lg p-6 shadow-sm',
      actions: 'flex flex-col md:flex-row justify-between gap-4 mt-6'
    },
    dark: {
      container: 'bg-[#2C2C2C] text-white',
      title: 'text-white text-3xl font-semibold mb-6 text-center',
      cards: 'grid grid-cols-1 md:grid-cols-3 gap-6 text-center',
      charts: 'flex flex-col sm:flex-row gap-8 border border-gray-700 rounded-lg p-6 shadow-sm',
      actions: 'flex flex-col md:flex-row justify-between gap-4 mt-6'
    }
  };

  /**
   * Method responsible for navigating back to the loan details page.
   *
   * @returns {void}
   */
  const handleBack = useCallback((): void => {
    startTransition(() => router.push('/simulation/loan-details'));
  }, [router]);

  /**
   * Method responsible for submitting the simulation and navigating to the finalization page.
   *
   * @returns {void}
   */
  const handleSubmitSimulation = useCallback((): void => {
    startTransition(() => {
      const isSuccess: boolean = Math.random() > 0.5;
      router.push(isSuccess ? '/finalization/success' : '/finalization/error');
    });
  }, [router]);

  /**
   * Method responsible for rendering the action buttons.
   *
   * @returns {JSX.Element}
   */
  const renderActions = (): JSX.Element => (
    <div className={darkMode ? variantClasses.dark.actions : variantClasses.light.actions}>
      <Button
        variant="secondary"
        onClick={handleBack}
        className="w-full md:w-[40%] h-10"
        aria-label="Voltar para detalhes do empréstimo"
        disabled={isPending}
        aria-disabled={isPending}
      >
        Voltar
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmitSimulation}
        className="w-full md:w-[60%] h-10"
        aria-label="Solicitar empréstimo"
        disabled={isPending}
        aria-disabled={isPending}
      >
        Solicitar Empréstimo
      </Button>
    </div>
  );

  /**
   * Component responsible for rendering the loan charts.
   *
   * @param {Object} props - Component props
   * @param {Array<any>} props.barData - Data for the bar chart
   * @param {Array<any>} props.lineData - Data for the line chart
   * @returns {JSX.Element}
   * */
  const LoanCharts = ({ barData, lineData }: { barData: any[]; lineData: any[] }): JSX.Element => (
    <div className={darkMode ? variantClasses.dark.charts : variantClasses.light.charts}>
      <div className="flex-1" role="img" aria-label="Evolução das parcelas">
        <BarChartComponent data={barData} />
      </div>
      <div className="flex-1" role="img" aria-label="Evolução dos juros">
        <LineChartComponent data={lineData} />
      </div>
    </div>
  );

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50 min-h-screen">
          <LoadingSpinner />
        </div>
      )}

      <section
        className={`${darkMode ? variantClasses.dark.container : variantClasses.light.container} w-full max-w-5xl mx-auto flex flex-col gap-8 px-4 py-8`}
      >
        <h1 className={darkMode ? variantClasses.dark.title : variantClasses.light.title}>
          Resultado da Simulação
        </h1>

        <div className={darkMode ? variantClasses.dark.cards : variantClasses.light.cards}>
          {cardData.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </div>

        <LoanCharts barData={generateBarChartData} lineData={generateLineChartData} />

        {renderActions()}
      </section>
    </>
  );
}
