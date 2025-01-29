import { useQuery } from "@tanstack/react-query";
import { fetchLesson } from "../lib/api/lessons";
import { useAuth } from "./useAuth";
import type { Lesson } from "../types/lesson.types";

export const useLesson = (lessonId: string) => {
  const { token } = useAuth();

  const { 
    data: lesson,
    isLoading,
    error,
    refetch
  } = useQuery<Lesson>({
    queryKey: ['lesson', lessonId],
    queryFn: () => fetchLesson(lessonId),
    enabled: !!lessonId && !!token,
    retry: (failureCount, error: any) => {
      if (error.message === 'lesson_not_found') return false;
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    lesson,
    isLoading,
    error,
    refetch,
    isNotFound: error?.message === 'lesson_not_found'
  };
}; 