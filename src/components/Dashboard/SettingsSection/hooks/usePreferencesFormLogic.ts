import { useEffect } from 'react';
import { usePreferencesForm } from './usePreferencesForm';
import { usePreferences } from './usePreferences';
import { toast } from 'react-hot-toast';

export const usePreferencesFormLogic = () => {
  const { preferences, isLoading, updatePreferences } = usePreferences();

  const { form, onSubmit } = usePreferencesForm({
    onSubmit: async (data) => {
      try {
        await updatePreferences.mutateAsync({
          emailNotifications: data.emailNotifications,
          pushNotifications: data.pushNotifications,
          language: "pl"
        });
        toast.success('Preferencje zostały zaktualizowane');
      } catch (error) {
        toast.error('Nie udało się zaktualizować preferencji');
      }
    }
  });

  const { register, formState: { isSubmitting }, setValue, watch } = form;
  const formValues = watch();

  useEffect(() => {
    if (preferences) {
      setValue('emailNotifications', preferences.emailNotifications);
      setValue('pushNotifications', preferences.pushNotifications);
      setValue('language', "pl");
    }
  }, [preferences, setValue]);

  const handleCancel = () => {
    try {
      if (preferences) {
        setValue('emailNotifications', preferences.emailNotifications);
        setValue('pushNotifications', preferences.pushNotifications);
        setValue('language', "pl");
        toast.success('Zmiany zostały anulowane');
      }
    } catch (error) {
      toast.error('Nie udało się anulować zmian');
    }
  };

  return {
    isLoading,
    register,
    formValues,
    isSubmitting,
    updatePreferences,
    handleCancel,
    onSubmit,
    setValue
  };
}; 