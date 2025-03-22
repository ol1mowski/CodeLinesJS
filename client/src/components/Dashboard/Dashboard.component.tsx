import { Link, Outlet } from 'react-router-dom';
import { DashboardNavigation } from "./Navigation/DashboardNavigation.component";
import { TopNavigation } from "./TopNavigation/TopNavigation.component";
import { useIsHiddenPath } from '../../Hooks/useIsHiddingPath.hook';
import { Helmet } from 'react-helmet-async';
import { useMobileDetect } from '../../hooks/useMobileDetect';
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from '../../Hooks/useAuth';

const Dashboard = () => {
  const isHiddenPath = useIsHiddenPath();
  const isMobile = useMobileDetect();
  const { logout } = useAuth();
  
  return (
    <main className="bg-gradient-to-b from-dark via-dark-medium to-dark backdrop-blur-lg flex min-h-screen">
      <Helmet>
        <title>Dashboard | CodeLinesJS</title>
      </Helmet>
      <DashboardNavigation />
      <div className={`flex-1 ${!isHiddenPath && !isMobile && 'ml-[100px]'} md:ml-[100px]`}>
        <TopNavigation />
        <div className="mt-20 p-6">
          <div className={`${isHiddenPath || isMobile ? 'flex': ''} flex-col justify-center items-center gap-4 md:block`}>
            {(isHiddenPath || isMobile) && (
              <div className="flex flex-col gap-2 mb-4 md:hidden">
                <Link to="/dashboard">
                  <button className="bg-js text-dark px-4 py-2 rounded-md w-full flex items-center justify-center">
                    Wróć do Home
                  </button>
                </Link>
                <button 
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt />
                  Wyloguj się
                </button>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
