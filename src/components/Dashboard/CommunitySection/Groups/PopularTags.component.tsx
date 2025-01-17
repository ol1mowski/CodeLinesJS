import { memo } from "react";
import { motion } from "framer-motion";

const popularTags = [
  { name: "react", count: 234 },
  { name: "typescript", count: 156 },
  { name: "javascript", count: 142 },
  { name: "frontend", count: 98 },
  { name: "webdev", count: 76 }
];

export const PopularTags = memo(() => {
  return (
    <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-js mb-4">Popularne tagi</h2>
      <div className="space-y-4">
        {popularTags.map(tag => (
          <div key={tag.name} className="flex items-center justify-between">
            <span className="text-gray-300">#{tag.name}</span>
            <span className="text-js">{tag.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

PopularTags.displayName = "PopularTags"; 