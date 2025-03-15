import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "../components/UI/LoadingSpinner/LoadingSpinner.component";

const CommunitySection = lazy(() => import("../components/Dashboard/CommunitySection/CommunitySection.component").then(module => ({ default: module.CommunitySection })));
const ErrorPage = lazy(() => import("../components/ErrorPage/ErrorPage.component").then(module => ({ default: module.ErrorPage })));
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard.component"));
const ProtectedRoute = lazy(() => import("../components/ProtectedRoute/ProtectedRoute.component").then(module => ({ default: module.ProtectedRoute })));
const DashboardContent = lazy(() => import("../components/Dashboard/DashboardContent/DashboardContent.component").then(module => ({ default: module.DashboardContent })));
const StatsSection = lazy(() => import("../components/Dashboard/StatsSection/StatsSection.component").then(module => ({ default: module.StatsSection })));
const LearnSection = lazy(() => import("../components/Dashboard/LearnSection/LearnSection.component").then(module => ({ default: module.LearnSection })));
const LessonPage = lazy(() => import("../components/Dashboard/LearnSection/Lesson/Lesson.page").then(module => ({ default: module.LessonPage })));
const SettingsSection = lazy(() => import("../components/Dashboard/SettingsSection/SettingsSection.component").then(module => ({ default: module.SettingsSection })));
const GamesSection = lazy(() => import("../components/Dashboard/GamesSection/GamesSection.component").then(module => ({ default: module.GamesSection })));
const GameplayRouter = lazy(() => import("../components/Dashboard/GamesSection/components/GameplayRouter/GameplayRouter.component").then(module => ({ default: module.GameplayRouter })));
const CodeEditor = lazy(() => import("../components/Dashboard/CodeEditor/CodeEditor.component").then(module => ({ default: module.CodeEditor })));
const ResetPasswordPage = lazy(() => import("../components/Auth/ResetPasswordPage").then(module => ({ default: module.ResetPasswordPage })));

const Home = lazy(() => import("../pages/Home"));
const Auth = lazy(() => import("../pages/Auth"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));

const LazyLoadWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner fullScreen text="Ładowanie strony..." />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyLoadWrapper><Home /></LazyLoadWrapper>,
    errorElement: <LazyLoadWrapper><ErrorPage /></LazyLoadWrapper>
  },
  {
    path: "/logowanie",
    element: <LazyLoadWrapper><Auth /></LazyLoadWrapper>,
  },
  {
    path: "/reset-password/:token",
    element: <LazyLoadWrapper><ResetPasswordPage /></LazyLoadWrapper>,
  },
  {
    path: "/polityka-prywatnosci",
    element: <LazyLoadWrapper><PrivacyPolicy /></LazyLoadWrapper>,
  },
  {
    path: "/dashboard",
    element: (
      <LazyLoadWrapper>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </LazyLoadWrapper>
    ),
    children: [
      {
        index: true,
        element: <LazyLoadWrapper><DashboardContent /></LazyLoadWrapper>
      },
      {
        path: "stats",
        element: <LazyLoadWrapper><StatsSection /></LazyLoadWrapper>
      },
      {
        path: "community",
        element: <LazyLoadWrapper><CommunitySection /></LazyLoadWrapper>
      },
      {
        path: "learn",
        element: <LazyLoadWrapper><LearnSection /></LazyLoadWrapper>,
      },
      {
        path: "learn/lesson/:lessonSlug",
        element: <LazyLoadWrapper><LessonPage /></LazyLoadWrapper>
      },
      {
        path: "settings",
        element: <LazyLoadWrapper><SettingsSection /></LazyLoadWrapper>
      },
      {
        path: "play",
        element: <LazyLoadWrapper><GamesSection /></LazyLoadWrapper>,
      },
      { 
        path: "play/:slug", 
        element: <LazyLoadWrapper><GameplayRouter /></LazyLoadWrapper> 
      },
      { 
        path: "code", 
        element: <LazyLoadWrapper><CodeEditor /></LazyLoadWrapper> 
      },
    ]
  },
  {
    path: "*",
    element: <LazyLoadWrapper><ErrorPage /></LazyLoadWrapper>,
  },
]);