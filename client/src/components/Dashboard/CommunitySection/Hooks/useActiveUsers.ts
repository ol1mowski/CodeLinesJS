import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';
import { useApi } from '../../../../api/hooks/useApi.hook';

export type User = {
  id: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: string;
};

export type ActiveUsersResponse = {
  users: User[];
  total: number;
};

export const useActiveUsers = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();
  const api = useApi<ActiveUsersResponse>();

  const { data, isLoading, error, refetch } = useQuery<ActiveUsersResponse, Error>({
    queryKey: ['activeUsers'],
    queryFn: async () => {
      const response = await api.get('users/active');
      if (response.error) {
        throw new Error(response.error);
      }
      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }
      return response.data;
    },
    enabled: isAuthenticated && !isAuthChecking,
    staleTime: 1000 * 30, // 30 sekund
    refetchInterval: 1000 * 60, // co minutę
  });

  const users = data?.users || [];
  const visibleUsers = users.slice(0, 8);
  const extraUsers = users.length > 8 ? users.length - 8 : 0;

  return {
    users,
    visibleUsers,
    extraUsers,
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
  };
}; 