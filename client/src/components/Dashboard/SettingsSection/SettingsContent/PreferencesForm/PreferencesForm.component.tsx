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
    if (!isDirty) {
      toast.success('Nie wprowadzono żadnych zmian');
      return;
    }
    
    await handleFormSubmit(e);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {isSaved && !isDirty && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-lg mb-4 flex items-center">
          <span className="mr-2">✓</span>
          Twoje preferencje zostały zaktualizowane pomyślnie
        </div>
      )}
      
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
    </>
  );
});

PreferencesForm.displayName = 'PreferencesForm';
