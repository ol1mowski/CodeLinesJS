import { z } from "zod";

export const securitySchema = z.object({
  currentPassword: z.string()
    .min(1, "Aktualne hasło jest wymagane")
    .min(8, "Hasło musi mieć minimum 8 znaków"),
  newPassword: z.string()
    .min(1, "Nowe hasło jest wymagane")
    .min(8, "Nowe hasło musi mieć minimum 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
    .regex(/[0-9]/, "Hasło musi zawierać cyfrę"),
  confirmPassword: z.string()
    .min(1, "Potwierdzenie hasła jest wymagane")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Hasła muszą być takie same",
  path: ["confirmPassword"]
});

export type SecurityFormData = z.infer<typeof securitySchema>; 