import { useQuery } from "@tanstack/react-query";
import { fetchLesson } from "../lib/api/lessons";
import { useAuth } from "./useAuth";
import type { Lesson } from "../types/lesson.types";

export const useLesson = (lessonId: string) => {
  const { token } = useAuth();

  console.log('useLesson hook called with lessonId:', lessonId);

  const {
    data: lesson,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => {

      return fetchLesson(lessonId);
    },
    enabled: !!lessonId && !!token,
    retry: (failureCount, error: any) => {
      console.log('Query failed:', { failureCount, error });
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
  });

  return {
    lesson,
    isLoading,
    error,
    refetch,
    isNotFound: error?.response?.status === 404
  };
}; 