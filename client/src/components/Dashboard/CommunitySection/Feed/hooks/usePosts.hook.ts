import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../../../hooks/useAuth';
import { API_URL } from '../../../../../config/api.config';

export interface PostAuthor {
  _id: string;
  username: string;
  avatar?: string;
}

export interface PostLikes {
  count: number;
  isLiked: boolean;
}

export interface Post {
  _id: string;
  author: PostAuthor;
  content: string;
  createdAt: string;
  likes: PostLikes;
  commentsCount: number;
  isLiked: boolean;
}

export interface PostsResponse {
  posts: Post[];
  page: number;
  totalPages: number;
  hasMore: boolean;
}

const POSTS_QUERY_KEY = 'posts';
const PAGE_SIZE = 10;

const fetchPosts = async (token: string | null, page: number = 1): Promise<PostsResponse> => {
  if (!token) {
    throw new Error('Brak autoryzacji - zaloguj się, aby zobaczyć posty');
  }

  try {
    const response = await fetch(`${API_URL}posts?page=${page}&limit=${PAGE_SIZE}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      throw new Error('Brak autoryzacji - zaloguj się ponownie');
    }

    if (response.status === 429) {
      throw new Error('Zbyt wiele zapytań. Spróbuj ponownie za chwilę');
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Błąd podczas pobierania postów';
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // Zachowujemy domyślny komunikat błędu
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Błąd pobierania postów:', error);
    throw error instanceof Error ? error : new Error('Nieznany błąd podczas pobierania postów');
  }
};

export const usePosts = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: [POSTS_QUERY_KEY],
    queryFn: ({ pageParam = 1 }) => fetchPosts(token, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    enabled: !!token,
    staleTime: 2 * 60 * 1000, // 2 minuty
    retry: (failureCount, error) => {
      return failureCount < 3 && !error.message.includes('autoryzacji');
    }
  });

  // Spłaszczamy dane z wszystkich stron
  const posts = data?.pages.flatMap(page => page.posts) || [];

  return {
    posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error
  };
}; 