import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, "Email jest wymagany")
    .email("Nieprawidłowy format email"),
  password: z.string()
    .min(1, "Hasło jest wymagane"),
  rememberMe: z.boolean().optional()
});

export const registerSchema = z.object({
  username: z.string()
    .min(1, "Nazwa użytkownika jest wymagana")
    .min(3, "Nazwa użytkownika musi mieć minimum 3 znaki")
    .max(20, "Nazwa użytkownika może mieć maksymalnie 20 znaków"),
  email: z.string()
    .min(1, "Email jest wymagany")
    .email("Nieprawidłowy format email"),
  password: z.string()
    .min(1, "Hasło jest wymagane")
    .min(8, "Hasło musi mieć minimum 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
    .regex(/[0-9]/, "Hasło musi zawierać cyfrę")
    .regex(/[^A-Za-z0-9]/, "Hasło musi zawierać znak specjalny"),
  confirmPassword: z.string()
    .min(1, "Potwierdzenie hasła jest wymagane"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Hasła muszą być takie same",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, "Email jest wymagany")
    .email("Nieprawidłowy format email"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>; 