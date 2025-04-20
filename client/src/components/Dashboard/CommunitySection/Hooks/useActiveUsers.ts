import { useQuery } from '@tanstack/react-query';
import { fetchActiveUsers } from '../api/fetchActiveUsers.api';
import { useAuth } from '../../../../hooks/useAuth';

export type User = {
  _id: string;
  username: string;
  isActive: boolean;
};

export type ActiveUsersResponse = {
  users: User[];
  totalActive: number;
};

export const useActiveUsers = () => {
  const { token } = useAuth();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<{
    status: string;
    code: number;
    message: string;
    data: ActiveUsersResponse;
    meta: any;
  }, Error>({
    queryKey: ['activeUsers'],
    queryFn: () => fetchActiveUsers(token || ''),
    retry: 2,
    refetchInterval: 30000,
    staleTime: 1000 * 60, // 1 minuta
    enabled: !!token,
  });

  const users = data?.data?.users || [];
  const visibleUsers = users.slice(0, 8);
  const extraUsers = users.length > 8 ? users.length - 8 : 0;
  const totalActive = data?.data?.totalActive || 0;

  return {
    users,
    visibleUsers,
    extraUsers,
    totalActive,
    isLoading,
    error,
    refetch,
  };
}; 