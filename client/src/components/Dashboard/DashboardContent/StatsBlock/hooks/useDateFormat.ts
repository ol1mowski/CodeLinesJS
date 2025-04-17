import { useCallback } from 'react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export const useDateFormat = () => {
  return useCallback((dateString: string) => {
    try {
      if (!dateString) return 'Brak danych';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Nieprawidłowa data';

      return format(date, 'dd MMM, HH:mm', { locale: pl });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Nieprawidłowa data';
    }
  }, []);
};
