import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../UI/Button/Button.component";
import { FormInput } from "../../../UI/Form/FormInput/FormInput.component";
import { RegisterFormData, registerSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../Hooks/useAuth";

const RegisterForm = () => {
  const { register: registerUser, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data.email, data.password, data.username);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <FormInput
        type="text"
        label="Nazwa użytkownika"
        placeholder="jankowalski"
        icon={<FaUser />}
        error={errors.username?.message}
        {...register("username")}
      />

      <FormInput
        type="email"
        label="Email"
        placeholder="twoj@email.com"
        icon={<FaEnvelope />}
        error={errors.email?.message}
        {...register("email")}
      />
      
      <FormInput
        type="password"
        label="Hasło"
        placeholder="••••••••"
        icon={<FaLock />}
        error={errors.password?.message}
        {...register("password")}
      />

      <FormInput
        type="password"
        label="Potwierdź hasło"
        placeholder="••••••••"
        icon={<FaLock />}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Rejestracja..." : "Zarejestruj się"}
      </Button>
    </motion.form>
  );
};

export default RegisterForm;