import { memo } from 'react';
import { usePreferencesFormLogic } from '../../hooks/usePreferencesFormLogic';
import { PreferencesFormContent } from './components/PreferencesFormContent/PreferencesFormContent.component';
import { LoadingScreen } from '../../../../UI/LoadingScreen/LoadingScreen.component';
import { toast } from 'react-hot-toast';

export const PreferencesForm = memo(() => {
  const {
    isLoading,
    register,
    formValues,
    isSubmitting,
    isPending,
    isDirty,
    isSaved,
    handleCancel,
    onSubmit: handleFormSubmit,
    setValue,
  } = usePreferencesFormLogic();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await handleFormSubmit(e);
    } catch (error) {
      console.error('Błąd podczas zapisywania preferencji:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Wystąpił nieznany błąd podczas zapisywania preferencji');
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PreferencesFormContent
      register={register}
      formValues={formValues}
      setValue={setValue}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      isPending={isPending}
      isDirty={isDirty}
      isSaved={isSaved}
    />
  );
});

PreferencesForm.displayName = 'PreferencesForm';
