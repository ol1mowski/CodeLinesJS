import { memo } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaExclamationTriangle, FaSignOutAlt } from "react-icons/fa";

type LeaveGroupModalProps = {
  groupName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const LeaveGroupModal = memo(({ groupName, onClose, onConfirm }: LeaveGroupModalProps) => {
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
          className="absolute top-4 right-4 text-gray-400 hover:text-yellow-500 transition-colors"
        >
          <FaTimes />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <FaExclamationTriangle className="text-yellow-500 text-3xl" />
          <div>
            <h2 className="text-xl font-bold text-yellow-500">Opuść grupę</h2>
            <p className="text-gray-400 text-sm mt-1">Zastanów się dwa razy</p>
          </div>
        </div>

        <div className="bg-yellow-500/10 rounded-lg p-4 mb-6">
          <p className="text-gray-300">
            Czy na pewno chcesz opuścić grupę <span className="text-white font-medium">"{groupName}"</span>?
          </p>
          <ul className="text-gray-400 text-sm mt-3 space-y-1">
            <li>• Stracisz dostęp do czatu grupy</li>
            <li>• Będziesz musiał zostać ponownie zaproszony, aby dołączyć</li>
            <li>• Twoje wiadomości pozostaną w historii czatu</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-dark/50 text-gray-400 hover:text-white transition-colors"
          >
            Zostań
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-yellow-500 text-dark font-medium hover:bg-yellow-600 
                     transition-colors flex items-center gap-2"
          >
            <FaSignOutAlt className="text-sm" />
            Opuść grupę
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
});

LeaveGroupModal.displayName = "LeaveGroupModal"; 