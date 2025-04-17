import '@testing-library/jest-dom';
import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { vi } from 'vitest';
import React from 'react';

expect.extend(matchers);

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal();
  
  if (actual.MotionGlobalConfig) {
    actual.MotionGlobalConfig.skipAnimations = true;
  }
  
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: (props: any) => React.createElement('div', props),
      button: (props: any) => React.createElement('button', props),
      span: (props: any) => React.createElement('span', props),
      a: (props: any) => React.createElement('a', props),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  };
});

class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

class MockResizeObserver {
  constructor() {}
  
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

window.IntersectionObserver = MockIntersectionObserver as any;
window.ResizeObserver = MockResizeObserver as any;

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

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(),
})) 