import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthSection } from './AuthSection.component';

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

vi.mock('./AuthBackground/AuthBackground.component', () => ({
  AuthBackground: () => <div data-testid="auth-background" />
}));

vi.mock('./components/AuthLeftSection/AuthLeftSection.component', () => ({
  AuthLeftSection: () => <div data-testid="auth-left-section" />
}));

vi.mock('./components/AuthFormSection/AuthFormSection.component', () => ({
  AuthFormSection: ({ children, title, subtitle }: { children?: React.ReactNode, title?: string, subtitle?: string }) => (
    <div data-testid="auth-form-section">
      {title && <div data-testid="form-title">{title}</div>}
      {subtitle && <div data-testid="form-subtitle">{subtitle}</div>}
      {children}
    </div>
  )
}));

describe('AuthSection', () => {
  it('renders correctly with default props', () => {
    render(
      <MemoryRouter>
        <AuthSection />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('helmet')).toBeInTheDocument();
    expect(screen.getByTestId('auth-background')).toBeInTheDocument();
  });

  it('renders with custom title and subtitle', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    
    render(
      <MemoryRouter>
        <AuthSection title={title} subtitle={subtitle} />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('form-title')).toHaveTextContent(title);
    expect(screen.getByTestId('form-subtitle')).toHaveTextContent(subtitle);
  });

  it('renders with children content', () => {
    const childContent = 'Test Child Content';
    
    render(
      <MemoryRouter>
        <AuthSection>
          <div>{childContent}</div>
        </AuthSection>
      </MemoryRouter>
    );
    
    expect(screen.getByText(childContent)).toBeInTheDocument();
  });
}); 