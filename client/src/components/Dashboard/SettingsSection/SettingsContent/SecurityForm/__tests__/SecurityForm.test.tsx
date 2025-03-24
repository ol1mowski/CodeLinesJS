import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SecurityForm } from '../SecurityForm.component';
import { useSecurityForm } from '../hooks/useSecurityForm';
import { useSecurityToasts } from '../hooks/useSecurityToasts';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../hooks/useSecurityForm');
vi.mock('../hooks/useSecurityToasts');
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock('framer-motion', () => ({
  motion: {
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
}));

vi.mock('../../ProfileForm/components/FormButtons/FormButtons.component', () => ({
  FormButtons: ({ onCancel, isSubmitting, submitText, loadingText }: any) => (
    <div>
      <button onClick={onCancel} type="button">Anuluj</button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? loadingText : submitText}
      </button>
    </div>
  )
}));

describe('SecurityForm', () => {
  const mockReset = vi.fn();
  const mockHandleSuccess = vi.fn();
  const mockHandleError = vi.fn();
  const mockHandleCancel = vi.fn();
  const mockHandleCancelError = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(useSecurityToasts).mockReturnValue({
      handleSuccess: mockHandleSuccess,
      handleError: mockHandleError,
      handleCancel: mockHandleCancel,
      handleCancelError: mockHandleCancelError
    });

    vi.mocked(useSecurityForm).mockReturnValue({
      form: {
        reset: mockReset,
        register: vi.fn(),
        formState: { 
          isSubmitting: true,
          errors: {
            currentPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined
          }
        },
        handleSubmit: vi.fn(),
      } as any,
      onSubmit: mockOnSubmit,
      isUpdating: false,
    });
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <SecurityForm />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Wprowadź aktualne hasło')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wprowadź nowe hasło')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Powtórz nowe hasło')).toBeInTheDocument();
    expect(screen.getByText('Anuluj')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    render(
      <MemoryRouter>
        <SecurityForm />
      </MemoryRouter>
    );
    
    const form = screen.getByRole('button', { name: 'Zmienianie hasła' });
    fireEvent.click(form);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('handles cancel action correctly', async () => {
    render(
      <MemoryRouter>
        <SecurityForm />
      </MemoryRouter>
    );
    
    const cancelButton = screen.getByText('Anuluj');
    await userEvent.click(cancelButton);

    expect(mockReset).toHaveBeenCalled();
    expect(mockHandleCancel).toHaveBeenCalled();
  });

  it('shows loading state when submitting', () => {
    vi.mocked(useSecurityForm).mockReturnValue({
      form: {
        reset: mockReset,
        register: vi.fn(),
        formState: { 
          isSubmitting: true,
          errors: {
            currentPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined
          }
        },
        handleSubmit: vi.fn(),
      } as any,
      onSubmit: vi.fn(),
      isUpdating: false,
    });

    render(
      <MemoryRouter>
        <SecurityForm />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Zmienianie hasła')).toBeInTheDocument();
  });
}); 