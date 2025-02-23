import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteAccountForm } from "../DeleteAccountForm.component";
import { useConfirmationState } from "../../../hooks/useConfirmationState";
import { useAccountDeletion } from "../../../hooks/useAccountDeletion";
import { UseFormRegister } from "react-hook-form";

vi.mock("../../../hooks/useConfirmationState");
vi.mock("../../../hooks/useAccountDeletion");

type FormFields = {
  password: string;
  confirmation: "USUŃ KONTO";
};

describe("DeleteAccountForm", () => {
  const mockHandleShowConfirmation = vi.fn();
  const mockHandleCancel = vi.fn();
  const mockOnSubmit = vi.fn((e) => e.preventDefault());

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

  it("should display the warning screen", () => {
    render(<DeleteAccountForm />);

    expect(screen.getByText("Usuwanie konta jest nieodwracalne")).toBeDefined();
    expect(screen.getByText("Chcę usunąć konto")).toBeDefined();
  });

  it("should display the confirmation form after clicking the button", () => {
    vi.mocked(useConfirmationState).mockReturnValue({
      showConfirmation: true,
      handleShowConfirmation: mockHandleShowConfirmation,
      handleHideConfirmation: vi.fn(),
    });

    render(<DeleteAccountForm />);

    expect(screen.getByText("Hasło")).toBeDefined();
    expect(screen.getByText("Potwierdzenie")).toBeDefined();
  });

  it("should call handleShowConfirmation on button click", () => {
    render(<DeleteAccountForm />);

    fireEvent.click(screen.getByText("Chcę usunąć konto"));
    expect(mockHandleShowConfirmation).toHaveBeenCalledTimes(1);
  });

  it("should handle cancellation in the confirmation form", () => {
    vi.mocked(useConfirmationState).mockReturnValue({
      showConfirmation: true,
      handleShowConfirmation: mockHandleShowConfirmation,
      handleHideConfirmation: vi.fn(),
    });

    render(<DeleteAccountForm />);

    fireEvent.click(screen.getByText("Anuluj"));
    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });
});
