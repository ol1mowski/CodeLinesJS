import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { reportBug } from '../api/reportBug.api';

export type FormData = {
  title: string;
  description: string;
  category: string;
  email: string;
};

export type FormErrors = {
  title?: string;
  description?: string;
  category?: string;
  email?: string;
};

export const useReportForm = () => {
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'bug',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tytuł jest wymagany';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Tytuł musi mieć co najmniej 5 znaków';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Opis jest wymagany';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Opis musi mieć co najmniej 20 znaków';
    }

    if (!formData.category) {
      newErrors.category = 'Kategoria jest wymagana';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Podaj prawidłowy adres email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'bug',
      email: '',
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await reportBug(token || '', formData);

      setSubmitSuccess(true);
      resetForm();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Wystąpił nieznany błąd');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSuccess = () => {
    setSubmitSuccess(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    handleChange,
    handleSubmit,
    resetSuccess,
  };
};
