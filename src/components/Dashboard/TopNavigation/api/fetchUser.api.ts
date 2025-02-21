export const fetchUser = async (token: string | null) => {
  const response = await fetch("http://localhost:5001/api/settings/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Nie udało się pobrać danych użytkownika');
  }
  return response.json();
};