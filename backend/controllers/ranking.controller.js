const generateRankingData = (count = 50) => {
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    name: `User ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    rank: i + 1,
    points: Math.floor(Math.random() * 10000),
    level: Math.floor(Math.random() * 100) + 1,
    stats: {
      completedChallenges: Math.floor(Math.random() * 500),
      accuracy: Math.floor(Math.random() * 30) + 70
    }
  }));
};

export const getRankingController = async (req, res) => {
  try {
    const { period = 'weekly' } = req.query;
    const ranking = generateRankingData();
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ranking' });
  }
}; 