import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Lesson, LearningPath, initializeModels, Resource } from '../models/index.js';
import { LessonContent } from '../models/lessonContent.model.js';

dotenv.config();

const lessonsData = [
  {
    id: "js-variables",
    title: "Wprowadzenie do JavaScript",
    description: "Podstawy języka JavaScript, zmienne, typy danych",
    category: "javascript",
    difficulty: "beginner",
    order: 1,
    duration: 30,
    points: 10,
    isPublished: true,
    isAvailable: true,
    requiredLevel: 1
  },
  {
    id: "js-functions",
    title: "Funkcje w JavaScript",
    description: "Tworzenie i używanie funkcji",
    category: "javascript",
    difficulty: "beginner",
    order: 2,
    duration: 45,
    points: 15,
    isPublished: true,
    isAvailable: true,
    requiredLevel: 1
  },
  {
    id: "js-arrays",
    title: "Tablice i Obiekty",
    description: "Praca z tablicami i obiektami w JavaScript",
    category: "javascript",
    difficulty: "beginner",
    order: 3,
    duration: 60,
    points: 20,
    isPublished: true,
    isAvailable: true,
    requiredLevel: 2
  },
  {
    id: "react-intro",
    title: "Podstawy React",
    description: "Wprowadzenie do biblioteki React",
    category: "react",
    difficulty: "intermediate",
    order: 1,
    duration: 60,
    points: 25,
    isPublished: true,
    isAvailable: true,
    requiredLevel: 3
  },
  {
    id: "react-components",
    title: "Komponenty React",
    description: "Tworzenie i zarządzanie komponentami",
    category: "react",
    difficulty: "intermediate",
    order: 2,
    duration: 75,
    points: 30,
    isPublished: true,
    isAvailable: true,
    requiredLevel: 3
  }
];

const lessonsContent = [
  {
    lessonId: "js-variables",
    xp: 50,
    rewards: {
      completion: [
        {
          type: 'xp',
          value: 50,
          title: 'Podstawy opanowane!',
          description: 'Ukończyłeś podstawy JavaScript'
        }
      ],
      quiz: {
        100: [
          {
            type: 'badge',
            value: 1,
            title: 'Perfekcyjny wynik!',
            description: 'Odpowiedziałeś poprawnie na wszystkie pytania'
          }
        ]
      }
    },
    sections: [
      {
        title: "Wprowadzenie do zmiennych",
        content: "JavaScript jest językiem programowania wysokiego poziomu...",
        examples: [
          {
            code: "let name = 'John';\nconsole.log(name);",
            language: "javascript",
            explanation: "Podstawowy przykład deklaracji zmiennej"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "Co to jest zmienna w JavaScript?",
            options: [
              "Kontener na dane",
              "Funkcja",
              "Pętla",
              "Warunek"
            ],
            correctAnswer: 0,
            explanation: "Zmienna to kontener do przechowywania danych"
          }
        ]
      }
    ]
  }

];

const learningPaths = [
  {
    title: "Ścieżka JavaScript od podstaw",
    description: "Kompletny kurs JavaScript dla początkujących",
    difficulty: "beginner",
    category: "javascript",
    estimatedTime: 135,
    requirements: ["Podstawowa znajomość HTML i CSS"],
    outcomes: [
      "Zrozumienie podstaw JavaScript",
      "Umiejętność pracy z funkcjami",
      "Znajomość struktur danych"
    ],
    isActive: true,
    isAvailable: true,
    requiredLevel: 1
  },
  {
    title: "React Developer",
    description: "Zostań programistą React",
    difficulty: "intermediate",
    category: "react",
    estimatedTime: 135,
    requirements: ["Podstawowa znajomość JavaScript"],
    outcomes: [
      "Tworzenie aplikacji w React",
      "Zarządzanie stanem aplikacji",
      "Praca z komponentami"
    ],
    isActive: true,
    isAvailable: true,
    requiredLevel: 3
  }
];

const resources = [
  {
    title: "JavaScript - przewodnik po ES6+",
    description: "Kompletny przewodnik po nowych funkcjach JavaScript ES6+",
    url: "https://example.com/js-es6-guide",
    type: "article",
    category: "javascript",
    difficulty: "intermediate",
    tags: ["ES6", "JavaScript", "Modern JS"],
    author: {
      name: "John Doe",
      url: "https://example.com/author/john"
    },
    isRecommended: false
  },
  {
    title: "React Hooks - podstawy",
    description: "Wprowadzenie do React Hooks i zarządzania stanem",
    url: "https://example.com/react-hooks",
    type: "tutorial",
    category: "react",
    difficulty: "beginner",
    tags: ["React", "Hooks", "State Management"],
    author: {
      name: "Jane Smith",
      url: "https://example.com/author/jane"
    },
    isRecommended: false
  },
  {
    title: "Node.js - najlepsze praktyki",
    description: "Zbiór najlepszych praktyk w Node.js",
    url: "https://example.com/nodejs-best-practices",
    type: "documentation",
    category: "node",
    difficulty: "advanced",
    tags: ["Node.js", "Best Practices", "Backend"],
    author: {
      name: "Mike Johnson",
      url: "https://example.com/author/mike"
    },
    isRecommended: false
  }
];

const initializeData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Połączono z bazą danych');
    
    initializeModels();

    await Promise.all([
      Lesson.deleteMany({}),
      LessonContent.deleteMany({}),
      LearningPath.deleteMany({}),
      Resource.deleteMany({})
    ]);
    console.log('Usunięto stare dane');

    await Promise.all([
      Lesson.insertMany(lessonsData),
      LessonContent.insertMany(lessonsContent)
    ]);
    console.log('Dodano lekcje i ich treści');

    const createdLessons = await Lesson.find({});
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

    await LearningPath.insertMany(pathsWithLessons);
    console.log('Dodano ścieżki nauki');

    await Resource.insertMany(resources);
    console.log('Dodano zasoby');

    console.log('Inicjalizacja zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Rozłączono z bazą danych');
  }
};

initializeData(); 