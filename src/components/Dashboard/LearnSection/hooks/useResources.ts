import { useQuery } from "@tanstack/react-query";
import { fetchResources } from "../lib/api/resources";
import { type Resource } from "../types/resource.types";

export const useResources = () => {
  const { 
    data: resources, 
    isLoading, 
    error,
    refetch 
  } = useQuery<{ resources: Resource[] }, Error>({
    queryKey: ['resources'],
    queryFn: fetchResources,
    retry: 2,
    staleTime: 1000 * 60 * 5, 
  });

  const recommendedResources = resources?.resources.filter(resource => resource.isRecommended) || [];
  const otherResources = resources?.resources.filter(resource => !resource.isRecommended) || [];

  return {
    recommendedResources,
    otherResources,
    isLoading,
    error,
    refetch
  };
}; 