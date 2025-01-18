import { memo } from "react";
import { Button } from "../../../../../UI/Button/Button.component";
import { styles } from "./FormButtons.styles";

type FormButtonsProps = {
  saveDataHandler: () => void;
  isSubmitting: boolean;
};

export const FormButtons = memo(({ saveDataHandler, isSubmitting }: FormButtonsProps) => (
  <div className={styles.container}>
    <Button
      type="button"
      onClick={saveDataHandler}
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