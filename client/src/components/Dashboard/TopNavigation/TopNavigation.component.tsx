import { memo, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { WelcomeSection } from './WelcomeSection/WelcomeSection.component';
import { NotificationsButton } from './NotificationsSection/NotificationsButton.component';
import { topNavigationStyles as styles } from './style/TopNavigation.styles';
import { useTopNavAnimation } from './hooks/useTopNavAnimation';
import { useUserProfile } from './hooks/useUserProfile';
import { ErrorBoundary } from '../../Common/ErrorBoundary';

export const TopNavigation = memo(() => {
  const animations = useTopNavAnimation();
  const { data: userProfile, isLoading, error } = useUserProfile();

  const username = useMemo(() => {
    if (error) {
      return 'Użytkowniku';
    }

    if (isLoading) {
      return 'Ładowanie...';
    }

    return userProfile?.data.user.username || 'Użytkowniku';
  }, [userProfile?.data.user.username, isLoading, error]);


  return (
    <ErrorBoundary>
      <motion.nav
        variants={animations.container}
        initial="initial"
        animate="animate"
        className={styles.container}
        aria-label="Górna nawigacja"
      >
        <div className={styles.content}>
          <WelcomeSection username={username} />

          <div className={styles.actions}>
            <Suspense
              fallback={<div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>}
            >
              <NotificationsButton />
            </Suspense>
          </div>
        </div>
      </motion.nav>
    </ErrorBoundary>
  );
});

TopNavigation.displayName = 'TopNavigation';
