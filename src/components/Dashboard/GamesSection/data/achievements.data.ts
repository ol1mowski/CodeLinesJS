import { Achievement } from '../types/achievements.types';

export const achievements: Achievement[] = [
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Ukończ poziom w mniej niż 30 sekund',
    icon: 'speed',
    condition: {
      type: 'time',
      value: 30
    },
    reward: 50
  },
  {
    id: 'promise_master',
    title: 'Promise Master',
    description: 'Rozwiąż 5 zadań z kategorii Promises bez błędu',
    icon: 'master',
    condition: {
      type: 'category',
      value: 5,
      category: 'promises'
    },
    reward: 100
  },
  {
    id: 'async_expert',
    title: 'Async Expert',
    description: 'Rozwiąż 5 zadań z kategorii Async/Await bez błędu',
    icon: 'master',
    condition: {
      type: 'category',
      value: 5,
      category: 'async-await'
    },
    reward: 100
  },
  {
    id: 'perfect_streak',
    title: 'Perfect Streak',
    description: 'Rozwiąż 3 zadania z rzędu bez błędu',
    icon: 'streak',
    condition: {
      type: 'streak',
      value: 3
    },
    reward: 75
  }
]; 