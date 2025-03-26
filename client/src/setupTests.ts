import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';

expect.extend(matchers);

// Mock dla IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  constructor(
    private callback: IntersectionObserverCallback,
    private options?: IntersectionObserverInit
  ) {}
  
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

// Mock dla ResizeObserver
class MockResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}
  
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

// Ustawienie mock obiektów globalnie
window.IntersectionObserver = MockIntersectionObserver as any;
window.ResizeObserver = MockResizeObserver as any;

// Wyciszenie ostrzeżeń z framer-motion
const consoleError = console.error;
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' && 
    (
      args[0].includes('Not implemented: navigation') || 
      args[0].includes('Error: ResizeObserver loop') ||
      args[0].includes('framer-motion')
    )
  ) {
    return;
  }
  consoleError(...args);
};

// Mock dla window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock dla ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock dla IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(),
})) 