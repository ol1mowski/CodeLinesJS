import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
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

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders all password fields', () => {
    render(<PasswordFields form={mockForm as any} errors={mockErrors} />);
    
    expect(screen.getByPlaceholderText('Wprowadź aktualne hasło')).not.toBeNull();
    expect(screen.getByPlaceholderText('Wprowadź nowe hasło')).not.toBeNull();
    expect(screen.getByPlaceholderText('Powtórz nowe hasło')).not.toBeNull();
  });

  it('displays error messages when present', () => {
    const errorsWithMessages = {
      currentPassword: { message: 'Wymagane pole' },
      newPassword: { message: 'Hasło jest za krótkie' },
      confirmPassword: { message: 'Hasła nie są identyczne' }
    };

    render(<PasswordFields form={mockForm as any} errors={errorsWithMessages as any} />);
    
    expect(screen.getByText('Wymagane pole')).not.toBeNull();
    expect(screen.getByText('Hasło jest za krótkie')).not.toBeNull();
    expect(screen.getByText('Hasła nie są identyczne')).not.toBeNull();
  });
});