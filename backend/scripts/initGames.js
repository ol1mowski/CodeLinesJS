import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Game } from '../models/game.model.js';

dotenv.config();

const gamesData = [
  {
    title: "JS Typo Hunter",
    slug: "js-typo-hunter",
    description:
      "Znajdź i popraw błędy składniowe w kodzie JavaScript, zdobywając punkty za każdą poprawną poprawkę.",
    difficulty: "easy",
    rating: {
      average: 4.6,
      count: 150,
      total: 690,
    },
    completions: {
      count: 95,
      users: [],
    },
    rewardPoints: 120,
    category: "syntax",
    estimatedTime: 15,
  },
  {
    title: "Scope Explorer",
    slug: "scope-explorer",
    description:
      "Rozwikłaj zagadki związane z zakresem zmiennych w JavaScript i przewiduj poprawne wartości.",
    difficulty: "medium",
    rating: {
      average: 4.4,
      count: 110,
      total: 484,
    },
    completions: {
      count: 60,
      users: [],
    },
    rewardPoints: 180,
    category: "variables",
    estimatedTime: 20,
  },
  {
    title: "Async Quest",
    slug: "async-quest",
    description:
      "Zarządzaj operacjami asynchronicznymi w fabularnej grze, używając `Promise`, `async/await` i `setTimeout`.",
    difficulty: "medium",
    rating: {
      average: 4.7,
      count: 130,
      total: 611,
    },
    completions: {
      count: 85,
      users: [],
    },
    rewardPoints: 200,
    category: "async",
    estimatedTime: 25,
  },
  {
    title: "JS Debugger",
    slug: "js-debugger",
    description:
      "Znajduj i naprawiaj błędy w kodzie JavaScript, korzystając z `console.log`, `try/catch` i narzędzi debugowania.",
    difficulty: "hard",
    rating: {
      average: 4.5,
      count: 90,
      total: 405,
    },
    completions: {
      count: 50,
      users: [],
    },
    rewardPoints: 250,
    category: "debugging",
    estimatedTime: 30,
  },
  {
    title: "Regex Raider",
    slug: "regex-raider",
    description:
      "Napisz poprawne wyrażenia regularne, aby znaleźć ukryte wzorce w dynamicznych tekstach.",
    difficulty: "hard",
    rating: {
      average: 4.8,
      count: 75,
      total: 360,
    },
    completions: {
      count: 40,
      users: [],
    },
    rewardPoints: 300,
    category: "regex",
    estimatedTime: 35,
  },
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