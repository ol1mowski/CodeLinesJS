import { CodeChallenge } from '../types/jsTypoHunter.types';

export const challenges: CodeChallenge[] = [
  {
    id: 1,
    code: "conosle.log('Hello World');",
    error: "conosle",
    correct: "console",
    hint: "Sprawdź dokładnie nazwę obiektu służącego do wyświetlania w konsoli",
    explanation: "console to poprawna nazwa obiektu do logowania w JavaScript",
    category: 'naming',
    difficulty: 'easy'
  },
  {
    id: 2,
    code: "let num = 10;\nif(num = 10) { alert('Ten!'); }",
    error: "=",
    correct: "==",
    hint: "Zwróć uwagę na operator w warunku if",
    explanation: "= to operator przypisania, == to operator porównania",
    category: 'syntax',
    difficulty: 'easy'
  },
  {
    id: 3,
    code: "function calculateSum(a, b {\n  return a + b;\n}",
    error: "function calculateSum(a, b {",
    correct: "function calculateSum(a, b) {",
    hint: "Sprawdź składnię deklaracji funkcji",
    explanation: "W deklaracji funkcji brakuje nawiasu zamykającego listę parametrów",
    category: 'syntax',
    difficulty: 'easy'
  },
  {
    id: 4,
    code: "const array = [1, 2, 3];\narray.forEach(item => {\n  cosnt sum = item + 1;\n});",
    error: "cosnt",
    correct: "const",
    hint: "Przyjrzyj się słowu kluczowemu deklaracji zmiennej",
    explanation: "const to poprawne słowo kluczowe do deklaracji stałej",
    category: 'naming',
    difficulty: 'medium'
  },
  {
    id: 5,
    code: "function multiply(x, y) {\n  reutrn x * y;\n}",
    error: "reutrn",
    correct: "return",
    hint: "Sprawdź pisownię słowa kluczowego do zwracania wartości",
    explanation: "return to poprawne słowo kluczowe do zwracania wartości z funkcji",
    category: 'naming',
    difficulty: 'easy'
  },
  {
    id: 6,
    code: "const obj = {\n  name: 'John'\n  age: 30\n};",
    error: "  age: 30",
    correct: "  age: 30,",
    hint: "Sprawdź składnię obiektu - czy czegoś nie brakuje między właściwościami?",
    explanation: "W obiekcie właściwości muszą być oddzielone przecinkami",
    category: 'syntax',
    difficulty: 'medium'
  }
]; 