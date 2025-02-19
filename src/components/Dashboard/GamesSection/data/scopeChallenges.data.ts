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
    explanation: "Każdy blok kodu tworzy nowy zakres dla let. Zmienna x jest przesłaniana w każdym zagnieżdżonym bloku.",
    points: 15,
    category: 'scope',
    difficulty: 'medium'
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
    explanation: "Funkcja inner tworzy domknięcie i zachowuje dostęp do zmiennej count. Każde wywołanie increment() zwiększa tę samą zmienną.",
    points: 25,
    category: 'closure',
    difficulty: 'hard'
  },
  {
    id: 8,
    code: `console.log(x);
let x = 5;`,
    options: ["5", "undefined", "ReferenceError"],
    correct: "ReferenceError",
    explanation: "Zmienna let podlega temporal dead zone - próba dostępu przed deklaracją powoduje ReferenceError.",
    points: 20,
    category: 'hoisting',
    difficulty: 'medium'
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
    explanation: "var nie ma zasięgu blokowego, więc wszystkie setTimeout'y współdzielą tę samą zmienną i, która po zakończeniu pętli ma wartość 3.",
    points: 25,
    category: 'closure',
    difficulty: 'hard'
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
    explanation: "var ma zasięg funkcyjny, więc x jest dostępne poza blokiem if. let ma zasięg blokowy, więc y nie jest dostępne poza blokiem.",
    points: 20,
    category: 'scope',
    difficulty: 'medium'
  }
]; 