import { motion, AnimatePresence } from "framer-motion";
import { memo, useState } from "react";
import { FaBell } from "react-icons/fa";
import { NotificationsDropdown } from "./NotificationsDropdown.component";
import { topNavigationStyles as styles } from "../TopNavigation.styles";

type NotificationsButtonProps = {
  unreadCount: number;
};

export const NotificationsButton = memo(({ unreadCount }: NotificationsButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div className="relative">
      <motion.button
        className={`
          relative p-2 rounded-lg 
          bg-dark/50 border ${styles.borders.base}
          ${styles.gradients.hover} 
          ${styles.transitions.base}
          ${isOpen ? 'bg-red-500/10 border-red-500/30' : ''}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label="Powiadomienia"
      >
        <FaBell 
          className={`text-xl ${isOpen ? 'text-red-500' : styles.gradients.text}`} 
        />
        <AnimatePresence>
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-js flex items-center justify-center"
            >
              <span className="text-xs text-dark font-bold">{unreadCount}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && <NotificationsDropdown onClose={toggleDropdown} />}
      </AnimatePresence>
    </div>
  );
});

NotificationsButton.displayName = "NotificationsButton"; 