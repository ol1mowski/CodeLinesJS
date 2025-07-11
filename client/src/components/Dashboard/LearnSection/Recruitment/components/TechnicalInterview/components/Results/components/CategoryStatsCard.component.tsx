import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';

interface CategoryStatsCardProps {
  categoryStats: Record<string, { total: number; correct: number }>;
}

export const CategoryStatsCard: React.FC<CategoryStatsCardProps> = memo(({ categoryStats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <FaBookOpen className="text-js text-xl" />
        <h3 className="text-white text-lg font-bold">Według kategorii</h3>
      </div>
      <div className="space-y-3">
        {Object.entries(categoryStats).map(([category, data]) => {
          const categoryPercentage = Math.round((data.correct / data.total) * 100);
          return (
            <div key={category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{category}</span>
                <span className="text-white font-medium">
                  {data.correct}/{data.total} ({categoryPercentage}%)
                </span>
              </div>
              <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-js to-js/80"
                  initial={{ width: 0 }}
                  animate={{ width: `${categoryPercentage}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});

CategoryStatsCard.displayName = 'CategoryStatsCard'; 