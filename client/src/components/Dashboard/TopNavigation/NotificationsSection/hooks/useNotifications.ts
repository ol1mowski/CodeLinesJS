import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../../../../../config/api.config';
import { useAuth } from '../../../../../hooks/useAuth';

export const useNotifications = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await fetch(`${API_URL}/dashboard/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Nie udało się oznaczyć jako przeczytane');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return { markAsRead };
};
