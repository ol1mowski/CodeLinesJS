import { motion } from "framer-motion";
import { memo } from "react";
import { PostsListSkeleton } from "./PostsListSkeleton.component";
import { usePosts } from "../../../../hooks/usePosts";
import { Post } from "./Post.component";


export const PostsList = memo(() => {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <PostsListSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </motion.div>
  );
});

PostsList.displayName = "PostsList"; 