import { useQuery } from "@tanstack/react-query";
import { fetchLesson } from "../lib/api/lessons";
import { useAuth } from "../../../../Hooks/useAuth";
import { Lesson } from "../types/lesson.types";

interface ApiError extends Error {
  response?: {
    status: number;
  };
}

export const useLesson = (lessonId: string) => {
  const { token } = useAuth();

  const {
    data: lesson,
    isLoading,
    error,
    refetch
  } = useQuery<Lesson, ApiError>({
    queryKey: ['lesson', lessonId],
    queryFn: () => {
      return fetchLesson(lessonId, token || '');
    },
    enabled: !!lessonId && !!token,
    retry: (failureCount, error) => {
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