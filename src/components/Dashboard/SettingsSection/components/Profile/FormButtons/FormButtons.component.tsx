import { memo } from "react";
import { Button } from "../../../../../UI/Button/Button.component";
import { styles } from "./FormButtons.styles";

type FormButtonsProps = {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export const FormButtons = memo(({ onCancel, onSubmit, isSubmitting }: FormButtonsProps) => (
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
      onClick={onSubmit}
      disabled={isSubmitting}
      className={styles.submitButton}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
          <span>Zapisywanie</span>
        </div>
      ) : (
        "Zapisz zmiany"
      )}
    </Button>
  </div>
));

FormButtons.displayName = "FormButtons"; 