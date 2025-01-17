import { memo, useCallback, useRef, useEffect } from "react";import { Post } from "./Post.component";
import { PostsListSkeleton } from "./PostsListSkeleton.component";
import { usePosts } from "../../../../Hooks/usePosts";
import { MemoizedVirtualList } from "../../../Common/VirtualList.component";

export const PostsList = memo(() => {
  const {
    posts,
    isLoading,
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

  return (
    <div className="space-y-6">
      <div className="h-[800px]">
        <MemoizedVirtualList
          items={posts}
          renderItem={(post) => (
            <Post key={post.id} post={post} onLike={handleLike} />
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