import type { Lesson } from "../types/lesson.types";

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Wprowadzenie do async/await w JavaScript",
    description: "Poznaj podstawy asynchronicznego programowania w JavaScript z wykorzystaniem async/await.",
    duration: "20 min",
    difficulty: "beginner",
    xp: 100,
    progress: 0,
    sections: [
      {
        title: "Czym jest programowanie asynchroniczne?",
        content: `Programowanie asynchroniczne pozwala na wykonywanie operacji bez blokowania głównego wątku aplikacji. 
        Jest to szczególnie ważne w JavaScript, gdzie większość operacji I/O (np. zapytania sieciowe, operacje na plikach) 
        jest asynchroniczna.`,
        examples: [
          {
            code: `// Przykład operacji synchronicznej
const result = database.query('SELECT * FROM users');
console.log(result);

// Przykład operacji asynchronicznej
database.query('SELECT * FROM users', (error, result) => {
  console.log(result);
});`,
            language: "javascript",
            explanation: "W pierwszym przykładzie kod czeka na wynik zapytania, blokując wykonywanie. W drugim przykładzie kod kontynuuje działanie, a wynik jest obsługiwany w callback'u."
          }
        ]
      },
      {
        title: "Promises - fundament async/await",
        content: `Promise to obiekt reprezentujący ostateczne zakończenie (lub niepowodzenie) 
        operacji asynchronicznej. Promise może znajdować się w jednym z trzech stanów: pending, 
        fulfilled lub rejected.`,
        examples: [
          {
            code: `const promise = new Promise((resolve, reject) => {
  // Symulacja operacji asynchronicznej
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Operacja zakończona sukcesem!');
    } else {
      reject('Wystąpił błąd!');
    }
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));`,
            language: "javascript",
            explanation: "Promise przyjmuje funkcję executor z dwoma callbackami: resolve i reject. Możemy obsłużyć wynik używając .then() i .catch()."
          }
        ]
      },
      {
        title: "Async/Await w praktyce",
        content: `Async/await to składnia, która pozwala na pisanie kodu asynchronicznego w sposób, 
        który wygląda jak synchroniczny. Słowo kluczowe async oznacza, że funkcja zawsze zwraca Promise, 
        a await pozwala na "czekanie" na wynik Promise.`,
        examples: [
          {
            code: `async function getUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Błąd podczas pobierania użytkownika:', error);
    throw error;
  }
}

// Użycie
async function main() {
  const user = await getUser(1);
  console.log(user);
}`,
            language: "javascript",
            explanation: "Funkcja getUser używa async/await do obsługi zapytania HTTP. Kod jest czytelniejszy niż przy użyciu .then() i lepiej obsługuje błędy dzięki try/catch."
          }
        ]
      }
    ]
  }
  // Więcej lekcji...
]; 