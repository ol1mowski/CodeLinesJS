import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useReportForm } from './hooks/useReportForm.hook';
import { FormData } from './hooks/types';

export const ReportBugForm = memo(() => {
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

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-bold text-green-400 mb-4">Zgłoszenie zostało wysłane!</h3>
        <p className="text-gray-400 mb-4">Dziękujemy za zgłoszenie. Przeanalizujemy je i odpowiemy wkrótce.</p>
        <button
          onClick={resetSuccess}
          className="px-4 py-2 bg-js/10 text-js border border-js/20 rounded-lg hover:bg-js/20 transition-colors"
        >
          Wyślij kolejne zgłoszenie
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-gray-300 mb-1">Tytuł</label>
        <input
          {...register('title')}
          className="w-full bg-dark/50 border border-js/20 rounded-lg p-3 text-white focus:border-js focus:outline-none"
          placeholder="Krótki opis problemu"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Kategoria</label>
        <select
          {...register('category')}
          className="w-full bg-dark/50 border border-js/20 rounded-lg p-3 text-white focus:border-js focus:outline-none"
        >
          <option value="bug">Błąd w aplikacji</option>
          <option value="feature">Propozycja funkcji</option>
          <option value="performance">Problem z wydajnością</option>
          <option value="security">Problem z bezpieczeństwem</option>
          <option value="other">Inne</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Szczegółowy opis</label>
        <textarea
          {...register('description')}
          rows={5}
          className="w-full bg-dark/50 border border-js/20 rounded-lg p-3 text-white focus:border-js focus:outline-none"
          placeholder="Opisz dokładnie napotkany problem"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-gray-300 mb-1">Email kontaktowy</label>
        <input
          type="email"
          {...register('email')}
          className="w-full bg-dark/50 border border-js/20 rounded-lg p-3 text-white focus:border-js focus:outline-none"
          placeholder="Twój adres email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-js text-white rounded-lg hover:bg-js/90 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij zgłoszenie'}
      </button>
    </form>
  );
});

ReportBugForm.displayName = 'ReportBugForm';
