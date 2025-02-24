import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts.api";
import { useAuth } from "../../../../hooks/useAuth";

export const CreatePost = memo(() => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const createPostMutation = useMutation({
    mutationFn: () => createPost(content, token || ""),
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = () => {
    if (!content.trim()) return;
    createPostMutation.mutate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark/50 backdrop-blur-sm rounded-xl border border-js/10 p-6"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Co słychać w świecie kodu?"
        className="p-5 w-full bg-transparent border-none focus:ring-0 focus:outline-none focus:outline-yellow-500 focus:rounded-md text-gray-300 placeholder-gray-500 resize-none"
        rows={3}
      />
      <div className="flex justify-between items-center mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={createPostMutation.isPending || !content.trim()}
          className={`px-6 py-2 rounded-lg bg-js text-dark font-medium 
                     transition-all duration-200 disabled:opacity-50 
                     disabled:cursor-not-allowed`}
        >
          {createPostMutation.isPending ? "Publikowanie..." : "Opublikuj"}
        </motion.button>
      </div>
    </motion.div>
  );
});

CreatePost.displayName = "CreatePost"; 