import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ResetPasswordForm from './ResetPasswordForm.component';
import { useAuth } from '../../../../Hooks/useAuth';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({ token: 'valid-token-12345' }),
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
    vi.resetModules();
  });

  it('renderuje formularz poprawnie z poprawnym tokenem', () => {
    render(<ResetPasswordForm />);
    
    expect(screen.getByText(/wprowadź nowe hasło dla swojego konta/i)).toBeInTheDocument();
    expect(screen.getByText(/nowe hasło/i)).toBeInTheDocument();
    expect(screen.getByText(/potwierdź nowe hasło/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zresetuj hasło/i })).toBeInTheDocument();
  });

  it('wyświetla komunikat błędu przy braku tokenu', () => {
    vi.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ token: undefined });
    
    render(<ResetPasswordForm />);
    
    expect(screen.getByText(/brak tokenu resetowania hasła/i)).toBeInTheDocument();
  });

  it('wyświetla komunikat błędu przy nieprawidłowym tokenie', () => {
    vi.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ token: 'short' });
    
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

  it('waliduje format hasła', async () => {
    render(<ResetPasswordForm />);
    
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    
    const submitButton = screen.getByRole('button', { name: /zresetuj hasło/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/hasło musi zawierać przynajmniej/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('waliduje zgodność haseł', async () => {
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

  it('wywołuje funkcję resetowania hasła z poprawnymi danymi', async () => {
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

  it('wyświetla komunikat sukcesu po poprawnym zresetowaniu hasła', async () => {
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

  it('wyświetla komunikat błędu w przypadku niepowodzenia resetowania hasła', async () => {
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