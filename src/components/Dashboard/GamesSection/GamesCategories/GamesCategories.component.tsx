import { motion } from "framer-motion";
import { memo } from "react";
import { FaCode, FaLightbulb, FaPuzzlePiece, FaTrophy } from "react-icons/fa";
import { ActiveCategory } from "../GamesSection.component";

type GamesCategoriesProps = {
  activeCategory: ActiveCategory;
  onCategoryChange: (category: ActiveCategory) => void;
};

const categories = [
  { id: "all" as const, label: "Wszystkie", icon: FaCode },
  { id: "basics" as const, label: "Podstawy", icon: FaLightbulb },
  { id: "algorithms" as const, label: "Algorytmy", icon: FaPuzzlePiece },
  { id: "challenges" as const, label: "Wyzwania", icon: FaTrophy },
];

export const GamesCategories = memo(({ activeCategory, onCategoryChange }: GamesCategoriesProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex flex-nowrap gap-2 min-w-min">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg
                whitespace-nowrap text-sm font-medium
                transition-all duration-200
                ${activeCategory === category.id 
                  ? "text-js bg-js/10 border border-js/20" 
                  : "text-gray-400 hover:text-js/80 border border-transparent"
                }
              `}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{category.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});

GamesCategories.displayName = "GamesCategories"; 