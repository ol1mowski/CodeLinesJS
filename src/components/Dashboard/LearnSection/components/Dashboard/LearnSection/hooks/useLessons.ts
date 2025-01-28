import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLessons } from '../../../../lib/api/lessons';
import type { FilterType } from '../../../../types/filter.types';
import type { Lesson } from '../../../../types/lesson.types';

export type LessonsResponse = {
  lessons: Lesson[];
  userProgress: {
    completedLessons: number;
    userLevel: number;
  };
}

export const useLessons = () => {
  const [filter, setFilter] = useState<FilterType>('all');

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

  console.log('Raw data:', data);
  console.log('Current filter:', filter);

  const lessons = data?.lessons ?? [];
  const userProgress = data?.userProgress ?? { completedLessons: 0, userLevel: 1 };

  const filteredLessons = useMemo(() => {
    if (!lessons || lessons.length === 0) return [];
    
    console.log('Filtering lessons:', lessons);
    console.log('Using filter:', filter);
    
    const filtered = filter === 'all' 
      ? lessons 
      : lessons.filter(lesson => {
          console.log('Lesson difficulty:', lesson.difficulty, 'Filter:', filter);
          return lesson.difficulty === filter;
        });
    
    console.log('Filtered result:', filtered);
    return filtered;
  }, [lessons, filter]);

  return {
    filteredLessons,
    filter,
    setFilter,
    isLoading,
    error,
    refetch,
    isEmpty: !lessons || lessons.length === 0,
    userProgress
  };
}; 