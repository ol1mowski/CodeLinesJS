import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ForgotPasswordForm from './ForgotPasswordForm.component';
import { useAuth } from '../../../../Hooks/useAuth';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}));

vi.mock('../../../../Hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    forgotPassword: vi.fn().mockResolvedValue('Link został wysłany na twój adres email'),
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

describe('ForgotPasswordForm', () => {
  it('renderuje formularz poprawnie', () => {
    render(<ForgotPasswordForm />);
    
    expect(screen.getByPlaceholderText('twoj@email.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /wyślij link resetujący/i })).toBeInTheDocument();
    expect(screen.getByText(/podaj swój adres email/i)).toBeInTheDocument();
  });

  it('waliduje wymagane pola', async () => {
    render(<ForgotPasswordForm />);
    
    const submitButton = screen.getByRole('button', { name: /wyślij link resetujący/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/email jest wymagany|nieprawidłowy format email/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('waliduje niepoprawny format emaila', async () => {
    render(<ForgotPasswordForm />);
    
    const emailInput = screen.getByPlaceholderText('twoj@email.com');
    fireEvent.change(emailInput, { target: { value: 'niepoprawnyemail' } });
    
    const submitButton = screen.getByRole('button', { name: /wyślij link resetujący/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/nieprawidłowy format email/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('wyświetla komunikat sukcesu po wysłaniu formularza', async () => {
    const mockForgotPassword = vi.fn().mockResolvedValue('Link został wysłany na twój adres email');
    
    vi.mocked(useAuth).mockReturnValue({
      forgotPassword: mockForgotPassword,
      loading: false,
      error: null
    } as any);
    
    render(<ForgotPasswordForm />);
    
    const emailInput = screen.getByPlaceholderText('twoj@email.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /wyślij link resetujący/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');
      expect(screen.getByText(/link został wysłany/i)).toBeInTheDocument();
    });
  });

  it('wyświetla komunikat błędu w przypadku niepowodzenia', async () => {
    const mockError = new Error('Użytkownik o podanym adresie email nie istnieje');
    const mockForgotPassword = vi.fn().mockRejectedValue(mockError);
    
    vi.mocked(useAuth).mockReturnValue({
      forgotPassword: mockForgotPassword,
      loading: false,
      error: null
    } as any);
    
    render(<ForgotPasswordForm />);
    
    const emailInput = screen.getByPlaceholderText('twoj@email.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const submitButton = screen.getByRole('button', { name: /wyślij link resetujący/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');
      expect(screen.getByText(/użytkownik o podanym adresie email nie istnieje/i)).toBeInTheDocument();
    });
  });
}); 