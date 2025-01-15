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

export const BadgesGrid = memo(({ badges }: BadgesGridProps) => {
  if (!badges.length) {
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
            <span className="text-3xl mb-2">{badge.icon}</span>
            <h4 className="text-js font-medium text-sm text-center">
              {badge.name}
            </h4>
            <p className="text-gray-400 text-xs mt-1">
              {new Date(badge.earnedAt).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

BadgesGrid.displayName = "BadgesGrid"; 