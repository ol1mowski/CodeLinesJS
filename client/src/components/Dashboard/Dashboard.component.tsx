import { Link, Outlet } from 'react-router-dom';
import { DashboardNavigation } from './Navigation/DashboardNavigation.component';
import { TopNavigation } from './TopNavigation/TopNavigation.component';
import { useIsHiddenPath } from '../../hooks/useIsHiddingPath.hook';
import { Helmet } from 'react-helmet-async';
import { useMobileDetect } from '../../hooks/useMobileDetect';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { ErrorBoundary } from '../Common/ErrorBoundary';
import { memo, lazy, Suspense } from 'react';
import { useDashboardData } from './DashboardContent/hooks/useDashboardData';
import { LoadingScreen } from '../UI/LoadingScreen/LoadingScreen.component';

const DashboardErrorFallback = lazy(() => import('../Common/DashboardErrorFallback.component'));
const LoadingSpinner = lazy(() =>
  import('../UI/LoadingSpinner/LoadingSpinner.component').then(module => ({
    default: module.LoadingSpinner,
  }))
);

const Dashboard = memo(() => {
  const isHiddenPath = useIsHiddenPath();
  const isMobile = useMobileDetect();
  const { logout } = useAuth();
  const { isLoading: isDashboardLoading } = useDashboardData();

  if (isDashboardLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary
      fallback={
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">Ładowanie...</div>
          }
        >
          <DashboardErrorFallback />
        </Suspense>
      }
    >
      <main className="bg-gradient-to-b from-dark via-dark-medium to-dark backdrop-blur-lg flex min-h-screen">
        <Helmet>
          <title>Dashboard | CodeLinesJS</title>
          <meta
            name="description"
            content="Panel użytkownika CodeLinesJS - dostęp do kursów, gier i statystyk nauki."
          />
        </Helmet>

        <DashboardNavigation />

        <div className={`flex-1 ${!isHiddenPath && !isMobile ? 'ml-[100px]' : ''} md:ml-[100px]`}>
          <TopNavigation />

          <div className="mt-20 p-6">
            <div
              className={`${isHiddenPath || isMobile ? 'flex' : ''} flex-col justify-center items-center gap-4 md:block`}
            >
              {isHiddenPath || isMobile ? (
                <div className="flex flex-col gap-2 mb-4 md:hidden">
                  <Link to="/dashboard">
                    <button
                      aria-label="Wróć do strony głównej"
                      className="bg-js text-dark px-4 py-2 rounded-md w-full flex items-center justify-center"
                    >
                      Wróć do Home
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    aria-label="Wyloguj się"
                    className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                  >
                    <FaSignOutAlt aria-hidden="true" />
                    Wyloguj się
                  </button>
                </div>
              ) : null}

              <Suspense fallback={<LoadingSpinner text="Ładowanie zawartości..." />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
