'use client';

// system
import React from 'react';
import { useRouter, useParams } from 'next/navigation';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// consts
import {
  animationsMap,
  messagesMap,
  FinalizationType,
  FinalizationMessages,
  LottieAnimationData
} from '@/src/consts/finalizationData';

// internal components
import Button from '@/src/components/Button/Button';

// external libs
import Lottie from 'lottie-react';

// types
type VariantClass = 'container' | 'lottieContainer' | 'title' | 'description' | 'buttonContainer';
type ThemeVariantClasses = 'light' | 'dark';

export default function Finalization() {
  const router = useRouter();
  const params = useParams();
  const { darkMode } = useTheme();

  const typeParam: string | undefined = Array.isArray(params.type) ? params.type[0] : params.type;
  const type: FinalizationType = (typeParam ?? 'error') as FinalizationType;

  const animation: LottieAnimationData = animationsMap[type];
  const { title, description }: FinalizationMessages = messagesMap[type];

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      container: 'bg-gray-50 text-gray-900 flex flex-col items-center justify-center min-h-screen',
      lottieContainer: 'w-[300px] h-[300px] flex items-center justify-center',
      title:
        type === 'success'
          ? 'text-green-700 text-2xl font-extrabold mt-1 mb-4 text-center'
          : 'text-red-700 text-2xl font-extrabold mt-1 mb-4 text-center',
      description: 'max-w-xl text-center whitespace-pre-line mb-8 px-4 text-gray-700',
      buttonContainer: 'flex flex-col sm:flex-row gap-4 w-full max-w-md px-4'
    },
    dark: {
      container: 'bg-[#2C2C2C] text-white flex flex-col items-center justify-center min-h-screen',
      lottieContainer: 'w-[300px] h-[300px] flex items-center justify-center',
      title:
        type === 'success'
          ? 'text-green-400 text-2xl font-extrabold mt-1 mb-4 text-center'
          : 'text-red-400 text-2xl font-extrabold mt-1 mb-4 text-center',
      description: 'max-w-xl text-center whitespace-pre-line mb-8 px-4 text-gray-300',
      buttonContainer: 'flex flex-col sm:flex-row gap-4 w-full max-w-md px-4'
    }
  };

  const lottieClasses: string = type === 'error' ? 'w-[110px] h-[110px]' : 'w-[300px] h-[300px]';

  /**
   * Method responsible for navigating to a given URL.
   *
   * @param {string} path - The path to navigate to.
   * @returns {void}
   */
  const navigateTo = (path: string): void => {
    router.push(path);
  };

  return (
    <section
      role="region"
      aria-label={`${type} - status da operação`}
      className={darkMode ? variantClasses.dark.container : variantClasses.light.container}
      data-testid="finalization-container"
    >
      <div
        className={
          darkMode ? variantClasses.dark.lottieContainer : variantClasses.light.lottieContainer
        }
        data-testid="finalization-lottie-container"
      >
        <Lottie
          loop
          animationData={animation}
          className={lottieClasses}
          aria-hidden="true"
          data-testid="finalization-lottie"
        />
      </div>

      <h1
        className={darkMode ? variantClasses.dark.title : variantClasses.light.title}
        data-testid="finalization-title"
      >
        {title}
      </h1>

      <p
        className={darkMode ? variantClasses.dark.description : variantClasses.light.description}
        data-testid="finalization-description"
      >
        {description}
      </p>

      <div
        className={
          darkMode ? variantClasses.dark.buttonContainer : variantClasses.light.buttonContainer
        }
        data-testid="finalization-button-container"
      >
        <Button
          variant="secondary"
          className="flex-1 h-12"
          onClick={() => navigateTo('https://www.creditas.com/')}
          data-testid="finalization-btn-back"
        >
          Voltar para a Creditas
        </Button>
        <Button
          variant="primary"
          className="flex-1 h-12"
          onClick={() => navigateTo('/')}
          data-testid="finalization-btn-new"
        >
          Simular novo empréstimo
        </Button>
      </div>
    </section>
  );
}
