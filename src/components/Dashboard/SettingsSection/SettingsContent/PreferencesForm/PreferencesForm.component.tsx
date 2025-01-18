import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../UI/Button/Button.component";
import { usePreferencesForm } from "../../hooks/usePreferencesForm";
import { usePreferences } from "../../hooks/usePreferences";
import { NotificationsSection } from "../../components/Preferences/NotificationsSection/NotificationsSection.component";
import { LanguageSection } from "../../components/Preferences/LanguageSection/LanguageSection.component";
import { styles } from "./PreferencesForm.styles";

export const PreferencesForm = memo(() => {
  const { preferences, isLoading, updatePreferences } = usePreferences();
  const { form, onSubmit } = usePreferencesForm({
    onSubmit: async (data) => {
      await updatePreferences.mutateAsync(data);
    },
    defaultValues: preferences,
  });
  
  const { register, formState: { isSubmitting }, reset } = form;

  const handleCancel = () => {
    reset(preferences);
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
        <Button
          type="button"
          onClick={handleCancel}
          className={styles.cancelButton}
        >
          Anuluj
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting || updatePreferences.isPending}
          className={styles.submitButton}
        >
          {updatePreferences.isPending ? "Zapisywanie..." : "Zapisz preferencje"}
        </Button>
      </div>
    </motion.form>
  );
});

PreferencesForm.displayName = "PreferencesForm"; 