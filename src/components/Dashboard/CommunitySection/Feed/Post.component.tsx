import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { PostHeader } from "./components/Post/PostHeader.component";
import { PostContent } from "./components/Post/PostContent.component";
import { PostActions } from "./components/Post/PostActions.component";
import { Comments } from "./Comments.component";
import { useLikePost } from "./hooks/useLikePost.hook";
import { Post as PostType } from "../../../../types/post.types";

type PostProps = {
  post: PostType;
};

export const Post = memo(({ post }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const { handleLike, isLiking } = useLikePost(post);

  const toggleComments = useCallback(() => {
    setShowComments(prev => !prev);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg"
    >
      <PostHeader 
        author={post.author} 
        createdAt={post.createdAt} 
      />
      <PostContent content={post.content} />
      <PostActions
        isLiked={post.likes.isLiked}
        likesCount={post.likes.count}
        commentsCount={post.comments.length}
        onLike={handleLike}
        onCommentClick={toggleComments}
        isLikeLoading={isLiking}
      />
      <Comments 
        postId={post._id} 
        isOpen={showComments} 
      />
    </motion.div>
  );
});

Post.displayName = "Post";