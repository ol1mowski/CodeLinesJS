import { memo, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Post } from "./Post.component";
import { PostsListSkeleton } from "./PostsListSkeleton.component";
import { usePosts } from "../../../../hooks/usePosts";

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
      {posts.map((post) => (
        <Post key={post.id} post={post} onLike={handleLike} />
      ))}
      
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