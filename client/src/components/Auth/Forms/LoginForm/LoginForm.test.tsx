import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginForm from './LoginForm.component';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('../../../Hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    login: vi.fn(),
    loading: false,
    error: null,
    loginWithGoogle: vi.fn(),
  })),
}));

vi.mock('@react-oauth/google', () => ({
  GoogleLogin: () => <div data-testid="google-login-button">Google Login</div>,
  GoogleOAuthProvider: ({ children }: any) => <>{children}</>,
}));

vi.mock('./GoogleLoginButton.component', () => ({
  GoogleLoginButton: () => <div data-testid="google-login-button">Google Login</div>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('LoginForm', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders form correctly', () => {
    const { container } = render(<LoginForm />);

    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput).not.toBeNull();
    expect(emailInput?.getAttribute('placeholder')).toBe('twoj@email.com');

    const passwordInput = container.querySelector('input[type="password"]');
    expect(passwordInput).not.toBeNull();
    expect(passwordInput?.getAttribute('placeholder')).toBe('••••••••');

    // Używamy querySelector na kontenerze zamiast getByRole, które może zwrócić wiele elementów
    const loginButton = container.querySelector('button[type="submit"]');
    expect(loginButton).not.toBeNull();
    expect(loginButton?.textContent?.toLowerCase().includes('zaloguj')).toBe(true);

    const googleButton = container.querySelector('[data-testid="google-login-button"]');
    expect(googleButton).not.toBeNull();
  });

  it('validates required fields', async () => {
    const { container } = render(<LoginForm />);

    // Używamy querySelector na kontenerze
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();

    if (submitButton) {
      fireEvent.click(submitButton);
    }

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, span, div');
      const hasEmailErrorMessage = Array.from(errorElements).some(element =>
        element.textContent?.toLowerCase().includes('email jest wymagany')
      );
      const hasPasswordErrorMessage = Array.from(errorElements).some(element =>
        element.textContent?.toLowerCase().includes('hasło jest wymagane')
      );

      expect(hasEmailErrorMessage).toBe(true);
      expect(hasPasswordErrorMessage).toBe(true);
    });
  });
});
