import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthLeftSection } from './AuthLeftSection.component';



vi.mock('../AuthWelcomeContent/AuthWelcomeContent.component', () => ({
  AuthWelcomeContent: () => <div data-testid="auth-welcome-content">Welcome Content</div>,
}));

describe('AuthLeftSection', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders AuthWelcomeContent component', () => {
    render(<AuthLeftSection />);

    expect(screen.getByTestId('auth-welcome-content')).not.toBeNull();
  });

  it('has correct motion props for animation', () => {
    const { container } = render(<AuthLeftSection />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.classList.contains('w-full')).toBe(true);
    expect(mainDiv.classList.contains('max-w-xl')).toBe(true);
    expect(mainDiv.classList.contains('flex')).toBe(true);
  });

  it('applies correct layout for different screen sizes', () => {
    const { container } = render(<AuthLeftSection />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.classList.contains('flex-col')).toBe(true);
    expect(mainDiv.classList.contains('items-center')).toBe(true);
    expect(mainDiv.classList.contains('lg:items-start')).toBe(true);
  });
});
