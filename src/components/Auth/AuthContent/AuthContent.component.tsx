import { motion } from "framer-motion";
import { useState } from "react";
import { AuthTabs } from "./AuthTabs.component";

type AuthMode = "login" | "register" | "forgot";

export const AuthContent = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50"
    >
      <h1 className="text-3xl font-bold font-space text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-8">
        {authMode === "login" && "Logowanie"}
        {authMode === "register" && "Rejestracja"}
        {authMode === "forgot" && "Reset hasła"}
      </h1>
      <AuthTabs activeTab={authMode} onTabChange={setAuthMode} />
    </motion.div>
  );
}; 