import { memo } from "react";
import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
  className?: string;
};

export const ProgressBar = memo(({ progress, className = '' }: ProgressBarProps) => (
  <div className="flex-1 mr-4">
    <div className={`relative h-2 bg-dark rounded-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress.percentage}%` }}
        className="absolute inset-y-0 left-0 bg-js rounded-full"
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
    <div className="flex justify-between text-sm text-gray-400 mt-1">
      <span>{progress.completed} / {progress.total} ukończone</span>
      <span>{progress.percentage}%</span>
    </div>
  </div>
)); 