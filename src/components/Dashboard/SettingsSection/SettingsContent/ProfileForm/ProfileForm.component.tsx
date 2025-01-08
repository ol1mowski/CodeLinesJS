import { motion } from "framer-motion";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserProfile } from "../../../../../types/settings.types";
import { FormInput } from "../../../../UI/Form/FormInput/FormInput.component";
import { Button } from "../../../../UI/Button/Button.component";

const profileSchema = z.object({
  username: z.string().min(3, "Nazwa użytkownika musi mieć min. 3 znaki"),
  email: z.string().email("Nieprawidłowy format email"),
  bio: z.string().optional(),
});

export const ProfileForm = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "JanKowalski",
      email: "jan@example.com",
      bio: "Frontend Developer"
    }
  });

  const onSubmit = async (data: UserProfile) => {
    // Tutaj będzie integracja z API
    console.log(data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src="https://i.pravatar.cc/100"
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <Button
            type="button"
            className="absolute bottom-0 right-0 !p-2 rounded-full"
          >
            <span className="sr-only">Zmień avatar</span>
            📷
          </Button>
        </div>
        <div className="flex-1">
          <FormInput
            label="Nazwa użytkownika"
            error={errors.username?.message}
            {...register("username")}
          />
        </div>
      </div>

      <FormInput
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          {...register("bio")}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none h-32"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          {isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}
        </Button>
      </div>
    </motion.form>
  );
});

ProfileForm.displayName = "ProfileForm"; 