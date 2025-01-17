import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { useComments } from "../../../../Hooks/useComments";
import { Comment } from "../../../../types/post.types";

type CommentsProps = {
  postId: string;
};

export const Comments = memo(({ postId }: CommentsProps) => {
  const { comments, isLoading, addComment, likeComment } = useComments(postId);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = useCallback(() => {
    if (!newComment.trim()) return;
    
    addComment({ postId, content: newComment });
    setNewComment("");
  }, [postId, newComment, addComment]);

  if (isLoading) {
    return <CommentsListSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 space-y-4"
    >
      <CommentForm
        value={newComment}
        onChange={setNewComment}
        onSubmit={handleSubmit}
      />

      <CommentsList
        comments={comments || []}
        postId={postId}
        onLike={likeComment}
      />
    </motion.div>
  );
});

type CommentFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const CommentForm = memo(({ value, onChange, onSubmit }: CommentFormProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-start gap-3">
      <FaUserCircle className="w-8 h-8 text-gray-600" />
      <div className="flex-1">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Napisz komentarz..."
          className="w-full bg-gray-900/50 rounded-lg p-3 text-gray-200 placeholder-gray-500 border border-gray-700/50 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors resize-none h-20"
        />
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-colors"
        >
          Dodaj komentarz
        </motion.button>
      </div>
    </div>
  );
});

type CommentsListProps = {
  comments: Comment[];
  postId: string;
  onLike: (params: { postId: string; commentId: string }) => void;
};

const CommentsList = memo(({ comments, postId, onLike }: CommentsListProps) => (
  <div className="space-y-4">
    {comments.map((comment) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        postId={postId}
        onLike={onLike}
      />
    ))}
  </div>
));

type CommentItemProps = {
  comment: Comment;
  postId: string;
  onLike: (params: { postId: string; commentId: string }) => void;
};

const CommentItem = memo(({ comment, postId, onLike }: CommentItemProps) => {
  const handleLike = useCallback(() => {
    onLike({ postId, commentId: comment.id });
  }, [postId, comment.id, onLike]);

  return (
    <div className="flex items-start gap-3">
      {comment.author.avatar ? (
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <FaUserCircle className="w-8 h-8 text-gray-600" />
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-200">
            {comment.author.name}
          </span>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: pl })}
          </span>
        </div>
        <p className="text-gray-300 mt-1">{comment.content}</p>
        <motion.button
          onClick={handleLike}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-2 flex items-center gap-1 text-sm ${
            comment.isLiked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"
          } transition-colors`}
        >
          <FaHeart className={comment.isLiked ? "fill-current" : "stroke-current"} />
          <span>{comment.likesCount}</span>
        </motion.button>
      </div>
    </div>
  );
});

const CommentsListSkeleton = () => (
  <div className="mt-4 space-y-4 animate-pulse">
    {[1, 2].map((i) => (
      <div key={i} className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-700/50" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-gray-700/50 rounded" />
          <div className="h-4 w-3/4 bg-gray-700/50 rounded" />
        </div>
      </div>
    ))}
  </div>
);

Comments.displayName = "Comments";
CommentForm.displayName = "CommentForm";
CommentsList.displayName = "CommentsList";
CommentItem.displayName = "CommentItem"; 