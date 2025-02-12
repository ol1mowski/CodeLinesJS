import { memo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

type InviteMemberModalProps = {
  onClose: () => void;
  onSubmit: (data: { username: string }) => void;
};

export const InviteMemberModal = memo(({ onClose, onSubmit }: InviteMemberModalProps) => {
  const { register, handleSubmit } = useForm<{ username: string }>();

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

        <h2 className="text-xl font-bold text-js mb-4">Zaproś użytkownika</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Nazwa użytkownika</label>
            <input
              {...register("username", { required: true })}
              className="w-full bg-dark/50 rounded-lg px-4 py-2 text-white border border-js/10 focus:outline-none focus:border-js"
              placeholder="Wpisz nazwę użytkownika"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-dark/50 text-gray-400 hover:text-white transition-colors"
            >
              Anuluj
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
            >
              Zaproś
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}); 