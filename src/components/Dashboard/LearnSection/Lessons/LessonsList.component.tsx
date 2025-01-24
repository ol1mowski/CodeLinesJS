import { memo } from "react";
import { motion } from "framer-motion";
import { LessonCard } from "./LessonCard.component";
import type { Lesson } from "../types/lesson.types";

type LessonsListProps = {
  lessons: Lesson[];
  userId: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const LessonsList = memo(({ lessons, userId }: LessonsListProps) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {lessons.map((lesson) => (
        <LessonCard 
          key={lesson.id} 
          lesson={lesson}
          userId={userId}
        />
      ))}
    </motion.div>
  );
});

LessonsList.displayName = "LessonsList"; 