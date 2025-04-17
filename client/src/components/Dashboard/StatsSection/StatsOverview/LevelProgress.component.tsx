import { memo } from 'react';
import { motion } from 'framer-motion';
import { statsSectionStyles as styles } from '../style/StatsSection.styles';

type LevelProgressProps = {
  level: number;
  experience: number;
  nextLevel: number;
};

export const LevelProgress = memo(({ level, experience, nextLevel }: LevelProgressProps) => {
  const progress = (experience / nextLevel) * 100;

  return (
    <div className={styles.card.base}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={styles.card.title}>Poziom {level}</h3>
          <p className="text-gray-400 text-sm">
            {experience} / {nextLevel} XP do następnego poziomu
          </p>
        </div>
        <div className="hidden w-16 h-16 rounded-full bg-js/20 md:flex items-center justify-center">
          <span className="text-2xl font-bold text-js">{level}</span>
        </div>
      </div>

      <div className="relative h-4 bg-dark/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-0 left-0 h-full bg-js/50"
        />
      </div>
    </div>
  );
});

LevelProgress.displayName = 'LevelProgress';
