import { useEffect, useState } from 'react';
import { usePreferencesForm } from './usePreferencesForm';
import { usePreferences } from './usePreferences';
import { toast } from 'react-hot-toast';

export const usePreferencesFormLogic = () => {
  const { preferences, isLoading, updatePreferences, refetch } = usePreferences();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { form, onSubmit } = usePreferencesForm({
    onSubmit: async data => {
      try {
        setIsSubmitting(true);
        await updatePreferences.mutateAsync({
          emailNotifications: data.emailNotifications,
          pushNotifications: data.pushNotifications,
          language: 'pl',
        });
        // Toast jest obsługiwany w usePreferences
        setIsSaved(true);
        refetch();
      } catch (error) {
        // Błędy są obsługiwane w usePreferences
        console.error('Błąd w usePreferencesFormLogic:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const {
    register,
    formState: { isDirty },
    setValue,
    watch,
    reset,
  } = form;
  const formValues = watch();
  
  useEffect(() => {
    if (isDirty) {
      setIsSaved(false);
    }
  }, [formValues, isDirty]);

  useEffect(() => {
    if (preferences) {
      setValue('emailNotifications', preferences.emailNotifications);
      setValue('pushNotifications', preferences.pushNotifications);
      setValue('language', 'pl');
    }
  }, [preferences, setValue]);

  const handleCancel = () => {
    try {
      if (preferences) {
        reset({
          emailNotifications: preferences.emailNotifications,
          pushNotifications: preferences.pushNotifications,
          language: 'pl',
        });
        setIsSaved(false);
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
    isSubmitting: isSubmitting || updatePreferences.isPending,
    isPending: updatePreferences.isPending, 
    isDirty,
    isSaved,
    updatePreferences,
    handleCancel,
    onSubmit,
    setValue,
  };
};
