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
  { id: "difficulty" as const, label: "Trudność", icon: FaTrophy },
  { id: "xp" as const, label: "XP", icon: FaStar },
];

export const GamesSorting = memo(({ activeSortOption, onSortChange }: GamesSortingProps) => {
  return (
    <div className="flex items-center gap-4 lg:ml-auto">
      <span className="text-gray-400 text-sm">Sortuj:</span>
      <div className="flex gap-2">
        {sortOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSortChange(option.id)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm transition-colors
              ${activeSortOption === option.id
                ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                : "text-gray-400 hover:text-indigo-400 border border-gray-700/50 hover:border-indigo-500/30"
              }`}
          >
            <option.icon className="w-4 h-4" />
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
});

GamesSorting.displayName = "GamesSorting"; 