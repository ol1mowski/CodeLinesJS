import { motion } from "framer-motion";
import { memo } from "react";

export const PostsListSkeleton = memo(() => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-700/50 animate-pulse" />
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-700/50 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-700/50 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});

PostsListSkeleton.displayName = "PostsListSkeleton"; 