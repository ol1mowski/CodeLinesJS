import { motion } from "framer-motion";
import { memo } from "react";
import { FaClock, FaBookReader } from "react-icons/fa";
import { LearningPath } from "../../../../types/learning.types";

type PathCardProps = {
  path: LearningPath;
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

const difficultyColors = {
  beginner: "from-green-500/20 to-emerald-500/20 text-emerald-400",
  intermediate: "from-blue-500/20 to-indigo-500/20 text-indigo-400",
  advanced: "from-purple-500/20 to-fuchsia-500/20 text-fuchsia-400"
};

const difficultyLabels = {
  beginner: "Początkujący",
  intermediate: "Średniozaawansowany",
  advanced: "Zaawansowany"
};

export const PathCard = memo(({ path }: PathCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all group"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold font-space text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition-all">
            {path.title}
          </h3>
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            bg-gradient-to-r ${difficultyColors[path.difficulty]}
          `}>
            {difficultyLabels[path.difficulty]}
          </span>
        </div>

        <p className="text-gray-400 mb-6 flex-grow">
          {path.description}
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <FaClock />
              <span>{path.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <FaBookReader />
              <span>{path.completedModules}/{path.totalModules} modułów</span>
            </div>
          </div>

          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${path.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {path.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md text-xs font-medium bg-gray-700/50 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            {path.progress === 0 ? "Rozpocznij" : "Kontynuuj"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

PathCard.displayName = "PathCard"; 