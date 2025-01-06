import { Outlet } from "react-router-dom"
import { DashboardNavigation } from "./Navigation/DashboardNavigation.component"
import { TopNavigation } from "./TopNavigation/TopNavigation.component"

const Dashboard = () => {
  return (
    <main className="bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 backdrop-blur-lg flex flex-col h-screen">
      <DashboardNavigation />
      <TopNavigation />
      <div className="flex-1 mt-20 ml-[100px]">
        <Outlet />
      </div>
    </main>
  )
}

export default Dashboard