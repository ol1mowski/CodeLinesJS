import RankingService from '../services/ranking.service.js';

export const getRanking = async (req, res) => {
  try {
    const { period = 'weekly' } = req.query;
    const userId = req.user?._id;
    const ranking = await RankingService.getRanking(period, userId);
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ message: 'Nie udało się pobrać rankingu' });
  }
}; 