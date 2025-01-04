import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { FormInput } from "../../UI/Form/FormInput.component";
import { Button } from "../../UI/Button/Button.component";

export const ForgotPasswordForm = () => {
  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <p className="text-gray-400 text-sm mb-6">
        Podaj swój adres email, a wyślemy Ci link do zresetowania hasła.
      </p>
      
      <FormInput
        type="email"
        label="Email"
        placeholder="twoj@email.com"
        icon={<FaEnvelope />}
      />

      <Button type="submit" className="w-full">
        Wyślij link resetujący
      </Button>
    </motion.form>
  );
}; 