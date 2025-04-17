import { memo } from 'react';

type QuestionHeaderProps = {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
};

export const QuestionHeader = memo(
  ({ currentQuestion, totalQuestions, score }: QuestionHeaderProps) => (
    <div className="flex justify-between items-center mb-4">
      <span className="text-gray-400">
        Pytanie {currentQuestion + 1}/{totalQuestions}
      </span>
      <span className="text-js font-bold">Wynik: {score}</span>
    </div>
  )
);

QuestionHeader.displayName = 'QuestionHeader';
