import { useQuery } from '@tanstack/react-query';
import { Topic, Tag } from '../../../../../types/trending.types';

const TRENDING_QUERY_KEY = 'trending';

const fetchTopics = async (): Promise<Topic[]> => {
  const response = await fetch('http://localhost:5001/api/trending/topics');
  if (!response.ok) {
    throw new Error('Failed to fetch topics');
  }
  return response.json();
};

const fetchTags = async (): Promise<Tag[]> => {
  const response = await fetch('http://localhost:5001/api/trending/tags');
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }
  return response.json();
};

export const useTrending = () => {
  const { 
    data: topics, 
    isLoading: isTopicsLoading 
  } = useQuery({
    queryKey: [TRENDING_QUERY_KEY, 'topics'],
    queryFn: fetchTopics,
    staleTime: 5 * 60 * 1000
  });

  const { 
    data: tags, 
    isLoading: isTagsLoading 
  } = useQuery({
    queryKey: [TRENDING_QUERY_KEY, 'tags'],
    queryFn: fetchTags,
    staleTime: 5 * 60 * 1000
  });

  return {
    topics,
    tags,
    isLoading: isTopicsLoading || isTagsLoading
  };
}; 