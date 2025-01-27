import { motion } from "framer-motion";
import { memo } from "react";
import { LessonCard } from "./LessonCard.component";
import { useUserProgress } from "../../../../hooks/useUserProgress";
import { LessonsFilter } from "../../../../Lessons/LessonsFilter.component";
import { useLessons } from "../hooks/useLessons";
import { LoadingSpinner } from "../../../../components/UI/LoadingSpinner.component";
import { ErrorMessage } from "../../../../components/ErrorMessage.component";

export const Lessons = memo(() => {
  const userId = "current-user";
  const { progress, isLoading: isProgressLoading } = useUserProgress(userId);
  const { 
    filteredLessons, 
    filter, 
    setFilter, 
    isLoading: isLessonsLoading,
    error,
    refetch,
    isEmpty
  } = useLessons();

  const isLoading = isProgressLoading || isLessonsLoading;

  if (error) {
    return (
      <ErrorMessage 
        message="Nie udało się pobrać listy lekcji. Spróbuj ponownie później."
        onRetry={refetch}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-bold text-js mb-2">
          Brak dostępnych lekcji
        </h3>
        <p className="text-gray-400 text-sm">
          Aktualnie nie ma żadnych dostępnych lekcji. Sprawdź ponownie później.
        </p>
      </div>
    );
  }

  if (filteredLessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-bold text-js mb-2">
          Brak lekcji dla wybranego filtru
        </h3>
        <p className="text-gray-400 text-sm">
          Nie znaleziono lekcji o wybranym poziomie trudności. Wybierz inny filtr.
        </p>
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

Lessons.displayName = "Lessons"; 