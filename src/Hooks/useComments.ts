import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment } from '../types/post.types';

const mockComments: Record<string, Comment[]> = {
  '1': [
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
    },
    {
      id: '2',
      author: {
        id: '3',
        name: 'Jan Nowak',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      content: 'Bardzo ciekawe rozwiązanie!',
      createdAt: new Date('2024-03-10T13:15:00'),
      likesCount: 3,
      isLiked: false
    }
  ]
};

export const useComments = (postId: string) => {
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockComments[postId] || [];
    }
  });

  const addCommentMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newComment: Comment = {
        id: Date.now().toString(),
        author: {
          id: '1',
          name: 'Ty',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        content,
        createdAt: new Date(),
        likesCount: 0,
        isLiked: false
      };
      return newComment;
    },
    onSuccess: (newComment, { postId }) => {
      queryClient.setQueryData(['comments', postId], (oldComments: Comment[] = []) => [
        ...oldComments,
        newComment
      ]);
    }
  });

  const likeCommentMutation = useMutation({
    mutationFn: async ({ postId, commentId }: { postId: string; commentId: string }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { postId, commentId };
    },
    onSuccess: ({ postId, commentId }) => {
      queryClient.setQueryData(['comments', postId], (oldComments: Comment[] = []) => 
        oldComments.map(comment => 
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likesCount: comment.isLiked ? comment.likesCount - 1 : comment.likesCount + 1
              }
            : comment
        )
      );
    }
  });

  return {
    comments,
    isLoading,
    addComment: addCommentMutation.mutate,
    likeComment: likeCommentMutation.mutate
  };
}; 