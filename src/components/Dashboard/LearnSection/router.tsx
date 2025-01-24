import { createBrowserRouter } from "react-router-dom";
import { LessonPage } from "../components/Dashboard/LearnSection/Lessons/Lesson.page";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "lesson/:id",
        element: <LessonPage />
      },
    ]
  },
]); 