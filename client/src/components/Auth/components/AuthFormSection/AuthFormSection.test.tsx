import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthFormSection } from './AuthFormSection.component';


vi.mock('../../AuthContent/AuthContent.component', () => ({
  AuthContent: () => <div data-testid="auth-content">Zaloguj się lub zarejestruj</div>
}));

describe('AuthFormSection', () => {
  it('renders AuthContent when no children provided', () => {
    render(
      <MemoryRouter>
        <AuthFormSection />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('auth-content')).toBeInTheDocument();
    expect(screen.queryByText('CodeLinesJS')).not.toBeInTheDocument();
  });

  it('renders custom content when children are provided', () => {
    const childContent = 'Test Child Content';
    
    render(
      <MemoryRouter>
        <AuthFormSection>
          <div>{childContent}</div>
        </AuthFormSection>
      </MemoryRouter>
    );
    
    expect(screen.queryByTestId('auth-content')).not.toBeInTheDocument();
    expect(screen.getByText('CodeLinesJS')).toBeInTheDocument();
    expect(screen.getByText(childContent)).toBeInTheDocument();
  });

  it('renders with title and subtitle', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    
    render(
      <MemoryRouter>
        <AuthFormSection title={title} subtitle={subtitle}>
          <div>Test content</div>
        </AuthFormSection>
      </MemoryRouter>
    );
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it('applies correct styling to the container', () => {
    const { container } = render(
      <MemoryRouter>
        <AuthFormSection>
          <div>Test content</div>
        </AuthFormSection>
      </MemoryRouter>
    );
    
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('w-full');
    expect(mainDiv).toHaveClass('md:w-2/5');
    
    const bgDiv = container.querySelector('.blur-3xl');
    expect(bgDiv).toBeInTheDocument();
  });
}); 