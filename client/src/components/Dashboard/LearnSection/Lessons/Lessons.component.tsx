import { memo } from 'react';
import { ErrorMessage } from '../components/ErrorMessage.component';
import { LoadingSpinner } from '../../../UI/LoadingSpinner/LoadingSpinner.component';
import { LessonsHeader } from './LessonsHeader.component';
import { LessonsList } from './LessonsList.component';
import { useLessons } from '../hooks/useLessons';
import { useStats } from '../../../Dashboard/StatsSection/hooks/useStats.hook';
import { useAuth } from '../../../../hooks/useAuth';

export const Lessons = memo(() => {
  const { user } = useAuth();
  const { stats } = useStats();
  const userId = user?.id || 'current-user';
  const userLevel = stats?.data?.progress?.level || 1;

  const { filteredLessons, filter, setFilter, isLoading, requiredLevel, error, refetch } =
    useLessons();

  if (error) {
    return (
      <ErrorMessage
        message="Nie udało się pobrać listy lekcji. Spróbuj ponownie później."
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading && (!filteredLessons || filteredLessons.length === 0)) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <LoadingSpinner text="Ładowanie lekcji..." size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LessonsHeader onFilterChange={setFilter} />
      
      {isLoading ? (
        <div className="py-8 flex items-center justify-center">
          <LoadingSpinner text="Ładowanie danych..." />
        </div>
      ) : (
        <LessonsList
          lessons={filteredLessons}
          filter={filter}
          userId={userId}
          userData={{
            userLevel: userLevel,
            requiredLevel: requiredLevel || 1,
          }}
        />
      )}
    </div>
  );
});

Lessons.displayName = 'Lessons';
