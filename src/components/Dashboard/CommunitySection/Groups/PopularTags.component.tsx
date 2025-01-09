import { memo } from "react";
import { motion } from "framer-motion";
import { FaHashtag } from "react-icons/fa";

const popularTags = [
  { name: "react", count: 234 },
  { name: "typescript", count: 156 },
  { name: "javascript", count: 142 },
  { name: "frontend", count: 98 },
  { name: "webdev", count: 76 }
];

export const PopularTags = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
    >
      <h3 className="text-lg font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
        Popularne tagi
      </h3>
      <div className="space-y-3">
        {popularTags.map(tag => (
          <div
            key={tag.name}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FaHashtag className="text-gray-400" />
              <span className="text-gray-300">{tag.name}</span>
            </div>
            <span className="text-sm text-gray-500">{tag.count} grup</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

PopularTags.displayName = "PopularTags"; 