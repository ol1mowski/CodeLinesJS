import { AsyncChallenge } from '../types/asyncQuest.types';

export const asyncChallenges: AsyncChallenge[] = [
  {
    id: 1,
    task: "Zamówienie pizzy",
    code: "function orderPizza() { return 'Pizza gotowa!'; }",
    error: "Brak async",
    correct: "async function orderPizza() { return 'Pizza gotowa!'; }",
    points: 10,
    category: 'async-await',
    difficulty: 'easy'
  },
  {
    id: 2,
    task: "Pobranie danych użytkownika",
    code: "fetch('/user').then(res => res.json()).then(data => console.log(data));",
    error: "Brak obsługi błędów",
    correct: "fetch('/user').then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));",
    points: 15,
    category: 'promises',
    difficulty: 'medium'
  }
]; 