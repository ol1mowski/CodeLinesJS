import { User } from '../../models/user.model.js';
import { Lesson } from '../../models/lesson.model.js';
import { Game } from '../../models/game.model.js';

export interface GeneralGameStats {
  lessons: {
    value: string;
    label: string;
  };
  games: {
    value: string;
    label: string;
  };
  users: {
    value: string;
    label: string;
  };
}

export class GeneralStatsService {
  public static async getGeneralStats(): Promise<GeneralGameStats> {
    try {
      const [lessonsCount, gamesCount, usersCount] = await Promise.all([
        Lesson.countDocuments({}),
        Game.countDocuments({}),
        User.countDocuments({ isActive: true }),
      ]);

      return {
        lessons: {
          value: String(lessonsCount),
          label: 'Dostępnych lekcji',
        },
        games: {
          value: String(gamesCount),
          label: 'Gry',
        },
        users: {
          value: String(usersCount),
          label: 'Użytkowników',
        },
      };
    } catch (error) {
      console.error('Błąd podczas pobierania statystyk gry:', error);
      throw error;
    }
  }
} 