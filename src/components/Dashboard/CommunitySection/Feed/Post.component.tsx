import { motion } from "framer-motion";
import { memo, useState } from "react";
import { FaHeart, FaComment, FaShare, FaUserCircle } from "react-icons/fa";
import { Comments } from "./Comments.component";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";

type PostProps = {
  post: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar?: string;
    };
    content: string;
    createdAt: Date;
    likesCount: number;
    commentsCount: number;
    isLiked: boolean;
  };
};

export const Post = memo(({ post }: PostProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
    >
      <div className="flex items-start gap-4">
        {post.author.avatar ? (
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-600" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-gray-200">{post.author.name}</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: pl })}
            </span>
          </div>
          <p className="text-gray-300 mb-4">{post.content}</p>
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center gap-2 ${
                isLiked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"
              } transition-colors`}
            >
              <FaHeart className={isLiked ? "fill-current" : "stroke-current"} />
              <span>{likesCount}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <FaComment />
              <span>{post.commentsCount}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
            >
              <FaShare />
              <span>Udostępnij</span>
            </motion.button>
          </div>
        </div>
      </div>
      {showComments && <Comments postId={post.id} />}
    </motion.div>
  );
});

Post.displayName = "Post"; 