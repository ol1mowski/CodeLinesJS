import { useMemo } from 'react';
import { ITheoryQuestion } from '../api/theoryQuestions.api';

export const useTestScreen = (
  questions: ITheoryQuestion[],
  currentQuestionIndex: number,
  totalQuestions: number
) => {
  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  const progress = useMemo(() => {
    return ((currentQuestionIndex + 1) / totalQuestions) * 100;
  }, [currentQuestionIndex, totalQuestions]);

  const isLastQuestion = useMemo(() => {
    return currentQuestionIndex === totalQuestions - 1;
  }, [currentQuestionIndex, totalQuestions]);

  const getOptionLetter = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  return {
    currentQuestion,
    progress,
    isLastQuestion,
    getOptionLetter
  };
}; 