export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const calculateDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const isConsecutiveDay = (currentDate: Date, referenceDate: Date): boolean => {
  const normalizedCurrentDate = new Date(currentDate);
  const normalizedReferenceDate = new Date(referenceDate);
  
  normalizedCurrentDate.setHours(0, 0, 0, 0);
  normalizedReferenceDate.setHours(0, 0, 0, 0);
  
  const diffTime = normalizedCurrentDate.getTime() - normalizedReferenceDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays === 1;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}; 