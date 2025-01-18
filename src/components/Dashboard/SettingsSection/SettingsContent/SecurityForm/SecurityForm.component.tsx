import { motion } from "framer-motion";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaLock } from "react-icons/fa";
import { FormInput } from "../../../../UI/Form/FormInput/FormInput.component";

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Aktualne hasło jest wymagane"),
  newPassword: z.string().min(8, "Nowe hasło musi mieć min. 8 znaków"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Hasła nie są identyczne",
  path: ["confirmPassword"]
});

type SecurityFormData = z.infer<typeof securitySchema>;

export const SecurityForm = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema)
  });

  const onSubmit = async (data: SecurityFormData) => {
    console.log(data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <FormInput
        type="password"
        label="Aktualne hasło"
        placeholder="Wprowadź aktualne hasło"
        icon={<FaLock />}
        error={errors.currentPassword?.message}
        {...register("currentPassword")}
      />

      <FormInput
        type="password"
        label="Nowe hasło"
        placeholder="Wprowadź nowe hasło"
        icon={<FaLock />}
        error={errors.newPassword?.message}
        {...register("newPassword")}
      />

      <FormInput
        type="password"
        label="Potwierdź nowe hasło"
        placeholder="Potwierdź nowe hasło"
        icon={<FaLock />}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div className="flex justify-end gap-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-lg
            bg-dark/50 text-gray-400
            border border-js/10
            hover:text-js hover:border-js/30
            transition-colors duration-200"
        >
          Anuluj
        </motion.button>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-lg
            bg-js text-dark font-medium
            hover:bg-js/90
            transition-colors duration-200"
        >
          Zmień hasło
        </motion.button>
      </div>
    </motion.form>
  );
});

SecurityForm.displayName = "SecurityForm"; 