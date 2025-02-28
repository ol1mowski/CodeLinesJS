import { LessonProgress } from "./lesson.types";

export type ApiResponse<T> = {
  data: T;
  error?: string;
};

export type UserProgressResponse = {
  userId: string;
  progress: {
    [lessonId: string]: LessonProgress;
  };
  lastUpdated: string;
}; 