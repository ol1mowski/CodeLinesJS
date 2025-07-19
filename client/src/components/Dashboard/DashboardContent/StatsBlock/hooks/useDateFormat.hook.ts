import { useCallback } from 'react';
import { formatDate } from '../../../../../utils/format.util';

export const useDateFormat = () => {
  const formatDateCallback = useCallback((date: string | Date) => {
    return formatDate(date);
  }, []);

  return formatDateCallback;
}; 