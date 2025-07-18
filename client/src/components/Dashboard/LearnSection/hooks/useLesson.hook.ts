import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';
import { useApi } from '../../../../api/hooks/useApi.hook';
import { Lesson } from '../types/lesson.types';

type ApiError = {
  response?: {
    status: number;
  };
};

export const useLesson = (lessonId: string) => {
  const { isAuthenticated } = useAuth();
  const api = useApi<Lesson>();

  const {
    data: lesson,
    isLoading,
    error,
    refetch,
  } = useQuery<Lesson, ApiError>({
    queryKey: ['lesson', lessonId],
    queryFn: async () => {
      const response = await api.get(`lessons/${lessonId}`);
      if (response.error) {
        throw new Error(response.error);
      }
      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }
      return response.data;
    },
    enabled: !!lessonId && isAuthenticated,
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
    isNotFound: error?.response?.status === 404,
  };
};
