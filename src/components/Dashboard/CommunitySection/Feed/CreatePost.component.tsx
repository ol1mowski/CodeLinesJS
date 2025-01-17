import { motion } from "framer-motion";
import { memo, useState } from "react";
import { FaCode, FaImage, FaLink } from "react-icons/fa";

export const CreatePost = memo(() => {
  const [content, setContent] = useState("");

  return (
    <motion.div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Co słychać?"
        className="w-full bg-dark/50 rounded-lg border border-js/10 p-4 text-gray-300 placeholder-gray-500 focus:border-js focus:ring-1 focus:ring-js"
      />
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4">
          <button className="text-js hover:text-js/80 transition-colors focus:outline-none">
            <FaCode className="w-5 h-5" />
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-400 hover:text-js transition-colors focus:outline-none"
          >
            <FaImage className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-400 hover:text-js transition-colors focus:outline-none"
          >
            <FaLink className="text-xl" />
          </motion.button>
        </div>
        <motion.button
          className="p-2 rounded-lg text-gray-400 hover:text-js transition-colors focus:outline-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Opublikuj
        </motion.button>
      </div>
    </motion.div>
  );
});

CreatePost.displayName = "CreatePost"; 