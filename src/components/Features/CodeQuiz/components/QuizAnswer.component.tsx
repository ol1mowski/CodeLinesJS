import { memo } from 'react';

type QuizAnswerProps = {
  answer: string;
  isCorrect: boolean;
  onClick: () => void;
};

export const QuizAnswer = memo(({ answer, isCorrect, onClick }: QuizAnswerProps) => (
  <button
    onClick={onClick}
    className={`w-full p-4 text-left rounded-lg transition-all duration-300
                ${isCorrect 
                  ? 'bg-js/10 hover:bg-js/20 text-js' 
                  : 'bg-dark/30 hover:bg-dark/50 text-gray-400 hover:text-gray-300'}`}
  >
    {answer}
  </button>
));

QuizAnswer.displayName = 'QuizAnswer'; 