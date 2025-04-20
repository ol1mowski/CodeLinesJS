import { memo } from 'react';
import { Button } from '../../../../../../UI/Button/Button.component';
import { styles } from './FormButtons.styles';

export type FormButtonsProps = {
  onCancel: () => void;
  isSubmitting: boolean;
  submitText?: string;
  loadingText?: string;
  disabled?: boolean;
};

export const FormButtons = memo(
  ({
    onCancel,
    isSubmitting,
    submitText = 'Zapisz zmiany',
    loadingText = 'Zapisywanie',
    disabled = false,
  }: FormButtonsProps) => (
    <div className={styles.container}>
      <Button
        type="button"
        onClick={onCancel}
        className={styles.cancelButton}
        disabled={isSubmitting}
      >
        Anuluj zmiany
      </Button>

      <Button 
        type="submit" 
        disabled={isSubmitting || disabled} 
        className={styles.submitButton}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2 min-w-[100px]">
            <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
            <span className="text-sm sm:text-base whitespace-nowrap">{loadingText}</span>
          </div>
        ) : (
          <span className="text-sm sm:text-base whitespace-nowrap">{submitText}</span>
        )}
      </Button>
    </div>
  )
);

FormButtons.displayName = 'FormButtons';
