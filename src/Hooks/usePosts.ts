import { useQuery } from '@tanstack/react-query';
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
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      // !!! delete in future
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockPosts;
    }
  });
}; 