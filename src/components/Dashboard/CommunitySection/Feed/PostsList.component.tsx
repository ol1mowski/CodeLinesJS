import { memo, useCallback, useRef, useEffect } from "react";
import { PostsListSkeleton } from "./PostsListSkeleton.component";
import { usePosts } from "../../../../Hooks/usePosts";
import { MemoizedVirtualList } from "../../../Common/VirtualList.component";
import { Post as PostType } from '../../../../types/post.types';
import { Post as PostComponent } from "./Post.component";
import { FaRegCommentDots } from "react-icons/fa";

interface PostsListProps {
  posts: PostType[];
  isLoading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onLike: (postId: string) => void;
}

export const PostsList = memo(({ posts, isLoading }: PostsListProps) => {
  const {
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    likePost
  } = usePosts();

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleLike = useCallback((postId: string) => {
    likePost(postId);
  }, [likePost]);

  if (isLoading) {
    return <PostsListSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-dark/30 rounded-xl border border-js/10">
        <FaRegCommentDots className="w-16 h-16 text-gray-500 mb-4" />
        <h3 className="text-xl font-medium text-gray-300 mb-2">
          Brak postów
        </h3>
        <p className="text-gray-400">
          Bądź pierwszą osobą, która coś opublikuje!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="h-[800px]">
        <MemoizedVirtualList
          items={posts}
          renderItem={(post) => (
            <PostComponent key={post.id} post={post} onLike={handleLike} />
          )}
          itemHeight={200}
          className="h-full"
        />
      </div>
      
      {isFetchingNextPage && (
        <div className="py-4">
          <PostsListSkeleton count={2} />
        </div>
      )}
      
      <div ref={observerTarget} className="h-4" />
    </div>
  );
});

PostsList.displayName = "PostsList"; 