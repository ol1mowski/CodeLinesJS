import { motion } from "framer-motion";
import { memo } from "react";
import { FaClock, FaStar, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Lesson } from "../../types/lesson.types";

interface LessonCardProps {
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
  const progressBarWidth = `${lesson.progress}%`;

  return (
    <Link to={`/lesson/${lesson.id}`}>
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="group bg-dark-800/50 border border-js/10 rounded-xl p-5 hover:border-js/20 transition-colors"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-js mb-1 group-hover:text-js/80 transition-colors">
              {lesson.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2">
              {lesson.description}
            </p>
          </div>
          <span className="flex items-center gap-1 text-js bg-js/10 px-2.5 py-1 rounded-lg text-sm">
            <FaStar className="w-4 h-4" />
            {lesson.xp} XP
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <FaClock className="w-4 h-4" />
                {lesson.duration}
              </span>
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium
                ${lesson.difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
                  lesson.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'}`}
              >
                {lesson.difficulty === 'beginner' ? 'Podstawowy' :
                 lesson.difficulty === 'intermediate' ? 'Średni' : 'Zaawansowany'}
              </span>
            </div>
            <FaChevronRight className="w-4 h-4 text-js group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="relative h-2 bg-dark rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: progressBarWidth }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-js rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

LessonCard.displayName = "LessonCard"; 