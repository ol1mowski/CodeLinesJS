import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5001/api';

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
        ...data
      });

      const lessonData = queryClient.getQueryData<any>(['lesson', data.lessonId]);
      
      if (lessonData?.isCompleted && !data.isCompleted) {
        console.log('Lekcja już ukończona, pomijam aktualizację');
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
          isCompleted: data.isCompleted,
          completedSections: data.completedSections
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Błąd odpowiedzi:', errorData);
        throw new Error(errorData.message || 'Nie udało się zaktualizować postępu');
      }

      const result = await response.json();
      console.log('Odpowiedź z serwera:', result);
      return result;
    },
    onSuccess: (data) => {
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
    }
  });

  return {
    updateProgress
  };
}; 