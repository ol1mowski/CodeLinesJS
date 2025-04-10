import { useQuery } from "@tanstack/react-query";
import { fetchResources } from "../lib/api/resources";
import { type Resource } from "../types/resource.types";
import { useAuth } from "../../../../hooks/useAuth";

export type ResourcesResponse = {
  resources: Resource[];
};

export const useResources = () => {
  const { token } = useAuth();
  
  const { 
    data: resources, 
    isLoading, 
    error,
    refetch 
  } = useQuery<ResourcesResponse, Error>({
    queryKey: ['resources'],
    queryFn: () => fetchResources(token || ''),
    retry: 2,
    staleTime: 1000 * 60 * 5,
    enabled: !!token
  });

  const recommendedResources = resources?.resources.filter((resource: Resource) => resource.isRecommended) || [];
  const otherResources = resources?.resources.filter((resource: Resource) => !resource.isRecommended) || [];

  return {
    recommendedResources,
    otherResources,
    isLoading,
    error,
    refetch
  };
}; 