import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { PostHeader } from "./components/Post/PostHeader.component";
import { PostContent } from "./components/Post/PostContent.component";
import { PostActions } from "./components/Post/PostActions.component";
import { Comments } from "./Comments.component";
import { useLikePost } from "./hooks/useLikePost.hook";
import { usePosts } from "./hooks/usePosts.hook";
import { Post as PostType } from "../types/post.types";

type PostProps = {
  post: PostType;
};

export const Post = memo(({ post }: PostProps) => {
  const { deletePost, updatePost } = usePosts();
  const [showComments, setShowComments] = useState(false);
  const { handleLike, isLiking } = useLikePost(post);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const toggleComments = useCallback(() => {
    setShowComments(prev => !prev);
  }, []);

  const handleDelete = () => {
    deletePost(post._id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    await updatePost(post._id, { content: editedContent });
    setIsEditing(false);
  };

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
      {isEditing ? (
        <div>
          <textarea 
            value={editedContent} 
            onChange={(e) => setEditedContent(e.target.value)} 
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <PostContent content={post.content} />
          <button onClick={handleEdit} className="edit-button">✏️</button>
        </>
      )}
      <PostActions
        isLiked={post.isLiked}
        likesCount={post.likes.count}
        commentsCount={post.comments.length}
        onLike={handleLike}
        onCommentClick={toggleComments}
        isLikeLoading={isLiking}
      />
      <button onClick={handleDelete} className="delete-button">🗑️</button>
      <Comments 
        postId={post._id} 
        isOpen={showComments} 
      />
    </motion.div>
  );
});

Post.displayName = "Post";