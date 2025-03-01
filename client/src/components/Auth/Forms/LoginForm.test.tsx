import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm/LoginForm.component';

vi.mock('../../../Hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    login: vi.fn(),
    loading: false,
    error: null
  }))
}));

vi.mock('./LoginForm/GoogleLoginButton.component', () => ({
  GoogleLoginButton: () => <div data-testid="google-login-button">Google Login</div>
}));

describe('LoginForm', () => {
  it('validates required fields', async () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /zaloguj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email jest wymagany')).toBeInTheDocument();
      expect(screen.getByText('Hasło jest wymagane')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByPlaceholderText('twoj@email.com');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /zaloguj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Nieprawidłowy format email')).toBeInTheDocument();
    });
  });
}); 
