import { z } from "zod";

export const securitySchema = z.object({
  currentPassword: z.string().min(1, "Aktualne hasło jest wymagane"),
  newPassword: z.string().min(8, "Nowe hasło musi mieć min. 8 znaków"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Hasła nie są identyczne",
  path: ["confirmPassword"]
});

export const profileSchema = z.object({
  username: z.string().min(3, "Nazwa użytkownika musi mieć min. 3 znaki"),
  email: z.string().email("Nieprawidłowy format email"),
  bio: z.string().optional(),
});

export const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  darkMode: z.boolean(),
  language: z.enum(["pl", "en"])
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Hasło jest wymagane"),
  confirmation: z.string().min(1, "Potwierdzenie jest wymagane")
}).refine(data => data.confirmation === "USUŃ KONTO", {
  message: "Wpisz USUŃ KONTO aby potwierdzić",
  path: ["confirmation"]
}); 