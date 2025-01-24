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

export type LessonProgress = {
    completedSections: number[];
    quizResults: {
        [quizId: string]: {
            completed: boolean;
            correctAnswers: number;
            totalQuestions: number;
        };
    };
    xpEarned: number;
}

export type Lesson = {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    xp: number;
    rewards?: LessonReward;
    sections: LessonSection[];
}