import { memo } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/posts";
import toast from "react-hot-toast";

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
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ content: string }>();

  const commentMutation = useMutation({
    mutationFn: ({ content }: { content: string }) => addComment(postId, content),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Komentarz został dodany");
    },
    onError: (error) => {
      console.error("Błąd podczas dodawania komentarza:", error);
      toast.error("Nie udało się dodać komentarza. Spróbuj ponownie później.");
    }
  });

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/posts/${postId}/comments`);
        if (!response.ok) {
          throw new Error("Nie udało się pobrać komentarzy");
        }
        return response.json();
      } catch (error) {
        toast.error("Nie udało się załadować komentarzy. Spróbuj odświeżyć stronę.");
        throw error;
      }
    },
    enabled: isOpen,
    retry: 1,
    onError: (error) => {
      console.error("Błąd podczas pobierania komentarzy:", error);
    }
  });

  const onSubmit = handleSubmit((data) => {
    toast.promise(
      commentMutation.mutateAsync(data),
      {
        loading: 'Wysyłanie komentarza...',
        success: 'Komentarz został dodany!',
        error: 'Nie udało się dodać komentarza'
      }
    );
  });


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 space-y-4"
        >
          <form onSubmit={onSubmit} className="flex gap-2">
            <div className="flex-1">
              <input
                {...register("content", {
                  required: "Treść komentarza jest wymagana",
                  minLength: {
                    value: 3,
                    message: "Komentarz musi mieć minimum 3 znaki"
                  }
                })}
                placeholder="Napisz komentarz..."
                className={`w-full bg-dark/20 rounded-lg px-4 py-2 text-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-js/50 
                         placeholder-gray-500 ${errors.content ? 'ring-2 ring-red-500' : ''}`}
                disabled={commentMutation.isPending}
              />
              {errors.content && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.content.message}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={commentMutation.isPending}
              className="px-4 py-2 bg-js/20 hover:bg-js/30 text-js rounded-lg 
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       min-w-[100px]"
            >
              {commentMutation.isPending ? "Wysyłanie..." : "Wyślij"}
            </motion.button>
          </form>

          {error ? (
            <div className="text-center py-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400"
              >
                Wystąpił błąd podczas ładowania komentarzy
                <button
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["comments", postId] })}
                  className="text-js ml-2 hover:underline"
                >
                  Spróbuj ponownie
                </button>
              </motion.div>
            </div>
          ) : isLoading ? (
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
            <div key={Math.random()} className="space-y-4 max-h-[400px] overflow-y-auto">
              {comments?.map((comment: Comment) => (
                <motion.div
                  key={comment._id}
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
              ))}

            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Comments.displayName = "Comments";
