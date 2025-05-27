import { motion } from 'framer-motion';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasNewMessages: boolean;
}

export const ChatButton = ({ isOpen, onClick, hasNewMessages }: ChatButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-16 h-16 rounded-full shadow-lg transition-all duration-300 bg-[#f7df1e] hover:bg-yellow-400 flex items-center justify-center group font-space"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl text-black"
      >
        {isOpen ? '✕' : '💬'}
      </motion.div>

      {hasNewMessages && !isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
        >
          <span className="text-white text-xs font-bold font-space">1</span>
        </motion.div>
      )}

      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-[#f7df1e] opacity-30 animate-ping" />
      )}

      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-space">
        {isOpen ? 'Zamknij chat' : 'Potrzebujesz pomocy?'}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </div>
    </motion.button>
  );
}; 