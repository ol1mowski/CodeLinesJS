import { httpClient } from "../../../../api/httpClient.api";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';

import type { Resource } from '../types/resource.types';

export type ResourcesResponse = {
  resources: Resource[];
  total: number;
};

export const useResources = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();
  

  const { data, isLoading, error, refetch } = useQuery<ResourcesResponse, Error>({
    queryKey: ['resources'],
    queryFn: async () => {
      const response = await httpClient.get<ResourcesResponse>('resources');
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
    resources: data?.resources || [],
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
  };
};
