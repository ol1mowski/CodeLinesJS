import { memo } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { UserProfile } from "../../../types/settings";
import { styles } from "./BioField.styles";
import { useProfile } from "../../../hooks/useProfile";

type BioFieldProps = {
  register: UseFormRegister<UserProfile>;
  errors: FieldErrors<UserProfile>;
};


export const BioField = memo(({ register, errors }: BioFieldProps) => {

  const { bio } = useProfile();
  
  return (
    <div className={styles.container}>
      <label className={styles.label}>Bio</label>
      <textarea
        {...register("bio")}
        className={styles.textarea}
        placeholder={bio || "Napisz coś o sobie..."}
      />
      {errors.bio && (
        <span className={styles.error}>{errors.bio.message}</span>
      )}
    </div>
  );
});

BioField.displayName = "BioField"; 