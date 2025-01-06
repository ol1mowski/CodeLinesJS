import { motion } from "framer-motion";
import { memo } from "react";
import { topNavigationStyles as styles } from "./TopNavigation.styles";
import { WelcomeSection } from "./WelcomeSection/WelcomeSection.component";

type TopNavigationProps = {
  className?: string;
};

export const TopNavigation = memo(({ className }: TopNavigationProps) => {
  const username = "John Doe";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        fixed top-0 right-0 h-20 
        ml-[100px]
        flex items-center justify-between
        px-8 py-4
        ${styles.gradients.background}
        backdrop-blur-lg border-b border-gray-700/50
        z-40 w-[calc(100%-100px)]
        ${styles.transitions.base}
        ${className}
      `}
    >
      <WelcomeSection username={username} />
      
      <div className="flex items-center gap-4">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Placeholder na powiadomienia */}
        </motion.div>
      </div>
    </motion.header>
  );
});

TopNavigation.displayName = "TopNavigation"; 