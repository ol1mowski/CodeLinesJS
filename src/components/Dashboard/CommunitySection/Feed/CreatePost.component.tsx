import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const token = sessionStorage.getItem('token') || localStorage.getItem('token');

export const CreatePost = memo(() => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const user = localStorage.getItem('user') || sessionStorage.getItem('user');

  const userId = user ? JSON.parse(user).id : null;

  const createPostMutation = useMutation({
    mutationFn: async (content: string) => {

      const response = await fetch('http://localhost:5001/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content, userId }),

      });
      
      if (!response.ok) {
        throw new Error('Nie udało się utworzyć posta');
      }
      return response.json();
    },
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = async () => {
    if (!content.trim()) return;
    createPostMutation.mutate(content);
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
        className="w-full bg-transparent border-none focus:ring-0 text-gray-300 placeholder-gray-500 resize-none"
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