import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PasswordFields } from './components/PasswordFields/PasswordFields.component';
import { useSecurityForm } from './hooks/useSecurityForm';
import { FormButtons } from '../ProfileForm/components/FormButtons/FormButtons.component';
import { useSecurityToasts } from './hooks/useSecurityToasts';
import { FORM_ANIMATION } from './constans/constants';

export const SecurityForm = memo(() => {
  const {
    handleSuccess,
    handleError,
    handleCancel: handleCancelToast,
    handleCancelError,
  } = useSecurityToasts();

  const { form, onSubmit, isUpdating } = useSecurityForm({
    onSuccess: () => {
      handleSuccess();
      form.reset();
    },
    onError: handleError,
  });

  const {
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const handleCancel = useCallback(() => {
    try {
      reset();
      handleCancelToast();
    } catch (error) {
      handleCancelError();
    }
  }, [reset, handleCancelToast, handleCancelError]);

  return (
    <motion.form
      onSubmit={onSubmit}
      className="w-full max-w-md sm:ml-0 sm:mr-auto space-y-8 px-4 sm:px-0"
      {...FORM_ANIMATION}
    >
      <PasswordFields form={form} errors={errors} />

      <FormButtons
        onCancel={handleCancel}
        isSubmitting={isSubmitting || isUpdating}
        submitText="Zmień hasło"
        loadingText="Zmienianie hasła"
      />
    </motion.form>
  );
});

SecurityForm.displayName = 'SecurityForm';
