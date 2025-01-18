import { memo } from "react";
import { FaMoon } from "react-icons/fa";
import type { UseFormRegister } from "react-hook-form";
import type { PreferencesData } from "../../../types/settings";
import { styles } from "../NotificationsSection/NotificationsSection.styles";

type AppearanceSectionProps = {
  register: UseFormRegister<PreferencesData>;
};

export const AppearanceSection = memo(({ register }: AppearanceSectionProps) => (
  <div className={styles.section}>
    <h3 className={styles.title}>
      <FaMoon className={styles.icon} />
      Wygląd
    </h3>
    <div className={styles.optionsContainer}>
      <label className={styles.optionLabel}>
        <input
          type="checkbox"
          {...register("darkMode")}
          className={styles.checkbox}
        />
        <div className={styles.optionText}>
          <span className={styles.optionTitle}>Tryb ciemny</span>
          <span className={styles.optionDescription}>
            Używaj ciemnego motywu
          </span>
        </div>
      </label>
    </div>
  </div>
));

AppearanceSection.displayName = "AppearanceSection"; 