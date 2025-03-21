import { memo } from 'react';
import { motion } from 'framer-motion';

type JSQuizProgressProps = {
  currentLevel: number;
  totalLevels: number;
};

export const JSQuizProgress = memo(({ currentLevel, totalLevels }: JSQuizProgressProps) => {
  const progress = (currentLevel / totalLevels) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm text-gray-400">
        <span>Pytanie {currentLevel} z {totalLevels}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
});

JSQuizProgress.displayName = 'JSQuizProgress'; 