import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await fetch(
        `http://localhost:5001/api/dashboard/notifications/${notificationId}/read`,
        { 
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Nie udało się oznaczyć jako przeczytane');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });

  return { markAsRead };
}; 