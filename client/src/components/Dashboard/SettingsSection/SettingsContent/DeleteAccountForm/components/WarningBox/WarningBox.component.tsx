import { memo } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { warningItems } from './data/WarningBox.data';
import { styles } from './style/WarningBox.styles';

export const WarningBox = memo(() => (
  <div
    className={`
      bg-red-500/10 border border-red-500/20 rounded-lg p-4 sm:p-6 mb-6
      backdrop-blur-sm
    `}
    role="alert"
    aria-label="Ostrzeżenie o usuwaniu konta"
  >
    <div className={styles.content}>
      <FaExclamationTriangle className={styles.icon} data-testid="warning-icon" />
      <div>
        <h3 className={styles.title}>Usuwanie konta jest nieodwracalne</h3>
        <ul className={styles.list}>
          {warningItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
));

WarningBox.displayName = 'WarningBox';
