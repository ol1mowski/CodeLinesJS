import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthLeftSection } from './AuthLeftSection.component';

vi.mock('../AuthPhone/AuthPhone.component', () => ({
  AuthPhone: () => <div data-testid="auth-phone">Phone</div>
}));

vi.mock('../AuthWelcomeContent/AuthWelcomeContent.component', () => ({
  AuthWelcomeContent: () => <div data-testid="auth-welcome-content">Welcome Content</div>
}));

describe('AuthLeftSection', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders AuthPhone and AuthWelcomeContent components', () => {
    render(<AuthLeftSection />);
    
    expect(screen.getByTestId('auth-phone')).not.toBeNull();
    expect(screen.getByTestId('auth-welcome-content')).not.toBeNull();
  });
  
  it('has correct motion props for animation', () => {
    const { container } = render(<AuthLeftSection />);
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.classList.contains('w-full')).toBe(true);
    expect(mainDiv.classList.contains('md:w-3/5')).toBe(true);
    expect(mainDiv.classList.contains('flex')).toBe(true);
  });
  
  it('applies correct layout for different screen sizes', () => {
    const { container } = render(<AuthLeftSection />);
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.classList.contains('flex-col')).toBe(true);
    expect(mainDiv.classList.contains('md:flex-row')).toBe(true);
    expect(mainDiv.classList.contains('pr-0')).toBe(true);
    expect(mainDiv.classList.contains('md:pr-8')).toBe(true);
  });
}); 