import { memo } from "react";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "../../../UI/Button/Button.component";
import { useGoogleLogin } from "./hooks/useGoogleLogin.hook";

export const GoogleLoginButton = memo(() => {
  const { handleGoogleLogin, isLoading } = useGoogleLogin();

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800/50 text-gray-400">
            Lub kontynuuj przez
          </span>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full bg-white hover:bg-indigo-500 border-2 border-gray-200 text-black hover:text-white transition-colors duration-200"
      >
        <motion.div 
          className="flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaGoogle className="text-xl" />
          <span className="font-semibold">
            {isLoading ? "Logowanie..." : "Zaloguj się przez Google"}
          </span>
        </motion.div>
      </Button>
    </>
  );
});

GoogleLoginButton.displayName = "GoogleLoginButton"; 