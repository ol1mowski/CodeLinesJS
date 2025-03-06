import { motion } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash, FaExclamationTriangle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { Button } from "../../../UI/Button/Button.component";
import { FormInput } from "../../../UI/Form/FormInput/FormInput.component";
import { ResetPasswordFormData, resetPasswordSchema } from "../../../../schemas/auth.schema";
import { useAuth } from "../../../../Hooks/useAuth";

const ResetPasswordForm = () => {
  const { token } = useParams<{ token: string }>();
  const { resetPassword, loading, error: authError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<boolean>(false);

  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
    }
  }, [authError]);

  useEffect(() => {
    if (!token) {
      setTokenError(true);
      setErrorMessage("Brak tokenu resetowania hasła. Sprawdź, czy link jest poprawny.");
    } else if (token.length < 10) {
      setTokenError(true);
      setErrorMessage("Token resetowania hasła jest nieprawidłowy. Sprawdź, czy link jest poprawny.");
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setErrorMessage("Brak tokenu resetowania hasła. Sprawdź, czy link jest poprawny.");
      return;
    }
    
    try {
      setErrorMessage(null);
      const message = await resetPassword(token, data.password, data.confirmPassword);
      setSuccessMessage(message);
      reset();
    } catch (err) {
      setSuccessMessage(null);
      if (err instanceof Error) {
        if (err.message.includes("token")) {
          setErrorMessage("Token resetowania hasła wygasł lub jest nieprawidłowy. Spróbuj ponownie zresetować hasło.");
          setTokenError(true);
        } else if (err.message.includes("429") || err.message.includes("wiele")) {
          setErrorMessage("Zbyt wiele prób resetowania hasła. Poczekaj chwilę i spróbuj ponownie.");
        } else if (err.message.includes("serwera")) {
          setErrorMessage("Wystąpił problem z serwerem. Spróbuj ponownie później.");
        } else if (err.message.includes("identyczne")) {
          setErrorMessage("Hasła nie są identyczne. Upewnij się, że oba pola zawierają to samo hasło.");
        } else {
          setErrorMessage(err.message);
        }
      } else {
        setErrorMessage("Wystąpił nieznany błąd podczas resetowania hasła. Spróbuj ponownie później.");
      }
    }
  };

  if (tokenError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start">
          <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold mb-1">Błąd tokenu resetowania hasła</p>
            <p>{errorMessage}</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-400 mb-4">Możesz spróbować ponownie zresetować hasło:</p>
          <Link to="/logowanie" className="text-js hover:underline">
            Wróć do strony logowania
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start"
        >
          <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold mb-1">Błąd resetowania hasła</p>
            <p>{errorMessage}</p>
          </div>
        </motion.div>
      )}

      {successMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm"
        >
          <p className="font-semibold mb-1">Sukces!</p>
          <p>{successMessage}</p>
        </motion.div>
      )}

      {!successMessage && (
        <>
          <p className="text-gray-400 text-sm mb-6">
            Wprowadź nowe hasło dla swojego konta. Hasło musi zawierać co najmniej 8 znaków, 
            w tym jedną wielką literę, jedną małą literę i jedną cyfrę.
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
                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
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
                aria-label={showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resetowanie hasła..." : "Zresetuj hasło"}
          </Button>
        </>
      )}

      {successMessage && (
        <div className="text-center mt-4">
          <p className="text-gray-400 mb-2">Za chwilę zostaniesz przekierowany do strony logowania.</p>
          <Link to="/logowanie" className="text-js hover:underline">
            Przejdź do logowania
          </Link>
        </div>
      )}
    </motion.form>
  );
};

export default ResetPasswordForm; 