import { motion, AnimatePresence } from "framer-motion";
import { useState, lazy, Suspense } from "react";
import { AuthTabs } from "./AuthTabs.component";

type AuthMode = "login" | "register" | "forgot";

const LoginForm = lazy(() => import("../Forms/LoginForm/LoginForm.component"));
const RegisterForm = lazy(() => import("../Forms/RegisterForm/RegisterForm.component"));
const ForgotPasswordForm = lazy(() => import("../Forms/ForgotPasswordForm/ForgotPasswordForm.component"));

export const AuthContent = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-dark/30 backdrop-blur-xl rounded-2xl p-8 border border-js/20 shadow-xl shadow-black/20"
      role="main"
      aria-label="Formularz autoryzacji"
    >
      <div className="flex flex-col justify-center items-center mb-6">
        <span className="block text-2xl bg-[#f7df1e] text-black px-2 py-1 rounded">JS</span>
        <h2 className="mt-2 text-xl font-bold text-js">
          CodeLinesJS
        </h2>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-center text-js mb-6">
        {authMode === "login" && "Zaloguj się"}
        {authMode === "register" && "Dołącz do nas"}
        {authMode === "forgot" && "Odzyskaj hasło"}
      </h1>

      <AuthTabs activeTab={authMode} onTabChange={setAuthMode} />

      <Suspense fallback={<div className="text-center py-4">Ładowanie...</div>}>
        <AnimatePresence mode="wait">
          {authMode === "login" && <LoginForm key="login" />}
          {authMode === "register" && <RegisterForm key="register" />}
          {authMode === "forgot" && <ForgotPasswordForm key="forgot" />}
        </AnimatePresence>
      </Suspense>
      
      <div className="mt-6 text-center text-sm text-gray-400">
        <p>Logując się, akceptujesz nasz <a href="#" className="text-js hover:underline">Regulamin</a> oraz <a href="#" className="text-js hover:underline">Politykę Prywatności</a>.</p>
      </div>
    </motion.div>
  );
};
