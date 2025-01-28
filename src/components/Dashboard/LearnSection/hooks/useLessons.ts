import { useQuery } from "@tanstack/react-query";
import { fetchLessons } from "../lib/api/lessons";
import type { Lesson, FilterType } from "../types/lesson.types";
import { useState, useMemo } from "react";

const getDifficultyLabel = (filter: FilterType) => {
  switch (filter) {
    case 'beginner': return 'podstawowym';
    case 'intermediate': return 'średnim';
    case 'advanced': return 'zaawansowanym';
    default: return '';
  }
};

export const useLessons = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  
  const { 
    data: lessons, 
    isLoading, 
    error,
    refetch 
  } = useQuery<{ lessons: Lesson[] }, Error>({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  const filteredLessons = useMemo(() => 
    lessons?.lessons.filter(lesson => 
      filter === "all" ? true : lesson.difficulty === filter
    ) || [], 
    [lessons?.lessons, filter]
  );

  const isEmpty = !lessons?.lessons || lessons.lessons.length === 0;
  const hasNoLessonsForFilter = !isEmpty && filteredLessons.length === 0;

  const filterState = {
    currentFilter: filter,
    label: getDifficultyLabel(filter),
    isEmpty,
    hasNoLessonsForFilter,
    messages: {
      title: hasNoLessonsForFilter 
        ? `Brak lekcji o poziomie ${getDifficultyLabel(filter)}`
        : 'Brak dostępnych lekcji',
      description: hasNoLessonsForFilter
        ? 'W tej kategorii nie znaleziono żadnych lekcji. Wybierz inny poziom trudności lub wyświetl wszystkie lekcje.'
        : 'Aktualnie nie ma żadnych dostępnych lekcji. Sprawdź ponownie później.'
    }
  };

  const resetFilter = () => setFilter('all');

  return {
    filteredLessons,
    filter,
    setFilter,
    resetFilter,
    isLoading,
    error,
    refetch,
    isEmpty,
    hasNoLessonsForFilter,
    filterState
  };
}; 