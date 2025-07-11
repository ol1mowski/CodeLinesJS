import { useState, useCallback } from 'react';
import { getTheoryQuestions, checkTheoryAnswer, ITheoryQuestion } from '../api/theoryQuestions.api';

export interface QuizQuestion extends ITheoryQuestion {
  userAnswer?: number;
  isCorrect?: boolean;
  answered?: boolean;
}

export const useTheoryQuestions = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const loadQuestions = useCallback(async (limit: number = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getTheoryQuestions(limit);
      
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      if (response.data) {
        const quizQuestions: QuizQuestion[] = response.data.map(q => ({
          ...q,
          userAnswer: undefined,
          isCorrect: undefined,
          answered: false
        }));
        
        setQuestions(quizQuestions);
        setAnswers(new Array(quizQuestions.length).fill(-1));
        setCurrentQuestionIndex(0);
        setTestStarted(true);
        setTestCompleted(false);
      }
    } catch (err) {
      setError('Błąd podczas ładowania pytań');
    } finally {
      setLoading(false);
    }
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (testCompleted) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);

    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex] = {
      ...newQuestions[currentQuestionIndex],
      userAnswer: answerIndex,
      answered: true
    };
    setQuestions(newQuestions);
  }, [answers, currentQuestionIndex, questions, testCompleted]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTestCompleted(true);
    }
  }, [currentQuestionIndex, questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex]);

  const resetTest = useCallback(() => {
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setTestStarted(false);
    setTestCompleted(false);
    setError(null);
  }, []);

  const checkAnswers = useCallback(async () => {
    if (!testCompleted) return;
    
    setLoading(true);
    
    try {
      const checkedQuestions = [...questions];
      
      for (let i = 0; i < checkedQuestions.length; i++) {
        const question = checkedQuestions[i];
        const userAnswer = answers[i];
        
        if (userAnswer !== -1) {
          const response = await checkTheoryAnswer(question._id, userAnswer);
          
          if (response.data) {
            checkedQuestions[i] = {
              ...question,
              isCorrect: response.data.isCorrect
            };
          }
        }
      }
      
      setQuestions(checkedQuestions);
    } catch (err) {
      setError('Błąd podczas sprawdzania odpowiedzi');
    } finally {
      setLoading(false);
    }
  }, [testCompleted, questions, answers]);

  const getScore = useCallback(() => {
    const correctAnswers = questions.filter(q => q.isCorrect).length;
    return {
      correct: correctAnswers,
      total: questions.length,
      percentage: questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0
    };
  }, [questions]);

  return {
    questions,
    loading,
    error,
    currentQuestionIndex,
    answers,
    testStarted,
    testCompleted,
    
    loadQuestions,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    resetTest,
    checkAnswers,
    
    currentQuestion: questions[currentQuestionIndex],
    selectedAnswer: answers[currentQuestionIndex],
    canGoNext: currentQuestionIndex < questions.length - 1,
    canGoPrevious: currentQuestionIndex > 0,
    isLastQuestion: currentQuestionIndex === questions.length - 1,
    getScore
  };
}; 