import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts, deletePost as apiDeletePost, updatePost as apiUpdatePost } from '../../api/posts.api';
import { useAuth } from '../../../../../Hooks/useAuth';
import { Post as PostType } from '../../types/post.types';
export const usePosts = () => {
  const { token } = useAuth()

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, token || ''),
    getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1
  });

  const posts = data?.pages.flatMap(page => page.posts) ?? [];

  const deletePost = async (id: string): Promise<void> => {
    try {
      await apiDeletePost(id, token || '');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const updatePost = async (id: string, updatedData: Partial<PostType>): Promise<void> => {
    try {
      await apiUpdatePost(id, updatedData, token || '');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    deletePost, 
    updatePost, 
  };
}; 