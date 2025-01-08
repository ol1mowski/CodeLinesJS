import { memo } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

export const CreateGroupButton = memo(() => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-colors flex items-center gap-2"
    >
      <FaPlus className="text-sm" />
      Utwórz grupę
    </motion.button>
  );
});

CreateGroupButton.displayName = "CreateGroupButton"; 