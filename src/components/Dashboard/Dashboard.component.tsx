import { Outlet } from 'react-router-dom';
import { DashboardNavigation } from "./Navigation/DashboardNavigation.component";
import { TopNavigation } from "./TopNavigation/TopNavigation.component";

const Dashboard = () => {
  return (
    <main className="bg-gradient-to-b from-dark via-dark-medium to-dark backdrop-blur-lg flex min-h-screen">
      <DashboardNavigation />
      <div className="flex-1 ml-[100px]">
        <TopNavigation />
        <div className="mt-20 p-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
