import { API_URL } from '../../../../config/api.config';
import { Post } from '../types/post.types';
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

export const createPost = async (content: string, token: string): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Nie udało się utworzyć posta');
    }

    return response.json();
  } catch (error) {
    handleError(error);
  }
};

export const fetchPosts = async (page: number = 1, token: string): Promise<{
  posts: Post[];
  hasNextPage: boolean;
  nextPage: number;
}> => {
  try {
    const response = await fetch(`${API_URL}posts?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Nie udało się pobrać postów');
    }

    return response.json();
  } catch (error) {
    handleError(error);
  }
};

export const likePost = async (postId: string, token: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_URL}posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Nie udało się polubić posta');
    }

    return response.json();
  } catch (error) {
    handleError(error);
  }
};

export const addComment = async (postId: string, content: string, token: string) => {
  const response = await fetch(`${API_URL}posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Nie udało się dodać komentarza");
  }

  return response.json();
};

type LikeResponse = {
  isLiked: boolean;
  likesCount: number;
};

export const toggleLike = async (postId: string, isLiked: boolean, token: string): Promise<LikeResponse> => {

    const response = await fetch(`${API_URL}posts/${postId}/like`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ isLiked: !isLiked })
  });
  

  if (!response.ok) {
    throw new Error("Nie udało się zaktualizować polubienia");
  }

  const data = await response.json();
  
  return {
    isLiked: Boolean(data.isLiked),
    likesCount: Number(data.likes.count)
  };
};
