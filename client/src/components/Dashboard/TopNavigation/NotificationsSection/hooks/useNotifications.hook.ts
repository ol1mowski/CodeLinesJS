import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../../../../../api/hooks/useApi.hook';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
};

type NotificationsResponse = {
  notifications: Notification[];
  unreadCount: number;
};

export const useNotifications = () => {
  const api = useApi<NotificationsResponse>();
  const queryClient = useQueryClient();

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await api.put(`notifications/${notificationId}/read`, {});
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
      const response = await api.put('notifications/read-all', {});
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
