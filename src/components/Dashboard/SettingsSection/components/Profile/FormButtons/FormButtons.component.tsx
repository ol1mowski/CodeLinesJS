import { memo } from "react";
import { Button } from "../../../../../UI/Button/Button.component";
import { styles } from "./FormButtons.styles";

type FormButtonsProps = {
  onCancel: () => void;
  isSubmitting: boolean;
  submitText?: string;
  loadingText?: string;
};

export const FormButtons = memo(({ 
  onCancel, 
  isSubmitting,
  submitText = "Zapisz zmiany",
  loadingText = "Zapisywanie"
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
      disabled={isSubmitting}
      className={styles.submitButton}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        submitText
      )}
    </Button>
  </div>
));

FormButtons.displayName = "FormButtons"; 