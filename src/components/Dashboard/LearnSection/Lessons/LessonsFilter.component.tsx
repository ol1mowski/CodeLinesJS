import { motion } from "framer-motion";
import { memo } from "react";

type FilterType = "all" | "beginner" | "intermediate" | "advanced";

type LessonsFilterProps = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

const filters: Array<{ id: FilterType; label: string }> = [
  { id: "all", label: "Wszystkie" },
  { id: "beginner", label: "Początkujące" },
  { id: "intermediate", label: "Średnie" },
  { id: "advanced", label: "Zaawansowane" }
];

export const LessonsFilter = memo(({ activeFilter, onFilterChange }: LessonsFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium
            transition-colors duration-200
            ${activeFilter === filter.id
              ? "bg-indigo-500 text-white"
              : "bg-gray-800/50 text-gray-400 hover:text-gray-300"
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
});

LessonsFilter.displayName = "LessonsFilter"; 