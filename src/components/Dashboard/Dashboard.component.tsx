import { Link, Outlet, useLocation } from 'react-router-dom';
import { DashboardNavigation } from "./Navigation/DashboardNavigation.component";
import { TopNavigation } from "./TopNavigation/TopNavigation.component";

const Dashboard = () => {

  const location = useLocation();

  const isHiddenPath = ['/dashboard/community','/dashboard/community/ranking', '/dashboard/community/groups', '/dashboard/learn', '/dashboard/play', '/dashboard/play/regex-raider', '/dashboard/play/async-quest', '/dashboard/play/js-typo-hunter', '/dashboard/play/scope-explorer', '/dashboard/settings'].includes(location.pathname);

  return (
    <main className="bg-gradient-to-b from-dark via-dark-medium to-dark backdrop-blur-lg flex min-h-screen">
      <DashboardNavigation />
      <div className={`flex-1 ${!isHiddenPath && 'ml-[100px]'}`}>
        <TopNavigation />
        <div className="mt-20 p-6 ">
          <div className={`${isHiddenPath ? 'flex': ''} flex-col justify-center items-center gap-4 md:block`}>
            {isHiddenPath && (
              <Link to="/dashboard" className="mb-4 md:hidden">
                <button className="bg-js text-dark px-4 py-2 rounded-md">
                  Wróć do Home
              </button>
            </Link>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
