import { memo } from 'react';
import { Post } from './Post.component';
import { PostsListSkeleton } from './PostsListSkeleton.component';
import { useInfiniteScroll } from './hooks/useInfiniteScroll.hook';
import { Post as PostType } from '../../../../types/post.types';
import { EmptyState } from './components/Posts/EmptyState.component';

type PostsListProps = {
  posts: PostType[];
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onLike: (postId: string) => void;
};

export const PostsList = memo(({
  posts,
  isLoading,
  isFetchingMore,
  hasMore,
  onLoadMore,
  onLike
}: PostsListProps) => {
  const observerTarget = useInfiniteScroll(onLoadMore, hasMore, isFetchingMore);

  if (isLoading) {
    return <PostsListSkeleton />;
  }

  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <Post 
            key={post._id} 
            post={post} 
            onLike={() => onLike(post._id)} 
          />
        ))}
      </div>
      
      {isFetchingMore && (
        <div className="py-4">
          <PostsListSkeleton count={2} />
        </div>
      )}
      
      <div ref={observerTarget} className="h-4" />
    </div>
  );
});

PostsList.displayName = 'PostsList'; 