import { motion } from "framer-motion";
import { memo } from "react";
import { useState } from "react";
import { lessons } from "../../../../mocks/lessons.data";
import { LessonCard } from "./LessonCard.component";
import { useUserProgress } from "../../../../hooks/useUserProgress";
import { LessonsFilter } from "../../../../Lessons/LessonsFilter.component";

export const Lessons = memo(() => {
  const [filter, setFilter] = useState("all");
  const userId = "current-user";
  const { progress, isLoading } = useUserProgress(userId);

  const filteredLessons = lessons.filter(lesson => 
    filter === "all" ? true : lesson.difficulty === filter
  );

  if (filteredLessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-bold text-js mb-2">
          Brak dostępnych lekcji
        </h3>
        <p className="text-gray-400 text-sm">
          {filter === "all" 
            ? "Aktualnie nie ma żadnych dostępnych lekcji. Sprawdź ponownie później."
            : "Brak lekcji o wybranym poziomie trudności. Wybierz inny filtr."}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-js"></div>
      </div>
    );
  }

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
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredLessons.map((lesson) => (
          <LessonCard 
            key={lesson.id} 
            lesson={lesson}
            progress={progress[lesson.id]}
          />
        ))}
      </motion.div>
    </div>
  );
}); 