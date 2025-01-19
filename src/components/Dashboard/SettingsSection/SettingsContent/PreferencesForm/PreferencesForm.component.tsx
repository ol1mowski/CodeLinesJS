import { memo } from "react";
import { motion } from "framer-motion";
import { usePreferencesForm } from "../../hooks/usePreferencesForm";
import { usePreferences } from "../../hooks/usePreferences";
import { NotificationsSection } from "../../components/Preferences/NotificationsSection/NotificationsSection.component";
import { LanguageSection } from "../../components/Preferences/LanguageSection/LanguageSection.component";
import { styles } from "./PreferencesForm.styles";
import { useToast } from "../../contexts/ToastContext";
import { PreferencesError } from "../../utils/api/preferences";

export const PreferencesForm = memo(() => {
  const { preferences, isLoading, updatePreferences } = usePreferences();
  const { showToast } = useToast();
  
  const { form, onSubmit } = usePreferencesForm({
    onSubmit: async (data) => {
      try {
        await updatePreferences.mutateAsync(data);
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
    },
    defaultValues: preferences,
  });
  
  const { register, formState: { isSubmitting }, reset } = form;

  const handleCancel = () => {
    try {
      if (preferences) {
        reset({
          emailNotifications: preferences.emailNotifications,
          pushNotifications: preferences.pushNotifications,
          language: preferences.language
        });
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
      <NotificationsSection register={register} />
      <LanguageSection register={register} />

      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={handleCancel}
          className={styles.cancelButton}
          disabled={isSubmitting || updatePreferences.isPending}
        >
          Anuluj zmiany
        </button>

        <button
          type="submit"
          disabled={isSubmitting || updatePreferences.isPending}
          className={styles.submitButton}
        >
          {updatePreferences.isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
              <span>Zapisywanie</span>
            </div>
          ) : (
            "Zapisz preferencje"
          )}
        </button>
      </div>
    </motion.form>
  );
});

PreferencesForm.displayName = "PreferencesForm"; 