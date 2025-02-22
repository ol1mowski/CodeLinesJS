import React from 'react';
import { describe, it, expect, vi, beforeEach, MockInstance } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SecurityForm } from '../SecurityForm.component';
import { useSecurityForm } from '../hooks/useSecurityForm';
import { useSecurityToasts } from '../hooks/useSecurityToasts';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../hooks/useSecurityForm', () => ({
  useSecurityForm: vi.fn()
}));

vi.mock('../hooks/useSecurityToasts', () => ({
  useSecurityToasts: vi.fn()
}));

vi.mock('framer-motion', () => ({
  motion: {
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
}));

vi.mock('../../../../UI/Button/Button.component', () => ({
  Button: ({ children, onClick, disabled, type = 'button', ...props }: any) => (
    <button 
      onClick={onClick}
      disabled={disabled}
      type={type}
      data-testid="button" 
      {...props}
    >
      {children}
    </button>
  )
}));

vi.mock('../../components/Profile/FormButtons/FormButtons.component', () => ({
  FormButtons: ({ onCancel, isSubmitting, submitText, loadingText }: any) => (
    <div data-testid="form-buttons">
      <button onClick={onCancel} data-testid="cancel-button">Anuluj</button>
      <button 
        disabled={isSubmitting} 
        data-testid="submit-button"
      >
        {isSubmitting ? loadingText : submitText}
      </button>
    </div>
  ),
}));

vi.mock('../../../../../../UI/Form/FormInput/FormInput.component', () => ({
  FormInput: ({ id, placeholder, error, ...props }: any) => (
    <div>
      <input
        data-testid={`input-${id}`}
        id={id}
        placeholder={placeholder}
        {...props}
      />
      {error && <span data-testid={`error-${id}`}>{error}</span>}
    </div>
  ),
}));

describe('SecurityForm', () => {
  const mockReset = vi.fn();
  const mockHandleSuccess = vi.fn();
  const mockHandleError = vi.fn();
  const mockHandleCancel = vi.fn();
  const mockHandleCancelError = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    (useSecurityToasts as unknown as MockInstance).mockReturnValue({
      handleSuccess: mockHandleSuccess,
      handleError: mockHandleError,
      handleCancel: mockHandleCancel,
      handleCancelError: mockHandleCancelError,
    });

    (useSecurityForm as unknown as MockInstance).mockReturnValue({
      form: {
        reset: mockReset,
        register: vi.fn(),
        formState: { 
          isSubmitting: false,
          errors: {
            currentPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined
          }
        },
        handleSubmit: (fn: any) => (e: any) => {
          e.preventDefault();
          return fn();
        },
      },
      onSubmit: vi.fn(),
      isUpdating: false,
    });
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <SecurityForm />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('input-currentPassword')).toBeInTheDocument();
    expect(screen.getByTestId('input-newPassword')).toBeInTheDocument();
    expect(screen.getByTestId('input-confirmPassword')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const mockOnSubmit = vi.fn();
    (useSecurityForm as unknown as MockInstance).mockReturnValue({
      form: {
        reset: mockReset,
        register: vi.fn(),
        formState: { 
          isSubmitting: false,
          errors: {
            currentPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined
          }
        },
        handleSubmit: (fn: any) => (e: any) => {
          e.preventDefault();
          return fn();
        },
      },
      onSubmit: mockOnSubmit,
      isUpdating: false,
    });

    render(
      <MemoryRouter>
        <SecurityForm />
      </MemoryRouter>
    );
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);

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
    (useSecurityForm as unknown as MockInstance).mockReturnValue({
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
      },
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