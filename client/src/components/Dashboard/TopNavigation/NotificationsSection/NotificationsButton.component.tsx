import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell } from "react-icons/fa";
import { NotificationsDropdown } from "./NotificationsDropdown.component";
import { notificationsStyles as styles } from "./style/Notifications.styles";
import { useDashboardData } from "../../DashboardContent/hooks/useDashboardData";

export const NotificationsButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useDashboardData();
  const unreadCount = data?.unreadCount ?? 0;

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className={styles.button.wrapper}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className={`${styles.button.base} ${isOpen ? styles.button.active : ''}`}
      >
        <FaBell className={`
          ${styles.button.icon.base}
          ${isOpen ? styles.button.icon.active : styles.button.icon.inactive}
        `} />
        
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={styles.button.badge}
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