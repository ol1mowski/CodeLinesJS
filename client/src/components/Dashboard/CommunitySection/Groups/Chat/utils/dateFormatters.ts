import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export const formatMessageDate = (date: string | Date) => {
  return format(new Date(date), 'HH:mm, d MMM', { locale: pl });
}; 