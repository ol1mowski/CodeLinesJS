import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Post } from '../types/post.types';

const POSTS_PER_PAGE = 5;
const POSTS_QUERY_KEY = 'posts';
const API_URL = 'http://localhost:5001/api';

export const usePosts = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [POSTS_QUERY_KEY],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `${API_URL}/posts?page=${pageParam}&limit=${POSTS_PER_PAGE}`
      );
      if (!response.ok) {
        throw new Error('Nie udało się pobrać postów');
      }
      return response.json();
    },
    getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  const prefetchNextPage = useCallback(async () => {
    if (hasNextPage) {
      await queryClient.prefetchInfiniteQuery({
        queryKey: [POSTS_QUERY_KEY],
        queryFn: async ({ pageParam = 1 }) => {
          const response = await fetch(
            `${API_URL}/posts?page=${pageParam}&limit=${POSTS_PER_PAGE}`
          );
          if (!response.ok) {
            throw new Error('Nie udało się pobrać postów');
          }
          return response.json();
        },
        initialPageParam: 1,
      });
    }
  }, [hasNextPage, queryClient]);

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`${API_URL}/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Nie udało się polubić posta');
      }
      return response.json();
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: [POSTS_QUERY_KEY] });
      const previousPosts = queryClient.getQueryData([POSTS_QUERY_KEY]);

      queryClient.setQueryData([POSTS_QUERY_KEY], (oldData: any) => ({
        pages: oldData.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((post: Post) =>
            post.id === postId
              ? { ...post, likes: [...post.likes, 'optimistic-like'] }
              : post
          ),
        })),
        pageParams: oldData.pageParams,
      }));

      return { previousPosts };
    },
    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData([POSTS_QUERY_KEY], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
    },
  });

  return {
    posts: data?.pages.flatMap(page => page.posts) ?? [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    prefetchNextPage,
    likePost: likeMutation.mutate
  };
}; 