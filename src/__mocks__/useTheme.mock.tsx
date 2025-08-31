import { jest } from '@jest/globals';

export const useThemeMock = (darkMode = false) => ({
  darkMode,
  toggleDarkMode: jest.fn()
});
