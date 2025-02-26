import { motion } from "framer-motion";
import { memo } from "react";
import { FaClock, FaFire, FaStar, FaTrophy } from "react-icons/fa";
import { SortOption } from "../GamesSection.component";

type GamesSortingProps = {
  activeSortOption: SortOption;
  onSortChange: (option: SortOption) => void;
};

const sortOptions = [
  { id: "newest" as const, label: "Najnowsze", icon: FaClock },
  { id: "popular" as const, label: "Popularne", icon: FaFire },
  { id: "difficulty" as const, label: "Trudność", icon: FaStar },
  { id: "xp" as const, label: "Punkty XP", icon: FaTrophy },
];

export const GamesSorting = memo(({ activeSortOption, onSortChange }: GamesSortingProps) => {
  return (
    <div className="flex items-center gap-4 lg:ml-auto">
      <span className="text-gray-400 text-sm">Sortuj:</span>
      <div className="flex gap-2 flex-wrap">
        {sortOptions.map((option) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.id}
              onClick={() => onSortChange(option.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${activeSortOption === option.id 
                  ? "text-js bg-js/10 border border-js/20" 
                  : "text-gray-400 hover:text-js/80 border border-transparent"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {option.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
});

GamesSorting.displayName = "GamesSorting"; 