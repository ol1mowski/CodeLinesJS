import { memo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LessonsFilter } from "../../../../Lessons/LessonsFilter.component";
import { useLessons } from "../hooks/useLessons";
import { LoadingSpinner } from "../../../../components/UI/LoadingSpinner.component";
import { ErrorMessage } from "../../../../components/ErrorMessage.component";
import { FaBookOpen, FaSadTear, FaSearch } from "react-icons/fa";
import type { FilterType } from "../../../../types/filter.types";
import { LessonsList } from "./LessonsList.component";

const getDifficultyLabel = (filter: string) => {
  switch (filter) {
    case 'beginner': return 'podstawowym';
    case 'intermediate': return 'średnim';
    case 'advanced': return 'zaawansowanym';
    default: return '';
  }
};

export const Lessons = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = (searchParams.get("filter") as FilterType) || "all";
  
  const { 
    filteredLessons, 
    filter,
    setFilter,
    isLoading,
    error,
    refetch,
    isEmpty,
    userProgress,
    userId
  } = useLessons();

  useEffect(() => {
    if (currentFilter !== filter) {
      setFilter(currentFilter);
    }
  }, [currentFilter, setFilter, filter]);

  const handleFilterChange = (newFilter: FilterType) => {
    setSearchParams(prev => {
      if (newFilter === "all") {
        prev.delete("filter");
      } else {
        prev.set("filter", newFilter);
      }
      return prev;
    });
  };

  if (error) {
    return (
      <ErrorMessage 
        message="Nie udało się pobrać listy lekcji. Spróbuj ponownie później."
        onRetry={refetch}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FaBookOpen className="w-16 h-16 text-gray-600 mb-4 animate-pulse" />
        <h3 className="text-xl font-bold text-js mb-2">
          Brak dostępnych lekcji
        </h3>
        <p className="text-gray-400 text-sm">
          Aktualnie nie ma żadnych dostępnych lekcji. Sprawdź ponownie później.
        </p>
      </div>
    );
  }

  if (filteredLessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="relative mb-6">
          <FaSearch className="w-20 h-20 text-gray-600 opacity-20" />
          <div className="absolute -right-2 -bottom-2">
            <FaSadTear className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-js mb-3">
          Brak lekcji o poziomie {getDifficultyLabel(filter)}
        </h3>
        <p className="text-gray-400 text-sm max-w-md">
          W tej kategorii nie znaleziono żadnych lekcji. 
          Możesz wybrać inny poziom trudności lub
          <button 
            onClick={() => handleFilterChange("all")}
            className="text-js hover:text-js/80 underline mx-1 font-medium"
          >
            wyświetlić wszystkie lekcje
          </button>
        </p>
        <div className="mt-8">
          <LessonsFilter 
            activeFilter={filter} 
            onFilterChange={handleFilterChange}
            className="justify-center"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <LessonsList 
        lessons={filteredLessons}
        userId={userId}
        filter={filter}
        userLevel={userProgress.userLevel}
      />
    </>
  );
});

Lessons.displayName = "Lessons"; 