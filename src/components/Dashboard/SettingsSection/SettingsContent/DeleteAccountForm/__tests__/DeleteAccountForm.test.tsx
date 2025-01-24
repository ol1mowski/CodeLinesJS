import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteAccountForm } from '../DeleteAccountForm.component';
import { useConfirmationState } from '../../../hooks/useConfirmationState';
import { useAccountDeletion } from '../../../hooks/useAccountDeletion';
import { ToastProvider } from '../../../contexts/ToastContext';
import { UseFormRegister } from 'react-hook-form';

vi.mock('../../../hooks/useConfirmationState');
vi.mock('../../../hooks/useAccountDeletion');

type FormFields = {
  password: string;
  confirmation: "USUŃ KONTO";
};

describe('DeleteAccountForm', () => {
  const mockHandleShowConfirmation = vi.fn();
  const mockHandleCancel = vi.fn();
  const mockOnSubmit = vi.fn(e => e.preventDefault());

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useConfirmationState).mockReturnValue({
      showConfirmation: false,
      handleShowConfirmation: mockHandleShowConfirmation,
      handleHideConfirmation: vi.fn()
    });

    vi.mocked(useAccountDeletion).mockReturnValue({
      form: {
        register: vi.fn() as unknown as UseFormRegister<FormFields>,
        formState: { 
          errors: {},
          isDirty: false,
          isLoading: false,
          isSubmitted: false,
          isSubmitting: false,
          isSubmitSuccessful: false,
          isValid: false,
          isValidating: false,
          submitCount: 0,
          disabled: false,
          dirtyFields: {},
          touchedFields: {},
          validatingFields: {}
        },
        watch: vi.fn(),
        getValues: vi.fn(),
        getFieldState: vi.fn(),
        setError: vi.fn(),
        clearErrors: vi.fn(),
        setValue: vi.fn(),
        trigger: vi.fn(),
        reset: vi.fn(),
        resetField: vi.fn(),
        setFocus: vi.fn(),
        handleSubmit: vi.fn()
      } as any,
      onSubmit: mockOnSubmit,
      isDeleting: false,
      handleCancel: mockHandleCancel
    });
  });

  it('powinien wyświetlić ekran ostrzeżenia', () => {
    render(
      <ToastProvider>
        <DeleteAccountForm />
      </ToastProvider>
    );

    expect(screen.getByText('Usuwanie konta jest nieodwracalne')).toBeDefined();
    expect(screen.getByText('Chcę usunąć konto')).toBeDefined();
  });

  it('powinien wyświetlić formularz potwierdzenia po kliknięciu przycisku', () => {
    vi.mocked(useConfirmationState).mockReturnValue({
      showConfirmation: true,
      handleShowConfirmation: mockHandleShowConfirmation,
      handleHideConfirmation: vi.fn()
    });

    render(
      <ToastProvider>
        <DeleteAccountForm />
      </ToastProvider>
    );

    expect(screen.getByText('Hasło')).toBeDefined();
    expect(screen.getByText('Potwierdzenie')).toBeDefined();
  });

  it('powinien wywołać handleShowConfirmation po kliknięciu przycisku', () => {
    render(
      <ToastProvider>
        <DeleteAccountForm />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Chcę usunąć konto'));
    expect(mockHandleShowConfirmation).toHaveBeenCalledTimes(1);
  });

  it('powinien obsłużyć anulowanie w formularzu potwierdzenia', () => {
    vi.mocked(useConfirmationState).mockReturnValue({
      showConfirmation: true,
      handleShowConfirmation: mockHandleShowConfirmation,
      handleHideConfirmation: vi.fn()
    });

    render(
      <ToastProvider>
        <DeleteAccountForm />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Anuluj'));
    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });
}); 