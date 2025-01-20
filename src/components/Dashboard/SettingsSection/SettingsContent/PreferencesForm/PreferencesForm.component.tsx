import { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { usePreferencesForm } from "../../hooks/usePreferencesForm";
import { usePreferences } from "../../hooks/usePreferences";
import { NotificationsSection } from "../../components/Preferences/NotificationsSection/NotificationsSection.component";
import { LanguageSection } from "../../components/Preferences/LanguageSection/LanguageSection.component";
import { FormButtons } from "../../components/Profile/FormButtons/FormButtons.component";
import { styles } from "./PreferencesForm.styles";
import { useToast } from "../../contexts/ToastContext";
import { PreferencesError } from "../../utils/api/preferences";

export const PreferencesForm = memo(() => {
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
        if (error instanceof PreferencesError) {
          switch (error.code) {
            case 'VALIDATION_ERROR':
              showToast('Nieprawidłowe dane preferencji', 'error');
              return;
            case 'SAVE_ERROR':
              showToast('Nie udało się zapisać preferencji', 'error');
              return;
          }
        }
        showToast('Wystąpił błąd podczas aktualizacji preferencji', 'error');
      }
    }
  });
  
  const { register, formState: { isSubmitting }, reset, setValue, watch } = form;

  // Obserwuj zmiany w formularzu
  const formValues = watch();

  // Aktualizuj formularz gdy dane zostaną pobrane
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-js"></div>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className={styles.form}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <NotificationsSection 
        register={register} 
        values={formValues}
        onChange={(field, value) => setValue(field, value)}
      />
      <LanguageSection register={register} />

      <FormButtons 
        onCancel={handleCancel}
        isSubmitting={isSubmitting || updatePreferences.isPending}
        submitText="Zapisz preferencje"
        loadingText="Zapisywanie"
      />
    </motion.form>
  );
});

PreferencesForm.displayName = "PreferencesForm"; 