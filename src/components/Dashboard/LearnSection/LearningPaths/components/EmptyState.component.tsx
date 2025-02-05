import { memo } from 'react';

export const EmptyState = memo(() => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <h3 className="text-xl font-bold text-js mb-2">
      Brak dostępnych ścieżek nauki
    </h3>
    <p className="text-gray-400 text-sm">
      Aktualnie nie ma żadnych dostępnych ścieżek nauki. Sprawdź ponownie później.
    </p>
  </div>
)); 