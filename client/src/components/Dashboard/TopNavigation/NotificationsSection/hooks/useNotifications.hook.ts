import { httpClient } from "../../../../../api/httpClient.api";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useNotifications = () => {
  
  const queryClient = useQueryClient();

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await httpClient.put(`notifications/${notificationId}/read`, {});
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const response = await httpClient.put('notifications/read-all', {});
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    markAsRead,
    markAllAsRead,
  };
};
