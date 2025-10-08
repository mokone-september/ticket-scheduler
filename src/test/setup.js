/* eslint-disable no-undef */
// jest.setup.js

// Extend Jest with DOM matchers from Testing Library
import "@testing-library/jest-dom";

// Clean up the DOM after each test (usually automatic but good practice)
import { cleanup } from "@testing-library/react";
afterEach(() => cleanup());

// Mock `window.matchMedia` (required for MUI and responsive components)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock ResizeObserver for layout components or chart libraries
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverMock;

// (Optional) Filter out noisy React 19 console warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("ReactDOM.render is no longer supported")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});
