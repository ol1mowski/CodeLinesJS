import mongoose from "mongoose";
import dotenv from "dotenv";
import { Game } from "../models/game.model.js";

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
    gameData: [
      {
        id: 1,
        code: "conosle.log('Hello World');",
        error: "conosle",
        correct: "console",
        hint: "Sprawdź dokładnie nazwę obiektu służącego do wyświetlania w konsoli",
        explanation:
          "console to poprawna nazwa obiektu do logowania w JavaScript",
        category: "naming",
        difficulty: "easy",
      },
      {
        id: 2,
        code: "let num = 10;\nif(num = 10) { alert('Ten!'); }",
        error: "=",
        correct: "==",
        hint: "Zwróć uwagę na operator w warunku if",
        explanation: "= to operator przypisania, == to operator porównania",
        category: "syntax",
        difficulty: "easy",
      },
      {
        id: 3,
        code: "function calculateSum(a, b {\n  return a + b;\n}",
        error: "function calculateSum(a, b {",
        correct: "function calculateSum(a, b) {",
        hint: "Sprawdź składnię deklaracji funkcji",
        explanation:
          "W deklaracji funkcji brakuje nawiasu zamykającego listę parametrów",
        category: "syntax",
        difficulty: "easy",
      },
      {
        id: 4,
        code: "const array = [1, 2, 3];\narray.forEach(item => {\n  cosnt sum = item + 1;\n});",
        error: "cosnt",
        correct: "const",
        hint: "Przyjrzyj się słowu kluczowemu deklaracji zmiennej",
        explanation: "const to poprawne słowo kluczowe do deklaracji stałej",
        category: "naming",
        difficulty: "medium",
      },
      {
        id: 5,
        code: "function multiply(x, y) {\n  reutrn x * y;\n}",
        error: "reutrn",
        correct: "return",
        hint: "Sprawdź pisownię słowa kluczowego do zwracania wartości",
        explanation:
          "return to poprawne słowo kluczowe do zwracania wartości z funkcji",
        category: "naming",
        difficulty: "easy",
      },
      {
        id: 6,
        code: "const obj = {\n  name: 'John'\n  age: 30\n};",
        error: "  age: 30",
        correct: "  age: 30,",
        hint: "Sprawdź składnię obiektu - czy czegoś nie brakuje między właściwościami?",
        explanation: "W obiekcie właściwości muszą być oddzielone przecinkami",
        category: "syntax",
        difficulty: "medium",
      },
    ],
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
    gameData: [
      {
        id: 1,
        code: `let x = 10;
function test() {
  let x = 20;
  return x;
}
console.log(test());`,
        options: ["10", "20", "undefined"],
        correct: "20",
        explanation:
          "Zmienna x zadeklarowana wewnątrz funkcji test() przesłania zmienną x z zewnętrznego zakresu.",
        points: 10,
        category: "scope",
        difficulty: "easy",
      },
      {
        id: 2,
        code: `var y = 5;
function demo() {
  y = 15;
}
demo();
console.log(y);`,
        options: ["5", "15", "undefined"],
        correct: "15",
        explanation:
          "Funkcja demo() modyfikuje zmienną y z globalnego zakresu, ponieważ nie jest ona ponownie deklarowana wewnątrz funkcji.",
        points: 10,
        category: "scope",
        difficulty: "easy",
      },
      {
        id: 3,
        code: `function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter());`,
        options: ["0", "1", "undefined"],
        correct: "1",
        explanation:
          "Funkcja zwrócona przez createCounter() tworzy domknięcie (closure) i zachowuje dostęp do zmiennej count.",
        points: 20,
        category: "closure",
        difficulty: "medium",
      },
      {
        id: 4,
        code: `console.log(x);
var x = 5;`,
        options: ["5", "undefined", "ReferenceError"],
        correct: "undefined",
        explanation:
          "Deklaracja var jest hoistowana, ale inicjalizacja nie. Dlatego przed inicjalizacją x ma wartość undefined.",
        points: 15,
        category: "hoisting",
        difficulty: "medium",
      },
      {
        id: 5,
        code: `for(var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
        options: ["0,1,2", "3,3,3", "undefined"],
        correct: "3,3,3",
        explanation:
          "Zmienna var i jest współdzielona między wszystkimi iteracjami pętli. Gdy setTimeout się wykonuje, pętla już się zakończyła i i ma wartość 3.",
        points: 25,
        category: "closure",
        difficulty: "hard",
      },
      {
        id: 6,
        code: `let x = 1;
{
  let x = 2;
  {
    let x = 3;
    console.log(x);
  }
}`,
        options: ["1", "2", "3"],
        correct: "3",
        explanation:
          "Każdy blok kodu tworzy nowy zakres dla let. Zmienna x jest przesłaniana w każdym zagnieżdżonym bloku.",
        points: 15,
        category: "scope",
        difficulty: "medium",
      },
      {
        id: 7,
        code: `function outer() {
  let count = 0;
  function inner() {
    count++;
    return count;
  }
  return inner;
}
const increment = outer();
increment();
console.log(increment());`,
        options: ["1", "2", "undefined"],
        correct: "2",
        explanation:
          "Funkcja inner tworzy domknięcie i zachowuje dostęp do zmiennej count. Każde wywołanie increment() zwiększa tę samą zmienną.",
        points: 25,
        category: "closure",
        difficulty: "hard",
      },
      {
        id: 8,
        code: `console.log(x);
let x = 5;`,
        options: ["5", "undefined", "ReferenceError"],
        correct: "ReferenceError",
        explanation:
          "Zmienna let podlega temporal dead zone - próba dostępu przed deklaracją powoduje ReferenceError.",
        points: 20,
        category: "hoisting",
        difficulty: "medium",
      },
      {
        id: 9,
        code: `const arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}`,
        options: ["0,1,2", "3,3,3", "undefined"],
        correct: "3,3,3",
        explanation:
          "var nie ma zasięgu blokowego, więc wszystkie setTimeout'y współdzielą tę samą zmienną i, która po zakończeniu pętli ma wartość 3.",
        points: 25,
        category: "closure",
        difficulty: "hard",
      },
      {
        id: 10,
        code: `function example() {
  if (true) {
    var x = 1;
    let y = 2;
  }
  console.log(x);
  console.log(y);
}
example();`,
        options: ["1,2", "1,ReferenceError", "undefined,undefined"],
        correct: "1,ReferenceError",
        explanation:
          "var ma zasięg funkcyjny, więc x jest dostępne poza blokiem if. let ma zasięg blokowy, więc y nie jest dostępne poza blokiem.",
        points: 20,
        category: "scope",
        difficulty: "medium",
      },
      {
        id: 11,
        code: `const obj = {
  name: 'John',
  greet: function() {
    setTimeout(function() {
      console.log('Hello ' + this.name);
    }, 0);
  }
};
obj.greet();`,
        options: ["Hello John", "Hello undefined", "TypeError"],
        correct: "Hello undefined",
        explanation:
          "W zwykłej funkcji this jest określane w momencie wywołania. W setTimeout funkcja jest wywoływana w kontekście globalnym.",
        points: 25,
        category: "scope",
        difficulty: "hard",
      },
      {
        id: 12,
        code: `const obj = {
  name: 'John',
  greet: function() {
    setTimeout(() => {
      console.log('Hello ' + this.name);
    }, 0);
  }
};
obj.greet();`,
        options: ["Hello John", "Hello undefined", "TypeError"],
        correct: "Hello John",
        explanation:
          "Arrow function dziedziczy this z otaczającego scope'u, więc zachowuje kontekst metody greet.",
        points: 20,
        category: "scope",
        difficulty: "medium",
      },
      {
        id: 13,
        code: `let x = 1;
const f = () => {
  console.log(x);
  let x = 2;
};
f();`,
        options: ["1", "2", "ReferenceError"],
        correct: "ReferenceError",
        explanation:
          "Temporal Dead Zone - próba dostępu do zmiennej x przed jej deklaracją w tym samym scope powoduje błąd.",
        points: 20,
        category: "hoisting",
        difficulty: "medium",
      },
      {
        id: 14,
        code: `const add = (a) => {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
};
console.log(add(1)(2)(3));`,
        options: ["6", "undefined", "TypeError"],
        correct: "6",
        explanation:
          "Currying i closure - każda funkcja zachowuje dostęp do zmiennych z zewnętrznych scope'ów.",
        points: 25,
        category: "closure",
        difficulty: "hard",
      },
      {
        id: 15,
        code: `function Person(name) {
  this.name = name;
}
const person = Person('John');
console.log(person?.name);`,
        options: ["John", "undefined", "TypeError"],
        correct: "undefined",
        explanation:
          "Bez new, this w konstruktorze wskazuje na obiekt globalny. Person nie zwraca wartości, więc person jest undefined.",
        points: 20,
        category: "scope",
        difficulty: "medium",
      },
    ],
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
    gameData: [
      {
        id: 1,
        task: "Zamówienie pizzy",
        code: "function orderPizza() { return 'Pizza gotowa!'; }",
        error: "Funkcja powinna być asynchroniczna (async)",
        correct: "async function orderPizza() { return 'Pizza gotowa!'; }",
        points: 10,
        category: "async-await",
        difficulty: "easy",
      },
      {
        id: 2,
        task: "Pobranie danych użytkownika",
        code: "fetch('/user').then(res => res.json()).then(data => console.log(data));",
        error: "Pamiętaj o obsłudze potencjalnych błędów przy użyciu .catch()",
        correct:
          "fetch('/user').then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));",
        points: 15,
        category: "promises",
        difficulty: "medium",
      },
      {
        id: 3,
        task: "Opóźnione powitanie",
        code: "setTimeout(() => console.log('Witaj!'), 1000);",
        error: "Przekształć callback w Promise używając new Promise()",
        correct:
          "new Promise(resolve => setTimeout(() => resolve('Witaj!'), 1000));",
        points: 20,
        category: "callbacks",
        difficulty: "medium",
      },
      {
        id: 4,
        task: "Równoległe pobieranie danych",
        code: "async function getData() {\n  const users = await fetchUsers();\n  const posts = await fetchPosts();\n  return { users, posts };\n}",
        error: "Użyj Promise.all() dla równoległego wykonania",
        correct:
          "async function getData() {\n  const [users, posts] = await Promise.all([\n    fetchUsers(),\n    fetchPosts()\n  ]);\n  return { users, posts };\n}",
        points: 25,
        category: "promises",
        difficulty: "hard",
      },
      {
        id: 5,
        task: "Obsługa błędów w async/await",
        code: "async function processData() {\n  const data = await fetchData();\n  return processResult(data);\n}",
        error: "Dodaj blok try-catch do obsługi potencjalnych błędów",
        correct:
          "async function processData() {\n  try {\n    const data = await fetchData();\n    return processResult(data);\n  } catch (error) {\n    console.error('Błąd:', error);\n    throw error;\n  }\n}",
        points: 20,
        category: "async-await",
        difficulty: "medium",
      },
    ],
    rewardPoints: 200,
    category: "async",
    estimatedTime: 25,
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
    gameData: [
      {
        id: 1,
        text: "Email: john.doe@example.com, Kontakt: alice.smith@company.co.uk",
        task: "Znajdź wszystkie adresy e-mail",
        correctRegex: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}",
      },
      {
        id: 2,
        text: "Numery telefonów: 123-456-789, 987-654-321, 555-555-555",
        task: "Znajdź numery telefonów w formacie XXX-XXX-XXX",
        correctRegex: "\\d{3}-\\d{3}-\\d{3}",
      },
      {
        id: 3,
        text: "Kody pocztowe: 00-001 Warszawa, 12-345 Kraków, 54-321 Wrocław",
        task: "Znajdź kody pocztowe w formacie XX-XXX",
        correctRegex: "\\d{2}-\\d{3}",
      },
    ],
    rewardPoints: 300,
    category: "regex",
    estimatedTime: 35,
  },
];

const initializeGames = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log("Połączono z bazą danych");

    await Game.deleteMany({});
    console.log("Wyczyszczono kolekcję gier");

    const games = await Game.insertMany(gamesData);
    console.log(`Dodano ${games.length} gier do bazy danych`);

    console.log("Inicjalizacja zakończona pomyślnie");
  } catch (error) {
    console.error("Błąd podczas inicjalizacji:", error);
  } finally {
    await mongoose.disconnect();
  }
};

initializeGames();
