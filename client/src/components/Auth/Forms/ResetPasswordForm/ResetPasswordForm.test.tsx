import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ResetPasswordForm from './ResetPasswordForm.component';
import { useAuth } from '../../../../hooks/useAuth';

let mockedToken = 'valid-token-12345';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({ token: mockedToken }),
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}));

vi.mock('../../../../Hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    resetPassword: vi.fn().mockResolvedValue('Hasło zostało pomyślnie zresetowane'),
    loading: false,
    error: null
  }))
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    p: ({ children, ...props }: any) => <p data-testid={props['data-testid']} {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedToken = 'valid-token-12345';
    cleanup();
  });

  it('Renders the form correctly with a valid token', () => {
    const { container } = render(<ResetPasswordForm />);
    
    expect(screen.getByText(/wprowadź nowe hasło dla swojego konta/i)).not.toBeNull();
    
    const newPasswordLabels = container.querySelectorAll('label');
    const hasNewPasswordLabel = Array.from(newPasswordLabels).some(
      label => label.textContent?.toLowerCase().includes('nowe hasło')
    );
    expect(hasNewPasswordLabel).toBe(true);
    
    const confirmPasswordLabels = container.querySelectorAll('label');
    const hasConfirmPasswordLabel = Array.from(confirmPasswordLabels).some(
      label => label.textContent?.toLowerCase().includes('potwierdź nowe hasło')
    );
    expect(hasConfirmPasswordLabel).toBe(true);
    
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton?.textContent?.toLowerCase().includes('zresetuj hasło')).toBe(true);
  });

  it('displays an error message when the token is missing', () => {
    mockedToken = undefined as any;
    
    render(<ResetPasswordForm />);
    
    const errorElement = screen.queryByText(/brak tokenu resetowania hasła/i);
    expect(errorElement).not.toBeNull();
  });

  it('displays an error message when the token is invalid', () => {
    mockedToken = 'short';
    
    render(<ResetPasswordForm />);
    
    const errorElement = screen.queryByText(/token resetowania hasła jest nieprawidłowy/i);
    expect(errorElement).not.toBeNull();
  });

  it('waliduje wymagane pola', async () => {
    const { container } = render(<ResetPasswordForm />);
    
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, span, div');
      const hasErrorMessage = Array.from(errorElements).some(
        element => element.textContent?.toLowerCase().includes('hasło musi mieć')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });

  it('validates the password format', async () => {
    const { container } = render(<ResetPasswordForm />);
    
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBeGreaterThan(0);
    const passwordInput = passwordInputs[0];
    
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, span, div');
      const hasErrorMessage = Array.from(errorElements).some(
        element => element.textContent?.toLowerCase().includes('hasło musi zawierać przynajmniej')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });

  it('validates password confirmation match', async () => {
    const { container } = render(<ResetPasswordForm />);
    
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password124' } });
    
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, span, div');
      const hasErrorMessage = Array.from(errorElements).some(
        element => element.textContent?.toLowerCase().includes('hasła muszą być identyczne')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });

  it('calls the reset password function with correct data', async () => {
    const mockResetPassword = vi.fn().mockResolvedValue('Hasło zostało pomyślnie zresetowane');
    
    vi.mocked(useAuth).mockReturnValue({
      resetPassword: mockResetPassword,
      loading: false,
      error: null
    } as any);
    
    const { container } = render(<ResetPasswordForm />);
    
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });
    
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('valid-token-12345', 'Password123', 'Password123');
    });
  });

  it('displays a success message after a successful password reset', async () => {
    const mockResetPassword = vi.fn().mockResolvedValue('Hasło zostało pomyślnie zresetowane');
    
    vi.mocked(useAuth).mockReturnValue({
      resetPassword: mockResetPassword,
      loading: false,
      error: null
    } as any);
    
    const { container } = render(<ResetPasswordForm />);
    
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });
    
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const successElements = container.querySelectorAll('p, div');
      const hasSuccessMessage = Array.from(successElements).some(
        element => element.textContent?.toLowerCase().includes('hasło zostało pomyślnie zresetowane')
      );
      expect(hasSuccessMessage).toBe(true);
    });
  });

  it('displays an error message when the password reset fails', async () => {
    const mockError = new Error('Token resetowania hasła wygasł');
    const mockResetPassword = vi.fn().mockRejectedValue(mockError);
    
    vi.mocked(useAuth).mockReturnValue({
      resetPassword: mockResetPassword,
      loading: false,
      error: null
    } as any);
    
    const { container } = render(<ResetPasswordForm />);
    
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs.length).toBe(2);
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });
    
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    if (submitButton) fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = container.querySelectorAll('p, div');
      const hasErrorMessage = Array.from(errorElements).some(
        element => element.textContent?.toLowerCase().includes('token resetowania hasła wygasł')
      );
      expect(hasErrorMessage).toBe(true);
    });
  });
}); 