import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm.component';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}));

vi.mock('../../../Hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    login: vi.fn(),
    loading: false,
    error: null,
    loginWithGoogle: vi.fn()
  }))
}));

vi.mock('@react-oauth/google', () => ({
  GoogleLogin: () => <div data-testid="google-login-button">Google Login</div>,
  GoogleOAuthProvider: ({ children }: any) => <>{children}</>
}));

vi.mock('./GoogleLoginButton.component', () => ({
  GoogleLoginButton: () => <div data-testid="google-login-button">Google Login</div>
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
  it('renders form correctly', () => {
    render(<LoginForm />);
    
    expect(screen.getByPlaceholderText('twoj@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zaloguj/i })).toBeInTheDocument();
    expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /zaloguj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email jest wymagany/i)).toBeInTheDocument();
      expect(screen.getByText(/hasło jest wymagane/i)).toBeInTheDocument();
    });
  });
}); 
