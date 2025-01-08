import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Post } from "./Post.component";
import { PostsListSkeleton } from "./PostsListSkeleton.component";
import { usePosts } from "../../../../hooks/usePosts";

export const PostsList = memo(() => {
  const { posts, isLoading, likePost } = usePosts();

  const handleLike = useCallback((postId: string) => {
    likePost(postId);
  }, [likePost]);

  if (isLoading) {
    return <PostsListSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {posts?.map((post) => (
        <Post key={post.id} post={post} onLike={handleLike} />
      ))}
    </motion.div>
  );
});

PostsList.displayName = "PostsList"; 