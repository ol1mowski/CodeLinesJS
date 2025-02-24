import { memo } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaComment } from "react-icons/fa";

type PostActionsProps = {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
  onCommentClick: () => void;
  isLikeLoading: boolean;
};

export const PostActions = memo(({
  isLiked,
  likesCount,
  commentsCount,
  onLike,
  onCommentClick,
  isLikeLoading
}: PostActionsProps) => (
  <div className="flex items-center gap-6">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onLike}
      disabled={isLikeLoading}
      className={`flex items-center gap-2 focus:outline-none 
        ${isLiked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"}
        ${isLikeLoading ? "opacity-50 cursor-not-allowed" : ""}
        transition-colors`}
    >
      <FaHeart className={isLiked ? "fill-pink-500" : "stroke-current"} />
      <span>{Math.max(0, likesCount)}</span>
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onCommentClick}
      className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
    >
      <FaComment />
      <span>{Math.max(0, commentsCount)}</span>
    </motion.button>
  </div>
));

PostActions.displayName = "PostActions"; 