import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaHeart, FaComment, FaShare } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { Comments } from "./Comments.component";
import { Post as PostType } from "../../../../types/post.types";


type PostProps = {
  post: PostType;
  onLike: (postId: string) => void;
};

export const Post = memo(({ post, onLike }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const handleLike = useCallback(() => {
    setIsLiked(prev => !prev);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike(post.id);
  }, [isLiked, post.id, onLike]);

  const toggleComments = useCallback(() => {
    setShowComments(prev => !prev);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
    >
      <PostHeader post={post} />
      <PostContent content={post.content} />
      <PostActions
        isLiked={isLiked}
        likesCount={likesCount}
        commentsCount={post.commentsCount}
        onLike={handleLike}
        onCommentClick={toggleComments}
      />
      {showComments && <Comments postId={post.id} />}
    </motion.div>
  );
});

const PostHeader = memo(({ post }: { post: PostType }) => (
  <div className="flex items-start gap-4 mb-4">
    {post.author.avatar ? (
      <img
        src={post.author.avatar}
        alt={post.author.name}
        className="w-10 h-10 rounded-full relative"
      />
    ) : (
      <FaUserCircle className="w-10 h-10 text-gray-600" />
    )}
    <div>
      <span className="font-medium text-gray-200">{post.author.name}</span>
      <span className="text-sm text-gray-500 ml-2">
        {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: pl })}
      </span>
    </div>
  </div>
));

const PostContent = memo(({ content }: { content: string }) => (
  <p className="text-gray-300 mb-4">{content}</p>
));

type PostActionsProps = {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
  onCommentClick: () => void;
};

const PostActions = memo(({ 
  isLiked, 
  likesCount, 
  commentsCount, 
  onLike, 
  onCommentClick 
}: PostActionsProps) => (
  <div className="flex items-center gap-6">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onLike}
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
      onClick={onCommentClick}
      className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors"
    >
      <FaComment />
      <span>{commentsCount}</span>
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
));

PostHeader.displayName = "PostHeader";
PostContent.displayName = "PostContent";
PostActions.displayName = "PostActions";
Post.displayName = "Post"; 