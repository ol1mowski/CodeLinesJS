import { memo } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

type ChangeRoleModalProps = {
  username: string;
  currentRole: string;
  onClose: () => void;
  onSubmit: (role: string) => void;
};

export const ChangeRoleModal = memo(({ username, currentRole, onClose, onSubmit }: ChangeRoleModalProps) => {
  const roles = ['member', 'moderator'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-dark/90 rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-js">Zmień rolę użytkownika</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-js">
            <FaTimes />
          </button>
        </div>

        <p className="text-gray-400 mb-4">
          Zmień rolę dla użytkownika <span className="text-white">{username}</span>
        </p>

        <div className="space-y-3 mb-6">
          {roles.map((role) => (
            <motion.button
              key={role}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSubmit(role)}
              className={`w-full p-3 rounded-lg flex items-center justify-between ${
                currentRole === role 
                  ? 'bg-js text-dark' 
                  : 'bg-dark/50 text-gray-400 hover:text-white'
              }`}
            >
              <span className="capitalize">{role}</span>
              {currentRole === role && <span>✓</span>}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}); 