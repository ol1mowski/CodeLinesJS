import { useQuery } from '@tanstack/react-query';
import { fetchResources } from '../lib/api/resources';
import { type Resource } from '../types/resource.types';
import { useAuth } from '../../../../hooks/useAuth';

export type ResourcesResponse = {
  resources: Resource[];
  total: number;
};

export const useResources = () => {
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
    data: ResourcesResponse;
    meta: any;
  }, Error>({
    queryKey: ['resources'],
    queryFn: () => fetchResources(token || ''),
    retry: 2,
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const resources = data?.data?.resources || [];

  const recommendedResources = resources.filter((resource: Resource) => resource.isRecommended) || [];
  const otherResources = resources.filter((resource: Resource) => !resource.isRecommended) || [];

  return {
    recommendedResources,
    otherResources,
    isLoading,
    error,
    refetch,
  };
};
