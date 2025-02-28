import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaRegCommentDots } from 'react-icons/fa';

export const EmptyState = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-8 text-center 
               bg-dark/30 rounded-xl border border-js/10"
  >
    <FaRegCommentDots className="w-16 h-16 text-gray-500 mb-4" />
    <h3 className="text-xl font-medium text-gray-300 mb-2">
      Brak postów
    </h3>
    <p className="text-gray-400">
      Bądź pierwszą osobą, która coś opublikuje!
    </p>
  </motion.div>
));

EmptyState.displayName = 'EmptyState'; 