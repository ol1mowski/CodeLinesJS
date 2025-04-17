import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthSection } from './AuthSection.component';
import { HelmetProvider } from 'react-helmet-async';

vi.mock('./AuthBackground/AuthBackground.component', () => ({
  AuthBackground: () => <div data-testid="auth-background">Background</div>,
}));

vi.mock('../Common/Seo/Seo.component', () => ({
  Seo: ({ title }: { title: string }) => <div data-testid="helmet">{title}</div>,
}));

vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="helmet-mock">{children}</div>
  ),
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('./components/AuthFormSection/AuthFormSection.component', () => ({
  AuthFormSection: ({
    title,
    subtitle,
    children,
  }: {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
  }) => (
    <div data-testid="auth-form-section">
      {title && <div data-testid="form-title">{title}</div>}
      {subtitle && <div data-testid="form-subtitle">{subtitle}</div>}
      {children}
    </div>
  ),
}));

vi.mock('framer-motion', () => {
  const div = ({ children, ...props }: any) => {
    const element = document.createElement('div');
    if (props.className) {
      element.className = props.className;
    }
    if (children) {
      if (typeof children === 'string') {
        element.textContent = children;
      } else if (Array.isArray(children)) {
        children.forEach(child => {
          if (typeof child === 'string') {
            element.textContent = (element.textContent || '') + child;
          }
        });
      }
    }
    return <div {...props}>{children}</div>;
  };

  return {
    motion: {
      div,
      span: div,
      section: div,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('AuthSection', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders correctly with default props', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <AuthSection />
        </MemoryRouter>
      </HelmetProvider>
    );

    const helmet = screen.getByTestId('helmet-mock');
    expect(helmet).not.toBeNull();

    const background = screen.getByTestId('auth-background');
    expect(background).not.toBeNull();
  });

  it('renders with custom title and subtitle', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';

    render(
      <HelmetProvider>
        <MemoryRouter>
          <AuthSection title={title} subtitle={subtitle} />
        </MemoryRouter>
      </HelmetProvider>
    );

    const formTitle = screen.getByTestId('form-title');
    expect(formTitle.textContent).toBe(title);

    const formSubtitle = screen.getByTestId('form-subtitle');
    expect(formSubtitle.textContent).toBe(subtitle);
  });

  it('renders with children content', () => {
    const childContent = 'Test Child Content';

    render(
      <HelmetProvider>
        <MemoryRouter>
          <AuthSection>
            <div data-testid="test-child">{childContent}</div>
          </AuthSection>
        </MemoryRouter>
      </HelmetProvider>
    );

    const child = screen.getByTestId('test-child');
    expect(child.textContent).toBe(childContent);
  });
});
