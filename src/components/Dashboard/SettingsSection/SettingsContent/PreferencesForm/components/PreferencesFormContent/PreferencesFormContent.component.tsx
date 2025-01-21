import { memo } from 'react';
import { motion } from 'framer-motion';
import { NotificationsSection } from '../NotificationsSection/NotificationsSection.component';
import { LanguageSection } from '../LanguageSection/LanguageSection.component';
import { FormButtons } from '../../../../components/Profile/FormButtons/FormButtons.component';
import { UseFormSetValue } from 'react-hook-form';


interface PreferencesFormContentProps {
  register: any;
  formValues: any;
  setValue: UseFormSetValue<PreferencesData>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isPending: boolean;
}

export const PreferencesFormContent = memo(({
  register,
  formValues,
  setValue,
  onSubmit,
  onCancel,
  isSubmitting,
  isPending
}: PreferencesFormContentProps) => (
  <motion.form
    onSubmit={onSubmit}
    className="w-full max-w-2xl sm:ml-0 sm:mr-auto space-y-8 px-4 sm:px-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-js/10 space-y-6">
      <NotificationsSection 
        register={register} 
        values={formValues}
        onChange={(field, value) => setValue(field, value)}
      />
      
      <div className="w-full h-px bg-js/10" />
      
      <LanguageSection register={register} />
    </div>

    <FormButtons 
      onCancel={onCancel}
      isSubmitting={isSubmitting || isPending}
      submitText="Zapisz preferencje"
      loadingText="Zapisywanie"
    />
  </motion.form>
));

PreferencesFormContent.displayName = 'PreferencesFormContent'; 