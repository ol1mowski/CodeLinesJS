import { motion } from "framer-motion";
import { memo } from "react";
import { FaClock, FaStar } from "react-icons/fa";
import { Lesson } from "../../../../types/learning.types";

type LessonCardProps = {
  lesson: Lesson;
};

const difficultyColors = {
  beginner: "from-green-500 to-emerald-500",
  intermediate: "from-blue-500 to-indigo-500",
  advanced: "from-purple-500 to-fuchsia-500"
};

export const LessonCard = memo(({ lesson }: LessonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden group hover:border-indigo-500/50 transition-all"
    >
      <div className="relative h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${lesson.progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${difficultyColors[lesson.difficulty]}`}
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold font-space text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition-all">
              {lesson.title}
            </h3>
            <span className="text-sm text-gray-400">{lesson.category}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            <span className="text-sm font-medium">{lesson.xp} XP</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4">
          {lesson.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <FaClock />
            <span>{lesson.duration}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium
              ${lesson.isCompleted
                ? "bg-green-500/20 text-green-400"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
              }
              transition-all
            `}
          >
            {lesson.isCompleted ? "Ukończono" : "Rozpocznij"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

LessonCard.displayName = "LessonCard"; 