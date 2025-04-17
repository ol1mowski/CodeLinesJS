import { motion } from 'framer-motion';
import { FaComments } from 'react-icons/fa';

export const ChatHeader = () => (
  <div className="flex items-center justify-between border-b border-js/20 pb-4">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-js/10">
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-js"
        >
          <FaComments className="w-6 h-6" />
        </motion.div>
      </div>
      <h2 className="text-2xl font-bold text-js">Czat Społeczności</h2>
    </div>
    <span className="text-sm text-gray-400">Online: 42</span>
  </div>
);
