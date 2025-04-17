import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTrophy, FaUsers, FaBell } from 'react-icons/fa';
import { DashboardNotification } from '../../../DashboardContent/types/dashboard.types';
import { notificationsStyles as styles } from '../style/Notifications.styles';
import { formatDate } from '../../../../../utils/format';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'challenge':
      return <FaTrophy className="text-yellow-500" />;
    case 'achievement':
      return <FaCheckCircle className="text-green-500" />;
    case 'social':
      return <FaUsers className="text-blue-500" />;
    default:
      return <FaBell className="text-gray-400" />;
  }
};

type NotificationItemProps = {
  notification: DashboardNotification;
  onRead: (id: string) => void;
};

export const NotificationItem = memo(({ notification, onRead }: NotificationItemProps) => (
  <motion.div
    className={`
      ${styles.dropdown.content.item.wrapper}
      ${notification.read ? 'opacity-60' : ''}
    `}
    whileHover={{ x: 5 }}
    onClick={() => !notification.read && onRead(notification._id)}
  >
    <div className={styles.dropdown.content.item.content}>
      <div className={styles.dropdown.content.item.icon}>
        {getNotificationIcon(notification.type)}
      </div>
      <div className={styles.dropdown.content.item.text.wrapper}>
        <p className={styles.dropdown.content.item.text.message}>{notification.message}</p>
        <span className={styles.dropdown.content.item.text.time}>
          {formatDate(notification.createdAt)}
        </span>
      </div>
    </div>
  </motion.div>
));

NotificationItem.displayName = 'NotificationItem';
