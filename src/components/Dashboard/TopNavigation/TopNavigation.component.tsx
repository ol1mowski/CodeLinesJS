import { motion } from "framer-motion";
import { memo } from "react";

type TopNavigationProps = {
  className?: string;
};

export const TopNavigation = memo(({ className }: TopNavigationProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        fixed top-0 right-0 h-20 
        ml-[100px] // Odsunięcie od lewej nawigacji
        flex items-center justify-between
        px-8 py-4
        bg-gradient-to-r from-gray-900/50 via-blue-900/30 to-indigo-900/50
        backdrop-blur-lg border-b border-gray-700/50
        z-40 w-[calc(100%-100px)]
        ${className}
      `}
    >
      {/* Placeholder na kolejne elementy */}
      <div className="flex items-center gap-4">
        {/* Tu będzie powitanie użytkownika */}
      </div>

      <div className="flex items-center gap-4">
        {/* Tu będą powiadomienia */}
      </div>
    </motion.header>
  );
});

TopNavigation.displayName = "TopNavigation"; 