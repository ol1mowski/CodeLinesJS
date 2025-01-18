import { memo } from "react";
import { Button } from "../../../../../UI/Button/Button.component";
import { styles } from "./FormButtons.styles";

type FormButtonsProps = {
  onCancel: () => void;
  isSubmitting: boolean;
};

export const FormButtons = memo(({ onCancel, isSubmitting }: FormButtonsProps) => (
  <div className={styles.container}>
    <Button
      type="button"
      onClick={onCancel}
      className={styles.cancelButton}
    >
      Anuluj
    </Button>

    <Button
      type="submit"
      disabled={isSubmitting}
      className={styles.submitButton}
    >
      {isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}
    </Button>
  </div>
));

FormButtons.displayName = "FormButtons"; 