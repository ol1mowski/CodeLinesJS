import { memo } from "react";
import { LessonsFilter } from "./LessonsFilter.component";
import { type FilterType } from "../types/filter.types";


type LessonsHeaderProps = {
  onFilterChange: (filter: FilterType) => void;
};

export const LessonsHeader = memo(({ onFilterChange }: LessonsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-js mb-1">
          Dostępne lekcje
        </h3>
        <p className="text-gray-400 text-sm">
          Wybierz interesującą Cię lekcję i rozpocznij naukę
        </p>
      </div>
      <LessonsFilter onFilterChange={onFilterChange} />
    </div>
  );
});

LessonsHeader.displayName = "LessonsHeader"; 