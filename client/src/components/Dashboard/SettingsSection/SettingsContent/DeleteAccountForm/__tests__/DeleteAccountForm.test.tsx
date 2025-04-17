import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { DeleteAccountForm } from '../DeleteAccountForm.component';
import { useConfirmationState } from '../../../hooks/useConfirmationState';
import { useAccountDeletion } from '../../../hooks/useAccountDeletion';
import { UseFormRegister } from 'react-hook-form';

vi.mock('../../../hooks/useConfirmationState');
vi.mock('../../../hooks/useAccountDeletion');

type FormFields = {
  password: string;
  confirmation: 'USUŃ KONTO';
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
      handleHideConfirmation: vi.fn(),
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
          validatingFields: {},
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
        handleSubmit: vi.fn(),
      } as any,
      onSubmit: mockOnSubmit,
      isDeleting: false,
      handleCancel: mockHandleCancel,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('should display the warning screen', () => {
    const { container } = render(<DeleteAccountForm />);

    const warningText = container.querySelector('h3');
    expect(warningText).not.toBeNull();
    expect(warningText?.textContent).toContain('Usuwanie konta jest nieodwracalne');

    const buttons = Array.from(container.querySelectorAll('button'));
    const deleteButton = buttons.find(btn => btn.textContent?.includes('Chcę usunąć konto'));
    expect(deleteButton).not.toBeNull();
  });

  it('should display the confirmation form after clicking the button', () => {
    vi.mocked(useConfirmationState).mockReturnValue({
      showConfirmation: true,
      handleShowConfirmation: mockHandleShowConfirmation,
      handleHideConfirmation: vi.fn(),
    });

    const { container } = render(<DeleteAccountForm />);

    const passwordLabel = container.querySelector('label, div');
    expect(passwordLabel).not.toBeNull();
    expect(passwordLabel?.textContent).toContain('Hasło');

    const confirmationLabel = Array.from(container.querySelectorAll('label, div')).find(el =>
      el.textContent?.includes('Potwierdzenie')
    );
    expect(confirmationLabel).not.toBeNull();
  });

  it('should call handleShowConfirmation on button click', () => {
    const { container } = render(<DeleteAccountForm />);

    const buttons = Array.from(container.querySelectorAll('button'));
    const deleteButton = buttons.find(btn => btn.textContent?.includes('Chcę usunąć konto'));

    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(mockHandleShowConfirmation).toHaveBeenCalledTimes(1);
    } else {
      expect(deleteButton).not.toBeNull();
    }
  });

  it('should handle cancellation in the confirmation form', () => {
    vi.mocked(useConfirmationState).mockReturnValue({
      showConfirmation: true,
      handleShowConfirmation: mockHandleShowConfirmation,
      handleHideConfirmation: vi.fn(),
    });

    const { container } = render(<DeleteAccountForm />);

    const buttons = Array.from(container.querySelectorAll('button'));
    const cancelButton = buttons.find(btn => btn.textContent?.includes('Anuluj'));

    if (cancelButton) {
      fireEvent.click(cancelButton);
      expect(mockHandleCancel).toHaveBeenCalledTimes(1);
    } else {
      expect(cancelButton).not.toBeNull();
    }
  });
});
