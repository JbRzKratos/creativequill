import "@testing-library/jest-dom";
import { vi } from "vitest";

// jsdom doesn't implement window.matchMedia.
// Provide a sensible default stub (desktop / pointer:fine) for all tests.
// Individual tests can override window.matchMedia for their own needs.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false, // default: desktop, pointer:fine
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Stub scrollTo so BackToTop tests can spy on it without JSDOM errors
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});
