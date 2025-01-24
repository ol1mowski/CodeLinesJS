import { memo } from "react";
import { ErrorMessage } from "../components/ErrorMessage.component";
import { LoadingSpinner } from "../components/UI/LoadingSpinner.component";
import { ResourceSection } from "./ResourceSection.component";
import { useResources } from "../hooks/useResources";

export const Resources = memo(() => {
  const {
    recommendedResources,
    otherResources,
    isLoading,
    error,
    refetch
  } = useResources();

  if (error) {
    return (
      <ErrorMessage 
        message="Nie udało się pobrać materiałów. Spróbuj ponownie później."
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <ResourceSection
        title="Polecane materiały"
        subtitle="Wyselekcjonowane materiały, które pomogą Ci w nauce"
        resources={recommendedResources}
        isRecommended
      />

      <ResourceSection
        title="Wszystkie materiały"
        subtitle="Przeglądaj wszystkie dostępne materiały"
        resources={otherResources}
      />
    </div>
  );
});

Resources.displayName = "Resources"; 