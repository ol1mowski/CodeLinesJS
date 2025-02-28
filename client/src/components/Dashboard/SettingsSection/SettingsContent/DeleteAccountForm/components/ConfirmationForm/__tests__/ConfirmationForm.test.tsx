import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  onSubmit: mockOnSubmit
};

describe('ConfirmationForm', () => {
  it('should render all form fields', () => {
    render(<ConfirmationForm {...defaultProps} />);

    expect(screen.getByRole('textbox', { name: /potwierdzenie/i })).toBeDefined();
    expect(screen.getByPlaceholderText('Wprowadź hasło aby potwierdzić')).toBeDefined();
    expect(screen.getByRole('button', { name: /definitywnie usuń konto/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /anuluj/i })).toBeDefined();
  });

  it('should display validation errors', () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        password: { message: 'Hasło jest wymagane' },
        confirmation: { message: 'Nieprawidłowe potwierdzenie' }
      }
    };

    render(<ConfirmationForm {...propsWithErrors} />);

    expect(screen.getByText('Hasło jest wymagane')).toBeDefined();
    expect(screen.getByText('Nieprawidłowe potwierdzenie')).toBeDefined();
  });

  it('should display loading state during submission', () => {
    render(<ConfirmationForm {...defaultProps} isSubmitting={true} />);

    expect(screen.getByText('Usuwanie')).toBeDefined();
    expect(screen.getByRole('button', { name: /usuwanie/i })).toBeDisabled();
  });
}); 