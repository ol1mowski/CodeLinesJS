import { memo } from 'react';

type QuizAnswerProps = {
  answer: string;
  isCorrect: boolean;
  onClick: () => void;
};

export const QuizAnswer = memo(({ answer, isCorrect, onClick }: QuizAnswerProps) => (
  <button
    onClick={onClick}
    className={`w-full p-4 text-left rounded-lg transition-all duration-300 border
                ${isCorrect 
                  ? 'bg-[#f7df1e]/10 hover:bg-[#f7df1e]/20 text-[#f7df1e] border-[#f7df1e]' 
                  : 'bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/50 text-gray-400 hover:text-gray-300 border-[#f7df1e]/10 hover:border-[#f7df1e]/30'}`}
  >
    {answer}
  </button>
));

QuizAnswer.displayName = 'QuizAnswer'; 