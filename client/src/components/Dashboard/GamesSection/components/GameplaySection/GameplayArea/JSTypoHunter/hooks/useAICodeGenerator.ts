import { useState, useCallback } from 'react';

export interface AIGeneratedChallenge {
  id: string;
  code: string;
  errors: { index: number; lineContent: string; correction: string; explanation: string }[];
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
}

export const useAICodeGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateChallenge = useCallback(async (difficulty: 'easy' | 'medium' | 'hard'): Promise<AIGeneratedChallenge> => {
    setIsGenerating(true);
    setProgress(10);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(50);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(80);

      const result = generateFallbackChallenge(difficulty);
      
      setProgress(100);
      return result;
    } catch (error) {
      console.error('Błąd generowania zadania:', error);
      return generateFallbackChallenge(difficulty);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const checkAnswer = useCallback((userCorrection: string, correctLine: string): boolean => {
    const normalizedUserCorrection = userCorrection.trim().replace(/\s+/g, ' ');
    const normalizedCorrectLine = correctLine.trim().replace(/\s+/g, ' ');
    
    if (normalizedUserCorrection === normalizedCorrectLine) {
      return true;
    }
    
    const similarity = calculateSimilarity(normalizedUserCorrection, normalizedCorrectLine);
    return similarity > 0.8;
  }, []);

  /**
   * Generuje przykładowe zadanie w przypadku błędu
   */
  const generateFallbackChallenge = (difficulty: 'easy' | 'medium' | 'hard'): AIGeneratedChallenge => {
    const allChallenges = {
      easy: [
        {
          code: `function calculateSum(a, b) {
  return a + b
}

console.log(calculateSum(5, 10));`,
          errors: [
            {
              index: 1,
              lineContent: "  return a + b",
              correction: "  return a + b;",
              explanation: "Brakuje średnika na końcu linii."
            }
          ],
          description: "Znajdź błąd składniowy w prostej funkcji sumującej dwie liczby."
        },
        {
          code: `const price = 100;
const tax = 0.23;
const total = price + price * taxt;

console.log("Łączna kwota: " + total);`,
          errors: [
            {
              index: 2,
              lineContent: "const total = price + price * taxt;",
              correction: "const total = price + price * tax;",
              explanation: "Literówka w nazwie zmiennej 'tax' (napisano 'taxt')."
            }
          ],
          description: "Znajdź błąd w obliczaniu ceny z podatkiem."
        },
        {
          code: `function isEven(num) {
  if (num % 2 = 0) {
    return true;
  }
  return false;
}

console.log(isEven(4));`,
          errors: [
            {
              index: 1,
              lineContent: "  if (num % 2 = 0) {",
              correction: "  if (num % 2 === 0) {",
              explanation: "Użyto operatora przypisania (=) zamiast operatora porównania (===)."
            }
          ],
          description: "Znajdź błąd w funkcji sprawdzającej czy liczba jest parzysta."
        }
      ],
      medium: [
        {
          code: `const numbers = [1, 2, 3, 4, 5];

function doubleNumbers(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2);
  }
  return result
}

const doubled = doubleNumbers(numbers);
console.log(doubled);`,
          errors: [
            {
              index: 7,
              lineContent: "  return result",
              correction: "  return result;",
              explanation: "Brakuje średnika na końcu linii."
            }
          ],
          description: "Znajdź błąd w funkcji podwajającej wartości liczb w tablicy."
        },
        {
          code: `function findMax(array) {
  let max = array[0]
  
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max);
      max = array[i];
  }
  
  return max;
}

const values = [5, 9, 3, 12, 2];
console.log(findMax(values));`,
          errors: [
            {
              index: 1,
              lineContent: "  let max = array[0]",
              correction: "  let max = array[0];",
              explanation: "Brakuje średnika na końcu linii."
            },
            {
              index: 4,
              lineContent: "    if (array[i] > max);",
              correction: "    if (array[i] > max)",
              explanation: "Niepotrzebny średnik po warunku if, powoduje że blok warunkowy zawsze się wykona."
            }
          ],
          description: "Znajdź błędy w funkcji znajdującej największą wartość w tablicy."
        },
        {
          code: `class Counter {
  constructor() {
    this.count = 0
  }
  
  increment() {
    return this.count++
  }
  
  getValue() {
    return this.counter;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getValue());`,
          errors: [
            {
              index: 2,
              lineContent: "    this.count = 0",
              correction: "    this.count = 0;",
              explanation: "Brakuje średnika na końcu linii."
            },
            {
              index: 6,
              lineContent: "    return this.count++",
              correction: "    return this.count++;",
              explanation: "Brakuje średnika po inkrementacji."
            },
            {
              index: 10,
              lineContent: "    return this.counter;",
              correction: "    return this.count;",
              explanation: "Błędna nazwa właściwości (counter zamiast count)."
            }
          ],
          description: "Znajdź błędy w klasie Counter."
        }
      ],
      hard: [
        {
          code: `class User {
  constructor(name, age) {
    this.name = name;
    this.age = age
  }

  getInfo() {
    return 'Użytkownik ' + this.name + ' ma ' + this.name + ' lat.';
  }
}

function createUser(name, age) {
  if (age < 18) {
    console.log("Użytkownik musi być pełnoletni");
    return;
  }
  
  return new User(name, age);
)

const user = createUser("Jan", 25);
console.log(user.getInfo());`,
          errors: [
            {
              index: 3,
              lineContent: "    this.age = age",
              correction: "    this.age = age;",
              explanation: "Brakuje średnika na końcu linii."
            },
            {
              index: 7,
              lineContent: "    return 'Użytkownik ' + this.name + ' ma ' + this.name + ' lat.';",
              correction: "    return 'Użytkownik ' + this.name + ' ma ' + this.age + ' lat.';",
              explanation: "Używamy dwa razy this.name zamiast this.age przy wyświetlaniu wieku."
            },
            {
              index: 18,
              lineContent: ")",
              correction: "}",
              explanation: "Niepoprawny nawias zamykający funkcję."
            }
          ],
          description: "Znajdź błędy w klasie User i funkcji createUser."
        },
        {
          code: `async function fetchUserData(userId) {
  try {
    const response = await fetch('https://api.example.com/users/' + userId);
    const data = await response.json();
    return data
  } catch (error) {
    console.log('Wystąpił błąd:', error);
    throw error
  }
}

function displayUserInfo(userData) {
  const { name, email, phone } = userData;
  
  if (name === undefined && email === undefined) {
    console.log("Brak danych użytkownika");
    return;
  
  console.log('Imię: ' + name);
  console.log('Email: ' + email);
  console.log('Telefon: ' + phone);
}

fetchUserData(123)
  .then(data => displayUserInfo(data))
  .catch(err => console.error('Błąd:', err));`,
          errors: [
            {
              index: 4,
              lineContent: "    return data",
              correction: "    return data;",
              explanation: "Brakuje średnika na końcu linii."
            },
            {
              index: 7,
              lineContent: "    throw error",
              correction: "    throw error;",
              explanation: "Brakuje średnika po throw."
            },
            {
              index: 17,
              lineContent: "  return;",
              correction: "  return;\n  }",
              explanation: "Brakuje zamknięcia bloku warunkowego if."
            }
          ],
          description: "Znajdź błędy w kodzie do pobierania i wyświetlania danych użytkownika."
        },
        {
          code: `class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(id) {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }

  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + item.price * items.quantity;
    }, 0);
  }

  clearCart() {
    this.items = [];
    return this.items
  }
}

const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Książka', price: 39.99, quantity: 2 });
cart.addItem({ id: 2, name: 'Długopis', price: 4.99, quantity: 5 });
console.log('Łączna kwota: ' + cart.calculateTotal());`,
          errors: [
            {
              index: 12,
              lineContent: "      this.items.splice(index, 1)",
              correction: "      this.items.splice(index, 1);",
              explanation: "Brakuje średnika na końcu linii."
            },
            {
              index: 18,
              lineContent: "      return total + item.price * items.quantity;",
              correction: "      return total + item.price * item.quantity;",
              explanation: "Błędna nazwa zmiennej (items.quantity zamiast item.quantity)."
            },
            {
              index: 24,
              lineContent: "    return this.items",
              correction: "    return this.items;",
              explanation: "Brakuje średnika na końcu linii."
            }
          ],
          description: "Znajdź błędy w klasie ShoppingCart."
        }
      ]
    };

    const availableChallenges = allChallenges[difficulty];
    const randomIndex = Math.floor(Math.random() * availableChallenges.length);
    const selectedChallenge = availableChallenges[randomIndex];
    
    return {
      id: `challenge-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...selectedChallenge,
      difficulty
    };
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    if (str1 === str2) return 1.0;
    if (str1.length === 0 || str2.length === 0) return 0.0;
    
    const matrix = Array(str1.length + 1).fill(null)
      .map(() => Array(str2.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) {
      matrix[i][0] = i;
    }
    
    for (let j = 0; j <= str2.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    
    const maxLength = Math.max(str1.length, str2.length);
    return 1 - matrix[str1.length][str2.length] / maxLength;
  };

  return {
    generateChallenge,
    checkAnswer,
    isGenerating,
    progress
  };
};

export default useAICodeGenerator; 