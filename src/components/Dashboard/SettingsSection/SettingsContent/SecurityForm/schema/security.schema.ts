import { z } from "zod";

export const securitySchema = z.object({
  currentPassword: z.string()
    .min(8, "Hasło musi mieć minimum 8 znaków"),
  newPassword: z.string()
    .min(8, "Nowe hasło musi mieć minimum 8 znaków"),
  confirmPassword: z.string()
    .min(8, "Potwierdzenie hasła musi mieć minimum 8 znaków")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Hasła muszą być takie same",
  path: ["confirmPassword"]
});

export type SecurityFormData = z.infer<typeof securitySchema>; 