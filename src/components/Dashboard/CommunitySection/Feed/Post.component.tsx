import React, { memo, useState, useCallback } from "react";
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
      className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg relative"
    >
      <PostHeader 
        author={post.author} 
        createdAt={post.createdAt} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {isEditing ? (
        <div className="mt-4">
          <textarea 
            value={editedContent} 
            className="w-full p-2 rounded-md border border-js/10 focus:outline-none focus:ring-2 focus:ring-js/50"
            onChange={(e) => setEditedContent(e.target.value)} 
          />
          <div className="flex gap-2 mt-2">
            <button className="bg-js text-dark px-4 py-2 rounded-md" onClick={handleUpdate}>Zapisz</button>
            <button className="border border-js text-js px-4 py-2 rounded-md" onClick={() => setIsEditing(false)}>Anuluj</button>
          </div>
        </div>
      ) : (
        <>
          <PostContent content={post.content} />
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
      <Comments 
        postId={post._id} 
        isOpen={showComments} 
      />
    </motion.div>
  );
});

Post.displayName = "Post";