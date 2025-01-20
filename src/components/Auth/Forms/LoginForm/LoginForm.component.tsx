import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password, data.rememberMe);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {error && <ErrorMessage message={error} />}

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

      <RememberMeCheckbox register={register} />
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logowanie..." : "Zaloguj się"}
      </Button>

      <GoogleLoginButton rememberMe={rememberMe} />
    </motion.form>
  );
};

export default LoginForm;
