import { LessonReward } from "./reward.types";

export type CodeExample = {
    code: string;
    language?: string;
    explanation?: string;
}

export type QuizQuestion = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export type LessonSection = {
    title: string;
    content: string;
    examples?: CodeExample[];
    quiz?: QuizQuestion[];
}

type QuizResult = {
    completed: boolean;
    correctAnswers: number;
    totalQuestions: number;
    completedAt: string;
};

export type LessonProgress = {
    lessonId: string;
    completedSections: number[];
    quizResults: {
        [quizId: string]: QuizResult;
    };
    xpEarned: number;
    isCompleted: boolean;
    lastAccessedAt: string;
}

export type Lesson = {
    _id: string;
    id: string;
    title: string;
    description: string;
    duration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    points: number;
    requiredLevel: number;
    isLocked: boolean;
    isCompleted: boolean;
}