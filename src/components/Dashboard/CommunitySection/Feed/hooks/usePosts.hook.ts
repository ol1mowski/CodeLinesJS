import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../api/posts.api';
import { useAuth } from '../../../../../hooks/useAuth';

export const usePosts = () => {
  const { token } = useAuth()

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, token || ''),
    getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1
  });

  const posts = data?.pages.flatMap(page => page.posts) ?? [];

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}; 