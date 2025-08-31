'use client';

// system
import React, { InputHTMLAttributes } from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// types
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Label for the input field */
  label: string;

  /** Unique identifier for the input field */
  id: string;

  /** Optional error message for the input field */
  error?: string | null;

  /** Optional flag indicating if the input is required */
  required?: boolean;

  /** Additional CSS class names to style the input */
  className?: string;
};

type VariantClass = 'input' | 'label';

type ThemeVariantClasses = 'light' | 'dark';

export default function Input({
  label,
  id,
  error = null,
  required = false,
  className = '',
  ...props
}: InputProps) {
  const { darkMode } = useTheme();

  const baseClasses: string =
    'border rounded-md px-3 py-2 outline-none transition-colors placeholder-gray-400';

  const stateClasses: string = error
    ? 'border-red-600 focus:border-red-600'
    : 'border-gray-300 hover:border-[#4F9E00] focus:border-[#4F9E00]';

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      input: 'bg-white text-black placeholder-gray-400 border-gray-300',
      label: 'text-gray-700'
    },
    dark: {
      input: 'bg-[#2C2C2C] text-[#F1F3F2] placeholder-gray-500 border-[#555555]',
      label: 'text-[#F1F3F2]'
    }
  };

  return (
    <div className="flex flex-col" data-testid="input-wrapper">
      <label
        htmlFor={id}
        className={`block mb-1 font-semibold ${
          darkMode ? variantClasses.dark.label : variantClasses.light.label
        }`}
        data-testid="input-label"
      >
        {label}
        {required && (
          <span className="text-red-600 ml-0.5" data-testid="input-required">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        className={`${baseClasses} ${stateClasses} ${
          darkMode ? variantClasses.dark.input : variantClasses.light.input
        } ${className}`}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        data-testid="input-element"
      />

      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          className="text-red-600 mt-1 text-sm"
          data-testid="input-error"
        >
          {error}
        </span>
      )}
    </div>
  );
}
