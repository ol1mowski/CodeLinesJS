import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Game } from '../models/game.model.js';

dotenv.config();

const gamesData = [
  {
    title: "Code Breaker",
    slug: "code-breaker",
    description: "Rozwiąż serię zagadek programistycznych, wykorzystując podstawy JavaScript",
    difficulty: "easy",
    rating: {
      average: 4.5,
      count: 120,
      total: 540
    },
    completions: {
      count: 89,
      users: []
    },
    rewardPoints: 100,
    category: 'basics',
    estimatedTime: 15
  },
  {
    title: "Memory Master",
    slug: "memory-master",
    description: "Trenuj swoją pamięć poprzez zapamiętywanie i odtwarzanie sekwencji",
    difficulty: "medium",
    rating: {
      average: 4.2,
      count: 85,
      total: 357
    },
    completions: {
      count: 45,
      users: []
    },
    rewardPoints: 150,
    category: 'challenges',
    estimatedTime: 20
  },
  {
    title: "Algorithm Challenge",
    slug: "algorithm-challenge",
    description: "Rozwiąż złożone problemy algorytmiczne na czas",
    difficulty: "hard",
    rating: {
      average: 4.8,
      count: 65,
      total: 312
    },
    completions: {
      count: 28,
      users: []
    },
    rewardPoints: 300,
    category: 'algorithms',
    estimatedTime: 45
  }
];

const initializeGames = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Połączono z bazą danych');

    await Game.deleteMany({});
    console.log('Wyczyszczono kolekcję gier');

    const games = await Game.insertMany(gamesData);
    console.log(`Dodano ${games.length} gier do bazy danych`);

    console.log('Inicjalizacja zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji:', error);
  } finally {
    await mongoose.disconnect();
  }
};

initializeGames(); 