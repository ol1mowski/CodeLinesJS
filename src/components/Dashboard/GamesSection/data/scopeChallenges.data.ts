import { ScopeChallenge } from '../types/scopeExplorer.types';

export const scopeChallenges: ScopeChallenge[] = [
  {
    id: 1,
    code: "let x = 10;\nfunction test() {\n  let x = 20;\n  return x;\n}\nconsole.log(test());",
    options: ["10", "20", "undefined"],
    correct: "20",
    explanation: "Zmienna x zadeklarowana wewnątrz funkcji test() przesłania zmienną x z zewnętrznego zakresu.",
    points: 10
  },
  {
    id: 2,
    code: "var y = 5;\nfunction demo() {\n  y = 15;\n}\ndemo();\nconsole.log(y);",
    options: ["5", "15", "undefined"],
    correct: "15",
    explanation: "Funkcja demo() modyfikuje zmienną y z globalnego zakresu, ponieważ nie jest ona ponownie deklarowana wewnątrz funkcji.",
    points: 10
  }
]; 