import { memo } from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import { DashboardNotification } from "../../../../types/dashboard.types";
import { communityBlockStyles as styles } from "./style/CommunityBlock.styles";
import { useNotificationAnimation } from "./hooks/useNotificationAnimation";
import { NotificationItem } from "./components/NotificationItem.component";

type CommunityBlockProps = {
  notifications: DashboardNotification[];
};

export const CommunityBlock = memo(({ notifications }: CommunityBlockProps) => {
  const animations = useNotificationAnimation();

  return (
    <div className={styles.container}>
      <div className={styles.header.wrapper}>
        <h2 className={styles.header.title}>
          <FaBell className={styles.header.icon} />
          Aktywność społeczności
        </h2>
      </div>

      <motion.div
        variants={animations.container}
        initial="hidden"
        animate="show"
      >
        {notifications.length > 0 ? (
          <div className={styles.notifications.list}>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                variants={animations.item}
              />
            ))}
          </div>
        ) : (
          <p className={styles.notifications.empty}>
            Brak nowych powiadomień
          </p>
        )}
      </motion.div>
    </div>
  );
});

CommunityBlock.displayName = "CommunityBlock"; 