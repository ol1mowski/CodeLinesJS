import { Lesson } from "../types/learning.types";

export const lessons: Lesson[] = [
  {
    id: "js-variables",
    title: "Zmienne i Typy Danych",
    description: "Poznaj podstawowe typy danych i sposoby deklarowania zmiennych w JavaScript.",
    duration: "30 min",
    difficulty: "beginner",
    category: "Podstawy",
    isCompleted: true,
    progress: 100,
    xp: 100
  },
  {
    id: "js-functions",
    title: "Funkcje i Scope",
    description: "Naucz się tworzyć i używać funkcji oraz zrozum zasięg zmiennych.",
    duration: "45 min",
    difficulty: "beginner",
    category: "Podstawy",
    isCompleted: false,
    progress: 60,
    xp: 150
  },
  {
    id: "js-arrays",
    title: "Tablice i Metody",
    description: "Poznaj metody pracy z tablicami i ich praktyczne zastosowania.",
    duration: "40 min",
    difficulty: "intermediate",
    category: "Struktury Danych",
    isCompleted: false,
    progress: 0,
    xp: 200
  }
]; 