import { motion } from "framer-motion";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { type FilterType } from "../types/filter.types";

type LessonsFilterProps = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  className?: string;
};

const filters: Array<{ id: FilterType; label: string }> = [
  { id: "all", label: "Wszystkie" },
  { id: "beginner", label: "Podstawowe" },
  { id: "intermediate", label: "Średnie" },
  { id: "advanced", label: "Zaawansowane" }
];

export const LessonsFilter = memo(({ activeFilter, onFilterChange, className = '' }: LessonsFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (newFilter: FilterType) => {
    // Aktualizuj URL
    setSearchParams(prev => {
      if (newFilter === "all") {
        prev.delete("filter");
      } else {
        prev.set("filter", newFilter);
      }
      return prev;
    });
    
    // Wywołaj callback z propsów
    onFilterChange(newFilter);
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        
        return (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleFilterChange(filter.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
              ${isActive 
                ? "text-js bg-js/10 border border-js/20" 
                : "text-gray-400 hover:text-js/80 border border-transparent"
              }`}
          >
            {filter.label}
          </motion.button>
        );
      })}
    </div>
  );
});

LessonsFilter.displayName = "LessonsFilter"; 