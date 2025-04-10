import { useCallback } from 'react';
import { formatDate, formatMessageDate, formatShortDate, getDaysDifference, isSameDay } from '../utils/format';

type UseDateFormatReturn = {
  formatDate: (date: string | Date) => string;
  formatMessageDate: (date: string | Date) => string;
  formatShortDate: (date: string | Date) => string;
  getDaysDifference: (date1: Date, date2: Date) => number;
  isSameDay: (date1: Date, date2: Date) => boolean;
  isToday: (date: Date) => boolean;
  isYesterday: (date: Date) => boolean;
};

export const useDateFormat = (): UseDateFormatReturn => {
  const formatDateCallback = useCallback((date: string | Date) => {
    return formatDate(date);
  }, []);

  const formatMessageDateCallback = useCallback((date: string | Date) => {
    return formatMessageDate(date);
  }, []);

  const formatShortDateCallback = useCallback((date: string | Date) => {
    return formatShortDate(date);
  }, []);

  const getDaysDifferenceCallback = useCallback((date1: Date, date2: Date) => {
    return getDaysDifference(date1, date2);
  }, []);

  const isSameDayCallback = useCallback((date1: Date, date2: Date) => {
    return isSameDay(date1, date2);
  }, []);

  const isTodayCallback = useCallback((date: Date) => {
    return isSameDay(date, new Date());
  }, []);

  const isYesterdayCallback = useCallback((date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(date, yesterday);
  }, []);

  return {
    formatDate: formatDateCallback,
    formatMessageDate: formatMessageDateCallback,
    formatShortDate: formatShortDateCallback,
    getDaysDifference: getDaysDifferenceCallback,
    isSameDay: isSameDayCallback,
    isToday: isTodayCallback,
    isYesterday: isYesterdayCallback
  };
}; 