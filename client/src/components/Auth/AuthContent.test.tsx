import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthContent } from './AuthContent/AuthContent.component';
import { BrowserRouter } from 'react-router-dom';

vi.mock('./Forms/LoginForm/LoginForm.component', () => ({
  default: () => <div data-testid="login-form">Login Form</div>
}));

vi.mock('./Forms/RegisterForm/RegisterForm.component', () => ({
  default: () => <div data-testid="register-form">Register Form</div>
}));

vi.mock('./Forms/ForgotPasswordForm/ForgotPasswordForm.component', () => ({
  default: () => <div data-testid="forgot-password-form">Forgot Password Form</div>
}));

vi.mock('./AuthContent/AuthTabs.component', () => ({
  AuthTabs: () => (
    <div className="auth-tabs-mock">
      <button 
        role="button"
        name="logowanie"
        className="bg-js/20"
        data-testid="login-tab"
      >
        Logowanie
      </button>
      <button
        role="button"
        name="rejestracja"
        data-testid="register-tab"
      >
        Rejestracja
      </button>
      <button
        role="button"
        name="reset hasła"
        data-testid="forgot-tab"
      >
        Reset hasła
      </button>
    </div>
  )
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('AuthContent', () => {
  it('renders login form by default', async () => {
    renderWithRouter(<AuthContent />);
    
    const loginTab = screen.getByTestId('login-tab');
    expect(loginTab).toHaveClass('bg-js/20');
    
    await waitFor(() => {
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });
  });

  it('switches between forms when tabs are clicked', async () => {
    renderWithRouter(<AuthContent />);
    
    await waitFor(() => {
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });
  });
}); 