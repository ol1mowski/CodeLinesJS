import { useQuery } from '@tanstack/react-query';
import { trendingApi } from '../api/trending/trending.api';

export const useTrending = () => {
  const { data: tags, isLoading: isTagsLoading } = useQuery({
    queryKey: ['trending', 'tags'],
    queryFn: trendingApi.getPopularTags
  });

  const { data: topics, isLoading: isTopicsLoading } = useQuery({
    queryKey: ['trending', 'topics'],
    queryFn: trendingApi.getTrendingTopics
  });

  return {
    tags,
    topics,
    isLoading: isTagsLoading || isTopicsLoading
  };
}; 