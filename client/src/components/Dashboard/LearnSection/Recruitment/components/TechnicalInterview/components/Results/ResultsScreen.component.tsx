import React, { memo } from 'react';
import { ITheoryQuestion } from '../../api/theoryQuestions.api';
import { useResultsScreen, Answer } from '../../hooks/useResultsScreen.hook';
import { 
  ResultsHeader,
  MainResultCard,
  StatsCard,
  CategoryStatsCard,
  RecommendationsCard,
  DetailedAnswers,
  ResultsActions
} from './components';

interface ResultsScreenProps {
  questions: ITheoryQuestion[];
  answers: Answer[];
  onRestart: () => void;
  onBack: () => void;
  totalTime?: number;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = memo(({
  questions,
  answers,
  onRestart,
  onBack,
  totalTime = 0
}) => {
  const { stats, performance, formatTime, getRecommendations } = useResultsScreen(
    questions,
    answers,
    totalTime
  );

  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4">
      <div className="max-w-6xl mx-auto">
        <ResultsHeader onBack={onBack} />

        <MainResultCard
          correctAnswers={stats.correctAnswers}
          totalQuestions={stats.totalQuestions}
          percentage={stats.percentage}
          performance={performance}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            correctAnswers={stats.correctAnswers}
            totalQuestions={stats.totalQuestions}
            totalTime={totalTime}
            formatTime={formatTime}
          />

          <CategoryStatsCard categoryStats={stats.categoryStats} />

          <RecommendationsCard
            recommendations={getRecommendations}
            percentage={stats.percentage}
          />
        </div>

        <DetailedAnswers questions={questions} answers={answers} />

        <ResultsActions onRestart={onRestart} />
      </div>
    </div>
  );
});

ResultsScreen.displayName = 'ResultsScreen'; 