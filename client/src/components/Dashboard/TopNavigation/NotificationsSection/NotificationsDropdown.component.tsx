import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardData } from '../../DashboardContent/hooks/useDashboardData';
import { notificationsStyles as styles } from './style/Notifications.styles';
import { useNotifications } from './hooks/useNotifications.hook';
import { NotificationItem } from './components/NotificationItem.component';
import { NotificationsHeader } from './components/NotificationsHeader.component';

export const NotificationsDropdown = memo(({ onClose }: { onClose: () => void }) => {
  const { data, isLoading } = useDashboardData();
  const { markAsRead } = useNotifications();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={styles.dropdown.container}
      onClick={e => e.stopPropagation()}
    >
      <NotificationsHeader unreadCount={data?.unreadCount ?? 0} />

      {isLoading ? (
        <div className={styles.dropdown.content.loading}>Ładowanie powiadomień...</div>
      ) : !data?.notifications?.length ? (
        <div className={styles.dropdown.content.empty}>Brak nowych powiadomień</div>
      ) : (
        <div className={styles.dropdown.content.wrapper}>
          {data.notifications.map(notification => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onRead={id => markAsRead.mutate(id)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
});

NotificationsDropdown.displayName = 'NotificationsDropdown';
