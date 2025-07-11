import { useState, useCallback } from 'react';
import { getTheoryQuestions, checkTheoryAnswer, ITheoryQuestion } from '../api/theoryQuestions.api';
import { Question as OldQuestion } from '../data/questionsData.data';
import { Answer as OldAnswer } from './useResultsScreen.hook';

interface ApiQuestion extends ITheoryQuestion {
  id: string;
}

interface ApiAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeTaken?: number;
  explanation?: string;
  correctAnswer?: number;
}

export type TestState = 'setup' | 'inProgress' | 'completed';

const convertQuestionForComponents = (apiQuestion: ApiQuestion): OldQuestion => ({
  id: parseInt(apiQuestion._id.slice(-6), 16),
  question: apiQuestion.question,
  options: apiQuestion.options,
  correctAnswer: apiQuestion.correctAnswer,
  explanation: apiQuestion.explanation,
  category: apiQuestion.category
});

const convertAnswerForComponents = (apiAnswer: ApiAnswer): OldAnswer & { 
  explanation?: string; 
  correctAnswer?: number; 
} => ({
  questionId: parseInt(apiAnswer.questionId.slice(-6), 16),
  selectedAnswer: apiAnswer.selectedAnswer,
  isCorrect: apiAnswer.isCorrect,
  timeTaken: apiAnswer.timeTaken,
  explanation: apiAnswer.explanation,
  correctAnswer: apiAnswer.correctAnswer
});

export const useTest = () => {
  const [testState, setTestState] = useState<TestState>('setup');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [questions, setQuestions] = useState<ApiQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<ApiAnswer[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startTest = useCallback(async (questionCount: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getTheoryQuestions(questionCount);
      
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      if (response.data) {
        const testQuestions: ApiQuestion[] = response.data.map(q => ({
          ...q,
          id: q._id
        }));
        
        setQuestions(testQuestions);
        setSelectedQuestionCount(questionCount);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setAnswers([]);
        setTestState('inProgress');
        setStartTime(Date.now());
        setQuestionStartTime(Date.now());
      }
    } catch (error) {
      setError('Błąd podczas ładowania pytań');
    } finally {
      setLoading(false);
    }
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  }, []);

  const nextQuestion = useCallback(async () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const timeTaken = (Date.now() - questionStartTime) / 1000;

    try {
      const checkResponse = await checkTheoryAnswer(currentQuestion._id, selectedAnswer);
      
      const newAnswer: ApiAnswer = {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect: checkResponse.data?.isCorrect || false,
        timeTaken,
        explanation: checkResponse.data?.explanation || '',
        correctAnswer: checkResponse.data?.correctAnswer
      };

      setAnswers(prev => [...prev, newAnswer]);

      if (currentQuestionIndex === questions.length - 1) {
        setTestState('completed');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setQuestionStartTime(Date.now());
      }
    } catch (error) {
      setError('Błąd podczas sprawdzania odpowiedzi');
      
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      const newAnswer: ApiAnswer = {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect,
        timeTaken,
        explanation: currentQuestion.explanation,
        correctAnswer: currentQuestion.correctAnswer
      };

      setAnswers(prev => [...prev, newAnswer]);

      if (currentQuestionIndex === questions.length - 1) {
        setTestState('completed');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setQuestionStartTime(Date.now());
      }
    }
  }, [selectedAnswer, questions, currentQuestionIndex, questionStartTime]);

  const resetTest = useCallback(() => {
    setTestState('setup');
    setSelectedQuestionCount(10);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setStartTime(0);
    setQuestionStartTime(0);
    setLoading(false);
    setError(null);
  }, []);

  const restartTest = useCallback(() => {
    if (questions.length > 0) {
      startTest(questions.length);
    } else {
      resetTest();
    }
  }, [questions.length, startTest, resetTest]);

  const goBackToSetup = useCallback(() => {
    setTestState('setup');
  }, []);

  const getTotalTime = useCallback(() => {
    if (startTime === 0) return 0;
    const endTime = testState === 'completed' ? Date.now() : startTime;
    return (endTime - startTime) / 1000;
  }, [startTime, testState]);

  const getProgress = useCallback(() => {
    if (questions.length === 0) return 0;
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex, questions.length]);

  const getCurrentQuestion = useCallback(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  const getStats = useCallback(() => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalQuestions = answers.length;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    
    return {
      correctAnswers,
      totalQuestions,
      percentage,
      totalTime: getTotalTime()
    };
  }, [answers, getTotalTime]);

  return {
    testState,
    selectedQuestionCount,
    questions: questions.map(convertQuestionForComponents),
    currentQuestionIndex,
    selectedAnswer,
    answers: answers.map(convertAnswerForComponents),
    loading,
    error,

    startTest,
    selectAnswer,
    nextQuestion,
    resetTest,
    restartTest,
    goBackToSetup,
    setSelectedQuestionCount,

    getTotalTime,
    getProgress,
    getCurrentQuestion,
    getStats,

    isAnswerSelected: selectedAnswer !== null,
    isLastQuestion: currentQuestionIndex === questions.length - 1,
    canProceed: selectedAnswer !== null
  };
}; 