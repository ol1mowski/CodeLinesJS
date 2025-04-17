import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaCube, FaArrowUp } from 'react-icons/fa';
import { CategoryStats } from '../../../../../types/scopeExplorer.types';

type CategoryProgressProps = {
  category: 'scope' | 'closure' | 'hoisting';
  stats: CategoryStats;
};

export const CategoryProgress = memo(({ category, stats }: CategoryProgressProps) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'scope':
        return FaCode;
      case 'closure':
        return FaCube;
      case 'hoisting':
        return FaArrowUp;
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case 'scope':
        return 'Zakres zmiennych';
      case 'closure':
        return 'Domknięcia';
      case 'hoisting':
        return 'Hoisting';
    }
  };

  const Icon = getCategoryIcon();
  const progress = (stats.correct / stats.total) * 100;

  return (
    <div className="flex items-center gap-3 p-2 bg-dark-800/50 rounded-lg">
      <div className="p-2 rounded-lg bg-js/10">
        <Icon className="w-4 h-4 text-js" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-400">{getCategoryLabel()}</span>
          <span className="text-xs text-gray-500">
            {stats.correct}/{stats.total}
          </span>
        </div>
        <div className="h-1 bg-dark-900 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-js"
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
});

CategoryProgress.displayName = 'CategoryProgress';
