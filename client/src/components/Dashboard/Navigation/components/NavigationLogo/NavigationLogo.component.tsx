import { motion, AnimatePresence } from "framer-motion";
import { FaCode } from "react-icons/fa";

import { memo } from "react";
import { itemVariants } from "../../animations/navigationAnimations";

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
      <div className="w-10 h-10 min-w-[40px] rounded-xl bg-js/20 flex items-center justify-center">
        <FaCode className="text-xl text-js" />
      </div>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.span
            variants={itemVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="font-bold text-js font-space"
          >
            CodeLinesJS
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
));

NavigationLogo.displayName = "NavigationLogo"; 