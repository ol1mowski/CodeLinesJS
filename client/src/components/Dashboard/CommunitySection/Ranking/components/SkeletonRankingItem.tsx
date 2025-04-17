import { memo } from 'react';
import { motion } from 'framer-motion';

interface SkeletonRankingItemProps {
  index: number;
  animationDelay?: number;
}

export const SkeletonRankingItem = memo(({ 
  index, 
  animationDelay = 0.05 
}: SkeletonRankingItemProps) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * animationDelay }}
      className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4 animate-pulse"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-js/10" />
        <div className="flex-1">
          <div className="h-4 w-24 bg-js/10 rounded mb-2" />
          <div className="h-3 w-16 bg-js/10 rounded" />
        </div>
        <div className="h-6 w-16 bg-js/10 rounded" />
      </div>
    </motion.div>
  );
});

SkeletonRankingItem.displayName = 'SkeletonRankingItem'; 