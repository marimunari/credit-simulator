'use client';

// system
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import ThemeToggle from '@/src/components/ThemeToggle/ThemeToggle';

// internal icons
import LightModePrimaryLogo from '@/src/assets/icons/primary_logo.svg';
import DarkModePrimaryLogo from '@/src/assets/icons/primary_logo_dark.svg';

// types
type ThemeVariantClasses = 'light' | 'dark';

export default function Header() {
  const { darkMode } = useTheme();

  const variantClasses: Record<ThemeVariantClasses, string> = {
    light: 'bg-white border-b border-[#D6DCD9]',
    dark: 'bg-[#1D1D1D] border-b border-gray-700'
  };

  const containerClasses: string =
    'max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 min-h-[4rem]';
  const logoClasses: string = 'object-contain max-h-10 w-auto';

  return (
    <header
      role="banner"
      className={darkMode ? variantClasses.dark : variantClasses.light}
      data-testid="header"
    >
      <div className={containerClasses}>
        <nav aria-label="Navegação principal" data-testid="main-nav">
          <Link href="/" aria-label="Página inicial" data-testid="home-link">
            <Image
              src={darkMode ? DarkModePrimaryLogo : LightModePrimaryLogo}
              alt="Logo Creditas — página inicial"
              width={100}
              height={40}
              className={logoClasses}
              data-testid="header-logo"
            />
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
