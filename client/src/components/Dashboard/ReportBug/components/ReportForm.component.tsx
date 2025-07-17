import { memo } from 'react';
import { useReportForm } from '../hooks/useReportForm.hook';
import { FormField } from './FormField.component';
import { SubmitButton } from './SubmitButton.component';
import { SuccessMessage } from './SuccessMessage.component';
import { ErrorMessage } from './ErrorMessage.component';
import { FormHeader } from './FormHeader.component';

const categoryOptions = [
  { value: 'bug', label: 'Błąd w aplikacji' },
  { value: 'feature', label: 'Propozycja funkcji' },
  { value: 'performance', label: 'Problem z wydajnością' },
  { value: 'security', label: 'Problem z bezpieczeństwem' },
  { value: 'other', label: 'Inne' },
];

export const ReportForm = memo(() => {
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    handleChange,
    handleSubmit,
    resetSuccess,
  } = useReportForm();

  return (
    <div className="w-full max-w-3xl mx-auto bg-dark-800/50 border border-js/10 rounded-xl p-6 md:p-8">
      <FormHeader />

      {submitSuccess ? (
        <SuccessMessage onReset={resetSuccess} />
      ) : (
        <form onSubmit={handleSubmit}>
          <FormField
            id="title"
            name="title"
            label="Tytuł"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Krótki opis problemu"
          />

          <FormField
            id="category"
            name="category"
            label="Kategoria"
            type="select"
            value={formData.category}
            onChange={handleChange}
            error={errors.category}
            options={categoryOptions}
          />

          <FormField
            id="description"
            name="description"
            label="Szczegółowy opis"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            placeholder="Opisz dokładnie napotkany problem, podaj kroki do jego odtworzenia"
          />

          <FormField
            id="email"
            name="email"
            label="Email kontaktowy"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Twój adres email"
          />

          {submitError && <ErrorMessage message={submitError} />}

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      )}
    </div>
  );
});

ReportForm.displayName = 'ReportForm';
