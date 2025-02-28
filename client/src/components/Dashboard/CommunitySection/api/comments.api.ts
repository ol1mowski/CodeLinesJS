import { API_URL } from '../../../../config/api.config';
import { Comment } from '../types/comments.types';
import toast from 'react-hot-toast';

const handleError = (error: any) => {
  if (!navigator.onLine) {
    toast.error('Brak połączenia z internetem');
  } else if (error.message) {
    toast.error(error.message);
  } else {
    toast.error('Wystąpił nieoczekiwany błąd');
  }
  throw error;
};

export const commentsApi = {
  fetchComments: async (postId: string, token: string): Promise<Comment[]> => {
    try {
      const response = await fetch(`${API_URL}posts/${postId}/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Nie udało się pobrać komentarzy');
      }

      return response.json();
    } catch (error) {
      handleError(error);
    }
  },

  addComment: async (postId: string, content: string, token: string): Promise<Comment> => {
    try {
      const response = await fetch(`${API_URL}posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        throw new Error('Nie udało się dodać komentarza');
      }

      return response.json();
    } catch (error) {
      handleError(error);
    }
  }
}; 