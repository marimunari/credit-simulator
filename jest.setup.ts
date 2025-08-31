import '@testing-library/jest-dom';

// Mock ResizeObserver para evitar erro no Jest com recharts
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
