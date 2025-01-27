import { motion } from "framer-motion";
import { memo } from "react";
import { PathCard } from "./PathCard.component";
import { useQuery } from "@tanstack/react-query";
import { fetchLearningPaths } from "../lib/api/paths";
import { ErrorMessage } from "../components/ErrorMessage.component";
import { LoadingSpinner } from "../components/UI/LoadingSpinner.component";
import { type LearningPath } from "../types/learning.types";

export const LearningPaths = memo(() => {
  const userId = "current-user";
  const { 
    data: paths, 
    isLoading, 
    error,
    refetch 
  } = useQuery<LearningPath[], Error>({
    queryKey: ['learningPaths'],
    queryFn: fetchLearningPaths,
    retry: 2
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

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

  if (!paths || paths.length === 0) {
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-js mb-1">
          Ścieżki nauki
        </h3>
        <p className="text-gray-400 text-sm">
          Wybierz ścieżkę nauki dopasowaną do Twoich potrzeb
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {paths.map((path) => (
          <PathCard 
            key={path.id} 
            path={path}
            userId={userId}
          />
        ))}
      </motion.div>
    </div>
  );
});

LearningPaths.displayName = "LearningPaths"; 