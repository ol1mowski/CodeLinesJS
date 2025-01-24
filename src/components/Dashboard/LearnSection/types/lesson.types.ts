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
    sections: LessonSection[];
} 