import { memo } from "react";
import { motion } from "framer-motion";
import { Badge } from "../../../../types/stats.types";
import { statsSectionStyles as styles } from "../style/StatsSection.styles";

type BadgesGridProps = {
  badges: Badge[];
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Data nieznana';
    }
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Data nieznana';
  }
};

export const BadgesGrid = memo(({ badges }: BadgesGridProps) => {
  if (!badges?.length) {
    return (
      <div className={styles.card.base}>
        <h3 className={styles.card.title}>Odznaki</h3>
        <p className="text-gray-400 text-center py-4">
          Nie zdobyto jeszcze żadnych odznak
        </p>
      </div>
    );
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
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            variants={item}
            className="flex flex-col items-center p-4 bg-dark/30 rounded-lg border border-js/10 hover:border-js/30 transition-colors"
          >
            <span className="text-3xl mb-2">{badge.icon || '🏆'}</span>
            <h4 className="text-js font-medium text-sm text-center">
              {badge.name}
            </h4>
            <p className="text-gray-400 text-xs mt-1">
              {formatDate(badge.earnedAt)}
            </p>
            {badge.description && (
              <p className="text-gray-400 text-xs mt-1 text-center">
                {badge.description}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

BadgesGrid.displayName = "BadgesGrid"; 