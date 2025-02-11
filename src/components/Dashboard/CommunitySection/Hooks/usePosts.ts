import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/posts?page=${pageParam}&limit=${POSTS_PER_PAGE}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error('Nie udało się pobrać postów');
      }
      return response.json();
    },
    getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Nie udało się polubić posta');
      return response.json();
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: [POSTS_QUERY_KEY] });
      const previousData = queryClient.getQueryData([POSTS_QUERY_KEY]);
      
      queryClient.setQueryData([POSTS_QUERY_KEY], (old: any) => ({
        pages: old.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((post: Post) => 
            post._id === postId 
              ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
              : post
          )
        }))
      }));

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([POSTS_QUERY_KEY], context?.previousData);
    }
  });

  return {
    posts: data?.pages.flatMap(page => page.posts) ?? [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    likePost: likeMutation.mutate
  };
}; 