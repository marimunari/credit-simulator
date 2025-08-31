'use client';

// system
import React from 'react';
import Image from 'next/image';

// assets
import CreditasLogo from '@/src/assets/icons/social_icon.svg';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// types
type VariantClass = 'footer' | 'text' | 'borderTop' | 'borderBottom';

type ThemeVariantClasses = 'light' | 'dark';

export default function Footer() {
  const { darkMode } = useTheme();

  const currentYear: number = new Date().getFullYear();

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      footer: 'border-t-[#F1F3F2] bg-white',
      text: 'text-[#292929] text-xs',
      borderTop: 'border-t-[#F1F3F2]',
      borderBottom: 'border-b-[#4F9E00]'
    },
    dark: {
      footer: 'border-t-gray-700 bg-[#1D1D1D]',
      text: 'text-[#F1F3F2] text-xs',
      borderTop: 'border-t-gray-700',
      borderBottom: 'border-b-[#4F9E00]'
    }
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Footer da Creditas"
      className={`w-full ${darkMode ? variantClasses.dark.borderTop : variantClasses.light.borderTop} 
        ${darkMode ? variantClasses.dark.borderBottom : variantClasses.light.borderBottom} 
        ${darkMode ? variantClasses.dark.footer : variantClasses.light.footer}`}
      data-testid="footer"
    >
      <div
        className="max-w-screen-xl mx-auto flex flex-row gap-2 items-center px-4 py-4 sm:px-6 lg:px-8"
        data-testid="footer-container"
      >
        <Image
          src={CreditasLogo}
          alt="Logo da Creditas"
          width={30}
          height={30}
          className="object-contain"
          aria-hidden="true"
          data-testid="footer-logo"
        />
        <span
          className={darkMode ? variantClasses.dark.text : variantClasses.light.text}
          aria-label={`Copyright ${currentYear} Creditas Soluções Financeiras Ltda.`}
          data-testid="footer-copyright"
        >
          © {currentYear} Creditas Soluções Financeiras Ltda.
        </span>
      </div>
    </footer>
  );
}
