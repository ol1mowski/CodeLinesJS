import { useQuery } from '@tanstack/react-query';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5001/api/settings/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać danych użytkownika');
      }
      
      return response.json();
    },
  });
}; 