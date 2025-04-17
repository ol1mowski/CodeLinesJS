import { useState, useCallback } from 'react';
import {
  useForm,
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  SubmitErrorHandler,
  DefaultValues,
} from 'react-hook-form';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from './useFormStatus.hook';

type UseFormValidatorProps<TFormValues extends FieldValues> = {
  schema: ZodSchema<TFormValues>;
  defaultValues?: DefaultValues<TFormValues>;
  mode?: 'onSubmit' | 'onChange' | 'onBlur' | 'onTouched' | 'all';
  resetOnSuccess?: boolean;
  onSuccess?: (data: TFormValues) => void | Promise<void>;
  onError?: (error: any) => void;
};

type UseFormValidatorReturn<TFormValues extends FieldValues> = Omit<
  UseFormReturn<TFormValues>,
  'handleSubmit'
> & {
  isSubmitting: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  onFormSubmit: ReturnType<UseFormReturn<TFormValues>['handleSubmit']>;
  handleSubmitWithValidation: (data: TFormValues) => Promise<void>;
};

export const useFormValidator = <TFormValues extends FieldValues>({
  schema,
  defaultValues,
  mode = 'onSubmit',
  resetOnSuccess = true,
  onSuccess,
  onError,
}: UseFormValidatorProps<TFormValues>): UseFormValidatorReturn<TFormValues> => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStatus = useFormStatus({ resetOnSuccess });

  const formMethods = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
  });

  const handleSubmitWithValidation = useCallback(
    async (data: TFormValues) => {
      try {
        setIsSubmitting(true);
        formStatus.resetStatus();

        if (onSuccess) {
          await onSuccess(data);
        }
      } catch (error) {
        formStatus.handleError(error);
        if (onError) {
          onError(error);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSuccess, onError, formStatus]
  );

  const onSubmit: SubmitHandler<TFormValues> = useCallback(
    data => {
      handleSubmitWithValidation(data);
    },
    [handleSubmitWithValidation]
  );

  const onSubmitError: SubmitErrorHandler<TFormValues> = useCallback(
    errors => {
      console.error('Form validation errors:', errors);
      formStatus.setError('Formularz zawiera błędy. Sprawdź wprowadzone dane.');
    },
    [formStatus]
  );

  const onFormSubmit = formMethods.handleSubmit(onSubmit, onSubmitError);

  return {
    ...formMethods,
    isSubmitting,
    errorMessage: formStatus.errorMessage,
    successMessage: formStatus.successMessage,
    onFormSubmit,
    handleSubmitWithValidation,
  };
};
