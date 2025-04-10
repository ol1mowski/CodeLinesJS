import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

/**
 * Formatuje datę do czytelnego formatu (HH:mm, dd MMM)
 * @param date Data w formie stringa lub obiektu Date
 * @returns Sformatowana data
 */
export const formatDate = (date: string | Date): string => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Nieprawidłowa data';
    }
    
    return format(dateObj, 'dd MMM, HH:mm', { locale: pl });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Nieprawidłowa data';
  }
};

/**
 * Formatuje datę do formatu wiadomości (HH:mm, d MMM)
 * @param date Data w formie stringa lub obiektu Date
 * @returns Sformatowana data
 */
export const formatMessageDate = (date: string | Date): string => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Nieprawidłowa data';
    }
    
    return format(dateObj, 'HH:mm, d MMM', { locale: pl });
  } catch (error) {
    console.error('Error formatting message date:', error);
    return 'Nieprawidłowa data';
  }
};

/**
 * Formatuje datę tylko do dnia i miesiąca
 * @param date Data w formie stringa lub obiektu Date
 * @returns Sformatowana data (dd MMM yyyy)
 */
export const formatShortDate = (date: string | Date): string => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return 'Data nieznana';
    }
    
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting short date:', error);
    return 'Data nieznana';
  }
};

/**
 * Zwraca różnicę dni pomiędzy dwoma datami
 * @param date1 Pierwsza data
 * @param date2 Druga data
 * @returns Liczba dni różnicy
 */
export const getDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Sprawdza czy dwie daty są tego samego dnia
 * @param date1 Pierwsza data
 * @param date2 Druga data
 * @returns True jeśli daty są tego samego dnia
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}; 