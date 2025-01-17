import { motion } from "framer-motion";
import { memo } from "react";
import { useTrending } from "../../../../hooks/useTrending";

export const TrendingTopics = memo(() => {
  const { topics, isLoading } = useTrending();

  if (isLoading) {
    return (
      <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg animate-pulse">
        <div className="h-6 w-32 bg-js/10 rounded mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-24 bg-js/10 rounded" />
              <div className="h-4 w-12 bg-js/10 rounded" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-js mb-4">Popularne tematy</h2>
      <div className="space-y-4">
        {topics?.map(topic => (
          <div key={topic.id} className="flex items-center justify-between">
            <span className="text-gray-300">#{topic.name}</span>
            <span className="text-js">{topic.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

TrendingTopics.displayName = "TrendingTopics"; 