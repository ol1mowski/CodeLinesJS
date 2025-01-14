import { motion, AnimatePresence } from "framer-motion";
import { memo, useState, useCallback } from "react";
import { FaBell } from "react-icons/fa";
import { NotificationsDropdown } from "./NotificationsDropdown.component";
import { topNavigationStyles as styles } from "../TopNavigation.styles";
import { useDashboardData } from "../../DashboardContent/hooks/useDashboardData";

export const NotificationsButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useDashboardData();
  const unreadCount = data?.unreadCount ?? 0;

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className={`
          relative p-2 rounded-lg
          ${styles.gradients.hover}
          transition-colors duration-200
          ${isOpen ? 'bg-dark/50' : ''}
        `}
      >
        <FaBell className={`w-5 h-5 ${isOpen ? 'text-js' : 'text-gray-400'}`} />
        
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white 
                         rounded-full min-w-[18px] h-[18px] text-xs flex 
                         items-center justify-center px-1 font-medium"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && <NotificationsDropdown onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
});

NotificationsButton.displayName = "NotificationsButton"; 