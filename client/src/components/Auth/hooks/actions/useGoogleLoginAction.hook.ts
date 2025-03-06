import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../config/api.config';

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

export const useGoogleLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated } = state;

  const loginWithGoogle = async (credentialResponse: any, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = API_URL.replace('www.', '');
      
      const response = await fetch(`${apiUrl}auth/google`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ 
          credential: credentialResponse.credential,
          rememberMe
        }),
      });
      
      
      let data;
      try {
        const text = await response.text();
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Nieprawidłowa odpowiedź serwera');
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Nieznany błąd logowania przez Google');
      }
      
        
      if (rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }
      
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania przez Google');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return loginWithGoogle;
}; 