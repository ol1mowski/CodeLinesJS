import { motion } from "framer-motion";
import { memo } from "react";

const trendingTopics = [
  { id: 1, name: "React", count: 234 },
  { id: 2, name: "TypeScript", count: 156 },
  { id: 3, name: "JavaScript", count: 142 },
  { id: 4, name: "NextJS", count: 98 },
];

export const TrendingTopics = memo(() => {
  return (
    <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-js mb-4">Popularne tematy</h2>
      <div className="space-y-4">
        {trendingTopics.map(topic => (
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