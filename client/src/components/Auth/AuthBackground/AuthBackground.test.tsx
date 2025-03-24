import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthBackground } from './AuthBackground.component';

vi.mock('./hooks/useAuthBackground.hook', () => ({
  useAuthBackground: vi.fn(() => ({
    current: null
  }))
}));

describe('AuthBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<AuthBackground />);
    
    expect(container.querySelector('canvas')).toBeInTheDocument();
    expect(container.querySelectorAll('div').length).toBeGreaterThan(0);
  });
  
  it('applies correct styles to background elements', () => {
    const { container } = render(<AuthBackground />);
    
    const gradientElement = container.querySelector('.absolute.inset-0.bg-gradient-to-b');
    expect(gradientElement).toBeInTheDocument();
    
    const blurredElements = container.querySelectorAll('.blur-3xl');
    expect(blurredElements.length).toBeGreaterThan(0);
  });
}); 