import { useNavigate } from "react-router-dom";
import { httpClient } from "../../../../api/httpClient.api";

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useGoogleLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const loginWithGoogle = async (
    credentialResponse: any,
    rememberMe: boolean = false
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await httpClient.post("auth/google-login", {
        credential: credentialResponse.credential,
        rememberMe,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.data) {
        throw new Error(
          "Nieznany błąd logowania przez Google. Spróbuj ponownie później."
        );
      }

      const { token, user } = response.data;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      if (setUser && user) {
        setUser(user);
      }

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Wystąpił błąd podczas logowania przez Google"
      );
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return loginWithGoogle;
};
