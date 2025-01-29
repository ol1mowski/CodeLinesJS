import { memo } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

type Progress = {
  xpEarned: number;
  completed: number;
  total: number;
  percentage: number;
  isCompleted: boolean;
  lastCompletedSection: number;
};

type LessonProgressProps = {
  currentSection: number;
  totalSections: number;
  progress?: Progress;
  onComplete: () => void;
}

const defaultProgress: Progress = {
  xpEarned: 0,
  completed: 0,
  total: 0,
  percentage: 0,
  isCompleted: false,
  lastCompletedSection: -1
};

export const LessonProgress = memo(({ 
  currentSection, 
  totalSections, 
  progress = defaultProgress, 
  onComplete 
}: LessonProgressProps) => {
  const progressPercent = ((currentSection + 1) / totalSections) * 100;
  const isLessonCompleted = progress?.isCompleted || currentSection === totalSections - 1;

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
              <div className="flex items-center gap-4">
                <span>Sekcja {currentSection + 1} z {totalSections}</span>
                <span className="text-js">•</span>
                <span>{progress.xpEarned} XP zdobyte</span>
              </div>
              <span>{Math.round(progressPercent)}% ukończone</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            disabled={!isLessonCompleted}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${isLessonCompleted 
                ? 'bg-js/10 text-js hover:bg-js/20' 
                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'}`}
          >
            <FaCheck className="w-4 h-4" />
            {isLessonCompleted ? 'Zakończ lekcję' : 'Ukończ wszystkie sekcje'}
          </motion.button>
        </div>
      </div>
    </div>
  );
});

LessonProgress.displayName = "LessonProgress"; 