import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthSection } from './AuthSection.component';

vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>
}));

vi.mock('./AuthBackground/AuthBackground.component', () => ({
  AuthBackground: () => <div data-testid="auth-background" />
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
    
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
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