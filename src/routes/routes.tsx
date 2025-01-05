import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Dashboard from "../components/Dashboard/Dashboard.component";

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
    element: <Dashboard />,
  }
]); 