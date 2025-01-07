import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";
import { itemVariants } from "./animations";

type NavigationButtonProps = {
  icon: React.ReactNode;
  label?: string;
  isActive?: boolean;
  isExpanded: boolean;
  onClick: () => void;
  variant?: "default" | "danger";
};

const variants = {
  default: {
    active: "bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border-l-2 border-indigo-500 text-indigo-400",
    inactive: "text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10",
  },
  danger: {
    active: "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400",
    inactive: "text-red-400 hover:bg-red-500/10",
  },
};

export const NavigationButton = memo(({
  icon,
  label,
  isActive = false,
  isExpanded,
  onClick,
  variant = "default",
}: NavigationButtonProps) => (
  <motion.button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-3 
      rounded-lg transition-all duration-200
      backdrop-blur-sm
      ${isActive ? variants[variant].active : variants[variant].inactive}
    `}
    whileHover={{ scale: 1.02, x: 5 }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.span 
      className="text-xl min-w-[24px]" 
      whileHover={{ rotate: 10 }}
      style={{ color: "currentColor" }}
    >
      {icon}
    </motion.span>
    <AnimatePresence mode="wait">
      {isExpanded && label && (
        <motion.span
          variants={itemVariants}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          className="font-medium font-space whitespace-nowrap"
          style={{ color: "currentColor" }}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
));

NavigationButton.displayName = "NavigationButton";
