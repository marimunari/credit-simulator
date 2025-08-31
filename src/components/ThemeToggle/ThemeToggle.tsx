'use client';

// system
import React from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// external icons
import { LuSun, LuMoon } from 'react-icons/lu';

// types
type ThemeVariantClasses = 'light' | 'dark';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  const baseClasses: string = `
    w-[34px] h-[34px]
    font-medium text-sm leading-5
    border rounded-[6px]
    flex items-center justify-center
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-[#4F9E00] focus:ring-offset-2
    transition
  `;

  const variantClasses: Record<ThemeVariantClasses, string> = {
    light: 'bg-white text-black border-[#D6DCE1] hover:bg-[#F4F5F6]',
    dark: 'bg-[#1D1D1D] text-[#4F9E00] border-[#444444] hover:bg-[#333333]'
  };

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className={`${baseClasses} ${darkMode ? variantClasses.dark : variantClasses.light}`}
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <LuSun className="w-4 h-4" aria-hidden="true" />
      ) : (
        <LuMoon className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}
