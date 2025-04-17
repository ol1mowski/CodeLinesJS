import { motion } from 'framer-motion';
import { memo } from 'react';
import { FaGamepad } from 'react-icons/fa';

export const GamesHeader = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 15 }}
          className="p-3 rounded-xl bg-gradient-to-br from-js/20 to-js/20"
        >
          <FaGamepad className="w-8 h-8 text-js" />
        </motion.div>
        <div>
          <h1 className="text-3xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-js to-js">
            Gry JavaScript
          </h1>
          <p className="text-gray-400 mt-1">Ucz się JavaScriptu poprzez zabawę i wyzwania</p>
        </div>
      </div>
    </motion.div>
  );
});

GamesHeader.displayName = 'GamesHeader';
