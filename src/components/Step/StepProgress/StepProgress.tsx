'use client';

// system
import React from 'react';

// internal components
import StepItem from '@/src/components/Step/StepItem/StepItem';

// types
type StepProgressProps = {
  /* Array of step labels */
  steps: string[];

  /* The index of the current active step */
  currentStep: number;
};

export default function StepProgress({ steps, currentStep }: StepProgressProps) {
  const navContainerClasses: string =
    'w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8';
  const stepsContainerClasses: string = 'flex w-full justify-between items-center';

  return (
    <nav
      data-testid="step-progress"
      role="list"
      aria-label="Progresso do formulário"
      className={navContainerClasses}
    >
      <div className={stepsContainerClasses}>
        {steps.map((stepLabel: string, index: number) => (
          <StepItem
            key={index}
            index={index}
            label={stepLabel}
            isCurrent={index === currentStep}
            isCompleted={index < currentStep}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </nav>
  );
}
