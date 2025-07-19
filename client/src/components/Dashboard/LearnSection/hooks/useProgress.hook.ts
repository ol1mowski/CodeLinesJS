import { httpClient } from "../../../../api/httpClient.api";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';


export const useProgress = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();
  

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['userProgress'],
    queryFn: async () => {
      const response = await httpClient.get('users/progress');
      if (response.error) {
        throw new Error(response.error);
      }
      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }
      return response.data;
    },
    enabled: isAuthenticated && !isAuthChecking,
    staleTime: 1000 * 60 * 5,
  });

  return {
    progress: data,
    isLoading,
    error,
    refetch,
  };
};
