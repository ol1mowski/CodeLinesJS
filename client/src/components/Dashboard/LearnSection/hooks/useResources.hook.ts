import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';
import { useApi } from '../../../../api/hooks/useApi.hook';
import type { Resource } from '../types/resource.types';

export type ResourcesResponse = {
  data: Resource[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export const useResources = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();
  const api = useApi<ResourcesResponse>();

  const { data, isLoading, error, refetch } = useQuery<ResourcesResponse, Error>({
    queryKey: ['resources'],
    queryFn: async () => {
      const response = await api.get('resources');
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
    retry: 2,
  });

  return {
    resources: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
    refetch,
  };
};
