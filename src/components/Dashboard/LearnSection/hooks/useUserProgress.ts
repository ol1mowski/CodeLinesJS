import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5001/api';

type ProgressUpdate = {
  lessonId: string;
  points: number;
};

export const useUserProgress = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProgress } = useMutation({
    mutationFn: async (data: ProgressUpdate) => {
      const response = await fetch(`${API_URL}/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          lessonId: data.lessonId,
          points: data.points
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Nie udało się zaktualizować postępu');
      }

      return response.json();
    },
    onSuccess: () => {
      // Odśwież dane po udanej aktualizacji
      queryClient.invalidateQueries(['userProgress']);
      queryClient.invalidateQueries(['lessons']);
      queryClient.invalidateQueries(['userStats']);
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