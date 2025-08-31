'use client';

// system
import React, { createContext, useContext, useState, useEffect, JSX } from 'react';

type ThemeContextType = {
  /* Indicates whether dark mode is active */
  darkMode: boolean;

  /* Method responsible for toggling the theme between light and dark mode */
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access the theme context in any component.
 *
 * @throws Error if used outside of the ThemeProvider
 * @returns {ThemeContextType}
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

/**
 * Provider responsible for managing the theme (dark/light) and persisting the preference in localStorage.
 *
 * @param {Object} props - Provider props
 * @param {ReactNode} props.children - Child components that will have access to the theme context
 * @returns {JSX.Element | null}
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  /**
   * Method responsible for toggling dark mode on or off.
   *
   * @returns {void}
   */
  const toggleDarkMode = (): void => {
    if (darkMode === null) return;
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  if (darkMode === null) return null;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
  );
};
