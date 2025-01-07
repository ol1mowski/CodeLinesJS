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
    active: "bg-gray-800/50 border-l-2 border-blue-500 text-white",
    inactive: "text-black hover:text-white hover:bg-gray-800/50",
  },
  danger: {
    active: "text-red-400 hover:bg-red-500/10",
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
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
      isActive ? variants[variant].active : variants[variant].inactive
    }`}
    whileHover={{ scale: 1.02, x: 5 }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.span className="text-white text-xl min-w-[24px]" whileHover={{ rotate: 10 }}>
      {icon}
    </motion.span>
    <AnimatePresence mode="wait">
      {isExpanded && label && (
        <motion.span
          variants={itemVariants}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          className="font-medium font-space text-white whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
));
