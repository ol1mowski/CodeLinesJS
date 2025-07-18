import { memo } from 'react';
import { ErrorMessage } from '../components/ErrorMessage.component';
import { LessonsHeader } from './LessonsHeader.component';
import { LessonsList } from './LessonsList.component';
import { useLessons } from '../hooks/useLessons.hook';
import { useStats } from '../../../Dashboard/StatsSection/hooks/useStats.hook';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';

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

  return (
    <div className="space-y-6">
      <LessonsHeader onFilterChange={setFilter} />
      <LessonsList
        lessons={filteredLessons}
        filter={filter}
        userId={userId}
        userData={{
          userLevel: userLevel,
          requiredLevel: requiredLevel || 1,
        }}
        isLoading={isLoading}
      />
    </div>
  );
});

Lessons.displayName = 'Lessons';
