import { useState, useCallback } from 'react';

type UseUpdatePointsReturn = {
  updatePoints: (points: number) => Promise<void>;
  isUpdating: boolean;
  error: string | null;
};

export const useUpdatePoints = (): UseUpdatePointsReturn => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePoints = useCallback(async (points: number) => {
    setIsUpdating(true);
    setError(null);

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/progress/points', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ points })
      });

      if (!response.ok) {
        throw new Error('Nie udało się zaktualizować punktów');
      }

      const data = await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
      console.error('Błąd podczas aktualizacji punktów:', err);
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return { updatePoints, isUpdating, error };
}; 