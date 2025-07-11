import { useMemo } from 'react';
import { Question } from '../data/questionsData.data';

export interface Answer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timeTaken?: number;
  explanation?: string;
  correctAnswer?: number;
}

export interface PerformanceLevel {
  level: string;
  color: string;
  bgColor: string;
}

export const useResultsScreen = (
  questions: Question[],
  answers: Answer[],
  totalTime: number = 0
) => {
  const stats = useMemo(() => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalQuestions = questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    const categoryStats = questions.reduce((acc, question, index) => {
      const category = question.category;
      if (!acc[category]) {
        acc[category] = { total: 0, correct: 0 };
      }
      acc[category].total++;
      if (answers[index]?.isCorrect) {
        acc[category].correct++;
      }
      return acc;
    }, {} as Record<string, { total: number; correct: number }>);

    return {
      correctAnswers,
      totalQuestions,
      percentage,
      categoryStats,
      averageTime: totalTime / totalQuestions || 0
    };
  }, [questions, answers, totalTime]);

  const getPerformanceLevel = (percentage: number): PerformanceLevel => {
    if (percentage >= 90) return { level: 'Doskonały', color: 'text-green-400', bgColor: 'bg-green-500/10' };
    if (percentage >= 80) return { level: 'Bardzo dobry', color: 'text-blue-400', bgColor: 'bg-blue-500/10' };
    if (percentage >= 70) return { level: 'Dobry', color: 'text-js', bgColor: 'bg-js/10' };
    if (percentage >= 60) return { level: 'Zadowalający', color: 'text-orange-400', bgColor: 'bg-orange-500/10' };
    return { level: 'Wymaga poprawy', color: 'text-red-400', bgColor: 'bg-red-500/10' };
  };

  const performance = getPerformanceLevel(stats.percentage);

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getRecommendations = () => {
    const recommendations: string[] = [];
    
    if (stats.percentage >= 90) {
      recommendations.push('Doskonały wynik! Jesteś gotowy na rozmowę techniczną.');
    } else if (stats.percentage >= 70) {
      recommendations.push('Dobry wynik! Powtórz tematy gdzie miałeś błędy.');
    } else {
      recommendations.push('Warto powtórzyć materiał i przejść test ponownie.');
    }

    const weakCategories = Object.entries(stats.categoryStats)
      .filter(([, data]) => (data.correct / data.total) < 0.7)
      .slice(0, 2)
      .map(([category]) => `• Skup się na temacie: ${category}`);

    return [...recommendations, ...weakCategories];
  };

  return {
    stats,
    performance,
    formatTime,
    getRecommendations: getRecommendations()
  };
}; 