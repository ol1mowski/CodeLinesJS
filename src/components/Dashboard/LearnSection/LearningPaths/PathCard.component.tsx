import { motion } from "framer-motion";
import { memo } from "react";
import { FaClock, FaBookReader, FaChevronRight } from "react-icons/fa";
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
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};


export const PathCard = memo(({ path }: PathCardProps) => {
  const progressBarWidth = `${path.progress}%`;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className="group bg-dark-800/50 border border-js/10 rounded-xl p-6 hover:border-js/20 transition-colors"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-js mb-2">
            {path.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {path.description}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <FaClock className="w-4 h-4 text-js" />
            {path.estimatedTime}
          </span>
          <span className="flex items-center gap-2">
            <FaBookReader className="w-4 h-4 text-js" />
            {path.totalModules} lekcji
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Postęp</span>
            <span className="text-js font-medium">{path.progress}%</span>
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

        <div className="flex flex-wrap gap-2">
          {path.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 bg-js/10 text-js text-xs font-medium rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-js hover:text-js/80 transition-colors text-sm font-medium mt-4"
        >
          Rozpocznij naukę
          <FaChevronRight className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.div>
  );
});

PathCard.displayName = "PathCard"; 