import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Lesson, LearningPath, initializeModels } from '../models/index.js';

dotenv.config();

const lessons = [
  {
    title: "Wprowadzenie do JavaScript",
    description: "Podstawy języka JavaScript, zmienne, typy danych",
    content: "JavaScript jest językiem programowania wysokiego poziomu...",
    category: "javascript",
    difficulty: "beginner",
    order: 1,
    duration: 30,
    points: 10,
    isPublished: true
  },
  {
    title: "Funkcje w JavaScript",
    description: "Tworzenie i używanie funkcji",
    content: "Funkcje są podstawowym blokiem budulcowym w JavaScript...",
    category: "javascript",
    difficulty: "beginner",
    order: 2,
    duration: 45,
    points: 15,
    isPublished: true
  },
  {
    title: "Tablice i Obiekty",
    description: "Praca z tablicami i obiektami w JavaScript",
    content: "Tablice i obiekty są podstawowymi strukturami danych...",
    category: "javascript",
    difficulty: "beginner",
    order: 3,
    duration: 60,
    points: 20,
    isPublished: true
  },
  {
    title: "Podstawy React",
    description: "Wprowadzenie do biblioteki React",
    content: "React jest biblioteką JavaScript do budowania interfejsów...",
    category: "react",
    difficulty: "intermediate",
    order: 1,
    duration: 60,
    points: 25,
    isPublished: true
  },
  {
    title: "Komponenty React",
    description: "Tworzenie i zarządzanie komponentami",
    content: "Komponenty są podstawową jednostką budulcową w React...",
    category: "react",
    difficulty: "intermediate",
    order: 2,
    duration: 75,
    points: 30,
    isPublished: true
  }
];

const learningPaths = [
  {
    title: "Ścieżka JavaScript od podstaw",
    description: "Kompletny kurs JavaScript dla początkujących",
    difficulty: "beginner",
    estimatedTime: 135,
    requirements: ["Podstawowa znajomość HTML i CSS"],
    outcomes: [
      "Zrozumienie podstaw JavaScript",
      "Umiejętność pracy z funkcjami",
      "Znajomość struktur danych"
    ],
    isActive: true
  },
  {
    title: "React Developer",
    description: "Zostań programistą React",
    difficulty: "intermediate",
    estimatedTime: 135,
    requirements: ["Podstawowa znajomość JavaScript"],
    outcomes: [
      "Tworzenie aplikacji w React",
      "Zarządzanie stanem aplikacji",
      "Praca z komponentami"
    ],
    isActive: true
  }
];

const initializeData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Połączono z bazą danych');
    
    // Inicjalizacja modeli
    initializeModels();

    // Sprawdź, czy modele są poprawnie zarejestrowane
    console.log('Zarejestrowane modele:', mongoose.modelNames());

    // Usuń istniejące dane
    await Promise.all([
      Lesson.deleteMany({}),
      LearningPath.deleteMany({})
    ]);
    console.log('Usunięto stare dane');

    // Dodaj lekcje
    const createdLessons = await Lesson.insertMany(lessons);
    console.log('Dodano lekcje');

    // Przypisz lekcje do ścieżek
    const jsLessons = createdLessons.filter(lesson => lesson.category === 'javascript');
    const reactLessons = createdLessons.filter(lesson => lesson.category === 'react');

    const pathsWithLessons = [
      {
        ...learningPaths[0],
        lessons: jsLessons.map(lesson => lesson._id)
      },
      {
        ...learningPaths[1],
        lessons: reactLessons.map(lesson => lesson._id)
      }
    ];

    // Dodaj ścieżki nauki
    await LearningPath.insertMany(pathsWithLessons);
    console.log('Dodano ścieżki nauki');

    console.log('Inicjalizacja zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Rozłączono z bazą danych');
  }
};

initializeData(); 