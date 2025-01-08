import { useQuery } from '@tanstack/react-query';
import { Comment } from '../types/post.types';

const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      id: '2',
      name: 'Anna Kowalska',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    content: 'Świetny projekt! Jakich technologii użyłeś?',
    createdAt: new Date('2024-03-10T12:30:00'),
    likesCount: 5,
    isLiked: false
  }
];

export const useComments = (postId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockComments;
    }
  });

  return {
    comments: data,
    isLoading
  };
}; 