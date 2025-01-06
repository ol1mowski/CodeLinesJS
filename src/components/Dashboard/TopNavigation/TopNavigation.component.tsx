import { motion } from "framer-motion";
import { memo } from "react";
import { topNavigationStyles as styles } from "./TopNavigation.styles";
import { WelcomeSection } from "./WelcomeSection/WelcomeSection.component";
import { NotificationsButton } from "./NotificationsSection/NotificationsButton.component";
import { useDisplayName } from "../../../hooks/useDisplayName";

type TopNavigationProps = {
  className?: string;
};

export const TopNavigation = memo(({ className }: TopNavigationProps) => {
  const displayName = useDisplayName();
  const unreadNotifications = 3; // DUMMY DATA

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
      <WelcomeSection username={displayName} />
      
      <div className="flex items-center gap-4">
        <NotificationsButton unreadCount={unreadNotifications} />
      </div>
    </motion.header>
  );
});
