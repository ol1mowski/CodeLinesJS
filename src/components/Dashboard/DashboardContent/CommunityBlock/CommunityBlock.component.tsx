import { memo } from "react";
import { FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import { dashboardContentStyles as styles } from "../DashboardContent.styles";
import { DashboardNotification } from "../../../../types/dashboard.types";

interface NotificationItemProps {
  notification: DashboardNotification;
}

const NotificationItem = memo(({ notification }: NotificationItemProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.RelativeTimeFormat('pl', { numeric: 'auto' })
      .format(Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)), 'day');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        p-4 rounded-lg bg-dark/30
        ${notification.read ? 'opacity-60' : ''}
        border-l-4
        ${notification.type === 'achievement' ? 'border-green-500' : ''}
        ${notification.type === 'social' ? 'border-blue-500' : ''}
        ${notification.type === 'info' ? 'border-yellow-500' : ''}
      `}
    >
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-300">{notification.message}</p>
        <span className="text-xs text-gray-500 ml-2">
          {formatDate(notification.createdAt)}
        </span>
      </div>
    </motion.div>
  );
});

NotificationItem.displayName = "NotificationItem";

interface CommunityBlockProps {
  notifications: DashboardNotification[];
  unreadCount: number;
}

export const CommunityBlock = memo(({ notifications, unreadCount }: CommunityBlockProps) => {
  return (
    <div className={styles.card.content}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={styles.text.subtitle}>Powiadomienia</h2>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 bg-js/20 px-3 py-1 rounded-full"
          >
            <FaBell className="text-js text-sm" />
            <span className="text-sm text-js">{unreadCount}</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 py-8">
            Brak nowych powiadomień
          </p>
        )}
      </div>
    </div>
  );
});

CommunityBlock.displayName = "CommunityBlock"; 