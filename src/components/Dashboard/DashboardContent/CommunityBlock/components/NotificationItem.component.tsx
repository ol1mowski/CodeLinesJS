import { memo } from "react";
import { motion } from "framer-motion";
import { DashboardNotification } from "../../../../../types/dashboard.types";
import { communityBlockStyles as styles } from "../style/CommunityBlock.styles";

type NotificationItemProps = {
  notification: DashboardNotification;
  variants: any;
};

export const NotificationItem = memo(({ notification, variants }: NotificationItemProps) => (
  <motion.div
    variants={variants}
    className={styles.notifications.item.wrapper}
  >
    <div className={styles.notifications.item.content}>
      <p className={styles.notifications.item.message}>
        {notification.message}
      </p>
      <span className={styles.notifications.item.time}>
        {new Date(notification.createdAt).toLocaleString()}
      </span>
    </div>
  </motion.div>
));

NotificationItem.displayName = "NotificationItem"; 