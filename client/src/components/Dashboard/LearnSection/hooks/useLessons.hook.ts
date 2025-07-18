import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Lesson } from '../types/lesson.types';
import type { FilterType } from '../types/filter.types';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';
import { useApi } from '../../../../api/hooks/useApi.hook';

type Category = 'javascript' | 'react';

type LessonsResponse = {
  data: {
    lessons: {
      [key in Category]: Lesson[];
    };
    stats: {
      total: number;
      completed: number;
      progress: number;
    };
    requiredLevel?: number;
  };
};

const getDifficultyLabel = (filter: FilterType): string => {
  switch (filter) {
    case 'beginner':
      return 'Początkujący';
    case 'intermediate':
      return 'Średniozaawansowany';
    case 'advanced':
      return 'Zaawansowany';
    default:
      return 'Wszystkie';
  }
};

export const useLessons = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [category] = useState<Category>('javascript');
  const { isAuthenticated, isAuthChecking } = useAuth();
  const api = useApi<LessonsResponse>();

  const { data, isLoading, error, refetch } = useQuery<LessonsResponse, Error>({
    queryKey: ['lessons'],
    queryFn: async () => {
      const response = await api.get('lessons');
      if (response.error) {
        throw new Error(response.error);
      }
      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }
      return response.data;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    enabled: isAuthenticated && !isAuthChecking,
  });

  const isDataLoading = isLoading || (!data && !error);

  const allLessons = data?.data.lessons?.[category] ?? [];
  const lessonStats = data?.data.stats ?? { total: 0, completed: 0, progress: 0 };

  const filteredLessons = useMemo(
    () =>
      filter === 'all'
        ? allLessons
        : allLessons.filter((lesson: Lesson) => lesson.difficulty === filter),
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
        : 'Aktualnie nie ma żadnych dostępnych lekcji. Sprawdź ponownie później.',
    },
  };

  return {
    filteredLessons,
    filter,
    setFilter,
    resetFilter: () => setFilter('all'),
    isLoading: isDataLoading,
    error,
    refetch,
    isEmpty,
    hasNoLessonsForFilter,
    filterState,
    requiredLevel: data?.data.requiredLevel,
    stats: lessonStats,
  };
};
