import { motion } from "framer-motion";
import { memo } from "react";
import { FaClock, FaStar, FaChevronRight, FaLock, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Lesson } from "../../../types/lesson.types";

type LessonCardProps = {
  lesson: Lesson;
}


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const LessonCard = memo(({ lesson }: LessonCardProps) => {
  const { 
    id, 
    title, 
    description, 
    duration, 
    difficulty,
    points,
    requiredLevel,
    isLocked,
    isCompleted,
  } = lesson;

  return (
    <div className={`group ${isLocked ? 'cursor-not-allowed' : ''}`}>
      <motion.div
        variants={cardVariants}
        whileHover={!isLocked ? { scale: 1.02 } : {}}
        className={`relative bg-dark-800/50 border rounded-xl p-6 transition-all duration-200
          ${isLocked 
            ? 'border-gray-700/50 opacity-75 hover:opacity-100' 
            : isCompleted
              ? 'border-green-500/20 hover:border-green-500/30'
              : 'border-js/10 hover:border-js/20'}`}
      >
        {isCompleted && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full">
            <FaCheck className="w-3 h-3" />
          </div>
        )}

        <div className="space-y-4">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`text-lg font-bold ${
                    isLocked 
                      ? 'text-gray-400' 
                      : isCompleted
                        ? 'text-green-400 group-hover:text-green-300'
                        : 'text-js group-hover:text-js/80'
                    } transition-colors`}
                  >
                    {title}
                  </h3>
                  {isLocked && <FaLock className="w-4 h-4 text-gray-500" />}
                </div>
                <p className={`text-sm mt-1 line-clamp-2 ${isLocked ? 'text-gray-500' : 'text-gray-400'}`}>
                  {description}
                </p>
              </div>
              <span className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
                ${isLocked 
                  ? 'bg-gray-700/30 text-gray-400' 
                  : 'bg-js/10 text-js'}`}
              >
                <FaStar className="w-3.5 h-3.5" />
                {points} XP
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <span className={`flex items-center gap-1 ${isLocked ? 'text-gray-500' : 'text-gray-400'}`}>
                <FaClock className="w-3.5 h-3.5" />
                {duration} min
              </span>
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium
                ${difficulty === 'beginner' 
                  ? 'bg-green-500/10 text-green-400' 
                  : difficulty === 'intermediate' 
                    ? 'bg-yellow-500/10 text-yellow-400'
                    : 'bg-red-500/10 text-red-400'}`}
              >
                {difficulty === 'beginner' ? 'Podstawowy' :
                  difficulty === 'intermediate' ? 'Średni' : 'Zaawansowany'}
              </span>
            </div>

            {isLocked ? (
              <span className="text-xs text-gray-500">
                Dostępne od poziomu {requiredLevel}
              </span>
            ) : (
              <Link 
                to={`/dashboard/learn/lesson?lessonId=${id}`}
                state={{ lessonId: id }}
                className={`p-2 rounded-lg transition-colors ${
                  isCompleted 
                    ? 'text-green-400 hover:bg-green-500/10' 
                    : 'text-js hover:bg-js/10'
                }`}
              >
                <FaChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
});

LessonCard.displayName = "LessonCard"; 