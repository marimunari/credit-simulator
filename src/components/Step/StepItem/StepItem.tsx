'use client';

// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// types
type StepItemProps = {
  /* The index of the step in the stepper */
  index: number;

  /* The label text of the step */
  label: string;

  /* Whether this step is the current active step */
  isCurrent: boolean;

  /* Whether this step has been completed */
  isCompleted: boolean;

  /* Whether this step is the last in the stepper */
  isLast: boolean;
};

type CircleState = 'default' | 'completed' | 'current';

type ThemeVariantClasses = 'light' | 'dark';

type CircleVariantClasses = Record<CircleState, Record<ThemeVariantClasses, string>>;

type LineVariantClasses = Record<'light' | 'dark' | 'completed', string>;

export default function StepItem({ index, label, isCurrent, isCompleted, isLast }: StepItemProps) {
  const { darkMode } = useTheme();

  const baseCircleStyles: string =
    'rounded-full flex items-center justify-center border-2 font-semibold transition';

  const circleSizeStyles: string = isCurrent
    ? 'w-6 h-6 sm:w-8 sm:h-8 text-sm sm:text-base'
    : 'w-4 h-4 sm:w-6 sm:h-6 text-xs sm:text-sm';

  const circleVariantClasses: CircleVariantClasses = {
    completed: {
      light: 'bg-[#4F9E00] border-[#4F9E00] text-white',
      dark: 'bg-[#4F9E00] border-[#4F9E00] text-white'
    },
    current: {
      light: 'bg-white border-[#4F9E00] text-[#4F9E00]',
      dark: 'bg-[#333333] border-[#4F9E00] text-[#4F9E00]'
    },
    default: {
      light: 'bg-white border-[#D6DCE1] text-[#26292B]',
      dark: 'bg-[#555555] border-[#444444] text-white'
    }
  };

  const lineVariantClasses: LineVariantClasses = {
    light: 'bg-[#d6dce1]',
    dark: 'bg-[#444]',
    completed: 'bg-[#4f9e00]'
  };

  const statusLabel: string = isCompleted ? 'Concluída' : isCurrent ? 'Atual' : 'Pendente';

  const circleState: CircleState = isCompleted ? 'completed' : isCurrent ? 'current' : 'default';

  const labelClasses: Record<ThemeVariantClasses, string> = {
    light: 'mt-2 text-[#26292b] text-center text-xs sm:text-sm',
    dark: 'mt-2 text-white text-center text-xs sm:text-sm'
  };

  return (
    <div
      data-testid={`step-item-${index}`}
      className={`${isLast ? 'flex-none' : 'flex-1'} flex items-center`}
      role="listitem"
      aria-current={isCurrent ? 'step' : undefined}
      aria-label={`Etapa ${index + 1}: ${label} — ${statusLabel}`}
    >
      <div className="relative flex flex-col items-center">
        <div
          data-testid={`step-circle-${index}`}
          className={`${baseCircleStyles} ${circleSizeStyles} ${
            darkMode
              ? circleVariantClasses[circleState].dark
              : circleVariantClasses[circleState].light
          }`}
        >
          {isCurrent ? index + 1 : ''}
        </div>
        <span
          data-testid={`step-label-${index}`}
          className={darkMode ? labelClasses.dark : labelClasses.light}
        >
          {label}
        </span>
      </div>

      {!isLast && (
        <div data-testid={`step-line-${index}`} className="flex-1 h-[2px] mx-1 sm:mx-2">
          <div
            className={`h-full w-full rounded ${
              isCompleted
                ? lineVariantClasses.completed
                : darkMode
                  ? lineVariantClasses.dark
                  : lineVariantClasses.light
            }`}
          />
        </div>
      )}
    </div>
  );
}
