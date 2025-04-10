import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../api/posts.api';
import { useAuth } from '../../../../../hooks/useAuth';
import toast from 'react-hot-toast';

const MAX_CHARS = 500;
const MIN_CHARS = 10;

const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, 'nodata:');
};

export const useCreatePost = () => {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const charCount = content.length;
  const isCharLimitExceeded = charCount > MAX_CHARS;
  const isTooShort = charCount < MIN_CHARS;

  const createPostMutation = useMutation({
    mutationFn: (content: string) => createPost(content, token || ''),
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

  const handleSubmit = useCallback(async () => {
    if (!token) {
      toast.error("Musisz być zalogowany, aby dodać post");
      return;
    }
    
    if (content.trim().length < 3) {
      toast.error("Post musi zawierać przynajmniej 3 znaki");
      return;
    }
    
    if (isCharLimitExceeded) {
      toast.error(`Post nie może przekraczać ${MAX_CHARS} znaków`);
      return;
    }
    
    try {
      const sanitizedContent = sanitizeHtml(content);
      
      await createPostMutation.mutateAsync(sanitizedContent);
      
      setContent("");
      
      toast.success("Post został dodany");
    } catch (error) {
      toast.error("Nie udało się dodać posta");
    }
  }, [content, createPostMutation, isCharLimitExceeded, token]);

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