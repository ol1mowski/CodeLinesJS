import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Dashboard from "../components/Dashboard/Dashboard.component";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute.component";
import { ErrorPage } from "../components/ErrorPage/ErrorPage.component";
import { StatsSection } from "../components/Dashboard/StatsSection/StatsSection.component";
import { DashboardContent } from "../components/Dashboard/DashboardContent/DashboardContent.component";
import { LearnSection } from "../components/Dashboard/LearnSection/LearnSection.component";
import { CommunitySection } from "../components/Dashboard/CommunitySection/CommunitySection.component";
import { SettingsSection } from "../components/Dashboard/SettingsSection/SettingsSection.component";
import { GamesSection } from "../components/Dashboard/GamesSection/GamesSection.component";
import { CodeEditor } from "../components/Dashboard/CodeEditor/CodeEditor.component";
import { LessonPage } from "../components/Dashboard/LearnSection/Lesson/Lesson.page";

const Home = lazy(() => import("../pages/Home"));
const Auth = lazy(() => import("../pages/Auth"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/logowanie",
    element: <Auth />,
  },
  {
    path: "/lesson/:lessonId",
    element: <LessonPage />
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
      },
      {
        path: "learn",
        element: <LearnSection />,
      },
      {
        path: "community",
        element: <CommunitySection />
      },
      {
        path: "settings",
        element: <SettingsSection />
      },
      {
        path: "play",
        element: <GamesSection />
      },
      {
        path: "code",
        element: <CodeEditor />
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
