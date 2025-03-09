import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Button } from "../../../UI/Button/Button.component";
import { FormInput } from "../../../UI/Form/FormInput/FormInput.component";
import { LoginFormData, loginSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../Hooks/useAuth";
import { GoogleLoginButton } from "./GoogleLoginButton.component";
import { RememberMeCheckbox } from "./RememberMeCheckbox.component";
import { ErrorMessage } from "../../../UI/ErrorMessage/ErrorMessage.component";

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
      {error && <ErrorMessage message={error} />}

      <FormInput
        type="email"
        label="Email"
        placeholder="twoj@email.com"
        icon={<FaEnvelope />}
        error={errors.email?.message}
        {...register("email")}
        className="bg-dark/20 backdrop-blur-xl"
      />

      <FormInput
        type={showPassword ? "text" : "password"}
        label="Hasło"
        placeholder="••••••••"
        icon={<FaLock />}
        error={errors.password?.message}
        {...register("password")}
        className="bg-dark/20 backdrop-blur-xl"
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
        <Button 
          type="submit" 
          className="w-full bg-js hover:bg-js/90 text-black font-bold py-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-js/20" 
          disabled={loading}
        >
          {loading ? "Logowanie..." : "Zaloguj się"}
        </Button>
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
