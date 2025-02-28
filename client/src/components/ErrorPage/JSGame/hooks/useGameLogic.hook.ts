import { useState, useCallback } from 'react';
import { questions } from '../constants/questions.data';

export const useGameLogic = (onComplete: (score: number) => void) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = useCallback((answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 100);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        onComplete(score + (correct ? 100 : 0));
      }
    }, 1500);
  }, [currentQuestion, onComplete, score]);

  return {
    currentQuestion,
    score,
    selectedAnswer,
    isCorrect,
    handleAnswer
  };
}; 