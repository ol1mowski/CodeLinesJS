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

const notificationStyles = {
  achievement: {
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-500",
    borderHover: "group-hover:border-amber-500/30"
  },
  challenge: {
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
    borderHover: "group-hover:border-emerald-500/30"
  },
  social: {
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
    borderHover: "group-hover:border-blue-500/30"
  },
  ranking: {
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-500",
    borderHover: "group-hover:border-purple-500/30"
  }
};

const NotificationItem = memo(({ notification }: { notification: CommunityNotification }) => {
  const Icon = notificationIcons[notification.type];
  const style = notificationStyles[notification.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        flex items-start gap-4 p-4 rounded-lg
        bg-dark/30 hover:bg-dark/50
        border border-js/10 ${style.borderHover}
        transition-all cursor-pointer
        group
      `}
    >
      <div className={`
        w-10 h-10 rounded-lg
        ${style.iconBg}
        flex items-center justify-center
        flex-shrink-0
        group-hover:scale-110 transition-transform
      `}>
        <Icon className={`text-lg ${style.iconColor}`} />
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
              <FaUserCircle className={style.iconColor + " text-sm opacity-80"} />
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
        <span className="text-gray-400 px-3 py-1 rounded-full bg-js/10">
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