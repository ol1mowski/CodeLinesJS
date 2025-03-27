import { memo } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

type DeleteMemberModalProps = {
  username: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteMemberModal = memo(({ username, onClose, onConfirm }: DeleteMemberModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-dark/90 rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-js"
        >
          <FaTimes />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="text-red-500 text-2xl" />
          <h2 className="text-xl font-bold text-red-500">Usuń członka grupy</h2>
        </div>

        <p className="text-gray-300 mb-6">
          Czy na pewno chcesz usunąć użytkownika <span className="text-white font-medium">{username}</span> z grupy?
          Tej akcji nie można cofnąć.
        </p>

        <div className="flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-dark/50 text-gray-400 hover:text-white transition-colors"
          >
            Anuluj
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
          >
            Usuń
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
});

DeleteMemberModal.displayName = "DeleteMemberModal"; 