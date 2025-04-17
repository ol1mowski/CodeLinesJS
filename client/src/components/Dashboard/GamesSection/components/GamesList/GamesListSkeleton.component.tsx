import { memo } from 'react';
import { motion } from 'framer-motion';

export const GamesListSkeleton = memo(() => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(index => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden"
        >
          <div className="aspect-video bg-gray-800/50 animate-pulse" />
          <div className="p-4 space-y-4">
            <div className="h-6 bg-gray-800/50 rounded animate-pulse w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-800/50 rounded animate-pulse" />
              <div className="h-4 bg-gray-800/50 rounded animate-pulse w-4/5" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <div className="h-4 w-16 bg-gray-800/50 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-800/50 rounded animate-pulse" />
              </div>
              <div className="h-8 w-24 bg-gray-800/50 rounded animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

GamesListSkeleton.displayName = 'GamesListSkeleton';
