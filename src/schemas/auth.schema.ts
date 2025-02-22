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
  username: z
    .string()
    .min(3, "Nazwa użytkownika musi mieć minimum 3 znaki")
    .max(20, "Nazwa użytkownika nie może przekraczać 20 znaków")
    .regex(/^[a-zA-Z0-9_]+$/, "Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia"),
  email: z
    .string()
    .email("Nieprawidłowy format adresu email"),
  password: z
    .string()
    .min(8, "Hasło musi mieć minimum 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną wielką literę")
    .regex(/[a-z]/, "Hasło musi zawierać przynajmniej jedną małą literę")
    .regex(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę"),
  confirmPassword: z
    .string(),
  acceptPrivacy: z
    .boolean()
    .refine((val) => val === true, {
      message: "Musisz zaakceptować politykę prywatności"
    })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Hasła muszą być identyczne",
  path: ["confirmPassword"]
});

export const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, "Email jest wymagany")
    .email("Nieprawidłowy format email"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>; 