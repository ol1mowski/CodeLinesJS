import { motion } from "framer-motion";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaUser, FaEnvelope } from "react-icons/fa";
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
    formState: { errors }
  } = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "JanKowalski",
      email: "jan@example.com",
      bio: "Frontend Developer"
    }
  });

  const onSubmit = async (data: UserProfile) => {
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
            type="text"
            label="Nazwa użytkownika"
            placeholder="Wprowadź nazwę użytkownika"
            icon={<FaUser />}
            error={errors.username?.message}
            {...register("username")}
          />
        </div>
      </div>

      <FormInput
        type="email"
        label="Email"
        placeholder="Wprowadź adres email"
        icon={<FaEnvelope />}
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="space-y-2">
        <label className="block text-gray-400 text-sm">Bio</label>
        <textarea
          {...register("bio")}
          className="w-full h-32 px-4 py-3 rounded-lg 
            bg-dark/50 border border-js/10
            text-gray-300 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-js/50
            resize-none"
          placeholder="Napisz coś o sobie..."
        />
        {errors.bio && (
          <span className="text-red-500 text-sm">{errors.bio.message}</span>
        )}
      </div>

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
          Zapisz zmiany
        </motion.button>
      </div>
    </motion.form>
  );
});

ProfileForm.displayName = "ProfileForm"; 