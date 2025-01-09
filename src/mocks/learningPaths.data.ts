import { LearningPath } from "../types/learning.types";

export const learningPaths: LearningPath[] = [
  {
    id: "js-basics",
    title: "Podstawy JavaScript",
    description: "Poznaj fundamenty języka JavaScript, zmienne, typy danych i podstawowe struktury kontrolne.",
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    difficulty: "beginner",
    estimatedTime: "6 godzin",
    tags: ["ES6+", "Zmienne", "Funkcje", "Obiekty"]
  },
  {
    id: "js-advanced",
    title: "Zaawansowany JavaScript",
    description: "Zagłęb się w zaawansowane koncepcje jak domknięcia, prototypy i asynchroniczność.",
    progress: 30,
    totalModules: 15,
    completedModules: 5,
    difficulty: "intermediate",
    estimatedTime: "8 godzin",
    tags: ["Async/Await", "Promises", "Closures", "OOP"]
  },
  {
    id: "js-patterns",
    title: "Wzorce Projektowe",
    description: "Poznaj popularne wzorce projektowe i najlepsze praktyki w JavaScript.",
    progress: 0,
    totalModules: 10,
    completedModules: 0,
    difficulty: "advanced",
    estimatedTime: "10 godzin",
    tags: ["Design Patterns", "SOLID", "Architecture"]
  }
]; 