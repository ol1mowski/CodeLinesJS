import { motion, AnimatePresence } from "framer-motion";
import { memo, useState } from "react";
import { FaBell } from "react-icons/fa";
import { NotificationsDropdown } from "./NotificationsDropdown.component";

type NotificationsButtonProps = {
  unreadCount: number;
};

export const NotificationsButton = memo(({ unreadCount }: NotificationsButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        className="relative p-2 rounded-lg bg-js/10 hover:bg-js/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell className="text-xl text-js" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-js flex items-center justify-center"
          >
            <span className="text-xs text-dark font-bold">{unreadCount}</span>
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && <NotificationsDropdown onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  );
});

NotificationsButton.displayName = "NotificationsButton"; 