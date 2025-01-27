import { memo } from "react";
import { motion } from "framer-motion";
import { FaClock, FaChevronRight, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { LearningPath } from "../types/learning.types";
import { ProgressBar } from "../components/common/ProgressBar.component";

type PathCardProps = {
  path: LearningPath;
  userId: string;
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

export const PathCard = memo(({ path }: PathCardProps) => {
  const { 
    id, 
    title, 
    description, 
    difficulty, 
    estimatedTime, 
    lessons, 
    outcomes, 
    requiredLevel,
    requirements,
    progress,
    isLocked 
  } = path;

  return (
    <div className={`group ${isLocked ? 'cursor-not-allowed' : ''}`}>
      <motion.div
        variants={cardVariants}
        whileHover={!isLocked ? { scale: 1.02 } : {}}
        className={`bg-dark-800/50 border rounded-xl p-6 transition-colors
          ${isLocked 
            ? 'border-gray-700/50 opacity-75' 
            : 'border-js/10 hover:border-js/20'}`}
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <h3 className={`text-xl font-bold ${isLocked ? 'text-gray-400' : 'text-js group-hover:text-js/80'} transition-colors`}>
                  {title}
                </h3>
                {isLocked && (
                  <FaLock className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium
                  ${difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
                    difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'}`}
                >
                  {difficulty === 'beginner' ? 'Podstawowy' :
                    difficulty === 'intermediate' ? 'Średni' : 'Zaawansowany'}
                </span>
                {isLocked && (
                  <span className="text-xs text-gray-500">
                    Dostępne od poziomu {requiredLevel}
                  </span>
                )}
              </div>
            </div>
            <p className={`text-sm line-clamp-2 ${isLocked ? 'text-gray-500' : 'text-gray-400'}`}>
              {description}
            </p>
          </div>

          <div className={`flex items-center justify-between text-sm ${isLocked ? 'text-gray-500' : 'text-gray-400'}`}>
            <span className="flex items-center gap-1">
              <FaClock className="w-4 h-4" />
              {estimatedTime} min
            </span>
            <span>
              {lessons.length} lekcji
            </span>
          </div>

          {outcomes && outcomes.length > 0 && (
            <div className={isLocked ? 'opacity-50' : ''}>
              <h4 className="text-sm font-medium text-gray-200 mb-2">
                Czego się nauczysz:
              </h4>
              <ul className="space-y-1">
                {outcomes.map((outcome, index) => (
                  <li key={index} className="text-sm text-gray-400">
                    • {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requirements && requirements.length > 0 && (
            <div className={isLocked ? 'opacity-50' : ''}>
              <h4 className="text-sm font-medium text-gray-200 mb-2">
                Wymagania wstępne:
              </h4>
              <ul className="space-y-1">
                {requirements.map((req, index) => (
                  <li key={index} className="text-sm text-gray-400">
                    • {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!isLocked ? (
            <Link to={`/dashboard/path/${id}`} className="block">
              <div className="flex items-center justify-between">
                <ProgressBar progress={progress} />
                <FaChevronRight className="w-4 h-4 text-js group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ) : (
            <div className="flex items-center justify-between opacity-50">
              <ProgressBar progress={0} />
              <FaLock className="w-4 h-4 text-gray-500" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
});

PathCard.displayName = "PathCard"; 