import { motion } from "framer-motion";
import { memo } from "react";
import { learningPaths } from "../../../../mocks/learningPaths.data";
import { PathCard } from "./PathCard.component";

export const LearningPaths = memo(() => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-js mb-1">
          Ścieżki nauki
        </h3>
        <p className="text-gray-400 text-sm">
          Wybierz ścieżkę nauki dopasowaną do Twoich potrzeb
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {learningPaths.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </motion.div>
    </div>
  );
});

LearningPaths.displayName = "LearningPaths"; 