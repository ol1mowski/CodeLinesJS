import { memo } from "react";
import { usePreferencesFormLogic } from "../../hooks/preferences/usePreferencesFormLogic";
import { Loader } from "../../components/UI/Loader/Loader.component";
import { PreferencesFormContent } from "./components/PreferencesFormContent/PreferencesFormContent.component";

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
    return <Loader />;
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