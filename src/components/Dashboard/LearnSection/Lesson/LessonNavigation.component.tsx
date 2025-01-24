import { memo } from "react";
import { motion } from "framer-motion";
import type { LessonSection } from "../types/lesson.types";

type LessonNavigationProps = {
  sections: LessonSection[];
  activeSection: number;
  onSectionChange: (index: number) => void;
}

export const LessonNavigation = memo(({ sections, activeSection, onSectionChange }: LessonNavigationProps) => {
  return (
    <nav className="sticky top-4 space-y-2">
      <h4 className="text-sm font-medium text-gray-400 mb-4">
        Spis treści
      </h4>
      {sections.map((section, index) => (
        <motion.button
          key={index}
          whileHover={{ x: 4 }}
          onClick={() => onSectionChange(index)}
          className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors
            ${activeSection === index 
              ? "bg-js/10 text-js border border-js/20" 
              : "text-gray-400 hover:text-js/80"}`}
        >
          {section.title}
        </motion.button>
      ))}
    </nav>
  );
});

LessonNavigation.displayName = "LessonNavigation";