import { createBrowserRouter } from 'react-router-dom';
import { LessonPage } from './Lesson/Lesson.page';
// ... inne importy

export const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'learn',
        element: <LearnSection />,
        children: [
          {
            index: true,
            element: <Lessons />
          },
          {
            path: 'lesson/:lessonId',
            element: <LessonPage />
          }
        ]
      }
    ]
  }
]); 