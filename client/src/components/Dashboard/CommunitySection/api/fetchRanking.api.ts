export const fetchRanking = async () => {
  const response = await fetch('/api/ranking');
  return response.json();
};
