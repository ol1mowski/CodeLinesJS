import { memo } from 'react';
import { motion } from 'framer-motion';
import { NotificationsSection } from '../NotificationsSection/NotificationsSection.component';
import { LanguageSection } from '../LanguageSection/LanguageSection.component';
import { UseFormSetValue } from 'react-hook-form';
import { PreferencesData } from '../../../../types/settings';
import { FormButtons } from '../../../ProfileForm/components/FormButtons/FormButtons.component';

export type PreferencesFormContentProps = {
  register: any;
  formValues: any;
  setValue: UseFormSetValue<PreferencesData>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isPending: boolean;
  isDirty?: boolean;
  isSaved?: boolean;
  isLoading?: boolean;
};

export const PreferencesFormContent = memo(
  ({
    register,
    formValues,
    setValue,
    onSubmit,
    onCancel,
    isSubmitting,
    isPending,
    isLoading = false,
  }: PreferencesFormContentProps) => (
    <motion.form
      onSubmit={onSubmit}
      className="w-full max-w-2xl sm:ml-0 sm:mr-auto space-y-8 px-4 sm:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-js/10 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-js"></div>
            <span className="ml-3 text-js">Ładowanie preferencji...</span>
          </div>
        ) : (
          <>
            <NotificationsSection
              register={register}
              values={formValues}
              onChange={(field, value) => setValue(field, value)}
              isLoading={isLoading}
            />

            <div className="w-full h-px bg-js/10" />

            <LanguageSection register={register} />
          </>
        )}
      </div>

      <FormButtons
        onCancel={onCancel}
        isSubmitting={isSubmitting || isPending}
        submitText="Zapisz preferencje"
        loadingText="Zapisywanie"
        disabled={isSubmitting}
      />
    </motion.form>
  )
);

PreferencesFormContent.displayName = 'PreferencesFormContent';
