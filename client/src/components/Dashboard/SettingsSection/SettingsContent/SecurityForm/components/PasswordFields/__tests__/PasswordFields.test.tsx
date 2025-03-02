import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordFields } from '../PasswordFields.component';

describe('PasswordFields', () => {
  const mockForm = {
    register: vi.fn(),
  };

  const mockErrors = {
    currentPassword: undefined,
    newPassword: undefined,
    confirmPassword: undefined
  };

  it('renders all password fields', () => {
    render(<PasswordFields form={mockForm as any} errors={mockErrors} />);
    
    expect(screen.getByPlaceholderText('Wprowadź aktualne hasło')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wprowadź nowe hasło')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Powtórz nowe hasło')).toBeInTheDocument();
  });

  it('displays error messages when present', () => {
    const errorsWithMessages = {
      currentPassword: { message: 'Wymagane pole' },
      newPassword: { message: 'Hasło jest za krótkie' },
      confirmPassword: { message: 'Hasła nie są identyczne' }
    };

    render(<PasswordFields form={mockForm as any} errors={errorsWithMessages as any} />);
    
    expect(screen.getByText('Wymagane pole')).toBeInTheDocument();
    expect(screen.getByText('Hasło jest za krótkie')).toBeInTheDocument();
    expect(screen.getByText('Hasła nie są identyczne')).toBeInTheDocument();
  });
});