import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../UI/Button/Button.component";
import { FormInput } from "../../../UI/Form/FormInput/FormInput.component";
import { LoginFormData, loginSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../hooks/useAuth";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
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

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500"
            {...register("rememberMe")}
          />
          <span className="text-sm text-gray-400">Zapamiętaj mnie</span>
        </label>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800/50 text-gray-400">
            Lub kontynuuj przez
          </span>
        </div>
      </div>

      <Button
        type="button"
        className="w-full bg-white hover:bg-indigo-500 border-2 border-gray-200 text-black hover:text-white transition-colors duration-200"
      >
        <div className="flex items-center justify-center gap-2">
          <FaGoogle className="text-xl" />
          <span className="font-semibold">Zaloguj się przez Google</span>
        </div>
      </Button>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logowanie..." : "Zaloguj się"}
      </Button>
    </motion.form>
  );
};

export default LoginForm;
