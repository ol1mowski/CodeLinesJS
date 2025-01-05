import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

import { FormInput } from "../../../UI/Form/FormInput.component";
import { Button } from "../../../UI/Button/Button.component";


 const RegisterForm = () => {
  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <FormInput
        type="text"
        label="Nazwa użytkownika"
        placeholder="jankowalski"
        icon={<FaUser />}
      />

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

      <FormInput
        type="password"
        label="Potwierdź hasło"
        placeholder="••••••••"
        icon={<FaLock />}
      />

      <Button type="submit" className="w-full">
        Zarejestruj się
      </Button>
    </motion.form>
  );
}; 

export default RegisterForm;