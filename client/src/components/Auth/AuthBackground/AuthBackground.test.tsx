import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthBackground } from './AuthBackground.component';

vi.mock('./hooks/useAuthBackground.hook', () => ({
  useAuthBackground: () => {
    const mockCanvasRef = { current: document.createElement('canvas') };
    return mockCanvasRef;
  }
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ref, initial, animate }: any) => (
      <div
        className={className}
        ref={ref}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
      >
        {children}
      </div>
    )
  }
}));

describe('AuthBackground', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders canvas element', () => {
    const { container } = render(<AuthBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).not.toBeNull();
    expect(canvas?.classList.contains('w-full')).toBe(true);
    expect(canvas?.classList.contains('h-full')).toBe(true);
  });

  it('renders decorative elements', () => {
    const { container } = render(<AuthBackground />);
    
    const bgElements = container.querySelectorAll('.absolute');
    expect(bgElements.length).toBeGreaterThan(3);
    
    const blurElements = container.querySelectorAll('.blur-3xl');
    expect(blurElements.length).toBeGreaterThan(2);
  });
}); 