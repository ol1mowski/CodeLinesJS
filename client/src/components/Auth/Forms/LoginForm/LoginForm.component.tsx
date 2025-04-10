import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { FormInput } from "../../../UI/Form/FormInput/FormInput.component";
import { LoginFormData, loginSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../hooks/useAuth";
import { GoogleLoginButton } from "./GoogleLoginButton.component";
import { RememberMeCheckbox } from "./RememberMeCheckbox.component";
import { FormError } from "../../../UI/FormError/FormError.component";
import { FormLoadingButton } from "../../../UI/Loading/FormLoadingButton.component";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const rememberMe: boolean = watch("rememberMe", false) || false;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password, data.rememberMe);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {error && <FormError message={error} withIcon variant="standard" />}

      <FormInput
        type="email"
        label="Email"
        placeholder="twoj@email.com"
        icon={<FaEnvelope />}
        error={errors.email?.message}
        {...register("email")}
      />

      <FormInput
        type={showPassword ? "text" : "password"}
        label="Hasło"
        placeholder="••••••••"
        icon={<FaLock />}
        error={errors.password?.message}
        {...register("password")}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none text-gray-400 hover:text-js transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <RememberMeCheckbox register={register} />
      </div>
      
      <div className="pt-2">
        <FormLoadingButton 
          isLoading={loading}
          loadingText="Logowanie..."
        >
          Zaloguj się
        </FormLoadingButton>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-gray-600 w-full"></div>
        <span className="bg-dark/50 px-3 text-sm text-gray-400 absolute">lub</span>
      </div>

      <GoogleLoginButton rememberMe={rememberMe} />
    </motion.form>
  );
};

export default LoginForm;
