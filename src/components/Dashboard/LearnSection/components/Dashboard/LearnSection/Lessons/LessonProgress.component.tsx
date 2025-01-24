import { memo } from "react";
import { motion } from "framer-motion";
import type { Lesson } from "../../../../types/lesson.types";

type LessonProgressProps = {
  lesson: Lesson;
  progress: number;
  xpEarned: number;
}

export const LessonProgress = memo(({ lesson, progress, xpEarned }: LessonProgressProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg border border-js/10">
      <div className="flex-1 mr-4">
        <div className="relative h-2 bg-dark rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute inset-y-0 left-0 bg-js rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Postęp: {progress}%
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm text-js font-medium">
          {xpEarned} / {lesson.xp} XP
        </p>
      </div>
    </div>
  );
});

LessonProgress.displayName = "LessonProgress"; 