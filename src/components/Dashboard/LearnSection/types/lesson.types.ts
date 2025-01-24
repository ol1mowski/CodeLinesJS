export type CodeExample = {
    code: string;
    language?: string;
    explanation?: string;
}

export type LessonSection = {
    title: string;
    content: string;
    examples?: CodeExample[];
}

export type Lesson = {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    xp: number;
    progress: number;
    sections: LessonSection[];
} 