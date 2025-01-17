import { getRanking as getRankingService } from '../services/ranking.service.js';

export const getRanking = async (req, res) => {
  try {
    const { period = 'weekly' } = req.query;
    const ranking = await getRankingService(period);
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ranking' });
  }
}; 