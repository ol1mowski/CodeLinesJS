import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaClock, FaChevronRight, FaCheck } from "react-icons/fa";
import type { Lesson } from "../types/lesson.types";

type LessonCardProps = {
  lesson: Lesson;
  userLevel: number;
};

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
    title, 
    description, 
    duration, 
    slug,
    isCompleted 
  } = lesson;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <Link 
        to={`/lesson/${slug}`}
        className="block p-6 rounded-xl bg-dark-800 border border-js/10 hover:border-js/20 transition-colors"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-js">
                  {title}
                </h3>
                {isCompleted && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-js/10 text-js">
                    <FaCheck className="w-3 h-3 mr-1" />
                    Ukończono
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-400">
              <FaClock className="w-4 h-4 mr-1" />
              {duration} min
            </div>
            <FaChevronRight 
              className={`w-4 h-4 transition-all ${
                isCompleted ? 'text-js' : 'text-gray-500'
              } group-hover:translate-x-1`} 
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

LessonCard.displayName = "LessonCard";