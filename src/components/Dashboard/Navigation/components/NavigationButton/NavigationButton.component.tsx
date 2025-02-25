import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";
import { itemVariants } from '../../animations/navigationAnimations';

type NavigationButtonProps = {
  icon: React.ReactNode;
  label?: string;
  isActive?: boolean;
  isExpanded: boolean;
  onClick: () => void;
  id: string;
  variant?: "default" | "danger";
};

export const NavigationButton = memo(({
  icon,
  label,
  isActive = false,
  isExpanded,
  onClick,
  variant = "default",
  id,
}: NavigationButtonProps) => (
  <motion.button
    onClick={onClick}
    data-testid={`nav-button-${label?.toLowerCase().replace(/\s/g, '-')}`}
    className={`
      ${id === "code" && "hidden lg:flex"}
      w-full flex items-center gap-3 px-4 py-3 
      rounded-lg transition-all duration-200
      backdrop-blur-sm
      ${variant === 'default' 
        ? isActive 
          ? 'bg-js/20 border-l-2 border-js text-js'
          : 'text-gray-400 hover:text-js hover:bg-js/10'
        : isActive
          ? 'bg-red-500/20 text-red-400'
          : 'text-red-400 hover:bg-red-500/10'
      }
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
