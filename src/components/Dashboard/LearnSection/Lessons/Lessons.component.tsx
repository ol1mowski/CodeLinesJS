import { motion } from "framer-motion";
import { memo, useState } from "react";
import { lessons } from "../../../../mocks/lessons.data";
import { LessonsFilter } from "./LessonsFilter.component";
import { LessonCard } from "./LessonCard.component";


type FilterType = "all" | "beginner" | "intermediate" | "advanced";

export const Lessons = memo(() => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredLessons = lessons.filter(
    lesson => filter === "all" || lesson.difficulty === filter
  );

  return (
    <div className="space-y-8">
      <LessonsFilter activeFilter={filter} onFilterChange={setFilter} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </motion.div>
    </div>
  );
});

Lessons.displayName = "Lessons"; 