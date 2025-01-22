import { motion } from "framer-motion";
import { memo, useState } from "react";
import { lessons } from "../../../../mocks/lessons.data";
import { LessonsFilter } from "./LessonsFilter.component";
import { LessonCard } from "./LessonCard.component";

export const Lessons = memo(() => {
  const [filter, setFilter] = useState("all");

  const filteredLessons = lessons.filter(lesson => 
    filter === "all" ? true : lesson.difficulty === filter
  );

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
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-js mb-1">
            Dostępne lekcje
          </h3>
          <p className="text-gray-400 text-sm">
            Wybierz interesującą Cię lekcję i rozpocznij naukę
          </p>
        </div>
        <LessonsFilter activeFilter={filter} onFilterChange={setFilter} />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </motion.div>
    </div>
  );
});

Lessons.displayName = "Lessons"; 