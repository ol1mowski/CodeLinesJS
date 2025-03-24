import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthContent } from './AuthContent/AuthContent.component';

vi.mock('./Forms/LoginForm/LoginForm.component', () => ({
  default: () => <div data-testid="login-form">Login Form</div>
}));

vi.mock('./Forms/RegisterForm/RegisterForm.component', () => ({
  default: () => <div data-testid="register-form">Register Form</div>
}));

vi.mock('./Forms/ForgotPasswordForm/ForgotPasswordForm.component', () => ({
  default: () => <div data-testid="forgot-password-form">Forgot Password Form</div>
}));

describe('AuthContent', () => {
  it('renders login form by default', () => {
    render(<AuthContent />);
    
    const loginTab = screen.getByRole('button', { name: /logowanie/i });
    expect(loginTab).toHaveClass('bg-js/20');
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('switches between forms when tabs are clicked', async () => {
    render(<AuthContent />);
    
    // Sprawdzenie formularza logowania domyślnie
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    
    // Przełączenie na rejestrację
    const registerTab = screen.getByRole('button', { name: /rejestracja/i });
    fireEvent.click(registerTab);
    expect(registerTab).toHaveClass('bg-js/20');
    expect(screen.getByTestId('register-form')).toBeInTheDocument();
    
    // Przełączenie na reset hasła
    const forgotTab = screen.getByRole('button', { name: /reset hasła/i });
    fireEvent.click(forgotTab);
    expect(forgotTab).toHaveClass('bg-js/20');
    expect(screen.getByTestId('forgot-password-form')).toBeInTheDocument();
  });
}); 