import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaHeart, FaComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { Comments } from "./Comments.component";
import { Post as PostType } from "../../../../types/post.types";
import { toggleLike } from "../api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type PostProps = {
  post: PostType;
};

export const Post = memo(({ post }: PostProps) => {
  
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);

  const likeMutation = useMutation({
    mutationFn: () => toggleLike(post._id, post.likes.isLiked),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => ({
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((p: PostType) => 
            p._id === post._id 
              ? {
                  ...p,
                  likes: {
                    isLiked: !p.likes.isLiked,
                    count: p.likes.isLiked ? p.likes.count - 1 : p.likes.count + 1
                  }
                }
              : p
          )
        }))
      }));

      return { previousPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
      toast.error("Nie udało się zaktualizować polubienia");
    }
  });

  const handleLike = useCallback(() => {
    if (likeMutation.isPending) return;
    likeMutation.mutate();
  }, [likeMutation]);

  const toggleComments = useCallback(() => {
    setShowComments(prev => !prev);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-js/20 flex items-center justify-center">
          <FaUserCircle className="w-6 h-6 text-js" />
        </div>
        <div>
          <h3 className="font-medium text-js">{post.author.username}</h3>
          <span className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: pl })}
          </span>
        </div>
      </div>
      <PostContent content={post.content} />
      <PostActions
        isLiked={post.likes.isLiked}
        likesCount={post.likes.count}
        commentsCount={post.comments.length}
        onLike={handleLike}
        onCommentClick={toggleComments}
        isLikeLoading={likeMutation.isPending}
      />
      <Comments postId={post._id} isOpen={showComments} />
    </motion.div>
  );
});

const PostContent = memo(({ content }: { content: string }) => (
  <p className="text-gray-300 mb-4">{content}</p>
));

type PostActionsProps = {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
  onCommentClick: () => void;
  isLikeLoading: boolean;
};

const PostActions = memo(({
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
      <FaHeart className={isLiked ? "fill-current" : "stroke-current"} />
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

PostContent.displayName = "PostContent";
PostActions.displayName = "PostActions";
Post.displayName = "Post";