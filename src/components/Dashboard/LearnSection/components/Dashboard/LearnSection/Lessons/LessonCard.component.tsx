import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { memo } from "react";

type LessonCardProps = {
  lesson: Lesson;
  progress?: LessonProgress;
}

export const LessonCard = memo(({ lesson, progress }: LessonCardProps) => {
  const progressPercent = progress ? Math.round((progress.xpEarned / lesson.xp) * 100) : 0;

  return (
    <Link to={`/dashboard/lesson/${lesson.id}`}>
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="group bg-dark-800/50 border border-js/10 rounded-xl p-5 hover:border-js/20 transition-colors"
      >
        {/* ... reszta komponentu ... */}
        <div className="relative h-2 bg-dark rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-js rounded-full"
          />
        </div>
        {progress && (
          <p className="text-sm text-gray-400 mt-2">
            {progress.xpEarned} / {lesson.xp} XP
          </p>
        )}
      </motion.div>
    </Link>
  );
}); 