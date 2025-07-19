import { useState } from 'react';
import { useReportBug } from '../api/reportBug.api';
import { FormData } from './types';

export const useReportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { reportBug } = useReportBug();

  const submitReport = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await reportBug(data);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Wystąpił nieznany błąd';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitReport,
    isSubmitting,
    error,
    setError,
  };
};
