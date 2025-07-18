import { httpClient } from "../../../../api/httpClient.api";
import { useNavigate } from 'react-router-dom';
import { AuthStateContext } from '../../types/auth.types';

export const useGoogleLoginAction = (state: AuthStateContext) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const loginWithGoogle = async (credentialResponse: any, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      if (!credentialResponse.credential) {
        setError('Nie udało się uzyskać tokenu uwierzytelniającego z Google. Spróbuj ponownie.');
        setIsAuthenticated(false);
        return;
      }

      const response = await httpClient.post('auth/google-login', {
        credential: credentialResponse.credential,
        rememberMe,
      });


      if (response.error) {
        throw new Error(response.error);
      }

      if (!response.data) {
        throw new Error('Nieznany błąd logowania przez Google. Spróbuj ponownie później.');
      }

      const responseData = response.data;
      const user = responseData.user || (responseData.user && responseData.user.user);


      if (setUser) {
        setUser(user);
      }

      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania przez Google';
      setError(errorMessage);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return loginWithGoogle;
};
