import { motion } from "framer-motion";
import { memo } from "react";
import { type FilterType } from "../types/filter.types";

type LessonsFilterProps = {
  activeFilter: string;
  onFilterChange: (filter: FilterType) => void;
};

const filters = [
  { id: "all" as const, label: "Wszystkie" },
  { id: "beginner" as const, label: "Podstawowe" },
  { id: "intermediate" as const, label: "Średnie" },
  { id: "advanced" as const, label: "Zaawansowane" }
];

export const LessonsFilter = memo(({ activeFilter, onFilterChange }: LessonsFilterProps) => {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onFilterChange(filter.id)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
            ${activeFilter === filter.id 
              ? "text-js bg-js/10 border border-js/20" 
              : "text-gray-400 hover:text-js/80 border border-transparent"
            }`}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
});

LessonsFilter.displayName = "LessonsFilter"; 