import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegisterForm from './RegisterForm.component';
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

describe('RegisterForm', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    
    // Dodajemy domyślne wartości do mocka useAuth
    vi.mocked(useAuth).mockReturnValue({
      register: vi.fn(),
      loading: false,
      error: null,
      login: vi.fn(),
      forgotPassword: vi.fn(),
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
    const { container } = render(<RegisterForm />);

    const usernameInput = container.querySelector('input[name="username"]');
    expect(usernameInput).not.toBeNull();
    expect(usernameInput?.getAttribute('placeholder')).toBe('jankowalski');

    const emailInput = container.querySelector('input[name="email"]');
    expect(emailInput).not.toBeNull();
    expect(emailInput?.getAttribute('placeholder')).toBe('twoj@email.com');

    const passwordLabels = container.querySelectorAll('label');
    const hasPasswordLabel = Array.from(passwordLabels).some(label =>
      label.textContent?.toLowerCase().includes('hasło')
    );
    expect(hasPasswordLabel).toBe(true);

    const confirmPasswordLabels = container.querySelectorAll('label');
    const hasConfirmPasswordLabel = Array.from(confirmPasswordLabels).some(label =>
      label.textContent?.toLowerCase().includes('potwierdź hasło')
    );
    expect(hasConfirmPasswordLabel).toBe(true);

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    expect(submitButton?.textContent?.toLowerCase().includes('zarejestruj')).toBe(true);
  });

  it('validates required fields', async () => {
    const { container } = render(<RegisterForm />);

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, span, div');
      const hasErrorMessage = Array.from(errorElements).some(element =>
        element.textContent
          ?.toLowerCase()
          .match(/nazwa użytkownika|nieprawidłowy format|hasło musi mieć|musisz zaakceptować/i)
      );
      expect(hasErrorMessage).toBe(true);
    });
  });

  it('validates the username format', async () => {
    const { container } = render(<RegisterForm />);

    const usernameInput = container.querySelector('input[name="username"]');
    expect(usernameInput).not.toBeNull();
    if (usernameInput) fireEvent.change(usernameInput, { target: { value: 'użytkownik@' } });

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, span, div');
      const hasErrorMessage = Array.from(errorElements).some(element =>
        element.textContent?.toLowerCase().includes('nazwa użytkownika może zawierać tylko')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });

  it('validates the password format', async () => {
    const { container } = render(<RegisterForm />);

    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBeGreaterThan(0);
    const passwordInput = passwordInputs[0];

    if (passwordInput) fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, span, div');
      const hasErrorMessage = Array.from(errorElements).some(element =>
        element.textContent?.toLowerCase().includes('hasło musi zawierać przynajmniej')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });

  it('validates passwords match', async () => {
    const { container } = render(<RegisterForm />);

    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];

    if (passwordInput) fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    if (confirmPasswordInput)
      fireEvent.change(confirmPasswordInput, { target: { value: 'Password124' } });

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, span, div');
      const hasErrorMessage = Array.from(errorElements).some(element =>
        element.textContent?.toLowerCase().includes('hasła muszą być identyczne')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });

  it('calls the registration function with correct data', async () => {
    const mockRegister = vi.fn().mockResolvedValue(undefined);

    vi.mocked(useAuth).mockReturnValue({
      register: mockRegister,
      loading: false,
      error: null,
    } as any);

    const { container } = render(<RegisterForm />);

    const usernameInput = container.querySelector('input[name="username"]');
    expect(usernameInput).not.toBeNull();
    if (usernameInput) fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    const emailInput = container.querySelector('input[name="email"]');
    expect(emailInput).not.toBeNull();
    if (emailInput) fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];

    if (passwordInput) fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    if (confirmPasswordInput)
      fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });

    const privacyCheckbox = container.querySelector('input[type="checkbox"]');
    expect(privacyCheckbox).not.toBeNull();
    if (privacyCheckbox) fireEvent.click(privacyCheckbox);

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('test@example.com', 'Password123', 'testuser');
    });
  });

  it('displays an error message when the registration fails', async () => {
    const mockError = new Error('Użytkownik o podanym adresie email już istnieje');
    const mockRegister = vi.fn().mockRejectedValue(mockError);

    vi.mocked(useAuth).mockReturnValue({
      register: mockRegister,
      loading: false,
      error: null,
    } as any);

    const { container } = render(<RegisterForm />);

    const usernameInput = container.querySelector('input[name="username"]');
    expect(usernameInput).not.toBeNull();
    if (usernameInput) fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    const emailInput = container.querySelector('input[name="email"]');
    expect(emailInput).not.toBeNull();
    if (emailInput) fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];

    if (passwordInput) fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    if (confirmPasswordInput)
      fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });

    const privacyCheckbox = container.querySelector('input[type="checkbox"]');
    expect(privacyCheckbox).not.toBeNull();
    if (privacyCheckbox) fireEvent.click(privacyCheckbox);

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, div');
      const hasErrorMessage = Array.from(errorElements).some(element =>
        element.textContent
          ?.toLowerCase()
          .includes('użytkownik o podanym adresie email już istnieje')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });
});
