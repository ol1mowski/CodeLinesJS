import { DashboardNavigation } from "./Navigation/DashboardNavigation.component";
import { TopNavigation } from "./TopNavigation/TopNavigation.component";
import { DashboardContent } from "./DashboardContent/DashboardContent.component";

const Dashboard = () => {
  return (
    <main
      className="bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 backdrop-blur-lg flex flex-col 
    h-screen"
    >
      <DashboardNavigation />
      <TopNavigation />
      <div className="ml-[100px] mt-20">
        <DashboardContent />
      </div>
    </main>
  );
};

export default Dashboard;
