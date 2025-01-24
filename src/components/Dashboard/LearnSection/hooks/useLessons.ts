import { useQuery } from "@tanstack/react-query";
import { fetchLessons } from "../lib/api/lessons";
import type { Lesson, FilterType } from "../types/lesson.types";
import { useState, useMemo } from "react";

export const useLessons = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  
  const { 
    data: lessons, 
    isLoading, 
    error,
    refetch 
  } = useQuery<{ data: Lesson[] }, Error>({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minut
  });

  const filteredLessons = useMemo(() => 
    lessons?.data.filter(lesson => 
      filter === "all" ? true : lesson.difficulty === filter
    ) || [], 
    [lessons?.data, filter]
  );

  return {
    filteredLessons,
    filter,
    setFilter,
    isLoading,
    error,
    refetch
  };
}; 