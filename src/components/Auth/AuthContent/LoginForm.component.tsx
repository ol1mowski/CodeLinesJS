import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FormInput } from "../../UI/Form/FormInput.component";
import { Button } from "../../UI/Button/Button.component";

export const LoginForm = () => {
  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <FormInput
        type="email"
        label="Email"
        placeholder="twoj@email.com"
        icon={<FaEnvelope />}
      />
      
      <FormInput
        type="password"
        label="Hasło"
        placeholder="••••••••"
        icon={<FaLock />}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-400">Zapamiętaj mnie</span>
        </label>
      </div>

      <Button type="submit" className="w-full">
        Zaloguj się
      </Button>
    </motion.form>
  );
}; 