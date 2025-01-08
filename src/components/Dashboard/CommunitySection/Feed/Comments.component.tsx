import { motion } from "framer-motion";
import { memo, useState } from "react";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { useComments } from "../../../../hooks/useComments";
import { Comment } from "../../../../types/post.types";

type CommentsProps = {
  postId: string;
};

export const Comments = memo(({ postId }: CommentsProps) => {
  const { comments, isLoading } = useComments(postId);
  const [newComment, setNewComment] = useState("");

  if (isLoading) {
    return <div className="mt-4 space-y-4 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700/50" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-gray-700/50 rounded" />
            <div className="h-4 w-3/4 bg-gray-700/50 rounded" />
          </div>
        </div>
      ))}
    </div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 space-y-4"
    >
      <div className="flex items-start gap-3">
        <FaUserCircle className="w-8 h-8 text-gray-600" />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Napisz komentarz..."
            className="w-full bg-gray-900/50 rounded-lg p-3 text-gray-200 placeholder-gray-500 border border-gray-700/50 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors resize-none h-20"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-colors"
          >
            Dodaj komentarz
          </motion.button>
        </div>
      </div>

      {comments?.map((comment: Comment) => (
        <div key={comment.id} className="flex items-start gap-3">
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
            <button className="mt-2 flex items-center gap-1 text-sm text-gray-400 hover:text-pink-500 transition-colors">
              <FaHeart />
              <span>{comment.likesCount}</span>
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
});

Comments.displayName = "Comments"; 