import { motion, AnimatePresence } from "framer-motion";
import { useState, lazy, Suspense } from "react";
import { AuthTabs } from "./AuthTabs.component";
import { FaCode } from "react-icons/fa";

type AuthMode = "login" | "register" | "forgot";

const LoginForm = lazy(() => import("../Forms/LoginForm/LoginForm.component"));
const RegisterForm = lazy(() => import("./RegisterForm.component"));
const ForgotPasswordForm = lazy(() => import("./ForgotPasswordForm.component"));

export const AuthContent = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50"
      role="main"
      aria-label="Formularz autoryzacji"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
          <FaCode className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
          CodeLinesJS
        </h2>
      </div>

      <h1 className="text-3xl font-bold font-space text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-8">
        {authMode === "login" && "Logowanie"}
        {authMode === "register" && "Rejestracja"}
        {authMode === "forgot" && "Reset hasła"}
      </h1>

      <AuthTabs activeTab={authMode} onTabChange={setAuthMode} />

      <Suspense fallback={<div className="text-center py-4">Ładowanie...</div>}>
        <AnimatePresence mode="wait">
          {authMode === "login" && <LoginForm key="login" />}
          {authMode === "register" && <RegisterForm key="register" />}
          {authMode === "forgot" && <ForgotPasswordForm key="forgot" />}
        </AnimatePresence>
      </Suspense>
    </motion.div>
  );
};
