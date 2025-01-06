import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartBar, 
  FaGamepad, 
  FaTrophy, 
  FaUsers, 
  FaCog, 
  FaBook,
  FaSignOutAlt 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

type NavigationItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  section: 'main' | 'game' | 'social';
  path?: string;
};

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <FaChartBar />, section: 'main', path: '/dashboard' },
  { id: 'stats', label: 'Statystyki', icon: <FaTrophy />, section: 'main', path: '/dashboard/stats' },
  { id: 'play', label: 'Graj', icon: <FaGamepad />, section: 'game', path: '/dashboard/play' },
  { id: 'learn', label: 'Nauka', icon: <FaBook />, section: 'game', path: '/dashboard/learn' },
  { id: 'community', label: 'Społeczność', icon: <FaUsers />, section: 'social', path: '/dashboard/community' },
  { id: 'settings', label: 'Ustawienia', icon: <FaCog />, section: 'social', path: '/dashboard/settings' },
];

const navVariants = {
  expanded: {
    width: '240px',
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  collapsed: {
    width: '72px',
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const itemVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  collapsed: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.2
    }
  }
};

export const DashboardNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (item: NavigationItem) => {
    setActiveItem(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <motion.nav
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={navVariants}
      className="fixed left-0 top-0 h-screen bg-gray-800/50 backdrop-blur-lg border-r border-gray-700/50 flex flex-col py-6 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20"
      >
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-white text-sm"
        >
          →
        </motion.span>
      </motion.button>

      <div className="flex-1 px-3 space-y-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {Object.values(navigationItems.reduce((acc, item) => {
            if (!acc[item.section]) {
              acc[item.section] = [];
            }
            acc[item.section].push(item);
            return acc;
          }, {} as Record<string, NavigationItem[]>)).map((section, index) => (
            <motion.div
              key={index}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {section.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    activeItem === item.id
                      ? 'bg-indigo-500/20 text-indigo-400 shadow-lg shadow-indigo-500/10'
                      : 'text-gray-400 hover:bg-gray-700/30 hover:text-gray-200'
                  }`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span 
                    className="text-xl"
                    whileHover={{ rotate: 10 }}
                  >
                    {item.icon}
                  </motion.span>
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.span
                        variants={itemVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="font-medium font-space whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={logout}
        className="mx-3 flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
        whileHover={{ scale: 1.02, x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span 
          className="text-xl"
          whileHover={{ rotate: 10 }}
        >
          <FaSignOutAlt />
        </motion.span>
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.span
              variants={itemVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="font-medium font-space whitespace-nowrap"
            >
              Wyloguj się
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.nav>
  );
}; 