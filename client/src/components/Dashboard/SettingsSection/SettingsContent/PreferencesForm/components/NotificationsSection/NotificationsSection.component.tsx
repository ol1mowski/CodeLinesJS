import { memo } from 'react';
import { FaBell } from 'react-icons/fa';
import type { PreferencesData } from '../../../../types/settings';
import { styles } from './style/NotificationsSection.styles';
import { UseFormRegister } from 'react-hook-form';

type NotificationsSectionProps = {
  register: UseFormRegister<PreferencesData>;
  values: Partial<PreferencesData>;
  onChange: (field: keyof PreferencesData, value: boolean) => void;
};

export const NotificationsSection = memo(
  ({ register, values, onChange }: NotificationsSectionProps) => (
    <div className={styles.section}>
      <h3 className={styles.title}>
        <FaBell className={styles.icon} />
        Powiadomienia
      </h3>
      <div className={styles.optionsContainer}>
        <label className={styles.optionLabel}>
          <input
            type="checkbox"
            {...register('emailNotifications')}
            checked={values.emailNotifications}
            onChange={e => onChange('emailNotifications', e.target.checked)}
            className={styles.checkbox}
          />
          <div className={styles.optionText}>
            <span className={styles.optionTitle}>Powiadomienia email</span>
            <span className={styles.optionDescription}>Otrzymuj powiadomienia na email</span>
          </div>
        </label>
      </div>
    </div>
  )
);

NotificationsSection.displayName = 'NotificationsSection';
