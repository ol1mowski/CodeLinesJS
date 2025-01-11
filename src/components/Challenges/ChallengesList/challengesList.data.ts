import { FaCode, FaLayerGroup, FaReact, FaServer } from "react-icons/fa";
import { Challenge } from "./types";

export const challengesList: Challenge[] = [
  {
    title: "Podstawy JavaScript",
    description: "Rozwiąż zadania z podstaw JavaScript, zmiennych, funkcji i pętli.",
    icon: FaCode,
    difficulty: 'easy',
    tags: ['Zmienne', 'Funkcje', 'Pętle']
  },
  {
    title: "Struktury Danych",
    description: "Zaimplementuj popularne struktury danych w JavaScript.",
    icon: FaLayerGroup,
    difficulty: 'medium',
    tags: ['Tablice', 'Obiekty', 'Mapy']
  },
  {
    title: "React Hooks",
    description: "Stwórz własne hooki i naucz się zarządzać stanem.",
    icon: FaReact,
    difficulty: 'hard',
    tags: ['useState', 'useEffect', 'Custom Hooks']
  },
  {
    title: "API i Async",
    description: "Pracuj z API i asynchronicznym JavaScript. Przetestuj swoje umiejętności",
    icon: FaServer,
    difficulty: 'medium',
    tags: ['Fetch', 'Async/Await', 'REST']
  }
]; 