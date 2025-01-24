import { memo } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { type LessonProgress } from "../types/lesson.types";

type LessonProgressProps = {
  currentSection: number;
  totalSections: number;
  progress: LessonProgress;
  onComplete: () => void;
}

export const LessonProgress = memo(({ currentSection, totalSections, progress, onComplete }: LessonProgressProps) => {
  const progressPercent = ((currentSection + 1) / totalSections) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-800/95 border-t border-js/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-8">
            <div className="relative h-2 bg-dark rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="absolute inset-y-0 left-0 bg-js rounded-full"
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Sekcja {currentSection + 1} z {totalSections}</span>
              <span>{progress.xpEarned} XP zdobyte</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="flex items-center gap-2 px-4 py-2 bg-js/10 text-js rounded-lg 
              hover:bg-js/20 transition-colors"
          >
            <FaCheck className="w-4 h-4" />
            Zakończ lekcję
          </motion.button>
        </div>
      </div>
    </div>
  );
});

LessonProgress.displayName = "LessonProgress"; 