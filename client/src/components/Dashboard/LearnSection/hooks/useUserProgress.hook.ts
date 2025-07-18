import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../../../config/api.config';
import { useApi } from '../../../../api/hooks/useApi.hook';


type ProgressUpdate = {
  lessonId: string;
  points: number;
  isCompleted?: boolean;
  completedSections?: string[];
};

export const useUserProgress = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProgress } = useMutation({
    mutationFn: async (data: ProgressUpdate) => {
      console.log('Aktualizacja postępu użytkownika:', {
        userId,
        ...data,
      });

      const lessonData = queryClient.getQueryData<any>(['lesson', data.lessonId]);

      if (lessonData?.isCompleted && !data.isCompleted) {
        console.log('Lekcja już ukończona, pomijam aktualizację');
        return null;
      }

      const api = useApi<any>();
      const response = await api.put(`${API_URL}users/${userId}/progress`, {
          lessonId: data.lessonId,
          points: data.points,
          isCompleted: data.isCompleted,
          completedSections: data.completedSections,
        });

      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }

      return response.data;
    },
    onSuccess: data => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['userProgress'] });
        queryClient.invalidateQueries({ queryKey: ['lessons'] });
        queryClient.invalidateQueries({ queryKey: ['userStats'] });
      }
    },
    onError: (error: Error) => {
      console.error('Błąd aktualizacji:', error);
      toast.error('Nie udało się zapisać postępu. Spróbuj ponownie.', {
        duration: 4000,
        position: 'bottom-right',
      });
    },
  });

  return {
    updateProgress,
  };
};
