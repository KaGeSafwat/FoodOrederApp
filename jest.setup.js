// Import Jest DOM extensions
import "@testing-library/jest-dom";

// Polyfill for TextEncoder and TextDecoder
import { TextEncoder, TextDecoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Define jest functions if not available
if (typeof jest === "undefined") {
  global.jest = {
    fn: (implementation) => {
      const mockFn = implementation || (() => {});
      mockFn.mockImplementation = (fn) => {
        const newMockFn = fn || (() => {});
        newMockFn.mockImplementation = mockFn.mockImplementation;
        return newMockFn;
      };
      return mockFn;
    },
  };
}

// Mock localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn ? jest.fn() : () => {},
    removeListener: jest.fn ? jest.fn() : () => {},
    addEventListener: jest.fn ? jest.fn() : () => {},
    removeEventListener: jest.fn ? jest.fn() : () => {},
    dispatchEvent: jest.fn ? jest.fn() : () => {},
  }),
});

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe = jest.fn ? jest.fn() : () => {};
  unobserve = jest.fn ? jest.fn() : () => {};
  disconnect = jest.fn ? jest.fn() : () => {};
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});

// Suppress React 18 console errors/warnings
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    /Warning: ReactDOM.render is no longer supported in React 18/.test(
      args[0]
    ) ||
    /Warning: The current testing environment is not configured to support act/.test(
      args[0]
    )
  ) {
    return;
  }
  originalConsoleError(...args);
};
