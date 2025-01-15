import { Stats } from '../models/stats.model.js';
import { AuthError } from '../utils/errors.js';
import StatsService from '../services/stats.service.js';

const generateInitialDailyStats = () => {
  const days = 5;
  const stats = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    stats.unshift({
      date: date.toISOString().split('T')[0],
      points: 0,
      challenges: 0
    });
  }
  return stats;
};

const generateInitialCategories = () => [
  { name: 'Podstawy', completed: 0, total: 25 },
  { name: 'Funkcje', completed: 0, total: 20 },
  { name: 'Obiekty', completed: 0, total: 15 },
  { name: 'Async', completed: 0, total: 10 }
];

export const getStats = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AuthError('Brak autoryzacji');

    let stats = await Stats.findOne({ userId });
    
    if (!stats) {
      stats = await Stats.create({
        userId,
        daily: generateInitialDailyStats(),
        categories: generateInitialCategories()
      });
    }

    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const updateStats = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const updatedStats = await StatsService.updateStats(userId, req.body);
    res.json(updatedStats);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { categoryName } = req.params;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const stats = await Stats.findOne({ userId });
    if (!stats) throw new Error('Nie znaleziono statystyk');

    const category = stats.categories.find(c => c.name === categoryName);
    if (!category) throw new Error('Nie znaleziono kategorii');

    Object.assign(category, req.body);
    await stats.save();

    res.json(stats);
  } catch (error) {
    next(error);
  }
}; 