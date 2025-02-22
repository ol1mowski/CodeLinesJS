export const lessonsData = [
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

export const lessonsContent = [
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
                content: "JavaScript jest językiem programowania wysokiego poziomu. Zmienne pozwalają na przechowywanie i manipulowanie danymi w programie. Wyróżniamy trzy sposoby deklaracji zmiennych: var, let oraz const.",
                examples: [
                    {
                        code: "let name = 'John';\nconsole.log(name);",
                        language: "javascript",
                        explanation: "Deklaracja zmiennej za pomocą let. Można ją zmieniać w trakcie działania programu."
                    },
                    {
                        code: "const pi = 3.14;",
                        language: "javascript",
                        explanation: "Deklaracja stałej za pomocą const. Nie można jej zmieniać po przypisaniu wartości."
                    },
                    {
                        code: "var age = 30;\nage = 31;",
                        language: "javascript",
                        explanation: "Deklaracja zmiennej za pomocą var. Można ją ponownie przypisać, ale jej zakres jest funkcjonalny."
                    },
                    {
                        code: "let isActive = true;",
                        language: "javascript",
                        explanation: "Deklaracja zmiennej logicznej, która może przechowywać wartości true lub false."
                    },
                    {
                        code: "let colors = ['red', 'blue', 'green'];",
                        language: "javascript",
                        explanation: "Deklaracja tablicy przechowującej kilka wartości w jednej zmiennej."
                    },
                    {
                        code: "let user = { name: 'Alice', age: 25 };",
                        language: "javascript",
                        explanation: "Deklaracja obiektu przechowującego powiązane ze sobą wartości."
                    },
                    {
                        code: "let message = `Hello, ${name}!`;",
                        language: "javascript",
                        explanation: "Deklaracja zmiennej ze stringiem używającym template literals."
                    },
                    {
                        code: "let counter = 0;\ncounter += 1;",
                        language: "javascript",
                        explanation: "Zmienna liczbowa, której wartość jest modyfikowana."
                    }
                ]
            },
            {
                title: "Zakres zmiennych",
                content: "Zmienne w JavaScript mogą mieć różne zakresy - globalny, funkcyjny lub blokowy. Różne sposoby deklaracji wpływają na ich dostępność w kodzie.",
                examples: [
                    {
                        code: "function test() {\n  var localVar = 'Jestem lokalna';\n  console.log(localVar);\n}\ntest();",
                        language: "javascript",
                        explanation: "Zmienne zadeklarowane przy użyciu var mają zakres funkcyjny."
                    },
                    {
                        code: "if (true) {\n  let blockScoped = 'Dostępne tylko w tym bloku';\n  console.log(blockScoped);\n}",
                        language: "javascript",
                        explanation: "Zmienne zadeklarowane za pomocą let mają zakres blokowy."
                    }
                ]
            },
            {
                title: "Typy danych w zmiennych",
                content: "JavaScript obsługuje różne typy danych, które mogą być przechowywane w zmiennych, w tym stringi, liczby, boolean, tablice i obiekty.",
                examples: [
                    {
                        code: "let number = 42;",
                        language: "javascript",
                        explanation: "Przykład przechowywania liczby w zmiennej."
                    },
                    {
                        code: "let greeting = 'Hello, world!';",
                        language: "javascript",
                        explanation: "Przykład przechowywania stringa w zmiennej."
                    },
                    {
                        code: "let isValid = false;",
                        language: "javascript",
                        explanation: "Przykład przechowywania wartości logicznej w zmiennej."
                    }
                ]
            }
        ],
        quiz: [
            {
                id: "q1",
                question: "Która deklaracja zmiennej pozwala na jej ponowną zmianę?",
                options: [
                    "var",
                    "let",
                    "const",
                    "żadna z powyższych"
                ],
                correctAnswer: 1,
                explanation: "Zmienna zadeklarowana jako let może być modyfikowana, ale const już nie."
            },
            {
                id: "q2",
                question: "Jaka jest różnica między var a let?",
                options: [
                    "Nie ma żadnej różnicy",
                    "var ma zakres funkcyjny, a let blokowy",
                    "let można ponownie zadeklarować, a var nie",
                    "let nie istnieje w JavaScript"
                ],
                correctAnswer: 1,
                explanation: "Zmienna var ma zakres funkcyjny, co oznacza, że działa w całej funkcji, w której została zadeklarowana, natomiast let ma zakres blokowy, co ogranicza jej dostępność do najbliższego bloku kodu."
            },
            {
                id: "q3",
                question: "Co oznacza const w JavaScript?",
                options: [
                    "Stałą wartość, która nie może być zmieniona",
                    "Zmienną globalną",
                    "Funkcję anonimową",
                    "Specjalny typ danych"
                ],
                correctAnswer: 0,
                explanation: "Zmienne zadeklarowane za pomocą const nie mogą być ponownie przypisane po ich inicjalizacji."
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
                content: "Funkcje są kluczowym elementem JavaScript. Umożliwiają grupowanie kodu w wielokrotnego użytku fragmenty. Można je definiować na kilka sposobów, np. za pomocą function declaration, function expression lub arrow functions.",
                examples: [
                    {
                        code: "function sayHello(name) {\n  return `Hello ${name}`;\n}",
                        language: "javascript",
                        explanation: "Funkcja deklarowana klasycznym sposobem."
                    },
                    {
                        code: "const add = (a, b) => a + b;",
                        language: "javascript",
                        explanation: "Funkcja strzałkowa (arrow function) upraszcza zapis funkcji."
                    }
                ],
            }
        ],
        quiz: [
            {
                id: "q1",
                question: "Jakie jest główne zastosowanie funkcji?",
                options: [
                    "Przechowywanie danych",
                    "Wielokrotne użycie kodu",
                    "Tworzenie zmiennych",
                    "Zarządzanie pamięcią"
                ],
                correctAnswer: 1,
                explanation: "Funkcje pozwalają na wielokrotne użycie kodu, co zwiększa jego czytelność i efektywność."
            }
        ]
    }
];
