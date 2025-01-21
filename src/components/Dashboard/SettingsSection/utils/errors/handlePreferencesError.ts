import { PreferencesError } from '../api/preferences';
import { ToastType } from '../../types/toast';

export const handlePreferencesError = (error: unknown, showToast: (message: string, type: ToastType) => void) => {
  if (error instanceof PreferencesError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        showToast('Nieprawidłowe dane preferencji', 'error');
        return;
      case 'SAVE_ERROR':
        showToast('Nie udało się zapisać preferencji', 'error');
        return;
    }
  }
  showToast('Wystąpił błąd podczas aktualizacji preferencji', 'error');
}; 