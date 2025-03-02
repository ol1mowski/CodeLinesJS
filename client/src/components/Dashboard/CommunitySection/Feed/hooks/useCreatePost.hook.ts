import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../api/posts.api';
import { useAuth } from '../../../../../Hooks/useAuth';
import toast from 'react-hot-toast';

const MAX_CHARS = 500;
const MIN_CHARS = 10;

export const useCreatePost = () => {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const charCount = content.length;
  const isCharLimitExceeded = charCount > MAX_CHARS;
  const isTooShort = charCount < MIN_CHARS;

  const createPostMutation = useMutation({
    mutationFn: () => createPost(content, token || ''),
    onSuccess: () => {
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post został opublikowany!');
    },
    onError: () => {
      toast.error('Nie udało się opublikować posta');
    }
  });

  const handleContentChange = useCallback((value: string) => {
    if (value.length <= MAX_CHARS) {
      setContent(value);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (isCharLimitExceeded) {
      toast.error(`Post nie może przekraczać ${MAX_CHARS} znaków`);
      return;
    }

    if (isTooShort) {
      toast.error(`Post musi zawierać minimum ${MIN_CHARS} znaków`);
      return;
    }

    if (!content.trim()) {
      toast.error('Post nie może być pusty');
      return;
    }

    createPostMutation.mutate();
  }, [content, isCharLimitExceeded, isTooShort, createPostMutation]);

  return {
    content,
    charCount,
    isCharLimitExceeded,
    isTooShort,
    isSubmitting: createPostMutation.isPending,
    handleContentChange,
    handleSubmit,
    maxChars: MAX_CHARS
  };
}; 