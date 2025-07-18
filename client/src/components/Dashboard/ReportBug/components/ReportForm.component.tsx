import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useReportForm } from '../hooks/useReportForm.hook';
import { FormField } from './FormField.component';
import { SubmitButton } from './SubmitButton.component';
import { SuccessMessage } from './SuccessMessage.component';
import { ErrorMessage } from './ErrorMessage.component';
import { FormHeader } from './FormHeader.component';
import { FormData } from '../hooks/types';

const categoryOptions = [
  { value: 'bug', label: 'Błąd w aplikacji' },
  { value: 'feature', label: 'Propozycja funkcji' },
  { value: 'performance', label: 'Problem z wydajnością' },
  { value: 'security', label: 'Problem z bezpieczeństwem' },
  { value: 'other', label: 'Inne' },
];

export const ReportForm = memo(() => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { submitReport, isSubmitting, error } = useReportForm();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      category: 'bug',
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const result = await submitReport(data);
    if (result.success) {
      setSubmitSuccess(true);
      reset();
    }
  };

  const resetSuccess = () => {
    setSubmitSuccess(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-dark-800/50 border border-js/10 rounded-xl p-6 md:p-8">
      <FormHeader />

      {submitSuccess ? (
        <SuccessMessage onReset={resetSuccess} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            id="title"
            name="title"
            label="Tytuł"
            register={register}
            error={errors.title?.message}
            placeholder="Krótki opis problemu"
          />

          <FormField
            id="category"
            name="category"
            label="Kategoria"
            type="select"
            register={register}
            error={errors.category?.message}
            options={categoryOptions}
          />

          <FormField
            id="description"
            name="description"
            label="Szczegółowy opis"
            type="textarea"
            register={register}
            error={errors.description?.message}
            placeholder="Opisz dokładnie napotkany problem, podaj kroki do jego odtworzenia"
          />

          <FormField
            id="email"
            name="email"
            label="Email kontaktowy"
            type="email"
            register={register}
            error={errors.email?.message}
            placeholder="Twój adres email"
          />

          {error && <ErrorMessage message={error} />}

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      )}
    </div>
  );
});

ReportForm.displayName = 'ReportForm';
