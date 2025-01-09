import { motion } from "framer-motion";
import { memo } from "react";
import { learningPaths } from "../../../../mocks/learningPaths.data";
import { PathCard } from "./PathCard.component";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const LearningPaths = memo(() => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {learningPaths.map((path) => (
        <PathCard key={path.id} path={path} />
      ))}
    </motion.div>
  );
});

LearningPaths.displayName = "LearningPaths"; 