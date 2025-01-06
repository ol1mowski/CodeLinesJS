import { useNavigate } from 'react-router-dom';
import { AuthState } from '../types';
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:5001/api/auth';

export const useGoogleLoginAction = (state: AuthState) => {
  const navigate = useNavigate();
  const { setLoading, setError, setIsAuthenticated, setUser } = state;

  const loginWithGoogle = async (credentialResponse: any) => {
    try {
      setLoading(true);
      setError(null);

      const decoded = jwtDecode<{
        email: string;
        name: string;
        picture: string;
      }>(credentialResponse.credential);
      
      const response = await fetch(`${API_URL}/google-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          idToken: credentialResponse.credential,
          userData: {
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture
          }
        })
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUser({
        email: decoded.email,
        name: decoded.name,
        avatar: decoded.picture
      });
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setError(err instanceof Error ? err.message : 'Błąd logowania przez Google');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return loginWithGoogle;
}; 