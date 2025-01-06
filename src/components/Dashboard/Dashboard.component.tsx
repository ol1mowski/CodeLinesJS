import { Outlet } from "react-router-dom"
import { DashboardNavigation } from "./Navigation/DashboardNavigation.component"

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardNavigation />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard