import { motion } from "framer-motion";
import { memo, useState } from "react";
import { FaCode, FaImage, FaLink } from "react-icons/fa";

export const CreatePost = memo(() => {
  const [content, setContent] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Co nowego w kodzie?"
        className="w-full bg-gray-900/50 rounded-lg p-4 text-gray-200 placeholder-gray-500 border border-gray-700/50 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors resize-none h-32"
      />
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
          >
            <FaCode className="text-xl" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
          >
            <FaImage className="text-xl" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
          >
            <FaLink className="text-xl" />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-colors"
        >
          Opublikuj
        </motion.button>
      </div>
    </motion.div>
  );
});

CreatePost.displayName = "CreatePost"; 