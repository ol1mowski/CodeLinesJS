import { useState, useCallback } from "react";
import { useAuth } from "../../../../../hooks/useAuth";

export const useGoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [loginWithGoogle]);

  return { handleGoogleLogin, isLoading };
}; 