import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../../Hooks/useAuth'; 
import { updateUserPoints } from '../api/updateUserPoints.api';
export const useUpdatePoints = () => {
  const { token } = useAuth(); 
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (points: number) => updateUserPoints(token || '', points),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    }
  });

  return { updatePoints: mutation.mutate, error: mutation.error };
}; 