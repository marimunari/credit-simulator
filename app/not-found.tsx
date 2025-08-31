'use client';

// system
import React from 'react';
import { useRouter } from 'next/navigation';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import Button from '@/src/components/Button/Button';
import Lottie from 'lottie-react';

// internal animations
import NotFoundAnimation from '@/src/assets/animations/not-found.json';

// types
type VariantClass = 'container' | 'title' | 'description';
type ThemeVariantClasses = 'light' | 'dark';

export default function NotFoundPage() {
  const router = useRouter();
  const { darkMode } = useTheme();

  const baseContainerClasses = 'flex flex-col items-center justify-center min-h-screen';
  const lottieContainerClasses = 'w-[300px] h-[300px] flex items-center justify-center';
  const lottieClasses = 'w-[300px] h-[300px]';
  const titleBaseClasses = 'text-3xl font-extrabold mt-4 mb-2 text-center';
  const descriptionBaseClasses = 'max-w-lg text-center mb-8 px-4';
  const buttonContainerClasses = 'flex flex-col sm:flex-row gap-4 w-full max-w-md px-4';

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      container: 'bg-gray-50 text-gray-800',
      title: 'text-gray-800',
      description: 'text-gray-600'
    },
    dark: {
      container: 'bg-[#2C2C2C] text-white',
      title: 'text-white',
      description: 'text-gray-300'
    }
  };

  /**
   * Method responsible for navigating back to the home page.
   *
   * @returns {void}
   */
  const handleGoHome = (): void => {
    router.push('/');
  };

  return (
    <section
      role="region"
      aria-label="404 - Page Not Found"
      className={`${baseContainerClasses} ${darkMode ? variantClasses.dark.container : variantClasses.light.container}`}
      data-testid="notfound-container"
    >
      <div className={lottieContainerClasses}>
        <Lottie
          loop
          animationData={NotFoundAnimation}
          className={lottieClasses}
          aria-hidden="true"
          data-testid="notfound-lottie"
        />
      </div>

      <h1
        className={`${titleBaseClasses} ${darkMode ? variantClasses.dark.title : variantClasses.light.title}`}
        data-testid="notfound-title"
      >
        Oops! Página não encontrada
      </h1>

      <p
        className={`${descriptionBaseClasses} ${
          darkMode ? variantClasses.dark.description : variantClasses.light.description
        }`}
        data-testid="notfound-description"
      >
        A página que você está procurando não existe ou foi movida.
      </p>

      <div className={buttonContainerClasses}>
        <Button
          variant="secondary"
          className="flex-1 h-12"
          onClick={handleGoHome}
          data-testid="notfound-button"
        >
          Voltar para o início
        </Button>
      </div>
    </section>
  );
}
