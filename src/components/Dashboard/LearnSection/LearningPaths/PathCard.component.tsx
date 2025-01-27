import { memo } from "react";
import { motion } from "framer-motion";
import { FaClock, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { LearningPath } from "../types/learning.types";

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
    requirements,
    progress 
  } = path;

  return (
    <Link to={`/dashboard/path/${id}`}>
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="group bg-dark-800/50 border border-js/10 rounded-xl p-6 hover:border-js/20 transition-colors"
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-js group-hover:text-js/80 transition-colors">
                {title}
              </h3>
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium
                ${difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
                  difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'}`}
              >
                {difficulty === 'beginner' ? 'Podstawowy' :
                  difficulty === 'intermediate' ? 'Średni' : 'Zaawansowany'}
              </span>
            </div>
            <p className="text-gray-400 text-sm line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FaClock className="w-4 h-4" />
              {estimatedTime} min
            </span>
            <span>
              {lessons.length} lekcji
            </span>
          </div>

          {outcomes && outcomes.length > 0 && (
            <div>
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
            <div>
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

          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="relative h-2 bg-dark rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.percentage}%` }}
                  className="absolute inset-y-0 left-0 bg-js rounded-full"
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>{progress.completed} / {progress.total} ukończone</span>
                <span>{progress.percentage}%</span>
              </div>
            </div>
            <FaChevronRight className="w-4 h-4 text-js group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

PathCard.displayName = "PathCard"; 