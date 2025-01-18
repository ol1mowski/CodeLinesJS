import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../UI/Button/Button.component";
import { usePreferencesForm } from "../../hooks/usePreferencesForm";
import { NotificationsSection } from "../../components/Preferences/NotificationsSection/NotificationsSection.component";
import { AppearanceSection } from "../../components/Preferences/AppearanceSection/AppearanceSection.component";
import { LanguageSection } from "../../components/Preferences/LanguageSection/LanguageSection.component";
import { styles } from "./PreferencesForm.styles";

const defaultPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  darkMode: true,
  language: "pl" as const
};

export const PreferencesForm = memo(() => {
  const { form, onSubmit } = usePreferencesForm(defaultPreferences);
  const { register, formState: { isSubmitting } } = form;

  return (
    <motion.form
      onSubmit={onSubmit}
      className={styles.form}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <NotificationsSection register={register} />
      <AppearanceSection register={register} />
      <LanguageSection register={register} />

      <div className={styles.buttonContainer}>
        <Button
          type="button"
          className={styles.cancelButton}
        >
          Anuluj
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Zapisywanie..." : "Zapisz preferencje"}
        </Button>
      </div>
    </motion.form>
  );
});

PreferencesForm.displayName = "PreferencesForm"; 