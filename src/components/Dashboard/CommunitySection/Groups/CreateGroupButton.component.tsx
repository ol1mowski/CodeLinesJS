import { memo } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

export const CreateGroupButton = memo(() => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 bg-js text-dark font-medium rounded-lg hover:bg-js/90 transition-colors flex items-center gap-2"
    >
      <FaPlus className="text-sm" />
      Utwórz grupę
    </motion.button>
  );
});

CreateGroupButton.displayName = "CreateGroupButton"; 