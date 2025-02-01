import { memo } from "react";
import { motion } from "framer-motion";
import { FaClock, FaChevronRight, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type PathProgress = {
  completed: number;
  total: number;
  percentage: number;
  lastCompletedAt: string;
  startedAt: string;
  isStarted: boolean;
  isCompleted: boolean;
};

type Path = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  requirements: string[];
  outcomes: string[];
  isAvailable: boolean;
  progress: PathProgress;
};

type PathCardProps = {
  path: Path;
};

export const PathCard = memo(({ path }: PathCardProps) => {
  const navigate = useNavigate();
  
  const { 
    title, 
    description, 
    difficulty, 
    estimatedTime,
    outcomes,
    progress,
    isAvailable
  } = path;

  const handlePathClick = () => {
    if (isAvailable) {
      navigate(`/dashboard/learn?tab=lessons&filter=${difficulty}`);
    }
  };

  return (
    <div className={`group ${!isAvailable ? 'cursor-not-allowed' : ''}`}>
      <motion.div
        whileHover={isAvailable ? { scale: 1.02 } : {}}
        className={`bg-dark-800/50 border rounded-xl p-6 transition-colors
          ${!isAvailable 
            ? 'border-gray-700/50 opacity-75'
            : progress.isCompleted
              ? 'border-green-500/20 hover:border-green-500/30'
              : 'border-js/10 hover:border-js/20'}`}
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <h3 className={`text-xl font-bold ${!isAvailable
                    ? 'text-gray-400'
                    : progress.isCompleted
                      ? 'text-green-400'
                      : 'text-js group-hover:text-js/80'
                  } transition-colors`}
                >
                  {title}
                </h3>
                {!isAvailable && <FaLock className="w-4 h-4 text-gray-500" />}
              </div>
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium
                ${difficulty === 'beginner' ? 'bg-green-500/10 text-green-400' :
                  difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'}`}
              >
                {difficulty === 'beginner' ? 'Podstawowy' :
                  difficulty === 'intermediate' ? 'Średni' : 'Zaawansowany'}
              </span>
            </div>
            <p className={`text-sm line-clamp-2 ${!isAvailable ? 'text-gray-500' : 'text-gray-400'}`}>
              {description}
            </p>
          </div>

          <div className={`flex items-center justify-between text-sm ${!isAvailable ? 'text-gray-500' : 'text-gray-400'}`}>
            <span className="flex items-center gap-1">
              <FaClock className="w-4 h-4" />
              {estimatedTime} min
            </span>
            <span>
              {progress.completed}/{progress.total} ukończone
            </span>
          </div>

          {outcomes && outcomes.length > 0 && (
            <div className={!isAvailable ? 'opacity-50' : ''}>
              <h4 className="text-sm font-medium text-gray-200 mb-2">
                Czego się nauczysz:
              </h4>
              <ul className="space-y-1">
                {outcomes.slice(0, 3).map((outcome, index) => (
                  <li key={index} className="text-sm text-gray-400">
                    • {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isAvailable ? (
            <div 
              onClick={handlePathClick}
              className="cursor-pointer flex items-center justify-between"
            >
              <div className="flex-1 mr-4">
                <div className="h-2 bg-dark rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.percentage}%` }}
                    className={`h-full ${progress.isCompleted ? 'bg-green-500' : 'bg-js'}`}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
              <FaChevronRight className="w-4 h-4 text-js group-hover:translate-x-1 transition-transform" />
            </div>
          ) : (
            <div className="flex items-center justify-between opacity-50">
              <div className="h-2 bg-dark rounded-full w-full" />
              <FaLock className="w-4 h-4 text-gray-500 ml-4" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
});

PathCard.displayName = "PathCard"; 