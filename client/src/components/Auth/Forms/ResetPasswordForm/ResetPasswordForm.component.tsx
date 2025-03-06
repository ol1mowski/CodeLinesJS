import { motion } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../../../UI/Button/Button.component";
import { FormInput } from "../../../UI/Form/FormInput/FormInput.component";
import { ResetPasswordFormData, resetPasswordSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../Hooks/useAuth";
import { ErrorMessage } from "../../../UI/ErrorMessage/ErrorMessage.component";

const ResetPasswordForm = () => {
  const { token } = useParams<{ token: string }>();
  const { resetPassword, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      return;
    }
    
    try {
      const message = await resetPassword(token, data.password);
      setSuccessMessage(message);
    } catch (error) {
      setSuccessMessage(null);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {error && <ErrorMessage message={error} />}

      {successMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
        >
          {successMessage}
        </motion.div>
      )}

      <p className="text-gray-400 text-sm mb-6">
        Wprowadź nowe hasło dla swojego konta.
      </p>

      <FormInput
        type={showPassword ? "text" : "password"}
        label="Nowe hasło"
        placeholder="••••••••"
        icon={<FaLock />}
        error={errors.password?.message}
        {...register("password")}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none text-gray-400 hover:text-gray-500 transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        }
      />

      <FormInput
        type={showConfirmPassword ? "text" : "password"}
        label="Potwierdź nowe hasło"
        placeholder="••••••••"
        icon={<FaLock />}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="focus:outline-none text-gray-400 hover:text-gray-500 transition-colors"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        }
      />

      <Button type="submit" className="w-full" disabled={loading || !!successMessage}>
        {loading ? "Resetowanie hasła..." : "Zresetuj hasło"}
      </Button>
    </motion.form>
  );
};

export default ResetPasswordForm; 