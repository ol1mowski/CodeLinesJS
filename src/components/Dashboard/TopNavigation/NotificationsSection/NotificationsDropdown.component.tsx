import { motion } from "framer-motion";
import { memo } from "react";
import { topNavigationStyles as styles } from "../TopNavigation.styles";
import { useNotificationsDropdown } from "./hooks/useNotificationsDropdown";

type NotificationsDropdownProps = {
  onClose: () => void;
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15
    }
  }
};

export const NotificationsDropdown = memo(({ onClose }: NotificationsDropdownProps) => {
  const { dropdownRef } = useNotificationsDropdown({ onClose });

  return (
    <motion.div
      ref={dropdownRef}
      className={`
        absolute right-0 top-12 w-80 
        bg-dark/95 ${styles.effects.blur}
        rounded-lg border ${styles.borders.base}
        shadow-xl ${styles.effects.glow}
      `}
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="dialog"
      aria-label="Powiadomienia"
    >
      <div className="p-4">
        <h3 className={`${styles.text.heading} mb-4`}>Powiadomienia</h3>
        <div className="space-y-2">
          <motion.div
            className={`
              p-3 rounded-lg 
              bg-dark/50 ${styles.gradients.hover}
              border ${styles.borders.base} ${styles.borders.hover}
              cursor-pointer
            `}
            whileHover={{ x: 5 }}
          >
            <p className={styles.text.primary}>
              Nowe wyzwanie jest dostępne!
            </p>
            <span className={styles.text.secondary}>
              2 minuty temu
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

NotificationsDropdown.displayName = "NotificationsDropdown"; 