import { useEffect } from 'react';
import { usePreferencesForm } from './usePreferencesForm';
import { usePreferences } from './usePreferences';
import { useToast } from '../contexts/ToastContext';
import { PreferencesError } from '../utils/api/preferences';

export const usePreferencesFormLogic = () => {
  const { preferences, isLoading, updatePreferences } = usePreferences();
  const { showToast } = useToast();

  const { form, onSubmit } = usePreferencesForm({
    onSubmit: async (data) => {
      try {
        await updatePreferences.mutateAsync({
          emailNotifications: data.emailNotifications,
          pushNotifications: data.pushNotifications,
          language: "pl"
        });
        showToast('Preferencje zostały zaktualizowane', 'success');
      } catch (error) {
        handleError(error);
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
        showToast('Zmiany zostały anulowane', 'success');
      }
    } catch (error) {
      showToast('Nie udało się anulować zmian', 'error');
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