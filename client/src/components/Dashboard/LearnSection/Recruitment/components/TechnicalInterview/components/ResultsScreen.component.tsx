import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaCheck, 
  FaTimes, 
  FaChartLine, 
  FaRedo, 
  FaArrowLeft,
  FaStar,
  FaBookOpen
} from 'react-icons/fa';
import { Question } from '../data/questionsData';

interface Answer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timeTaken?: number;
}

interface ResultsScreenProps {
  questions: Question[];
  answers: Answer[];
  onRestart: () => void;
  onBack: () => void;
  totalTime?: number;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  answers,
  onRestart,
  onBack,
  totalTime = 0
}) => {
  const stats = useMemo(() => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalQuestions = questions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Kategoryzacja wyników
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

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'Doskonały', color: 'text-green-400', bgColor: 'bg-green-500/10' };
    if (percentage >= 80) return { level: 'Bardzo dobry', color: 'text-blue-400', bgColor: 'bg-blue-500/10' };
    if (percentage >= 70) return { level: 'Dobry', color: 'text-js', bgColor: 'bg-js/10' };
    if (percentage >= 60) return { level: 'Zadowalający', color: 'text-orange-400', bgColor: 'bg-orange-500/10' };
    return { level: 'Wymaga poprawy', color: 'text-red-400', bgColor: 'bg-red-500/10' };
  };

  const performance = getPerformanceLevel(stats.percentage);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft />
            Powrót do teorii
          </button>
          <div className="text-white text-xl font-bold">Wyniki testu</div>
        </div>

        {/* Główny wynik */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-8 mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <FaTrophy className="text-js text-6xl mx-auto mb-4" />
            <div className="text-white text-4xl font-bold mb-2">
              {stats.correctAnswers}/{stats.totalQuestions}
            </div>
            <div className="text-js text-2xl font-bold mb-4">
              {stats.percentage}% poprawnych odpowiedzi
            </div>
            <div className={`inline-block px-6 py-3 rounded-full ${performance.bgColor} ${performance.color} font-medium text-lg`}>
              {performance.level}
            </div>
          </motion.div>
        </motion.div>

        {/* Statystyki */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Statystyki ogólne */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaChartLine className="text-js text-xl" />
              <h3 className="text-white text-lg font-bold">Statystyki</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Poprawne:</span>
                <span className="text-green-400 font-medium">{stats.correctAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Błędne:</span>
                <span className="text-red-400 font-medium">{stats.totalQuestions - stats.correctAnswers}</span>
              </div>
              {totalTime > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Czas całkowity:</span>
                  <span className="text-white font-medium">{formatTime(totalTime)}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Wyniki według kategorii */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaBookOpen className="text-js text-xl" />
              <h3 className="text-white text-lg font-bold">Według kategorii</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(stats.categoryStats).map(([category, data]) => {
                const categoryPercentage = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{category}</span>
                      <span className="text-white font-medium">
                        {data.correct}/{data.total} ({categoryPercentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-js to-js/80"
                        initial={{ width: 0 }}
                        animate={{ width: `${categoryPercentage}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Rekomendacje */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaStar className="text-js text-xl" />
              <h3 className="text-white text-lg font-bold">Rekomendacje</h3>
            </div>
            <div className="space-y-3 text-sm">
              {stats.percentage >= 90 && (
                <p className="text-green-400">
                  Doskonały wynik! Jesteś gotowy na rozmowę techniczną.
                </p>
              )}
              {stats.percentage >= 70 && stats.percentage < 90 && (
                <p className="text-js">
                  Dobry wynik! Powtórz tematy gdzie miałeś błędy.
                </p>
              )}
              {stats.percentage < 70 && (
                <p className="text-orange-400">
                  Warto powtórzyć materiał i przejść test ponownie.
                </p>
              )}
              
              {/* Najsłabsze kategorie */}
              {Object.entries(stats.categoryStats)
                .filter(([, data]) => (data.correct / data.total) < 0.7)
                .slice(0, 2)
                .map(([category]) => (
                  <p key={category} className="text-gray-400">
                    • Skup się na temacie: {category}
                  </p>
                ))}
            </div>
          </motion.div>
        </div>

        {/* Szczegółowe odpowiedzi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-6 mb-8"
        >
          <h3 className="text-white text-lg font-bold mb-6">Szczegółowe odpowiedzi</h3>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const answer = answers[index];
              const isCorrect = answer?.isCorrect;
              
              return (
                <div key={question.id} className="border border-js/10 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <FaCheck className="text-white text-xs" />
                      ) : (
                        <FaTimes className="text-white text-xs" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-400 text-sm mb-1">{question.category}</div>
                      <div className="text-white font-medium mb-2">{question.question}</div>
                      
                      <div className="space-y-2">
                        {!isCorrect && (
                          <>
                            <div className="text-red-400 text-sm">
                              Twoja odpowiedź: {question.options[answer?.selectedAnswer || 0]}
                            </div>
                            <div className="text-green-400 text-sm">
                              Poprawna odpowiedź: {question.options[question.correctAnswer]}
                            </div>
                          </>
                        )}
                        
                        <div className="text-gray-300 text-sm bg-dark-700/50 p-3 rounded-lg">
                          <strong>Wyjaśnienie:</strong> {question.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Akcje */}
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-js to-js/80 text-dark font-medium rounded-xl hover:shadow-lg hover:shadow-js/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRedo />
            Rozpocznij ponownie
          </motion.button>
        </div>
      </div>
    </div>
  );
};

ResultsScreen.displayName = 'ResultsScreen';

export default memo(ResultsScreen); 