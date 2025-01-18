import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { WelcomeSection } from "./WelcomeSection/WelcomeSection.component";
import { NotificationsButton } from "./NotificationsSection/NotificationsButton.component";
import { topNavigationStyles as styles } from "./style/TopNavigation.styles";
import { useTopNavAnimation } from "./hooks/useTopNavAnimation";
import { useDashboardData } from "../DashboardContent/hooks/useDashboardData";

export const TopNavigation = memo(() => {
  const animations = useTopNavAnimation();
  const { data } = useDashboardData();

  const username = useMemo(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      const { username } = JSON.parse(userData);
      return username;
    }
    return data?.profile?.username ?? 'Użytkowniku';
  }, [data?.profile?.username]);

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
