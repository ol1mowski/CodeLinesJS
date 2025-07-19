import { memo } from 'react';
import { motion } from 'framer-motion';

import { statsSectionStyles as styles } from '../../style/StatsSection.styles';
import { BadgeCard } from './components/BadgeCard.component';
import { EmptyBadges } from './components/EmptyBadges.component';
import { container } from './animations';
import { Badge } from '../../types/stats.types';

type BadgesGridProps = {
  badges: Badge[];
};

export const BadgesGrid = memo(({ badges }: BadgesGridProps) => {
  if (!badges?.length) {
    return <EmptyBadges />;
  }

  return (
    <div className={styles.card.base}>
      <h3 className={styles.card.title}>Odznaki</h3>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {badges.map(badge => (
          <BadgeCard key={badge.name} badge={badge} />
        ))}
      </motion.div>
    </div>
  );
});

BadgesGrid.displayName = 'BadgesGrid';
