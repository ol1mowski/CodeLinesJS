import { z } from "zod";

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Hasło jest wymagane"),
  confirmation: z.string().min(1, "Potwierdzenie jest wymagane")
}).refine(data => data.confirmation === "USUŃ KONTO", {
  message: "Wpisz USUŃ KONTO aby potwierdzić",
  path: ["confirmation"]
}); 