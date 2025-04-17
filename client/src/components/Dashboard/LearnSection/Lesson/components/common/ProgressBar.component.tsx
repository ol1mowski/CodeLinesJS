import { memo } from 'react';
import { motion } from 'framer-motion';

type ProgressBarProps = {
  progress: number;
  className?: string;
};

export const ProgressBar = memo(({ progress, className = '' }: ProgressBarProps) => (
  <div className={`relative h-2 bg-dark rounded-full overflow-hidden ${className}`}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className="absolute inset-y-0 left-0 bg-js rounded-full"
      transition={{ duration: 0.3 }}
    />
  </div>
));
