import { memo } from "react";
import { notificationsStyles as styles } from "../style/Notifications.styles";

type NotificationsHeaderProps = {
  unreadCount: number;
};

export const NotificationsHeader = memo(({ unreadCount }: NotificationsHeaderProps) => (
  <div className={styles.dropdown.header.wrapper}>
    <h3 className={styles.dropdown.header.title}>Powiadomienia</h3>
    {unreadCount > 0 && (
      <span className={styles.dropdown.header.badge}>
        {unreadCount} nowe
      </span>
    )}
  </div>
));

NotificationsHeader.displayName = "NotificationsHeader"; 