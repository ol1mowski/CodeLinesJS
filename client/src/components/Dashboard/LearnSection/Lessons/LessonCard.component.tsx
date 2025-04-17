import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaChevronRight, FaCheck, FaLock } from 'react-icons/fa';
import type { Lesson } from '../types/lesson.types';

type LessonCardProps = {
  lesson: Lesson & { isLocked?: boolean };
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const LessonCard = memo(({ lesson }: LessonCardProps) => {
  const { title, description, duration, slug, isCompleted, isLocked, requiredLevel = 1 } = lesson;

  const cardContent = (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`text-lg font-semibold ${isLocked ? 'text-gray-500' : 'text-js'}`}>
              {title}
            </h3>
            {isCompleted && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-js/10 text-js">
                <FaCheck className="w-3 h-3 mr-1" />
                Ukończono
              </span>
            )}
          </div>
          <p className={`text-sm ${isLocked ? 'text-gray-600' : 'text-gray-400'} line-clamp-2`}>
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <span
            className={`flex items-center gap-1 ${isLocked ? 'text-gray-600' : 'text-gray-400'}`}
          >
            <FaClock className="w-3.5 h-3.5" />
            {duration} min
          </span>
          {isLocked && (
            <span className="flex items-center gap-1 text-gray-500">
              <FaLock className="w-3.5 h-3.5" />
              Poziom {requiredLevel}
            </span>
          )}
        </div>
        {!isLocked && (
          <div className="flex items-center gap-2 text-js">
            <span>{isCompleted ? 'Powtórz' : 'Rozpocznij'}</span>
            <FaChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative ${isLocked ? 'opacity-75' : ''}`}
    >
      {isLocked ? (
        <div className="block p-6 rounded-xl bg-dark-800 border border-gray-800 cursor-not-allowed">
          {cardContent}
        </div>
      ) : (
        <Link
          to={`/dashboard/learn/lesson/${slug}`}
          className="block p-6 rounded-xl bg-dark-800 border border-js/10 hover:border-js/20 transition-colors"
        >
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
});

LessonCard.displayName = 'LessonCard';
