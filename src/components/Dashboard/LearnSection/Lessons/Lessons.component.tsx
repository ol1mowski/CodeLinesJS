import { memo } from "react";
import { ErrorMessage } from "../components/ErrorMessage.component";
import { LoadingSpinner } from "../components/UI/LoadingSpinner.component";
import { LessonsHeader } from "./LessonsHeader.component";
import { LessonsList } from "./LessonsList.component";
import { useLessons } from "../hooks/useLessons";

export const Lessons = memo(() => {
  const userId = "current-user";
  const {
    filteredLessons,
    filter,
    setFilter,
    isLoading,
    requiredLevel,
    error,
    refetch
  } = useLessons();

  if (error) {
    return (
      <ErrorMessage 
        message="Nie udało się pobrać listy lekcji. Spróbuj ponownie później."
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <LessonsHeader 
        filter={filter}
        onFilterChange={setFilter}
      />
      <LessonsList 
        lessons={filteredLessons}
        filter={filter}
        userId={userId}
        userData={{
          userLevel: 1,
          requiredLevel: requiredLevel || 1
        }}
      />
    </div>
  );
});

Lessons.displayName = "Lessons"; 