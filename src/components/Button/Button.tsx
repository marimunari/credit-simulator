'use client';

// system
import React, { ReactNode } from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// types
type ButtonVariant = 'primary' | 'secondary';

type ThemeVariantClasses = 'light' | 'dark';

// interfaces
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /* The visual style of the button */
  variant?: ButtonVariant;

  /* The content inside the button, usually text or icons*/
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  disabled = false,
  ...rest
}: ButtonProps) {
  const { darkMode } = useTheme();

  const baseClasses: string = `
    px-4 py-2 rounded-md font-medium text-sm transition
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${!disabled ? 'cursor-pointer' : ''}
  `;

  const variantClasses: Record<ButtonVariant, Record<ThemeVariantClasses, string>> = {
    primary: {
      light: 'bg-[#4F9E00] text-white hover:bg-[#5EB32B] focus:ring-[#4F9E00]',
      dark: 'bg-[#4F9E00] text-white hover:bg-[#5EB32B] focus:ring-[#4F9E00]'
    },
    secondary: {
      light:
        'bg-white text-black border border-[#E6E8EB] hover:text-[#4F9E00] hover:bg-[#F4F5F6] focus:ring-[#4F9E00]',
      dark: 'bg-[#2C2C2C] text-[#F1F3F2] border border-[#4F9R00] hover:text-[#4F9E00] hover:bg-[#3A3A3A] focus:ring-[#4F9E00]'
    }
  };

  const disabledClasses: Record<ThemeVariantClasses, string> = {
    light: 'cursor-not-allowed bg-gray-300 text-gray-500 focus:ring-0',
    dark: 'cursor-not-allowed bg-[#616161] text-white focus:ring-0'
  };

  const finalClasses: string = `
    ${baseClasses} 
    ${disabled ? disabledClasses[darkMode ? 'dark' : 'light'] : variantClasses[variant][darkMode ? 'dark' : 'light']} 
    ${className}
  `;

  return (
    <button
      type="button"
      className={finalClasses}
      disabled={disabled}
      aria-disabled={disabled}
      data-testid="button"
      {...rest}
    >
      {children}
    </button>
  );
}
