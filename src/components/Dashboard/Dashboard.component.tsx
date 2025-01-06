import { Outlet } from "react-router-dom"
import { DashboardNavigation } from "./Navigation/DashboardNavigation.component"

const Dashboard = () => {
  return (
    <main className="bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 backdrop-blur-lgflex flex-col h-screen">
      <DashboardNavigation />
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  )
}

export default Dashboard