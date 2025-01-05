import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Button } from "../../../UI/Button/Button.component";
import { FormInput } from "../../../UI/Form/FormInput/FormInput.component";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../hooks/useAuth";

const ForgotPasswordForm = () => {
  const { forgotPassword, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const message = await forgotPassword(data.email);
      setSuccessMessage(message);
      reset();
    } catch (error) {
      setSuccessMessage(null);
    }
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
        Podaj swój adres email, a wyślemy Ci link do zresetowania hasła.
      </p>
      
      <FormInput
        type="email"
        label="Email"
        placeholder="twoj@email.com"
        icon={<FaEnvelope />}
        error={errors.email?.message}
        {...register("email")}
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Wysyłanie..." : "Wyślij link resetujący"}
      </Button>
    </motion.form>
  );
};

export default ForgotPasswordForm; 