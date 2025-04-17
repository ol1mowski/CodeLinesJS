import { memo } from 'react';
import { statsSectionStyles as styles } from '../../../style/StatsSection.styles';

export const EmptyBadges = memo(() => (
  <div className={styles.card.base}>
    <h3 className={styles.card.title}>Odznaki</h3>
    <p className="text-gray-400 text-center py-4">Nie zdobyto jeszcze żadnych odznak</p>
  </div>
));

EmptyBadges.displayName = 'EmptyBadges';
