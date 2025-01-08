import { motion } from "framer-motion";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaLock } from "react-icons/fa";
import { SecuritySettings } from "../../../../../types/settings.types";
import { FormInput } from "../../../../UI/Form/FormInput/FormInput.component";
import { Button } from "../../../../UI/Button/Button.component";

const securitySchema = z.object({
  currentPassword: z.string().min(1, "Aktualne hasło jest wymagane"),
  newPassword: z
    .string()
    .min(8, "Hasło musi mieć minimum 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
    .regex(/[0-9]/, "Hasło musi zawierać cyfrę")
    .regex(/[^A-Za-z0-9]/, "Hasło musi zawierać znak specjalny"),
  confirmPassword: z.string().min(1, "Potwierdzenie hasła jest wymagane"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Hasła muszą być takie same",
  path: ["confirmPassword"],
});

export const SecurityForm = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SecuritySettings>({
    resolver: zodResolver(securitySchema)
  });

  const onSubmit = async (data: SecuritySettings) => {
    console.log(data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md"
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

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          {isSubmitting ? "Zapisywanie..." : "Zmień hasło"}
        </Button>
      </div>
    </motion.form>
  );
});

SecurityForm.displayName = "SecurityForm"; 