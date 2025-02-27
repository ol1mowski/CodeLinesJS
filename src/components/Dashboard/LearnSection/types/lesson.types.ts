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
    id: string;
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
    completedSections: string[];
    isCompleted: boolean;
    points: number;
}

export type Lesson = {
    id: string;
    slug: string;
    title: string;
    description: string;
    duration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    points: number;
    sections: LessonSection[];
    quiz?: QuizQuestion[];
    requiredLevel?: number;
    content: {
        sections: LessonSection[];
        quiz?: QuizQuestion[];
    };
    isLocked?: boolean;
    isCompleted?: boolean;
    pathId?: string;
    progress?: LessonProgress;
}