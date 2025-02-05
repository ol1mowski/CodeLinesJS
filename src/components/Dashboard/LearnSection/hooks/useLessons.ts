import { useQuery } from "@tanstack/react-query";
import { fetchLessons } from "../lib/api/lessons";
import type { Lesson } from "../types/lesson.types";
import { useState, useMemo } from "react";
import type { FilterType } from "../types/filter.types";

type Category = 'javascript' | 'react';

type LessonsResponse = {
  lessons: Record<Category, Lesson[]>;
  stats: {
    total: number;
    completed: number;
    progress: number;
  };
  requiredLevel: number;
};

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
  const [category] = useState<Category>("javascript");

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery<LessonsResponse>({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  const allLessons = data?.lessons?.[category] ?? [];
  const stats = data?.stats ?? { total: 0, completed: 0, progress: 0 };

  const filteredLessons = useMemo(() =>
    filter === "all" 
      ? allLessons 
      : allLessons.filter(lesson => lesson.difficulty === filter),
    [allLessons, filter]
  );

  const isEmpty = !allLessons || allLessons.length === 0;
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

  return {
    filteredLessons,
    filter,
    setFilter,
    resetFilter: () => setFilter('all'),
    isLoading,
    error,
    refetch,
    isEmpty,
    hasNoLessonsForFilter,
    filterState,
    requiredLevel: data?.requiredLevel,
  };
}; 