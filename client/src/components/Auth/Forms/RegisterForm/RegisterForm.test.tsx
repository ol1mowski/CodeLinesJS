import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterForm from './RegisterForm.component';
import { useAuth } from '../../../../Hooks/useAuth';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}));

vi.mock('../../../../Hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    register: vi.fn().mockResolvedValue(undefined),
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

describe('RegisterForm', () => {
  it('Renders the form correctly', () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText('jankowalski')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('twoj@email.com')).toBeInTheDocument();
    const hasloLabels = screen.queryAllByText(/hasło/i);
    expect(hasloLabels.length).toBeGreaterThan(0);
    const potwierdzHasloLabel = screen.queryAllByText(/potwierdź hasło/i);
    expect(potwierdzHasloLabel.length).toBeGreaterThan(0);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zarejestruj/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<RegisterForm />);

    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/nazwa użytkownika|nieprawidłowy format|hasło musi mieć|musisz zaakceptować/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('validates the username format', async () => {
    render(<RegisterForm />);

    const usernameInput = screen.getByPlaceholderText('jankowalski');
    fireEvent.change(usernameInput, { target: { value: 'użytkownik@' } });

    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/nazwa użytkownika może zawierać tylko/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('validates the password format', async () => {
    render(<RegisterForm />);

    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = passwordInputs[0];

    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/hasło musi zawierać przynajmniej/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('validates the password format', async () => {
    render(<RegisterForm />);

    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];

    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password124' } });

    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/hasła muszą być identyczne/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('calls the registration function with correct data', async () => {
    const mockRegister = vi.fn().mockResolvedValue(undefined);

    vi.mocked(useAuth).mockReturnValue({
      register: mockRegister,
      loading: false,
      error: null
    } as any);

    render(<RegisterForm />);

    const usernameInput = screen.getByPlaceholderText('jankowalski');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    const emailInput = screen.getByPlaceholderText('twoj@email.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];

    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });

    const privacyCheckbox = screen.getByRole('checkbox');
    fireEvent.click(privacyCheckbox);

    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

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
      error: null
    } as any);

    render(<RegisterForm />);

    const usernameInput = screen.getByPlaceholderText('jankowalski');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    const emailInput = screen.getByPlaceholderText('twoj@email.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const passwordInputs = screen.getAllByPlaceholderText('••••••••');
    const passwordInput = passwordInputs[0];
    const confirmPasswordInput = passwordInputs[1];

    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });

    const privacyCheckbox = screen.getByRole('checkbox');
    fireEvent.click(privacyCheckbox);

    const submitButton = screen.getByRole('button', { name: /zarejestruj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/użytkownik o podanym adresie email już istnieje/i)).toBeInTheDocument();
    });
  });
}); 