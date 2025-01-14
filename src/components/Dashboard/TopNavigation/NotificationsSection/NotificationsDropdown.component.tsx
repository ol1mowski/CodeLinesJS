import { motion } from "framer-motion";
import { memo, useEffect } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { topNavigationStyles as styles } from "../TopNavigation.styles";
import { FaCheckCircle, FaTrophy, FaUsers, FaBell } from "react-icons/fa";
import { useDashboardData } from "../../DashboardContent/hooks/useDashboardData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

const formatDate = (date: string) => {
  return format(new Date(date), "dd MMM, HH:mm", { locale: pl });
};

type NotificationsDropdownProps = {
  onClose: () => void;
};

export const NotificationsDropdown = memo(({ onClose }: NotificationsDropdownProps) => {
  const { data, isLoading } = useDashboardData();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await fetch(
        `http://localhost:5001/api/dashboard/notifications/${notificationId}/read`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Nie udało się oznaczyć jako przeczytane');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`
        absolute right-0 top-12 w-80 bg-dark/95 rounded-xl 
        border ${styles.borders.base} shadow-xl backdrop-blur-sm
        z-50
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className={styles.text.heading}>Powiadomienia</h3>
          {(data?.unreadCount ?? 0) > 0 && (
            <span className="px-2 py-1 text-xs bg-js/20 text-js rounded-full">
              {data?.unreadCount ?? 0} nowe
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-gray-400">
            Ładowanie powiadomień...
          </div>
        ) : !data?.notifications?.length ? (
          <div className="py-8 text-center text-gray-400">
            Brak nowych powiadomień
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
            {data.notifications.map((notification) => (
              <motion.div
                key={notification._id}
                className={`
                  p-3 rounded-lg 
                  bg-dark/50 ${styles.gradients.hover}
                  border ${styles.borders.base} ${styles.borders.hover}
                  cursor-pointer
                  ${notification.read ? 'opacity-60' : ''}
                `}
                whileHover={{ x: 5 }}
                onClick={() => !notification.read && markAsReadMutation.mutate(notification._id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className={styles.text.primary}>
                      {notification.message}
                    </p>
                    <span className={styles.text.secondary}>
                      {formatDate(notification.createdAt)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});

NotificationsDropdown.displayName = "NotificationsDropdown"; 