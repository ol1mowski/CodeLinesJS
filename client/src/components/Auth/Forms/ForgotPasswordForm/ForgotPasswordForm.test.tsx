import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ForgotPasswordForm from './ForgotPasswordForm.component';
import { useAuth } from '../../hooks/useAuth.hook';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('../../hooks/useAuth.hook', () => ({
  useAuth: vi.fn(),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    p: ({ children, ...props }: any) => (
      <p data-testid={props['data-testid']} {...props}>
        {children}
      </p>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    
    // Dodajemy domyślne wartości do mocka useAuth
    vi.mocked(useAuth).mockReturnValue({
      forgotPassword: vi.fn(),
      loading: false,
      error: null,
      login: vi.fn(),
      register: vi.fn(),
      resetPassword: vi.fn(),
      logout: vi.fn(),
      loginWithGoogle: vi.fn(),
      isAuthenticated: false,
      isAuthChecking: false,
      user: null,
      token: null,
    });
  });

  it('Renders the form correctly', () => {
    const { container } = render(<ForgotPasswordForm />);

    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput).not.toBeNull();
    expect(emailInput?.getAttribute('placeholder')).toBe('twoj@email.com');

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    expect(submitButton?.textContent?.toLowerCase().includes('wyślij link resetujący')).toBe(true);

    const introText = container.querySelector('p');
    expect(introText?.textContent?.toLowerCase().includes('podaj swój adres email')).toBe(true);
  });

  it('validates required fields', async () => {
    const { container } = render(<ForgotPasswordForm />);

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, span, div');
      const hasErrorMessage = Array.from(errorElements).some(element =>
        element.textContent?.toLowerCase().includes('email')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });

  it('validates the email format', async () => {
    const { container } = render(<ForgotPasswordForm />);

    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput).not.toBeNull();
    if (emailInput) fireEvent.change(emailInput, { target: { value: 'niepoprawnyemail' } });

    if (emailInput) fireEvent.blur(emailInput);

    await new Promise(resolve => setTimeout(resolve, 100));

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(
      () => {
        const errorElements = container.querySelectorAll('p, span, div');
        const hasErrorMessage = Array.from(errorElements).some(element =>
          element.textContent?.toLowerCase().match(/email|format|niepoprawny/i)
        );
        expect(hasErrorMessage).toBe(true);
      },
      { timeout: 2000 }
    );
  });

  it('displays a success message after sending the form', async () => {
    const mockForgotPassword = vi.fn().mockResolvedValue('Link został wysłany na twój adres email');

    vi.mocked(useAuth).mockReturnValue({
      forgotPassword: mockForgotPassword,
      loading: false,
      error: null,
    } as any);

    const { container } = render(<ForgotPasswordForm />);

    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput).not.toBeNull();
    if (emailInput) fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');

      const successElements = container.querySelectorAll('p, div');
      const hasSuccessMessage = Array.from(successElements).some(element =>
        element.textContent?.toLowerCase().includes('link został wysłany')
      );
      expect(hasSuccessMessage).toBe(true);
    });
  });

  it('displays an error message when the form fails', async () => {
    const mockError = new Error('Użytkownik o podanym adresie email nie istnieje');
    const mockForgotPassword = vi.fn().mockRejectedValue(mockError);

    vi.mocked(useAuth).mockReturnValue({
      forgotPassword: mockForgotPassword,
      loading: false,
      error: null,
    } as any);

    const { container } = render(<ForgotPasswordForm />);

    const emailInput = container.querySelector('input[type="email"]');
    expect(emailInput).not.toBeNull();
    if (emailInput) fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');

      const errorElements = container.querySelectorAll('p, div');
      const hasErrorMessage = Array.from(errorElements).some(element =>
        element.textContent
          ?.toLowerCase()
          .includes('użytkownik o podanym adresie email nie istnieje')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });
});
