import { memo } from "react";
import { usePreferencesFormLogic } from "../../hooks/usePreferencesFormLogic";
import { PreferencesFormContent } from "./components/PreferencesFormContent/PreferencesFormContent.component";
import { LoadingScreen } from "../../../../UI/LoadingScreen/LoadingScreen.component";

export const PreferencesForm = memo(() => {
  const {
    isLoading,
    register,
    formValues,
    isSubmitting,
    updatePreferences,
    handleCancel,
    onSubmit,
    setValue
  } = usePreferencesFormLogic();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PreferencesFormContent
      register={register}
      formValues={formValues}
      setValue={setValue}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      isPending={updatePreferences.isPending}
    />
  );
});

PreferencesForm.displayName = "PreferencesForm"; 