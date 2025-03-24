import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthBackground } from './AuthBackground.component';

// Mock dla hooka useAuthBackground
vi.mock('./hooks/useAuthBackground.hook', () => ({
  useAuthBackground: () => {
    // Zwracamy mockowaną referencję do canvasRef
    const mockCanvasRef = { current: document.createElement('canvas') };
    return mockCanvasRef;
  }
}));

// Mock dla framer-motion
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
  it('renders canvas element', () => {
    const { container } = render(<AuthBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('w-full');
    expect(canvas).toHaveClass('h-full');
  });

  it('renders decorative elements', () => {
    const { container } = render(<AuthBackground />);
    
    // Sprawdzamy czy dekoracyjne elementy tła są renderowane
    const bgElements = container.querySelectorAll('.absolute');
    expect(bgElements.length).toBeGreaterThan(3);
    
    // Sprawdzamy obecność elementów z blur efektem
    const blurElements = container.querySelectorAll('.blur-3xl');
    expect(blurElements.length).toBeGreaterThan(2);
  });
}); 