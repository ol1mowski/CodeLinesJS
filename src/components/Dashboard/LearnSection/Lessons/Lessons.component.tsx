import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LessonCard } from "./LessonCard.component";
import { LessonsFilter } from "./LessonsFilter.component";
import { fetchLessons } from "../lib/api/lessons";
import type { Lesson } from "../types/lesson.types";
import { ErrorMessage } from "../components/ErrorMessage.component";

export const Lessons = memo(() => {
  const [filter, setFilter] = useState("all");
  const userId = "current-user";

  const { 
    data: lessons, 
    isLoading, 
    error, 
    refetch 
  } = useQuery<{ data: Lesson[] }, Error>({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
    retry: 2
  });

  const filteredLessons = lessons?.data.filter(lesson => 
    filter === "all" ? true : lesson.difficulty === filter
  ) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (error) {
    return (
      <ErrorMessage 
        message="Nie udało się pobrać listy lekcji. Spróbuj ponownie później."
        onRetry={() => refetch()}
      />
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredLessons.map((lesson) => (
          <LessonCard 
            key={lesson.id} 
            lesson={lesson}
            userId={userId}
          />
        ))}
      </motion.div>
    </div>
  );
});

Lessons.displayName = "Lessons"; 