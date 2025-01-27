import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLessons } from '../../../../lib/api/lessons';
import type { FilterType } from '../../../../types/filter.types';
import type { Lesson } from '../../../../types/lesson.types';

export const useLessons = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const { 
    data, 
    isLoading, 
    error,
    refetch 
  } = useQuery<{ data: Lesson[] }>({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
    retry: 2,
    refetchOnWindowFocus: false,
    initialData: { data: [] }
  });

  const lessons = data?.data || [];

  const filteredLessons = useMemo(() => {
    return filter === 'all' 
      ? lessons 
      : lessons.filter(lesson => lesson.difficulty === filter);
  }, [lessons, filter]);

  return {
    filteredLessons,
    filter,
    setFilter,
    isLoading,
    error,
    refetch,
    isEmpty: lessons.length === 0
  };
}; 