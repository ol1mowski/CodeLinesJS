import { useNavigate } from 'react-router-dom';
import { AuthState } from '../types';
import { jwtDecode } from "jwt-decode";
import { API_URL } from '../../../config/api.config';

export const useGoogleLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const loginWithGoogle = async (credentialResponse: any, rememberMe: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const decoded = jwtDecode<{
        email: string;
        name: string;
        picture: string;
      }>(credentialResponse.credential);
      
      const response = await fetch(`${API_URL}auth/google-auth`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ 
          idToken: credentialResponse.credential,
          userData: {
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture
          },
          rememberMe
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Błąd logowania przez Google');
      }

      const data = await response.json();
      
      if (rememberMe) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }

      setIsAuthenticated(true);
      setUser(data.user);
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setError(err instanceof Error ? err.message : 'Błąd połączenia z serwerem');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return loginWithGoogle;
}; 