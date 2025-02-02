import { motion } from "framer-motion";
import { memo } from "react";
import { PathCard } from "./PathCard.component";
import { useQuery } from "@tanstack/react-query";
import { fetchLearningPaths } from "../lib/api/paths";
import { ErrorMessage } from "../components/ErrorMessage.component";
import { LoadingSpinner } from "../components/UI/LoadingSpinner.component";
import { FaGraduationCap, FaChartLine, FaClock } from "react-icons/fa";

type PathsResponse = {
  paths: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number;
    requirements: string[];
    outcomes: string[];
    progress: {
      completed: number;
      total: number;
      percentage: number;
      lastCompletedAt: string;
      startedAt: string;
      isStarted: boolean;
      isCompleted: boolean;
    };
  }>;
  userStats: {
    totalPoints: number;
    totalPaths: number;
    completedPaths: number;
    pathsInProgress: number;
    recentActivity: Array<{
      pathId: string;
      completedLessons: number;
      lastCompletedAt: string;
    }>;
  };
};

export const LearningPaths = memo(() => {
  const { 
    data, 
    isLoading, 
    error,
    refetch 
  } = useQuery<PathsResponse>({
    queryKey: ['learningPaths'],
    queryFn: fetchLearningPaths,
    retry: 2,
    staleTime: 1000 * 60 * 5 
  });

  console.log(data);

  if (error) {
    return (
      <ErrorMessage 
        message="Nie udało się pobrać ścieżek nauki. Spróbuj ponownie później."
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data?.paths || data.paths.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-bold text-js mb-2">
          Brak dostępnych ścieżek nauki
        </h3>
        <p className="text-gray-400 text-sm">
          Aktualnie nie ma żadnych dostępnych ścieżek nauki. Sprawdź ponownie później.
        </p>
      </div>
    );
  }

  const { userStats } = data;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <FaGraduationCap className="w-5 h-5 text-js" />
            <h4 className="font-medium text-gray-200">Postęp nauki</h4>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Ukończone ścieżki</span>
            <span className="text-js">{userStats.completedPaths}/{userStats.totalPaths}</span>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <FaChartLine className="w-5 h-5 text-js" />
            <h4 className="font-medium text-gray-200">Punkty XP</h4>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Zdobyte punkty</span>
            <span className="text-js">{userStats.totalPoints} XP</span>
          </div>
        </div>

        <div className="bg-dark-800/50 border border-js/10 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <FaClock className="w-5 h-5 text-js" />
            <h4 className="font-medium text-gray-200">W trakcie</h4>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Aktywne ścieżki</span>
            <span className="text-js">{userStats.pathsInProgress}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-js mb-1">
              Ścieżki nauki
            </h3>
            <p className="text-gray-400 text-sm">
              Wybierz ścieżkę nauki dopasowaną do Twoich potrzeb
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {data.paths.map((path) => (
            <PathCard 
              key={path.id} 
              path={path}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
});

LearningPaths.displayName = "LearningPaths"; 