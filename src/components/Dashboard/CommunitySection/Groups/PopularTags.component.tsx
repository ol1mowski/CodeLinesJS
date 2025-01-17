import { memo } from "react";
import { motion } from "framer-motion";
import { useTrending } from "../../../../Hooks/useTrending";

export const PopularTags = memo(() => {
  const { tags, isLoading } = useTrending();

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
      <h2 className="text-xl font-bold text-js mb-4">Popularne tagi</h2>
      <div className="space-y-4">
        {tags?.map(tag => (
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