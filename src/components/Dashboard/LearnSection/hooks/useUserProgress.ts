import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5001/api';

type ProgressUpdate = {
  lessonId: string;
  points: number;
  isCompleted?: boolean;
};

export const useUserProgress = (userId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProgress } = useMutation({
    mutationFn: async (data: ProgressUpdate) => {
      const lessonData = queryClient.getQueryData<any>(['lesson', data.lessonId]);
      if (lessonData?.isCompleted && !data.isCompleted) {
        console.log('Lekcja już ukończona, pomijam aktualizację postępu');
        return null;
      }

      const response = await fetch(`${API_URL}/users/${userId}/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          lessonId: data.lessonId,
          points: data.points,
          isCompleted: data.isCompleted
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Nie udało się zaktualizować postępu');
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['userProgress'] });
        queryClient.invalidateQueries({ queryKey: ['lessons'] });
        queryClient.invalidateQueries({ queryKey: ['userStats'] });
      }
    },
    onError: (error: Error) => {
      if (error.message !== 'LESSON_ALREADY_COMPLETED') {
        console.error('Błąd aktualizacji:', error);
        toast.error('Nie udało się zapisać postępu. Spróbuj ponownie.', {
          duration: 4000,
          position: 'bottom-right',
        });
      }
    }
  });

  return {
    updateProgress
  };
}; 