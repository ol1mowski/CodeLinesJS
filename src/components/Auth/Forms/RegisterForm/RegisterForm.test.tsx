import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm.component';
import { useAuth } from '../../../../hooks/useAuth';

// Mock useAuth hook
vi.mock('../../../../Hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    register: vi.fn(),
    loading: false,
    error: null
  }))
}));

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('RegisterForm', () => {
  it('validates required fields', async () => {
    renderWithRouter(<RegisterForm />);
    
    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Nazwa użytkownika jest wymagana')).toBeInTheDocument();
      expect(screen.getByText('Email jest wymagany')).toBeInTheDocument();
      expect(screen.getByText('Hasło jest wymagane')).toBeInTheDocument();
      expect(screen.getByText('Potwierdzenie hasła jest wymagane')).toBeInTheDocument();
      expect(screen.getByText('Musisz zaakceptować politykę prywatności')).toBeInTheDocument();
    });
  });

  it('validates password requirements', async () => {
    renderWithRouter(<RegisterForm />);
    
    const passwordInput = screen.getByLabelText('Hasło');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    
    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Hasło musi mieć minimum 8 znaków')).toBeInTheDocument();
      expect(screen.getByText('Hasło musi zawierać wielką literę')).toBeInTheDocument();
      expect(screen.getByText('Hasło musi zawierać cyfrę')).toBeInTheDocument();
      expect(screen.getByText('Hasło musi zawierać znak specjalny')).toBeInTheDocument();
    });
  });

  it('validates password confirmation', async () => {
    renderWithRouter(<RegisterForm />);
    
    const passwordInput = screen.getByLabelText('Hasło');
    const confirmPasswordInput = screen.getByLabelText('Potwierdź hasło');
    
    fireEvent.change(passwordInput, { target: { value: 'Test123!@#' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test123!@#different' } });
    
    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Hasła muszą być takie same')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    renderWithRouter(<RegisterForm />);
    
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Nieprawidłowy format email')).toBeInTheDocument();
    });
  });

  it('toggles password visibility', () => {
    renderWithRouter(<RegisterForm />);
    
    const passwordInput = screen.getByLabelText('Hasło');
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    const toggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(toggleButton);
    
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('submits form with valid data', async () => {
    const mockRegister = vi.fn();
    (useAuth as any).mockImplementation(() => ({
      register: mockRegister,
      loading: false,
      error: null
    }));

    renderWithRouter(<RegisterForm />);
    
    fireEvent.change(screen.getByLabelText('Nazwa użytkownika'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Hasło'), {
      target: { value: 'Test123!@#' }
    });
    fireEvent.change(screen.getByLabelText('Potwierdź hasło'), {
      target: { value: 'Test123!@#' }
    });
    
    const privacyCheckbox = screen.getByRole('checkbox');
    fireEvent.click(privacyCheckbox);
    
    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        'test@example.com',
        'Test123!@#',
        'testuser'
      );
    });
  });
}); 