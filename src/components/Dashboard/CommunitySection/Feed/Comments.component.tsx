import { memo } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

type Comment = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
};

type CommentsProps = {
  postId: string;
  isOpen: boolean;
};

export const Comments = memo(({ postId, isOpen }: CommentsProps) => {

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5001/api/posts/${postId}/comments`);
      if (!response.ok) throw new Error('Nie udało się pobrać komentarzy');
      return response.json();
    },
    enabled: isOpen,
  });


  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 space-y-4"
    >
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-gray-600 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-600 rounded w-1/4" />
                <div className="h-4 bg-gray-600 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        comments?.map((comment: Comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            {comment.author.avatar ? (
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <FaUserCircle className="w-10 h-10 text-gray-400" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-300">
                  {comment.author.name}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-400 mt-1">{comment.content}</p>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
});

Comments.displayName = "Comments"; 