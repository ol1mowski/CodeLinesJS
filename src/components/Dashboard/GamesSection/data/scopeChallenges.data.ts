import { ScopeChallenge } from '../types/scopeExplorer.types';

export const scopeChallenges: ScopeChallenge[] = [
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
    explanation: "Zmienna x zadeklarowana wewnątrz funkcji test() przesłania zmienną x z zewnętrznego zakresu.",
    points: 10,
    category: 'scope',
    difficulty: 'easy'
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
    explanation: "Funkcja demo() modyfikuje zmienną y z globalnego zakresu, ponieważ nie jest ona ponownie deklarowana wewnątrz funkcji.",
    points: 10,
    category: 'scope',
    difficulty: 'easy'
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
    explanation: "Funkcja zwrócona przez createCounter() tworzy domknięcie (closure) i zachowuje dostęp do zmiennej count.",
    points: 20,
    category: 'closure',
    difficulty: 'medium'
  },
  {
    id: 4,
    code: `console.log(x);
var x = 5;`,
    options: ["5", "undefined", "ReferenceError"],
    correct: "undefined",
    explanation: "Deklaracja var jest hoistowana, ale inicjalizacja nie. Dlatego przed inicjalizacją x ma wartość undefined.",
    points: 15,
    category: 'hoisting',
    difficulty: 'medium'
  },
  {
    id: 5,
    code: `for(var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ["0,1,2", "3,3,3", "undefined"],
    correct: "3,3,3",
    explanation: "Zmienna var i jest współdzielona między wszystkimi iteracjami pętli. Gdy setTimeout się wykonuje, pętla już się zakończyła i i ma wartość 3.",
    points: 25,
    category: 'closure',
    difficulty: 'hard'
  }
]; 