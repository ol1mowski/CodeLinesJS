import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaFileAlt } from 'react-icons/fa';

interface CVHeaderProps {
  title: string;
  description: string;
  onBack: () => void;
  showBackButton?: boolean;
}

export const CVHeader: React.FC<CVHeaderProps> = memo(({
  title,
  description,
  onBack,
  showBackButton = true
}) => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-6">
        {showBackButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-js transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm">Powrót</span>
          </motion.button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-js/10 border border-js/20">
            <FaFileAlt className="w-12 h-12 text-js" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </header>
  );
});

CVHeader.displayName = 'CVHeader'; 