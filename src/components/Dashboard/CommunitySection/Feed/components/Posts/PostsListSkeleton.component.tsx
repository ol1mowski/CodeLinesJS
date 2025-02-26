import { memo } from 'react';
import { motion } from 'framer-motion';

type PostsListSkeletonProps = {
  count?: number;
};

export const PostsListSkeleton = memo(({ count = 3 }: PostsListSkeletonProps) => (
  <div className="space-y-6">
    {Array.from({ length: count }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-js/20 animate-pulse" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-js/20 rounded animate-pulse" />
            <div className="w-24 h-3 bg-js/20 rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-js/20 rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-js/20 rounded animate-pulse" />
        </div>
        <div className="flex gap-6">
          <div className="w-16 h-6 bg-js/20 rounded animate-pulse" />
          <div className="w-16 h-6 bg-js/20 rounded animate-pulse" />
        </div>
      </motion.div>
    ))}
  </div>
));

PostsListSkeleton.displayName = 'PostsListSkeleton'; 