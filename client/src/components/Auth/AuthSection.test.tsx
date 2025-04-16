import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthSection } from './AuthSection.component';

vi.mock('./AuthBackground/AuthBackground.component', () => ({
  AuthBackground: () => <div data-testid="auth-background">Background</div>
}));

vi.mock('../Common/Seo/Seo.component', () => ({
  Seo: ({ title }: { title: string }) => <div data-testid="helmet">{title}</div>
}));

vi.mock('./components/AuthFormSection/AuthFormSection.component', () => ({
  AuthFormSection: ({ title, subtitle, children }: { title?: string, subtitle?: string, children?: React.ReactNode }) => (
    <div>
      {title && <div data-testid="form-title">{title}</div>}
      {subtitle && <div data-testid="form-subtitle">{subtitle}</div>}
      {children}
    </div>
  )
}));

describe('AuthSection', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders correctly with default props', () => {
    render(
      <MemoryRouter>
        <AuthSection />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('helmet')).not.toBeNull();
    expect(screen.getByTestId('auth-background')).not.toBeNull();
  });

  it('renders with custom title and subtitle', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    
    render(
      <MemoryRouter>
        <AuthSection title={title} subtitle={subtitle} />
      </MemoryRouter>
    );
    
    const formTitle = screen.getByTestId('form-title');
    expect(formTitle.textContent).toBe(title);
    
    const formSubtitle = screen.getByTestId('form-subtitle');
    expect(formSubtitle.textContent).toBe(subtitle);
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
    
    expect(screen.getByText(childContent)).not.toBeNull();
  });
}); 