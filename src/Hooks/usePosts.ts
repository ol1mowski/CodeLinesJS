import { useInfiniteQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Post } from '../types/post.types';

const POSTS_PER_PAGE = 5;
const POSTS_QUERY_KEY = 'posts';

const mockPosts: Post[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  author: {
    id: '1',
    name: 'Jan Kowalski',
    avatar: `https://i.pravatar.cc/150?img=${(i % 10) + 1}`
  },
  content: `Post numer ${i + 1} o programowaniu! 🚀`,
  createdAt: new Date(Date.now() - i * 3600000),
  likesCount: Math.floor(Math.random() * 100),
  commentsCount: Math.floor(Math.random() * 20),
  isLiked: false
}));

const fetchPosts = async (page: number) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const start = page * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const posts = mockPosts.slice(start, end);
  return {
    posts,
    nextPage: end < mockPosts.length ? page + 1 : undefined
  };
};

export const prefetchPosts = async (queryClient: QueryClient) => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: [POSTS_QUERY_KEY],
    queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
    initialPageParam: 0,
  });
};

export const usePosts = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: [POSTS_QUERY_KEY],
    queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return postId;
    },
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ 
        queryKey: [POSTS_QUERY_KEY]
      });
      
      queryClient.setQueryData([POSTS_QUERY_KEY], (oldData: any) => ({
        pages: oldData.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((post: Post) =>
            post.id === postId
              ? {
                  ...post,
                  isLiked: !post.isLiked,
                  likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1
                }
              : post
          )
        })),
        pageParams: oldData.pageParams
      }));
    }
  });

  const prefetchNextPage = useCallback(() => {
    if (hasNextPage) {
      const nextPage = data?.pages.length ?? 0;
      queryClient.prefetchInfiniteQuery({
        queryKey: [POSTS_QUERY_KEY],
        queryFn: ({ pageParam = nextPage }) => fetchPosts(pageParam),
        initialPageParam: nextPage,
      });
    }
  }, [queryClient, hasNextPage, data?.pages.length]);

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