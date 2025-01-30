import { memo, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { FaCheck, FaStar } from "react-icons/fa";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLessonCompleted = scrollProgress >= 98 || progress.isCompleted;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-800/95 border-t border-js/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-8">
            <div className="relative h-2 bg-dark rounded-full overflow-hidden">
              <motion.div
                style={{ width: `${Math.max(smoothProgress, progress.percentage)}%` }}
                className="absolute inset-y-0 left-0 bg-js rounded-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <div className="flex items-center gap-4">
                <span>Sekcja {currentSection + 1} z {totalSections}</span>
                <span className="text-js">•</span>
                <span className="flex items-center gap-1">
                  <FaStar className="w-4 h-4 text-js" />
                  {progress.xpEarned} XP zdobyte
                </span>
              </div>
              <span>{Math.round(Math.max(scrollProgress, progress.percentage))}% ukończone</span>
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
            {isLessonCompleted ? 'Zakończ lekcję' : 'Ukończ całą lekcję'}
          </motion.button>
        </div>
      </div>
    </div>
  );
});

LessonProgress.displayName = "LessonProgress"; 