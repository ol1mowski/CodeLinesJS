import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ConfirmationForm } from '../ConfirmationForm.component';
import { UseFormRegister } from 'react-hook-form';

type FormFields = {
  password: string;
  confirmation: string;
};

const mockRegister = vi.fn() as unknown as UseFormRegister<FormFields>;
const mockOnSubmit = vi.fn(e => e.preventDefault());
const mockOnCancel = vi.fn();

const defaultProps = {
  register: mockRegister,
  errors: {},
  isSubmitting: false,
  onCancel: mockOnCancel,
  onSubmit: mockOnSubmit,
};

describe('ConfirmationForm', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render all form fields', () => {
    render(<ConfirmationForm {...defaultProps} />);

    expect(screen.getByRole('textbox', { name: /potwierdzenie/i })).not.toBeNull();
    expect(screen.getByPlaceholderText('Wprowadź hasło aby potwierdzić')).not.toBeNull();
    expect(screen.getByRole('button', { name: /definitywnie usuń konto/i })).not.toBeNull();
    expect(screen.getByRole('button', { name: /anuluj/i })).not.toBeNull();
  });

  it('should display validation errors', () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        password: { message: 'Hasło jest wymagane' },
        confirmation: { message: 'Nieprawidłowe potwierdzenie' },
      },
    };

    render(<ConfirmationForm {...propsWithErrors} />);

    expect(screen.getByText('Hasło jest wymagane')).not.toBeNull();
    expect(screen.getByText('Nieprawidłowe potwierdzenie')).not.toBeNull();
  });

  it('should display loading state during submission', () => {
    render(<ConfirmationForm {...defaultProps} isSubmitting={true} />);

    expect(screen.getByText('Usuwanie')).not.toBeNull();

    // Sprawdzamy czy przycisk jest wyłączony przez sprawdzenie atrybutu disabled
    const submitButton = screen.getByRole('button', { name: /usuwanie/i });
    expect(submitButton).not.toBeNull();
    expect(submitButton.getAttribute('disabled')).not.toBeNull();
  });
});
