import { useState } from 'react';
import { motion } from 'framer-motion';

type NavigationItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  section: 'main' | 'game' | 'social';
};

export const DashboardNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.nav
      initial={false}
      animate={{ width: isExpanded ? '240px' : '72px' }}
      className="fixed left-0 top-0 h-screen bg-gray-800/50 backdrop-blur-lg border-r border-gray-700/50"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center"
      >
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-white text-sm"
        >
          →
        </motion.span>
      </button>
    </motion.nav>
  );
}; 