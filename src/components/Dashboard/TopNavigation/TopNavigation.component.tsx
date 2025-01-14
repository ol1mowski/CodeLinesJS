import { memo } from "react";
import { motion } from "framer-motion";
import { WelcomeSection } from "./WelcomeSection/WelcomeSection.component";
import { NotificationsButton } from "./NotificationsSection/NotificationsButton.component";

import { topNavigationStyles as styles } from "./style/TopNavigation.styles";
import { useTopNavAnimation } from "./hooks/useTopNavAnimation";
import { DashboardProfile } from "../../../types/dashboard.types";

type TopNavigationProps = {
  profile?: DashboardProfile;
};

export const TopNavigation = memo(({ profile }: TopNavigationProps) => {
  const animations = useTopNavAnimation();

  return (
    <motion.nav
      variants={animations.container}
      initial="initial"
      animate="animate"
      className={styles.container}
    >
      <div className={styles.content}>
        <WelcomeSection username={profile?.username ?? 'Użytkowniku'} />
        
        <div className={styles.actions}>
          <NotificationsButton />
        </div>
      </div>
    </motion.nav>
  );
});

TopNavigation.displayName = "TopNavigation";
