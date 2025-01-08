import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '../types/post.types';

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Jan Kowalski',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    content: 'Właśnie skończyłem nowy projekt w React! 🚀',
    createdAt: new Date('2024-03-10T12:00:00'),
    likesCount: 15,
    commentsCount: 3,
    isLiked: false
  },
];

export const usePosts = () => {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockPosts;
    }
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      // Symulacja API
      await new Promise(resolve => setTimeout(resolve, 500));
      return postId;
    },
    onSuccess: (postId) => {
      queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
        if (!oldPosts) return [];
        return oldPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                isLiked: !post.isLiked,
                likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1
              }
            : post
        );
      });
    }
  });

  return {
    posts,
    isLoading,
    likePost: likeMutation.mutate
  };
}; 