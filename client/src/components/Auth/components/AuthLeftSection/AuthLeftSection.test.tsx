import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthLeftSection } from './AuthLeftSection.component';

vi.mock('../AuthPhone/AuthPhone.component', () => ({
  AuthPhone: () => <div data-testid="auth-phone">Phone mockup</div>
}));

vi.mock('../AuthWelcomeContent/AuthWelcomeContent.component', () => ({
  AuthWelcomeContent: () => <div data-testid="auth-welcome-content">Welcome content</div>
}));

describe('AuthLeftSection', () => {
  it('renders AuthPhone and AuthWelcomeContent components', () => {
    render(<AuthLeftSection />);
    
    expect(screen.getByTestId('auth-phone')).toBeInTheDocument();
    expect(screen.getByTestId('auth-welcome-content')).toBeInTheDocument();
  });
  
  it('has correct motion props for animation', () => {
    const { container } = render(<AuthLeftSection />);
    
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('w-full');
    expect(mainDiv).toHaveClass('md:w-3/5');
    expect(mainDiv).toHaveClass('flex');
  });
  
  it('applies correct layout for different screen sizes', () => {
    const { container } = render(<AuthLeftSection />);
    
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('flex-col');
    expect(mainDiv).toHaveClass('md:flex-row');
    expect(mainDiv).toHaveClass('pr-0');
    expect(mainDiv).toHaveClass('md:pr-8');
  });
}); 