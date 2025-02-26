import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { WelcomeSection } from "./WelcomeSection/WelcomeSection.component";
import { NotificationsButton } from "./NotificationsSection/NotificationsButton.component";
import { topNavigationStyles as styles } from "./style/TopNavigation.styles";
import { useTopNavAnimation } from "./hooks/useTopNavAnimation";
import { useUserProfile } from "./hooks/useUserProfile";

export const TopNavigation = memo(() => {
  const animations = useTopNavAnimation();
  const { data: userProfile, isLoading } = useUserProfile();

  const username = useMemo(() => {
    if (isLoading) {
      return 'Ładowanie...';
    }
    if (!userProfile?.data.username) {
      return 'Użytkowniku';
    }
    return userProfile?.data.username;
  }, [userProfile?.data.username, isLoading]);

  return (
    <motion.nav
      variants={animations.container}
      initial="initial"
      animate="animate"
      className={styles.container}
    >
      <div className={styles.content}>
        <WelcomeSection username={username} />
        
        <div className={styles.actions}>
          <NotificationsButton />
        </div>
      </div>
    </motion.nav>
  );
});

TopNavigation.displayName = "TopNavigation";
