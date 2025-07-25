import { motion } from 'framer-motion';
import { memo } from 'react';

import { StatsSection } from './components/Stats/StatsSection.component';
import { ErrorMessage } from '../components/ErrorMessage.component';
import { LoadingSpinner } from '../../../UI/LoadingSpinner/LoadingSpinner.component';
import { useLearningPaths } from './hooks/useLearningPaths.hook';
import { EmptyState } from './components/EmptyState.component';
import { PathCard } from './components/PathCard/PathCard.component';

export const LearningPaths = memo(() => {
  const { paths, userStats, isLoading, error, refetch, isEmpty } = useLearningPaths();

  const shouldShowLoading = isLoading || (paths.length === 0 && !error);

  if (shouldShowLoading) return <LoadingSpinner text="Ładowanie ścieżek nauki..." />;

  if (error) {
    console.error('Learning paths error:', error);
    return (
      <ErrorMessage
        message="Nie udało się pobrać ścieżek nauki. Spróbuj ponownie później."
        onRetry={refetch}
      />
    );
  }

  if (isEmpty) return <EmptyState />;

  return (
    <div className="space-y-8">
      <StatsSection
        stats={
          userStats || {
            completedPaths: 0,
            totalPaths: 0,
            totalPoints: 0,
            pathsInProgress: 0,
            recentActivity: [],
          }
        }
      />

      <section>
        <header className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-js mb-1">Ścieżki nauki</h3>
            <p className="text-gray-400 text-sm">
              Wybierz ścieżkę nauki dopasowaną do Twoich potrzeb
            </p>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {paths.map(path => (
            <PathCard key={path.id} path={path} />
          ))}
        </motion.div>
      </section>
    </div>
  );
});

LearningPaths.displayName = 'LearningPaths';
