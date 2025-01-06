import { motion } from "framer-motion";
import { memo } from "react";
import { FaUserCircle, FaTrophy, FaCode, FaStar } from "react-icons/fa";
import { dashboardContentStyles as styles } from "../DashboardContent.styles";

type NotificationType = 'achievement' | 'challenge' | 'social' | 'ranking';

type CommunityNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  user?: string;
};

const notificationIcons = {
  achievement: FaTrophy,
  challenge: FaCode,
  social: FaUserCircle,
  ranking: FaStar,
};

const notificationGradients = {
  achievement: 'from-yellow-500 to-amber-500',
  challenge: 'from-blue-500 to-indigo-500',
  social: 'from-green-500 to-emerald-500',
  ranking: 'from-purple-500 to-indigo-500',
};

// DUMMY DATA
const notifications: CommunityNotification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'Nowe osiągnięcie!',
    message: 'Ukończyłeś 5 wyzwań z rzędu',
    time: '2 min temu',
  },
  {
    id: '2',
    type: 'social',
    title: 'Nowy follower',
    message: 'JSMaster zaczął Cię obserwować',
    time: '5 min temu',
    user: 'JSMaster',
  },
  {
    id: '3',
    type: 'challenge',
    title: 'Wyzwanie ukończone',
    message: 'CodeNinja rozwiązał Twoje wyzwanie',
    time: '15 min temu',
    user: 'CodeNinja',
  },
  {
    id: '4',
    type: 'ranking',
    title: 'Awans w rankingu!',
    message: 'Awansowałeś do TOP 50 graczy',
    time: '1h temu',
  },
];

const NotificationItem = memo(({ notification }: { notification: CommunityNotification }) => {
  const Icon = notificationIcons[notification.type];
  const gradient = notificationGradients[notification.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        flex items-start gap-4 p-4 rounded-lg
        bg-gray-800/30 hover:bg-gray-800/50
        transition-colors cursor-pointer
        group
      `}
    >
      <div className={`
        w-10 h-10 rounded-lg
        bg-gradient-to-r ${gradient}
        flex items-center justify-center
        flex-shrink-0
      `}>
        <Icon className="text-white text-lg" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`${styles.text.primary} font-medium truncate group-hover:text-white transition-colors`}>
          {notification.title}
        </h3>
        <p className={`${styles.text.secondary} text-sm mt-1 truncate`}>
          {notification.message}
        </p>
        <div className="flex items-center gap-2 mt-2">
          {notification.user && (
            <div className="flex items-center gap-1">
              <FaUserCircle className="text-gray-400 text-sm" />
              <span className="text-xs text-gray-400">{notification.user}</span>
            </div>
          )}
          <span className="text-xs text-gray-500">{notification.time}</span>
        </div>
      </div>
    </motion.div>
  );
});

NotificationItem.displayName = "NotificationItem";

export const CommunityBlock = memo(() => {
  return (
    <div className="space-y-6">
      <div className={styles.card.header}>
        <h2 className={styles.card.title}>Społeczność</h2>
        <span className={`${styles.text.secondary} px-3 py-1 rounded-full bg-indigo-500/10`}>
          4 nowe
        </span>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
});

CommunityBlock.displayName = "CommunityBlock"; 