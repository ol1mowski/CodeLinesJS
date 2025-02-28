import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { commentsApi } from '../../api/comments.api';
import { useAuth } from '../../../../../hooks/useAuth';
import { CommentFormData } from '../../types/comments.types';
import toast from 'react-hot-toast';

export const useComments = (postId: string, isOpen: boolean) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>();

  const {
    data: comments,
    isLoading,
    error
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentsApi.fetchComments(postId, token || ''),
    enabled: isOpen,
    retry: 1
  });

  const addCommentMutation = useMutation({
    mutationFn: (data: CommentFormData) => 
      commentsApi.addComment(postId, data.content, token || ''),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const handleAddComment = handleSubmit((data) => {
    toast.promise(
      addCommentMutation.mutateAsync(data),
      {
        loading: 'Wysyłanie komentarza...',
        success: 'Komentarz został dodany!',
        error: 'Nie udało się dodać komentarza'
      }
    );
  });

  return {
    comments,
    isLoading,
    error,
    register,
    errors,
    handleAddComment,
    isSubmitting: addCommentMutation.isPending
  };
}; 