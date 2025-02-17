import { memo } from "react";
import { useConfirmationState } from "../../hooks/useConfirmationState";
import { useAccountDeletion } from "../../hooks/useAccountDeletion";
import { InitialWarning } from "./components/InitialWarning/InitialWarning.component";
import { ConfirmationForm } from "./components/ConfirmationForm/ConfirmationForm.component";

export const DeleteAccountForm = memo(() => {
  const { 
    showConfirmation, 
    handleShowConfirmation, 
    handleHideConfirmation 
  } = useConfirmationState();

  const { 
    form, 
    onSubmit, 
    isDeleting, 
    handleCancel 
  } = useAccountDeletion(handleHideConfirmation);

  if (!showConfirmation) {
    return <InitialWarning onConfirm={handleShowConfirmation} />;
  }

  return (
    <ConfirmationForm
      register={form.register}
      errors={form.formState.errors}
      isSubmitting={isDeleting}
      onCancel={handleCancel}
      onSubmit={onSubmit}
    />
  );
});

DeleteAccountForm.displayName = "DeleteAccountForm"; 