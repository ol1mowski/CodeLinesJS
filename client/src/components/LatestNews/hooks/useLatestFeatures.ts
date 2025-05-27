import { useQuery } from '@tanstack/react-query';
import { fetchLatestFeatures, LatestFeature } from '../api/latestFeatures.api';

export const LATEST_FEATURES_QUERY_KEY = ['latestFeatures'];

export const useLatestFeatures = () => {
  const { data, isLoading, error } = useQuery<LatestFeature[]>({
    queryKey: LATEST_FEATURES_QUERY_KEY,
    queryFn: fetchLatestFeatures,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    features: data || [],
    isLoading,
    error,
    data,
  };
}; 