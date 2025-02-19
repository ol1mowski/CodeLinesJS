import { AsyncChallenge } from '../types/asyncQuest.types';

export const asyncChallenges: AsyncChallenge[] = [
  {
    id: 1,
    task: "Zamówienie pizzy",
    code: "function orderPizza() { return 'Pizza gotowa!'; }",
    error: "Funkcja powinna być asynchroniczna (async)",
    correct: "async function orderPizza() { return 'Pizza gotowa!'; }",
    points: 10,
    category: 'async-await',
    difficulty: 'easy'
  },
  {
    id: 2,
    task: "Pobranie danych użytkownika",
    code: "fetch('/user').then(res => res.json()).then(data => console.log(data));",
    error: "Pamiętaj o obsłudze potencjalnych błędów przy użyciu .catch()",
    correct: "fetch('/user').then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));",
    points: 15,
    category: 'promises',
    difficulty: 'medium'
  },
  {
    id: 3,
    task: "Opóźnione powitanie",
    code: "setTimeout(() => console.log('Witaj!'), 1000);",
    error: "Przekształć callback w Promise używając new Promise()",
    correct: "new Promise(resolve => setTimeout(() => resolve('Witaj!'), 1000));",
    points: 20,
    category: 'callbacks',
    difficulty: 'medium'
  },
  {
    id: 4,
    task: "Równoległe pobieranie danych",
    code: "async function getData() {\n  const users = await fetchUsers();\n  const posts = await fetchPosts();\n  return { users, posts };\n}",
    error: "Użyj Promise.all() dla równoległego wykonania",
    correct: "async function getData() {\n  const [users, posts] = await Promise.all([\n    fetchUsers(),\n    fetchPosts()\n  ]);\n  return { users, posts };\n}",
    points: 25,
    category: 'promises',
    difficulty: 'hard'
  },
  {
    id: 5,
    task: "Obsługa błędów w async/await",
    code: "async function processData() {\n  const data = await fetchData();\n  return processResult(data);\n}",
    error: "Dodaj blok try-catch do obsługi potencjalnych błędów",
    correct: "async function processData() {\n  try {\n    const data = await fetchData();\n    return processResult(data);\n  } catch (error) {\n    console.error('Błąd:', error);\n    throw error;\n  }\n}",
    points: 20,
    category: 'async-await',
    difficulty: 'medium'
  }
]; 