import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, likePost } from '../api/posts';

const POSTS_PER_PAGE = 5;
const POSTS_QUERY_KEY = 'posts';

export const usePosts = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1
  });

  const likePostMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const posts = data?.pages.flatMap(page => page.posts) ?? [];

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    likePost: likePostMutation.mutate
  };
}; 