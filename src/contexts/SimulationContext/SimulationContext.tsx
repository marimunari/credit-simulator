'use client';

// system
import React, { createContext, useState, useEffect, useContext, ReactNode, JSX } from 'react';
import { useRouter } from 'next/navigation';

// internal components
import LoadingSpinner from '@/src/components/LoadingSpinner/LoadingSpinner';

type LoanData = {
  /* Loan amount entered by the user */
  amount: string | null;

  /* Loan term in months */
  term: number | null;
};

type SimulationContextType = {
  /* User's birth date */
  birthDate: Date | null;

  /* User's loan data */
  loanData: LoanData;

  /* Method responsible for updating the birth date */
  setBirthDate: (date: Date) => void;

  /* Method responsible for updating the loan data */
  setLoanData: (data: LoanData) => void;

  /* Indicates if the data is still being loaded */
  isLoading: boolean;
};

type SimulationProviderProps = {
  /** Child components that will have access to the simulation context */
  children: ReactNode;
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

/**
 * Hook to access the simulation context in any component.
 *
 * @throws Error if used outside of the SimulationProvider
 * @returns {SimulationContextType}
 */
export const useSimulation = (): SimulationContextType => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

/**
 * Provider responsible for managing simulation data and storing it in sessionStorage.
 *
 * @param {SimulationProviderProps} props - Provider props
 * @returns {JSX.Element}
 */
export const SimulationProvider = ({ children }: SimulationProviderProps): JSX.Element => {
  const router = useRouter();

  const [birthDate, setBirthDateState] = useState<Date | null>(null);
  const [loanData, setLoanDataState] = useState<LoanData>({ amount: null, term: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageUnload = () => {
      sessionStorage.removeItem('simulationData');
    };

    window.addEventListener('beforeunload', handlePageUnload);

    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
    };
  }, []);

  useEffect(() => {
    const storedData = sessionStorage.getItem('simulationData');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (parsed.loanData) setLoanDataState(parsed.loanData);
        if (parsed.birthDate) setBirthDateState(new Date(parsed.birthDate));
      } catch (error) {
        console.error('Erro ao ler sessionStorage:', error);
      }
    }

    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    const dataToSave = {
      loanData,
      birthDate: birthDate ? birthDate.toISOString() : null
    };
    sessionStorage.setItem('simulationData', JSON.stringify(dataToSave));
  }, [loanData, birthDate]);

  /**
   * Method responsible for updating the loan data state.
   *
   * @param {LoanData} data - The loan data to set.
   * @returns {void}
   */
  const setLoanData = (data: LoanData): void => setLoanDataState(data);

  /**
   * Method responsible for updating the birth date state.
   *
   * @param {Date} date - The birth date to set.
   * @returns {void}
   */
  const setBirthDate = (date: Date): void => setBirthDateState(date);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50 min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <SimulationContext.Provider
      value={{ birthDate, loanData, setBirthDate, setLoanData, isLoading }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
