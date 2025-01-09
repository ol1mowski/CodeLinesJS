import { motion } from "framer-motion";
import { memo } from "react";
import { gameCategories } from "./gameCategories.data";
import { ActiveCategory } from "../GamesSection.component";

type GamesCategoriesProps = {
  activeCategory: ActiveCategory;
  onCategoryChange: (category: ActiveCategory) => void;
};

export const GamesCategories = memo(({ activeCategory, onCategoryChange }: GamesCategoriesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategoryChange("all")}
        className={`p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border transition-colors group
          ${activeCategory === "all" 
            ? "border-indigo-500/50 from-indigo-500/20 to-purple-500/20" 
            : "border-gray-700/50 hover:border-indigo-500/30"}`}
      >
        <div className="text-center">
          <h3 className={`font-medium transition-colors ${
            activeCategory === "all" ? "text-indigo-400" : "text-gray-200 group-hover:text-indigo-400"
          }`}>
            Wszystkie
          </h3>
        </div>
      </motion.button>

      {gameCategories.map((category, index) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onCategoryChange(category.id as ActiveCategory)}
          className={`p-4 rounded-xl bg-gradient-to-br border transition-colors group
            ${activeCategory === category.id 
              ? "border-indigo-500/50 from-indigo-500/20 to-purple-500/20" 
              : "from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-indigo-500/30"}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br transition-colors
              ${activeCategory === category.id
                ? "from-indigo-500/30 to-purple-500/30"
                : "from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30"}`}
            >
              <category.icon className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="text-left">
              <h3 className={`font-medium transition-colors ${
                activeCategory === category.id ? "text-indigo-400" : "text-gray-200 group-hover:text-indigo-400"
              }`}>
                {category.name}
              </h3>
              <p className="text-sm text-gray-400">
                {category.gamesCount} gier
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
});

GamesCategories.displayName = "GamesCategories"; 