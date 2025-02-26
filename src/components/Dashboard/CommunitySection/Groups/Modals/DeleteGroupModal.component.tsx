import { memo } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaExclamationTriangle, FaTrash } from "react-icons/fa";

type DeleteGroupModalProps = {
  groupName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteGroupModal = memo(({ groupName, onClose, onConfirm }: DeleteGroupModalProps) => {
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
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTimes />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <FaExclamationTriangle className="text-red-500 text-3xl" />
          <div>
            <h2 className="text-xl font-bold text-red-500">Usuń grupę</h2>
            <p className="text-gray-400 text-sm mt-1">Ta akcja jest nieodwracalna</p>
          </div>
        </div>

        <div className="bg-red-500/10 rounded-lg p-4 mb-6">
          <p className="text-gray-300">
            Czy na pewno chcesz usunąć grupę <span className="text-white font-medium">"{groupName}"</span>?
          </p>
          <ul className="text-gray-400 text-sm mt-3 space-y-1">
            <li>• Wszyscy członkowie zostaną usunięci</li>
            <li>• Cała historia czatu zostanie usunięta</li>
            <li>• Wszystkie ustawienia grupy zostaną utracone</li>
            <li>• Tej akcji nie można cofnąć</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-dark/50 text-gray-400 hover:text-white transition-colors"
          >
            Anuluj
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 
                     transition-colors flex items-center gap-2"
          >
            <FaTrash className="text-sm" />
            Usuń grupę
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
});

DeleteGroupModal.displayName = "DeleteGroupModal"; 