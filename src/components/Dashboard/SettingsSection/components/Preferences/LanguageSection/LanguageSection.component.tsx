import { memo } from "react";
import { FaGlobe } from "react-icons/fa";
import type { UseFormRegister } from "react-hook-form";
import type { PreferencesData } from "../../../types/settings";
import { styles } from "./LanguageSection.styles";

type LanguageSectionProps = {
  register: UseFormRegister<PreferencesData>;
};

export const LanguageSection = memo(({ register }: LanguageSectionProps) => (
  <div className={styles.section}>
    <h3 className={styles.title}>
      <FaGlobe className={styles.icon} />
      Język
    </h3>
    <div className={styles.container}>
      <select
        {...register("language")}
        className={styles.select}
      >
        <option value="pl">Polski</option>
      </select>
    </div>
  </div>
));

LanguageSection.displayName = "LanguageSection"; 