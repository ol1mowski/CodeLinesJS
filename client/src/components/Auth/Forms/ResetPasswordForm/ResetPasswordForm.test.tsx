import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ResetPasswordForm from './ResetPasswordForm.component';
import { useAuth } from '../../../../Hooks/useAuth';

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
  });

  it('Renders the form correctly with a valid token', () => {
    render(<ResetPasswordForm />);
    
    expect(screen.getByText(/wprowadź nowe hasło dla swojego konta/i)).toBeInTheDocument();
    expect(screen.queryAllByText(/nowe hasło/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/potwierdź nowe hasło/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /zresetuj hasło/i })).toBeInTheDocument();
  });

  it('displays an error message when the token is missing', () => {
    mockedToken = undefined as any;
    
    render(<ResetPasswordForm />);
    
    expect(screen.getByText(/brak tokenu resetowania hasła/i)).toBeInTheDocument();
  });

  it('displays an error message when the token is invalid', () => {
    mockedToken = 'short';
    
    render(<ResetPasswordForm />);
    
    expect(screen.getByText(/token resetowania hasła jest nieprawidłowy/i)).toBeInTheDocument();
  });

  it('waliduje wymagane pola', async () => {
    render(<ResetPasswordForm />);
    
    const submitButton = screen.getByRole('button', { name: /zresetuj hasło/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/hasło musi mieć/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('validates the password format', async () => {
    render(<ResetPasswordForm />);
    
      const inputs = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = inputs[0];
    
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    
    const submitButton = screen.getByRole('button', { name: /zresetuj hasło/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/hasło musi zawierać przynajmniej/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('validates the password format', async () => {
    render(<ResetPasswordForm />);
    
    const inputs = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = inputs[0];
    const confirmPasswordInput = inputs[1];
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password124' } });
    
    const submitButton = screen.getByRole('button', { name: /zresetuj hasło/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/hasła muszą być identyczne/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('calls the reset password function with correct data', async () => {
    const mockResetPassword = vi.fn().mockResolvedValue('Hasło zostało pomyślnie zresetowane');
    
    vi.mocked(useAuth).mockReturnValue({
      resetPassword: mockResetPassword,
      loading: false,
      error: null
    } as any);
    
    render(<ResetPasswordForm />);
    
    const inputs = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = inputs[0];
    const confirmPasswordInput = inputs[1];
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });
    
    const submitButton = screen.getByRole('button', { name: /zresetuj hasło/i });
    fireEvent.click(submitButton);

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
    
    render(<ResetPasswordForm />);
    
    const inputs = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = inputs[0];
    const confirmPasswordInput = inputs[1];
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });
    
    const submitButton = screen.getByRole('button', { name: /zresetuj hasło/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/hasło zostało pomyślnie zresetowane/i)).toBeInTheDocument();
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
    
    render(<ResetPasswordForm />);
    
    const inputs = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = inputs[0];
    const confirmPasswordInput = inputs[1];
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });
    
    const submitButton = screen.getByRole('button', { name: /zresetuj hasło/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/token resetowania hasła wygasł/i)).toBeInTheDocument();
    });
  });
}); 