'use client';

// system
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// contexts
import { SimulationProvider } from '@/src/contexts/SimulationContext/SimulationContext';

// consts
import { steps } from '@/src/consts/simulationData';

// internal components
import StepProgress from '@/src/components/Step/StepProgress/StepProgress';

// interfaces
interface SimulationLayoutProps {
  children: ReactNode;
}

export default function SimulationLayout({ children }: SimulationLayoutProps) {
  const pathname: string | null = usePathname();

  const containerClasses: string = 'max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8';
  const mainClasses: string = 'mt-8';

  /**
   * Method responsible for determining the current step index based on the pathname.
   *
   * @returns {number} Current step index
   */
  const getCurrentStep = (): number => {
    if (!pathname) return 0;
    if (pathname.includes('/loan-details')) return 1;
    if (pathname.includes('/summary')) return 2;
    return 0;
  };

  const currentStep: number = getCurrentStep();

  return (
    <SimulationProvider>
      <div className={containerClasses}>
        <StepProgress steps={steps} currentStep={currentStep} />
        <main className={mainClasses}>{children}</main>
      </div>
    </SimulationProvider>
  );
}
