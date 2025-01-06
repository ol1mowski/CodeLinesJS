import { motion } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import { topNavigationStyles as styles } from "../TopNavigation.styles";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-80 bg-gray-900/95 backdrop-blur-lg rounded-lg border border-gray-700/50 shadow-xl"
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="p-4">
        <h3 className={`${styles.text.heading} mb-4`}>Powiadomienia</h3>
        <div className="space-y-2">
          {/* Przykładowe powiadomienie */}
          <motion.div
            className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 cursor-pointer"
            whileHover={{ x: 5 }}
          >
            <p className={`${styles.text.primary} text-sm`}>
              Nowe wyzwanie jest dostępne!
            </p>
            <span className={`${styles.text.secondary} text-xs`}>
              2 minuty temu
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

NotificationsDropdown.displayName = "NotificationsDropdown"; 