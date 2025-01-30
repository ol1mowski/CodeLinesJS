import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLessons } from '../../../../lib/api/lessons';
import type { FilterType } from '../../../../types/filter.types';
import type { Lesson } from '../../../../types/lesson.types';

type Category = 'javascript' | 'react';

export type LessonsResponse = {
  lessons: Record<Category, Lesson[]>;
  stats: {
    total: number;
    completed: number;
    progress: number;
  };
}

export const useLessons = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [category] = useState<Category>('javascript');

  const { 
    data, 
    isLoading, 
    error,
    refetch 
  } = useQuery<LessonsResponse>({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
    retry: 2,
    refetchOnWindowFocus: false
  });

  const allLessons = data?.lessons?.[category] ?? [];
  const stats = data?.stats ?? { total: 0, completed: 0, progress: 0 };

  const filteredLessons = useMemo(() => {
    if (!allLessons || allLessons.length === 0) return [];
    
    return filter === 'all' 
      ? allLessons 
      : allLessons.filter(lesson => lesson.difficulty === filter);
  }, [allLessons, filter]);

  const getDifficultyLabel = (filter: FilterType) => {
    switch (filter) {
      case 'beginner': return 'podstawowym';
      case 'intermediate': return 'średnim';
      case 'advanced': return 'zaawansowanym';
      default: return '';
    }
  };

  return {
    filteredLessons,
    filter,
    setFilter,
    isLoading,
    error,
    refetch,
    isEmpty: !allLessons || allLessons.length === 0,
    hasNoLessonsForFilter: filteredLessons.length === 0,
    filterState: {
      currentFilter: filter,
      label: getDifficultyLabel(filter)
    },
    userProgress: {
      completedLessons: stats.completed,
      userLevel: 1
    }
  };
}; 