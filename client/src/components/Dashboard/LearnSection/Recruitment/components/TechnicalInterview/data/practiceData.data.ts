import type { PracticeTask } from '../../../types/recruitment.types';

export const practiceTasks: PracticeTask[] = [
  {
    id: 'reverse-string',
    title: 'Odwrócenie stringa',
    description: 'Napisz funkcję, która odwróci podany string bez użycia wbudowanej metody reverse()',
    difficulty: 'easy',
    category: 'Manipulacja stringów',
    estimatedTime: 10,
    taskContent: `Napisz funkcję reverseString, która przyjmuje string jako argument i zwraca go odwrócony.

Przykład:
reverseString("hello") // "olleh"
reverseString("JavaScript") // "tpircSavaJ"
reverseString("") // ""

Wymagania:
- Nie używaj wbudowanej metody reverse()
- Funkcja powinna działać dla pustych stringów
- Zwracaj nowy string, nie modyfikuj oryginalnego`,
    solution: `function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Alternatywne rozwiązanie z redukcją
function reverseStringAlt(str) {
  return str.split('').reduce((reversed, char) => char + reversed, '');
}

// Rozwiązanie rekurencyjne
function reverseStringRecursive(str) {
  if (str === '') return '';
  return reverseStringRecursive(str.substr(1)) + str.charAt(0);
}`,
    tips: [
      'Możesz iterować od końca stringa do początku',
      'Pamiętaj o obsłudze pustych stringów',
      'Rozważ różne podejścia: pętla for, rekurencja, metody tablicowe'
    ],
    tags: ['string', 'loops', 'basic algorithms']
  },
  {
    id: 'find-duplicates',
    title: 'Znajdź duplikaty w tablicy',
    description: 'Napisz funkcję, która znajdzie wszystkie duplikaty w tablicy liczb',
    difficulty: 'easy',
    category: 'Manipulacja tablicami',
    estimatedTime: 15,
    taskContent: `Napisz funkcję findDuplicates, która przyjmuje tablicę liczb i zwraca tablicę zawierającą wszystkie duplikaty.

Przykład:
findDuplicates([1, 2, 3, 2, 4, 5, 1]) // [1, 2]
findDuplicates([1, 2, 3, 4, 5]) // []
findDuplicates([1, 1, 1, 2, 2]) // [1, 2]

Wymagania:
- Zwróć tylko unikalne duplikaty (bez powtórzeń)
- Zachowaj kolejność pierwszego wystąpienia duplikatu
- Obsłuż puste tablice`,
    solution: `function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  
  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }
  
  return Array.from(duplicates);
}

// Alternatywne rozwiązanie z filter
function findDuplicatesAlt(arr) {
  return arr.filter((item, index) => arr.indexOf(item) !== index)
           .filter((item, index, self) => self.indexOf(item) === index);
}

// Rozwiązanie z reduce
function findDuplicatesReduce(arr) {
  const counts = arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  
  return Object.keys(counts).filter(key => counts[key] > 1).map(Number);
}`,
    tips: [
      'Set może pomóc w śledzeniu już widzianych elementów',
      'Pamiętaj o zwracaniu tylko unikalnych duplikatów',
      'Rozważ złożoność czasową różnych podejść'
    ],
    tags: ['array', 'set', 'duplicates']
  },
  {
    id: 'fibonacci',
    title: 'Ciąg Fibonacciego',
    description: 'Implementuj funkcję generującą n-ty element ciągu Fibonacciego',
    difficulty: 'medium',
    category: 'Rekurencja i algorytmy',
    estimatedTime: 20,
    taskContent: `Napisz funkcję fibonacci, która zwróci n-ty element ciągu Fibonacciego.

Ciąg Fibonacciego: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

Przykład:
fibonacci(0) // 0
fibonacci(1) // 1
fibonacci(5) // 5
fibonacci(10) // 55

Wymagania:
- Obsłuż przypadki brzegowe (n = 0, n = 1)
- Rozważ optymalizację dla większych wartości n
- Funkcja powinna być efektywna`,
    solution: `// Rozwiązanie iteracyjne (zalecane)
function fibonacci(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

// Rozwiązanie rekurencyjne (nieefektywne dla większych n)
function fibonacciRecursive(n) {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Rozwiązanie z memoizacją
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Rozwiązanie z programowaniem dynamicznym
function fibonacciDP(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
    tips: [
      'Rozwiązanie rekurencyjne jest intuicyjne, ale nieefektywne',
      'Rozważ iteracyjne podejście dla lepszej wydajności',
      'Memoizacja może znacznie przyspieszyć rekurencyjne rozwiązanie'
    ],
    tags: ['recursion', 'dynamic programming', 'algorithms']
  },
  {
    id: 'debounce-function',
    title: 'Implementacja debounce',
    description: 'Napisz funkcję debounce, która opóźnia wykonanie funkcji',
    difficulty: 'medium',
    category: 'Funkcje wyższego rzędu',
    estimatedTime: 25,
    taskContent: `Napisz funkcję debounce, która opóźnia wykonanie funkcji do momentu, gdy przestanie być wywoływana przez określony czas.

Przykład użycia:
const debouncedFunction = debounce(() => {
  console.log('Executed!');
}, 1000);

// Funkcja wykona się dopiero po 1 sekundzie od ostatniego wywołania
debouncedFunction();
debouncedFunction();
debouncedFunction();

Wymagania:
- Funkcja powinna zwracać nową funkcję
- Poprzednie wywołania powinny być anulowane
- Obsłuż przekazywanie argumentów do oryginalnej funkcji`,
    solution: `function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    // Anuluj poprzedni timeout
    clearTimeout(timeoutId);
    
    // Ustaw nowy timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Wersja z możliwością wywołania natychmiastowego
function debounceAdvanced(func, delay, immediate = false) {
  let timeoutId;
  
  return function(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) func.apply(this, args);
    }, delay);
    
    if (callNow) func.apply(this, args);
  };
}

// Przykład użycia z anulowaniem
function debounceWithCancel(func, delay) {
  let timeoutId;
  
  const debounced = function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
  
  debounced.cancel = function() {
    clearTimeout(timeoutId);
  };
  
  return debounced;
}`,
    tips: [
      'Użyj setTimeout i clearTimeout do zarządzania opóźnieniem',
      'Pamiętaj o zachowaniu kontekstu (this) oryginalnej funkcji',
      'Rozważ dodanie możliwości anulowania debounce'
    ],
    tags: ['higher-order functions', 'closures', 'setTimeout']
  },
  {
    id: 'deep-clone',
    title: 'Głęboka kopia obiektu',
    description: 'Implementuj funkcję do głębokiego klonowania obiektów',
    difficulty: 'hard',
    category: 'Manipulacja obiektami',
    estimatedTime: 30,
    taskContent: `Napisz funkcję deepClone, która tworzy głęboką kopię obiektu, obsługując zagnieżdżone obiekty i tablice.

Przykład:
const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  },
  hobbies: ['reading', 'coding']
};

const cloned = deepClone(original);
cloned.address.city = 'Los Angeles';
console.log(original.address.city); // 'New York' (nie zmienione)

Wymagania:
- Obsłuż zagnieżdżone obiekty
- Obsłuż tablice
- Obsłuż prymitywne typy danych
- Unikaj cyklicznych referencji`,
    solution: `function deepClone(obj) {
  // Obsługa prymitywnych typów i null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Obsługa dat
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Obsługa tablic
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  // Obsługa obiektów
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}

// Wersja z obsługą cyklicznych referencji
function deepCloneWithCircular(obj, visited = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Sprawdź czy obiekt już był klonowany
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  
  let cloned;
  
  if (obj instanceof Date) {
    cloned = new Date(obj.getTime());
  } else if (Array.isArray(obj)) {
    cloned = [];
    visited.set(obj, cloned);
    for (let i = 0; i < obj.length; i++) {
      cloned[i] = deepCloneWithCircular(obj[i], visited);
    }
  } else {
    cloned = {};
    visited.set(obj, cloned);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepCloneWithCircular(obj[key], visited);
      }
    }
  }
  
  return cloned;
}

// Rozwiązanie z użyciem JSON (ograniczone)
function deepCloneJSON(obj) {
  // Uwaga: nie obsługuje funkcji, undefined, Symbol, Date itp.
  return JSON.parse(JSON.stringify(obj));
}`,
    tips: [
      'Sprawdź typ danych przed klonowaniem',
      'Pamiętaj o obsłudze tablic i obiektów specjalnych (Date, RegExp)',
      'WeakMap może pomóc w uniknięciu cyklicznych referencji',
      'JSON.parse(JSON.stringify()) to szybkie rozwiązanie, ale ma ograniczenia'
    ],
    tags: ['objects', 'recursion', 'deep copy', 'advanced']
  },
  {
    id: 'async-sequential',
    title: 'Sekwencyjne wykonywanie Promise',
    description: 'Napisz funkcję, która wykonuje Promise sekwencyjnie',
    difficulty: 'hard',
    category: 'Asynchroniczność',
    estimatedTime: 35,
    taskContent: `Napisz funkcję executeSequentially, która wykonuje tablicę funkcji zwracających Promise w określonej kolejności, czekając na zakończenie każdej przed przejściem do następnej.

Przykład:
const tasks = [
  () => fetch('/api/data1'),
  () => fetch('/api/data2'),
  () => fetch('/api/data3')
];

executeSequentially(tasks).then(results => {
  console.log(results); // tablica wyników w kolejności
});

Wymagania:
- Funkcje mają być wykonane sekwencyjnie, nie równolegle
- Zwróć tablicę wyników w odpowiedniej kolejności
- Obsłuż błędy - jeśli jedna funkcja się nie powiedzie, zatrzymaj wykonywanie`,
    solution: `// Rozwiązanie z async/await
async function executeSequentially(tasks) {
  const results = [];
  
  for (const task of tasks) {
    try {
      const result = await task();
      results.push(result);
    } catch (error) {
      throw error; // Zatrzymaj wykonywanie przy błędzie
    }
  }
  
  return results;
}

// Rozwiązanie z reduce i Promise
function executeSequentiallyReduce(tasks) {
  return tasks.reduce(async (previousPromise, currentTask) => {
    const results = await previousPromise;
    const result = await currentTask();
    return [...results, result];
  }, Promise.resolve([]));
}

// Rozwiązanie z obsługą błędów bez zatrzymywania
async function executeSequentiallyWithErrors(tasks) {
  const results = [];
  
  for (let i = 0; i < tasks.length; i++) {
    try {
      const result = await tasks[i]();
      results.push({ success: true, data: result, index: i });
    } catch (error) {
      results.push({ success: false, error, index: i });
    }
  }
  
  return results;
}

// Rozwiązanie z możliwością anulowania
function executeSequentiallyWithCancel(tasks) {
  let cancelled = false;
  
  const execute = async () => {
    const results = [];
    
    for (const task of tasks) {
      if (cancelled) throw new Error('Execution cancelled');
      
      const result = await task();
      results.push(result);
    }
    
    return results;
  };
  
  const cancel = () => {
    cancelled = true;
  };
  
  return { promise: execute(), cancel };
}

// Przykład użycia
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const tasks = [
  async () => {
    await delay(1000);
    return 'Task 1 completed';
  },
  async () => {
    await delay(500);
    return 'Task 2 completed';
  },
  async () => {
    await delay(2000);
    return 'Task 3 completed';
  }
];

executeSequentially(tasks).then(console.log);`,
    tips: [
      'async/await czyni kod bardziej czytelnym niż łączenie Promise',
      'Rozważ czy błędy powinny zatrzymywać całe wykonywanie',
      'reduce może być użyty do sekwencyjnego przetwarzania Promise',
      'Pamiętaj o różnicy między sekwencyjnym a równoległym wykonywaniem'
    ],
    tags: ['async/await', 'promises', 'sequential execution', 'advanced']
  }
];

export const practiceCategories = [
  'Wszystkie',
  'Manipulacja stringów',
  'Manipulacja tablicami',
  'Rekurencja i algorytmy',
  'Funkcje wyższego rzędu',
  'Manipulacja obiektami',
  'Asynchroniczność'
];

export const difficultyLabels = {
  easy: 'Łatwe',
  medium: 'Średnie',
  hard: 'Trudne'
}; 