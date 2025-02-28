import { memo } from 'react';
import { motion } from 'framer-motion';

type ProgressBarProps = {
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
}


export const ProgressBar = memo(({ progress }: ProgressBarProps) => (
  <div>
    <div className="relative h-2 bg-dark rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress.percentage}%` }}
        className="absolute inset-y-0 left-0 bg-js rounded-full"
      />
    </div>
    <div className="flex justify-between text-sm text-gray-400 mt-1">
      <span>{progress.completed}/{progress.total} ukończone</span>
      <span>{progress.percentage}%</span>
    </div>
  </div>
));

ProgressBar.displayName = "ProgressBar"; 