import { motion } from "framer-motion";
import { memo } from "react";
import { FaFire } from "react-icons/fa";

const trendingTopics = [
  { id: 1, name: "React", count: 234 },
  { id: 2, name: "TypeScript", count: 156 },
  { id: 3, name: "JavaScript", count: 142 },
  { id: 4, name: "NextJS", count: 98 },
];

export const TrendingTopics = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
    >
      <h3 className="text-lg font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 flex items-center gap-2 mb-4">
        <FaFire className="text-orange-400" />
        Popularne tematy
      </h3>
      <div className="space-y-3">
        {trendingTopics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer"
          >
            <span className="text-gray-300">#{topic.name}</span>
            <span className="text-sm text-gray-500">{topic.count} postów</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

TrendingTopics.displayName = "TrendingTopics"; 