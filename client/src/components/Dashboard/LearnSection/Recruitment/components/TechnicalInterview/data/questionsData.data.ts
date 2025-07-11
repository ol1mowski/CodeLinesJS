export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
};

export const questionsData: Question[] = [
  {
    id: 1,
    question: "Co to jest hoisting w JavaScript?",
    options: [
      "Proces optymalizacji kodu przez przeglądarkę",
      "Przenoszenie deklaracji zmiennych i funkcji na górę zakresu",
      "Mechanizm dziedziczenia w JavaScript",
      "Sposób na łączenie różnych plików JavaScript"
    ],
    correctAnswer: 1,
    explanation: "Hoisting to mechanizm JavaScript w którym deklaracje zmiennych i funkcji są przenoszone na górę ich zakresu podczas kompilacji.",
    category: "Podstawy"
  },
  {
    id: 2,
    question: "Jaka jest różnica między 'var', 'let' i 'const'?",
    options: [
      "Nie ma różnicy, wszystkie działają tak samo",
      "var ma function scope, let i const mają block scope",
      "var i let można przedefiniować, const nie",
      "let można używać tylko w pętlach"
    ],
    correctAnswer: 1,
    explanation: "var ma function scope, podczas gdy let i const mają block scope. Dodatkowo const nie może być ponownie przypisywane.",
    category: "Podstawy"
  },
  {
    id: 3,
    question: "Co to jest closure w JavaScript?",
    options: [
      "Sposób na zamykanie okien przeglądarki",
      "Funkcja która ma dostęp do zmiennych z zewnętrznego zakresu",
      "Metoda optymalizacji pamięci",
      "Sposób na ukrywanie kodu przed użytkownikiem"
    ],
    correctAnswer: 1,
    explanation: "Closure to funkcja, która ma dostęp do zmiennych z zewnętrznego (otaczającego) zakresu nawet po tym, jak zewnętrzna funkcja zakończy wykonywanie.",
    category: "Zaawansowane"
  },
  {
    id: 4,
    question: "Jak działa Event Loop w JavaScript?",
    options: [
      "Wykonuje kod synchronicznie linia po linii",
      "Zarządza kolejką zdarzeń i stosem wywołań",
      "Optymalizuje wydajność aplikacji",
      "Łączy różne pliki JavaScript"
    ],
    correctAnswer: 1,
    explanation: "Event Loop zarządza wykonaniem kodu asynchronicznego, przenosząc zadania z kolejki zdarzeń na stos wywołań gdy jest pusty.",
    category: "Asynchroniczność"
  },
  {
    id: 5,
    question: "Co zwraca typeof null w JavaScript?",
    options: [
      "'null'",
      "'undefined'",
      "'object'",
      "'boolean'"
    ],
    correctAnswer: 2,
    explanation: "typeof null zwraca 'object' - to jest znany bug w JavaScript, który istnieje od samego początku języka.",
    category: "Podstawy"
  },
  {
    id: 6,
    question: "Co to są prototypy w JavaScript?",
    options: [
      "Wersje beta aplikacji JavaScript",
      "Mechanizm dziedziczenia oparty na obiektach",
      "Sposób na definiowanie zmiennych globalnych",
      "Metoda optymalizacji kodu"
    ],
    correctAnswer: 1,
    explanation: "Prototypy to mechanizm dziedziczenia w JavaScript, gdzie obiekty mogą dziedziczyć właściwości i metody z innych obiektów.",
    category: "Prototypy"
  },
  {
    id: 7,
    question: "Czym się różni '==' od '===' w JavaScript?",
    options: [
      "Nie ma różnicy",
      "== porównuje wartości, === porównuje wartości i typy",
      "=== jest szybsze od ==",
      "== można używać tylko z liczbami"
    ],
    correctAnswer: 1,
    explanation: "== wykonuje porównanie z konwersją typów, podczas gdy === porównuje bez konwersji (strict equality).",
    category: "Podstawy"
  },
  {
    id: 8,
    question: "Co to jest async/await w JavaScript?",
    options: [
      "Sposób na definiowanie zmiennych asynchronicznych",
      "Syntactic sugar dla Promise w celu pisania kodu asynchronicznego",
      "Metoda optymalizacji wydajności",
      "Sposób na łączenie plików JavaScript"
    ],
    correctAnswer: 1,
    explanation: "async/await to składnia która ułatwia pracę z Promise, pozwalając pisać kod asynchroniczny w sposób podobny do synchronicznego.",
    category: "Asynchroniczność"
  },
  {
    id: 9,
    question: "Co to jest destructuring w ES6?",
    options: [
      "Usuwanie elementów z tablicy",
      "Rozpakowywanie wartości z tablic lub obiektów do zmiennych",
      "Niszczenie obiektów w pamięci",
      "Łączenie wielu obiektów w jeden"
    ],
    correctAnswer: 1,
    explanation: "Destructuring to składnia pozwalająca na wyciąganie wartości z tablic lub właściwości z obiektów do odrębnych zmiennych.",
    category: "ES6+"
  },
  {
    id: 10,
    question: "Jak działa 'this' w arrow functions?",
    options: [
      "Działa tak samo jak w zwykłych funkcjach",
      "Zawsze wskazuje na obiekt window",
      "Dziedziczy 'this' z otaczającego kontekstu",
      "Jest zawsze undefined"
    ],
    correctAnswer: 2,
    explanation: "Arrow functions nie mają własnego 'this' - dziedziczą go z otaczającego kontekstu leksykalnego.",
    category: "ES6+"
  },
  {
    id: 11,
    question: "Co to jest Promise w JavaScript?",
    options: [
      "Sposób na definiowanie zmiennych",
      "Obiekt reprezentujący ewentualne zakończenie operacji asynchronicznej",
      "Metoda optymalizacji kodu",
      "Sposób na łączenie funkcji"
    ],
    correctAnswer: 1,
    explanation: "Promise to obiekt reprezentujący ewentualne zakończenie (lub niepowodzenie) operacji asynchronicznej i jej wynik.",
    category: "Asynchroniczność"
  },
  {
    id: 12,
    question: "Co zwraca Array.map()?",
    options: [
      "Modyfikuje oryginalną tablicę",
      "Zwraca nową tablicę z przetworzonymi elementami",
      "Zwraca pierwszy element tablicy",
      "Zwraca długość tablicy"
    ],
    correctAnswer: 1,
    explanation: "Array.map() zwraca nową tablicę zawierającą wyniki wywołania podanej funkcji dla każdego elementu oryginalnej tablicy.",
    category: "Tablice"
  },
  {
    id: 13,
    question: "Czym jest spread operator (...) w JavaScript?",
    options: [
      "Operator matematyczny",
      "Składnia pozwalająca na rozłożenie elementów tablicy lub obiektu",
      "Sposób na komentowanie kodu",
      "Operator porównania"
    ],
    correctAnswer: 1,
    explanation: "Spread operator (...) pozwala na rozłożenie elementów iterowalnycgh (jak tablice) lub właściwości obiektów.",
    category: "ES6+"
  },
  {
    id: 14,
    question: "Co to jest callback function?",
    options: [
      "Funkcja która zawsze zwraca false",
      "Funkcja przekazana jako argument do innej funkcji",
      "Funkcja wywoływana automatycznie",
      "Funkcja która nie przyjmuje parametrów"
    ],
    correctAnswer: 1,
    explanation: "Callback to funkcja przekazana jako argument do innej funkcji, która zostanie wywołana w określonym momencie.",
    category: "Funkcje"
  },
  {
    id: 15,
    question: "Jak działa JSON.parse()?",
    options: [
      "Konwertuje obiekt JavaScript do JSON",
      "Parsuje string JSON do obiektu JavaScript",
      "Sprawdza czy string jest poprawnym JSON",
      "Kompresuje dane JSON"
    ],
    correctAnswer: 1,
    explanation: "JSON.parse() parsuje string JSON i konstruuje wartość JavaScript lub obiekt opisany przez string.",
    category: "JSON"
  },
  {
    id: 16,
    question: "Co to jest temporal dead zone?",
    options: [
      "Czas gdy aplikacja nie odpowiada",
      "Okres między deklaracją let/const a inicjalizacją",
      "Strefa w kodzie gdzie zmienne są usuwane",
      "Czas ładowania strony"
    ],
    correctAnswer: 1,
    explanation: "Temporal Dead Zone to okres między wejściem do zakresu a deklaracją zmiennej let/const, gdzie zmienna nie może być użyta.",
    category: "Zaawansowane"
  },
  {
    id: 17,
    question: "Czym różni się forEach od map?",
    options: [
      "forEach zwraca nową tablicę, map nie",
      "map zwraca nową tablicę, forEach zwraca undefined",
      "Nie ma różnicy",
      "forEach jest szybsze"
    ],
    correctAnswer: 1,
    explanation: "map zwraca nową tablicę z przetworzonymi elementami, podczas gdy forEach wykonuje funkcję dla każdego elementu ale zwraca undefined.",
    category: "Tablice"
  },
  {
    id: 18,
    question: "Co to jest IIFE?",
    options: [
      "Internet Information Function Expression",
      "Immediately Invoked Function Expression",
      "Internal Interface Function Expression",
      "Inherited Instance Function Expression"
    ],
    correctAnswer: 1,
    explanation: "IIFE (Immediately Invoked Function Expression) to funkcja która jest wywołana natychmiast po jej zdefiniowaniu.",
    category: "Funkcje"
  },
  {
    id: 19,
    question: "Jak działa Object.create()?",
    options: [
      "Tworzy kopię istniejącego obiektu",
      "Tworzy nowy obiekt z określonym prototypem",
      "Konwertuje tablicę na obiekt",
      "Łączy dwa obiekty w jeden"
    ],
    correctAnswer: 1,
    explanation: "Object.create() tworzy nowy obiekt z określonym obiektem prototypu i właściwościami.",
    category: "Prototypy"
  },
  {
    id: 20,
    question: "Co zwraca typeof []?",
    options: [
      "'array'",
      "'object'",
      "'list'",
      "'undefined'"
    ],
    correctAnswer: 1,
    explanation: "typeof [] zwraca 'object' ponieważ tablice w JavaScript są specjalnym typem obiektów.",
    category: "Podstawy"
  }
];

export const getQuestionsFromDatabase = () => ({
  totalQuestions: questionsData.length,
  questions: questionsData
});

export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 