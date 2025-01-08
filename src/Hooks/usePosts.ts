import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '../types/post.types';

const PAGE_SIZE = 5;

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
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const posts = mockPosts.slice(start, end);
      return {
        posts,
        nextPage: end < mockPosts.length ? pageParam + 1 : undefined
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return postId;
    },
    onSuccess: (postId) => {
      queryClient.setQueryData(['posts'], (oldData: any) => ({
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

  const posts = data?.pages.flatMap(page => page.posts) ?? [];

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    likePost: likeMutation.mutate
  };
}; 