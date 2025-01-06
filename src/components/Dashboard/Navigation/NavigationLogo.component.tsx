import { motion, AnimatePresence } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { itemVariants } from "./animations";
import { memo } from "react";

type NavigationLogoProps = {
  isExpanded: boolean;
};

export const NavigationLogo = memo(({ isExpanded }: NavigationLogoProps) => (
  <div className="px-4 mb-8">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
        <FaCode className="text-xl text-indigo-400" />
      </div>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.span
            variants={itemVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-space"
          >
            CodeLinesJS
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
));

NavigationLogo.displayName = "NavigationLogo"; 