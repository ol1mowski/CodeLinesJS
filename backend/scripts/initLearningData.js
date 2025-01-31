import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Lesson, LearningPath, initializeModels, Resource } from '../models/index.js';
import { LessonContent } from '../models/lessonContent.model.js';

dotenv.config();

const lessonsData = [
  {
    slug: "js-variables",
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
    slug: "js-functions",
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
    slug: "js-arrays",
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
    slug: "react-intro",
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
    slug: "react-components",
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
    lessonSlug: "js-variables",
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
      quiz: [
        {
          score: 100,
          rewards: [
            {
              type: 'badge',
              value: 1,
              title: 'Perfekcyjny wynik!',
              description: 'Odpowiedziałeś poprawnie na wszystkie pytania'
            }
          ]
        }
      ]
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
  },
  {
    lessonSlug: "js-functions",
    xp: 60,
    rewards: {
      completion: [
        {
          type: 'xp',
          value: 60,
          title: 'Funkcje opanowane!',
          description: 'Ukończyłeś rozdział o funkcjach'
        }
      ],
      quiz: [
        {
          score: 100,
          rewards: [
            {
              type: 'badge',
              value: 1,
              title: 'Mistrz funkcji!',
              description: 'Perfekcyjnie rozumiesz funkcje w JavaScript'
            }
          ]
        }
      ]
    },
    sections: [
      {
        title: "Wprowadzenie do funkcji",
        content: "Funkcje są podstawowym blokiem budulcowym w JavaScript...",
        examples: [
          {
            code: "function sayHello(name) {\n  return `Hello ${name}`;\n}",
            language: "javascript",
            explanation: "Podstawowy przykład deklaracji funkcji"
          }
        ],
        quiz: [
          {
            id: "q1",
            question: "Co to jest funkcja w JavaScript?",
            options: [
              "Blok kodu wielokrotnego użytku",
              "Zmienna",
              "Pętla",
              "Warunek"
            ],
            correctAnswer: 0,
            explanation: "Funkcja to blok kodu, który można wywołać wielokrotnie"
          }
        ]
      }
    ]
  },
  {
    lessonSlug: "js-arrays",
    xp: 70,
    rewards: {
      completion: [
        {
          type: 'xp',
          value: 70,
          title: 'Struktury danych opanowane!',
          description: 'Ukończyłeś rozdział o tablicach i obiektach'
        }
      ]
    },
    sections: [
      {
        title: "Tablice w JavaScript",
        content: "Tablice pozwalają przechowywać wiele wartości w jednej zmiennej...",
        examples: [
          {
            code: "const fruits = ['apple', 'banana', 'orange'];",
            language: "javascript",
            explanation: "Przykład tablicy w JavaScript"
          }
        ]
      }
    ]
  },
  {
    lessonSlug: "react-intro",
    xp: 80,
    rewards: {
      completion: [
        {
          type: 'xp',
          value: 80,
          title: 'React podstawy!',
          description: 'Ukończyłeś wprowadzenie do React'
        }
      ]
    },
    sections: [
      {
        title: "Czym jest React?",
        content: "React to biblioteka JavaScript do budowania interfejsów użytkownika...",
        examples: [
          {
            code: "function App() {\n  return <h1>Hello React!</h1>;\n}",
            language: "javascript",
            explanation: "Prosty komponent React"
          }
        ]
      }
    ]
  },
  {
    lessonSlug: "react-components",
    xp: 90,
    rewards: {
      completion: [
        {
          type: 'xp',
          value: 90,
          title: 'Komponenty opanowane!',
          description: 'Ukończyłeś rozdział o komponentach React'
        }
      ]
    },
    sections: [
      {
        title: "Komponenty w React",
        content: "Komponenty są podstawowymi elementami aplikacji React...",
        examples: [
          {
            code: "function Button({ onClick, children }) {\n  return <button onClick={onClick}>{children}</button>;\n}",
            language: "javascript",
            explanation: "Przykład komponentu funkcyjnego"
          }
        ]
      }
    ]
  }
];

const learningPaths = [
  {
    title: "JavaScript od podstaw",
    description: "Kompletny kurs JavaScript dla początkujących. Poznaj podstawy programowania i zostań frontend developerem.",
    difficulty: "beginner",
    totalLessons: 20,
    estimatedTime: 1200, // w minutach (20 godzin)
    requirements: [
      "Podstawowa znajomość HTML i CSS",
      "Chęć do nauki"
    ],
    outcomes: [
      "Zrozumienie podstaw JavaScript",
      "Umiejętność pisania prostych programów",
      "Znajomość DOM i event handling",
      "Podstawy asynchroniczności"
    ],
    isActive: true,
    requiredLevel: 1
  },
  {
    title: "JavaScript - poziom średniozaawansowany",
    description: "Rozszerz swoją wiedzę o JavaScript. Poznaj zaawansowane koncepcje i wzorce projektowe.",
    difficulty: "intermediate",
    totalLessons: 15,
    estimatedTime: 900, // 15 godzin
    requirements: [
      "Podstawowa znajomość JavaScript",
      "Znajomość funkcji i obiektów"
    ],
    outcomes: [
      "Zaawansowane koncepcje JS",
      "Programowanie funkcyjne",
      "Wzorce projektowe",
      "Optymalizacja kodu"
    ],
    isActive: true,
    requiredLevel: 2
  },
  {
    title: "JavaScript - poziom zaawansowany",
    description: "Zostań ekspertem JavaScript. Poznaj zaawansowane techniki i najlepsze praktyki.",
    difficulty: "advanced",
    totalLessons: 12,
    estimatedTime: 720, // 12 godzin
    requirements: [
      "Dobra znajomość JavaScript",
      "Doświadczenie w programowaniu"
    ],
    outcomes: [
      "Architektura aplikacji",
      "Zaawansowane wzorce",
      "Wydajność i optymalizacja",
      "Testowanie i debugging"
    ],
    isActive: true,
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

    // Usuń wszystkie kolekcje
    await Promise.all([
      mongoose.connection.collection('lessons').drop().catch(() => console.log('Kolekcja lessons nie istnieje')),
      mongoose.connection.collection('lessoncontents').drop().catch(() => console.log('Kolekcja lessoncontents nie istnieje')),
      mongoose.connection.collection('learningpaths').drop().catch(() => console.log('Kolekcja learningpaths nie istnieje')),
      mongoose.connection.collection('resources').drop().catch(() => console.log('Kolekcja resources nie istnieje'))
    ]);
    console.log('Usunięto stare kolekcje');

    // Utwórz kolekcje na nowo
    await Promise.all([
      mongoose.connection.createCollection('lessons'),
      mongoose.connection.createCollection('lessoncontents'),
      mongoose.connection.createCollection('learningpaths'),
      mongoose.connection.createCollection('resources')
    ]);
    console.log('Utworzono nowe kolekcje');

    // Dodaj nowe dane
    const createdLessons = await Lesson.insertMany(lessonsData);
    console.log('Dodano lekcje');

    await LessonContent.insertMany(lessonsContent);
    console.log('Dodano treści lekcji');

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

    await LearningPath.insertMany(learningPaths);
    console.log('Dodano ścieżki nauki');

    await Resource.insertMany(resources);
    console.log('Dodano zasoby');

    // Utwórz nowe indeksy
    await Promise.all([
      Lesson.createIndexes(),
      LessonContent.createIndexes(),
      LearningPath.createIndexes()
    ]);
    console.log('Utworzono nowe indeksy');

    console.log('Inicjalizacja zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Rozłączono z bazą danych');
  }
};

initializeData(); 