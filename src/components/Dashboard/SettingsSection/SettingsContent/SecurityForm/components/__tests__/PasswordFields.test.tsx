import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordFields } from '../PasswordFields/PasswordFields.component';

describe('PasswordFields', () => {
  const mockForm = {
    register: vi.fn(),
    formState: {
      errors: {},
    },
  };

  it('renders all password fields', () => {
    render(<PasswordFields form={mockForm as any} />);
    
    expect(screen.getByPlaceholderText('Wprowadź aktualne hasło')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wprowadź nowe hasło')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wprowadź ponownie nowe hasło')).toBeInTheDocument();
  });

  it('displays error messages when present', () => {
    const formWithErrors = {
      register: vi.fn(),
      formState: {
        errors: {
          currentPassword: { message: 'Wymagane pole' },
          newPassword: { message: 'Hasło jest za krótkie' },
          confirmPassword: { message: 'Hasła nie są identyczne' },
        },
      },
    };

    render(<PasswordFields form={formWithErrors as any} />);
    
    expect(screen.getByText('Wymagane pole')).toBeInTheDocument();
    expect(screen.getByText('Hasło jest za krótkie')).toBeInTheDocument();
    expect(screen.getByText('Hasła nie są identyczne')).toBeInTheDocument();
  });
});