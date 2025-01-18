import { memo } from "react";
import { FaBell } from "react-icons/fa";
import type { UseFormRegister } from "react-hook-form";
import type { PreferencesData } from "../../../types/settings";
import { styles } from "./NotificationsSection.styles";

type NotificationsSectionProps = {
  register: UseFormRegister<PreferencesData>;
};

export const NotificationsSection = memo(({ register }: NotificationsSectionProps) => (
  <div className={styles.section}>
    <h3 className={styles.title}>
      <FaBell className={styles.icon} />
      Powiadomienia
    </h3>
    <div className={styles.optionsContainer}>
      <label className={styles.optionLabel}>
        <input
          type="checkbox"
          {...register("emailNotifications")}
          className={styles.checkbox}
        />
        <div className={styles.optionText}>
          <span className={styles.optionTitle}>Powiadomienia email</span>
          <span className={styles.optionDescription}>
            Otrzymuj powiadomienia na email
          </span>
        </div>
      </label>
      <label className={styles.optionLabel}>
        <input
          type="checkbox"
          {...register("pushNotifications")}
          className={styles.checkbox}
        />
        <div className={styles.optionText}>
          <span className={styles.optionTitle}>Powiadomienia push</span>
          <span className={styles.optionDescription}>
            Otrzymuj powiadomienia w przeglądarce
          </span>
        </div>
      </label>
    </div>
  </div>
));

NotificationsSection.displayName = "NotificationsSection"; 