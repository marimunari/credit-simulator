'use client';

// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// types
type LoadingSpinnerProps = {
  /* Optional additional CSS classes to style the spinner container */
  className?: string;
};

type ThemeVariantClasses = 'light' | 'dark';

export default function LoadingSpinner({ className = '' }: LoadingSpinnerProps) {
  const { darkMode } = useTheme();

  const baseClasses: string =
    'fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center';

  const variantClasses: Record<ThemeVariantClasses, string> = {
    light: 'bg-white',
    dark: 'bg-[#2C2C2C]'
  };

  const spinnerClasses: string = 'w-10 h-10 text-[#4F9E00] animate-spin';

  return (
    <div
      data-testid="loading-spinner"
      className={`${baseClasses} ${darkMode ? variantClasses.dark : variantClasses.light} ${className}`}
      role="status"
      aria-label="Carregando"
    >
      <svg
        className={spinnerClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </div>
  );
}
