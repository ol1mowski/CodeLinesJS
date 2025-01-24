import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProgress, updateLessonProgress } from '../lib/api/progress';
import type { UserProgressResponse } from '../types/api.types';

export const PROGRESS_QUERY_KEY = ['userProgress'];

export const useUserProgress = (userId: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<UserProgressResponse>({
    queryKey: [...PROGRESS_QUERY_KEY, userId],
    queryFn: () => fetchUserProgress(userId),
    staleTime: 1000 * 60 * 5, // 5 minut
  });

  const { mutate: updateProgress } = useMutation({
    mutationFn: (progress: LessonProgress) => 
      updateLessonProgress(userId, progress.lessonId, progress),
    onSuccess: (newProgress) => {
      queryClient.setQueryData([...PROGRESS_QUERY_KEY, userId], (old: UserProgressResponse) => ({
        ...old,
        progress: {
          ...old.progress,
          [newProgress.lessonId]: newProgress
        },
        lastUpdated: new Date().toISOString()
      }));
    }
  });

  return {
    progress: data?.progress || {},
    isLoading,
    error,
    updateProgress
  };
}; 