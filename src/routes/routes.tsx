import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Dashboard from "../components/Dashboard/Dashboard.component";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute.component";
import { ErrorPage } from "../components/ErrorPage/ErrorPage.component";
import { StatsSection } from "../components/Dashboard/StatsSection/StatsSection.component";
import { DashboardContent } from "../components/Dashboard/DashboardContent/DashboardContent.component";

const Home = lazy(() => import("../pages/Home"));
const Auth = lazy(() => import("../pages/Auth"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/logowanie",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardContent />
      },
      {
        path: "stats",
        element: <StatsSection />
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
