'use client';

// system
import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// contexts
import { useSimulation } from '@/src/contexts/SimulationContext/SimulationContext';
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import Button from '@/src/components/Button/Button';
import CustomDatePicker from '@/src/components/Form/CustomDatePicker/CustomDatePicker';
import LoadingSpinner from '@/src/components/LoadingSpinner/LoadingSpinner';

// external libs
import { differenceInYears } from 'date-fns';

// internal images
import CreditSimulatorImage from '@/src/assets/images/credit_simulation.svg';

// types
type VariantClass = 'container' | 'sectionTitle' | 'sectionDescription';
type ThemeVariantClasses = 'light' | 'dark';

export default function PersonalDataPage() {
  const router = useRouter();
  const { setBirthDate } = useSimulation();
  const { darkMode } = useTheme();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isButtonDisabled: boolean = !selectedDate || !!error;

  const baseContainerClasses =
    'flex-1 flex flex-col lg:flex-row max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8';
  const sectionBaseClasses = 'w-full lg:w-1/2 flex flex-col gap-6';
  const titleBaseClasses = 'text-2xl sm:text-3xl font-bold mb-2';
  const descriptionBaseClasses = 'mb-4 text-sm sm:text-base';

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      container: 'bg-white text-black',
      sectionTitle: 'text-gray-900',
      sectionDescription: 'text-gray-600'
    },
    dark: {
      container: 'bg-[#2C2C2C] text-white',
      sectionTitle: 'text-white',
      sectionDescription: 'text-gray-300'
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem('simulationData');
    if (!storedData) return;

    const parsedData = parseJSON<{ birthDate?: string }>(storedData);
    if (!parsedData?.birthDate) return;

    const validDate = parseDate(parsedData.birthDate);
    if (validDate) setSelectedDate(validDate);
  }, []);

  /**
   * Method responsible for safely parsing a JSON string.
   *
   * @param {string} value - The JSON string to parse.
   * @returns {T | null} - The parsed object or null if parsing fails.
   */
  const parseJSON = <T,>(value: string): T | null => {
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  };

  /**
   * Method responsible for converting a string into a valid Date object.
   *
   * @param {string} dateStr - The date string to convert.
   * @returns {Date | null} - The Date object if valid, otherwise null.
   */
  const parseDate = (dateStr: string): Date | null => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  /**
   * Method responsible for updating the selected date
   * and resetting any previous error.
   *
   * @param {Date | null} date - The selected date
   * @returns {void}
   */
  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
    setError(null);
  };

  /**
   * Method responsible for validating the date and navigating
   * to the loan details page if valid.
   *
   * @returns {void}
   */
  const handleContinue = (): void => {
    if (!selectedDate || isNaN(selectedDate.getTime())) {
      setError('Por favor, informe uma data válida.');
      return;
    }

    const age: number = differenceInYears(new Date(), selectedDate);
    if (age < 18) {
      setError('Você deve ter pelo menos 18 anos.');
      return;
    }

    setBirthDate(selectedDate);
    setError(null);

    startTransition(() => {
      router.push('/simulation/loan-details');
    });
  };

  return (
    <>
      {isPending && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-50"
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
      >
        <section className={sectionBaseClasses} data-testid="personal-data-section">
          <h1
            className={`${titleBaseClasses} ${
              darkMode ? variantClasses.dark.sectionTitle : variantClasses.light.sectionTitle
            }`}
            data-testid="personal-data-title"
          >
            Simule um crédito com seu carro em garantia
          </h1>

          <p
            className={`${descriptionBaseClasses} ${
              darkMode
                ? variantClasses.dark.sectionDescription
                : variantClasses.light.sectionDescription
            }`}
            data-testid="personal-data-description"
          >
            Faça sua simulação gratuita e descubra as condições personalizadas para seu empréstimo.
          </p>

          <h2 className="font-medium" data-testid="personal-data-subtitle">
            Para começar, informe a sua data de nascimento.
          </h2>

          <CustomDatePicker
            label="Data de nascimento"
            id="birthDate"
            selectedDate={selectedDate}
            onChange={handleDateChange}
            error={error ?? undefined}
            required
            data-testid="birthdate-picker"
          />

          <Button
            variant="primary"
            onClick={handleContinue}
            className="w-full h-10"
            disabled={isButtonDisabled}
            aria-disabled={isButtonDisabled}
            data-testid="continue-button"
          >
            Iniciar
          </Button>
        </section>

        <aside className="flex w-full lg:w-1/2 items-center justify-center mt-6 lg:mt-0">
          <Image
            src={CreditSimulatorImage}
            alt="Ilustração de simulação de crédito"
            width={400}
            height={400}
            className="object-contain max-w-[250px] sm:max-w-[300px] lg:max-w-[400px] h-auto"
            priority
            data-testid="credit-simulator-image"
          />
        </aside>
      </main>
    </>
  );
}
