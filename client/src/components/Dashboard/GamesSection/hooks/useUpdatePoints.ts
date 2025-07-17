import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserPoints } from '../api/userApi.api';

export const useUpdatePoints = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (points: number) => updateUserPoints(points),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    },
  });

  return {
    updatePoints: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
};
