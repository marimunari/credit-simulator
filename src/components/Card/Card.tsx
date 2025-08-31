'use client';

// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// types
type CardVariant = 'default' | 'highlight';

type ThemeVariantClasses = 'light' | 'dark';

export type CardProps = {
  /* The title of the card */
  title: string;

  /* The main value displayed */
  value: string | number;

  /* Icon displayed on the card */
  icon: React.ReactNode;

  /* Optional description text */
  description?: string;

  /* Optional icon for the description */
  descriptionIcon?: React.ReactNode;

  /* Visual variant of the card */
  variant?: CardVariant;
};

export default function Card({
  title,
  value,
  icon,
  description,
  descriptionIcon,
  variant = 'default'
}: CardProps) {
  const { darkMode } = useTheme();

  const baseClasses: string = 'p-5 border rounded-lg shadow-sm flex items-center justify-between';

  const variantClasses: Record<CardVariant, Record<ThemeVariantClasses, string>> = {
    default: {
      light: 'bg-white text-gray-900 border-gray-200',
      dark: 'bg-[#2C2C2C] text-white border-gray-700'
    },
    highlight: {
      light: 'bg-yellow-50 text-[#D6A020] border-transparent',
      dark: 'bg-[#FFFBEB] text-[#FF7F32] border-transparent'
    }
  };

  const iconClasses: Record<CardVariant, Record<ThemeVariantClasses, string>> = {
    default: {
      light: 'bg-green-100 text-green-600',
      dark: 'bg-green-700 text-white'
    },
    highlight: {
      light: 'bg-[#D6A020] text-white',
      dark: 'bg-[#FF7F32] text-white'
    }
  };

  const titleId: string = `${title.replace(/\s+/g, '-').toLowerCase()}-label`;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant][darkMode ? 'dark' : 'light']}`}
      role="region"
      aria-labelledby={titleId}
    >
      <div className="text-left">
        <p
          id={titleId}
          className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
        >
          {title}
        </p>
        <p className="text-xl font-bold mt-1">{value}</p>

        {description && (
          <div
            className="mt-2 text-xs font-medium flex items-center gap-1 text-gray-400"
            data-testid="description-container"
          >
            {descriptionIcon && <span data-testid="description-icon">{descriptionIcon}</span>}
            <span>{description}</span>
          </div>
        )}
      </div>

      <div
        className={`p-3 rounded-full ${iconClasses[variant][darkMode ? 'dark' : 'light']}`}
        aria-hidden="true"
        data-testid="icon-container"
      >
        {icon}
      </div>
    </div>
  );
}
