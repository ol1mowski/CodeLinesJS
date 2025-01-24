import type { Lesson } from "../types/lesson.types";

export const lessons: Lesson[] = [
  {
    id: "js-variables",
    title: "Zmienne w JavaScript",
    description: "Poznaj podstawy deklarowania i używania zmiennych w JavaScript. Dowiedz się o różnicach między var, let i const.",
    duration: "15 min",
    difficulty: "beginner",
    xp: 50,
    progress: {
      completedSections: [],
      quizResults: {}
    },
    sections: [
      {
        title: "Wprowadzenie do zmiennych",
        content: `Zmienne są podstawowym elementem każdego języka programowania. W JavaScript służą do przechowywania danych, 
        które możemy później wykorzystać w naszym programie. Możemy je porównać do pudełek, w których przechowujemy różne wartości.`,
        examples: [
          {
            code: `// Deklaracja zmiennej
let name = "John";
console.log(name); // "John"

// Zmiana wartości
name = "Jane";
console.log(name); // "Jane"`,
            language: "javascript",
            explanation: "Zmienna może przechowywać różne wartości i możemy je zmieniać w trakcie działania programu."
          }
        ]
      },
      {
        title: "var vs let vs const",
        content: `JavaScript oferuje trzy sposoby deklarowania zmiennych: var, let i const. Każdy z nich ma swoje 
        specyficzne zastosowania i ograniczenia. Współcześnie najczęściej używamy let i const.`,
        examples: [
          {
            code: `// var - stary sposób (nie zalecany)
var x = 1;
x = 2; // można zmienić
var x = 3; // można redeklarować

// let - nowoczesny sposób
let y = 1;
y = 2; // można zmienić
// let y = 3; // błąd! nie można redeklarować

// const - dla stałych wartości
const z = 1;
// z = 2; // błąd! nie można zmienić
// const z = 3; // błąd! nie można redeklarować`,
            language: "javascript",
            explanation: "const używamy dla wartości, które nie powinny się zmieniać, let dla zmiennych wartości."
          }
        ]
      },
      {
        title: "Zasięg zmiennych",
        content: `Zasięg (scope) określa, gdzie w kodzie zmienna jest dostępna. JavaScript ma zasięg blokowy dla let i const, 
        oraz zasięg funkcyjny dla var.`,
        examples: [
          {
            code: `function example() {
  let x = 1;
  
  if (true) {
    let y = 2;
    const z = 3;
    console.log(x); // 1 - dostępne
    console.log(y); // 2 - dostępne
    console.log(z); // 3 - dostępne
  }
  
  console.log(x); // 1 - dostępne
  // console.log(y); // błąd! - niedostępne
  // console.log(z); // błąd! - niedostępne
}`,
            language: "javascript",
            explanation: "Zmienne zadeklarowane przez let i const są dostępne tylko wewnątrz bloku, w którym zostały zadeklarowane."
          }
        ]
      },
      {
        title: "Sprawdź swoją wiedzę",
        content: "Sprawdź swoją wiedzę o zmiennych w JavaScript odpowiadając na poniższe pytania.",
        quiz: [
          {
            id: "q1",
            question: "Która deklaracja zmiennej jest zalecana dla wartości, które nie powinny się zmieniać?",
            options: [
              "var",
              "let",
              "const",
              "static"
            ],
            correctAnswer: 2,
            explanation: "const jest używane do deklarowania stałych wartości, które nie powinny być zmieniane."
          },
          {
            id: "q2",
            question: "Jaki jest zasięg zmiennych zadeklarowanych przez let?",
            options: [
              "Globalny",
              "Funkcyjny",
              "Blokowy",
              "Modułowy"
            ],
            correctAnswer: 2,
            explanation: "let ma zasięg blokowy, co oznacza, że zmienna jest dostępna tylko wewnątrz bloku, w którym została zadeklarowana."
          }
        ]
      }
    ]
  },
  // Dodaj więcej lekcji...
  {
    id: "js-functions",
    title: "Funkcje w JavaScript",
    description: "Naucz się tworzyć i używać funkcji w JavaScript. Poznaj różne sposoby ich deklarowania i zastosowania.",
    duration: "25 min",
    difficulty: "intermediate",
    xp: 75,
    progress: {
      completedSections: [],
      quizResults: {}
    },
    sections: [
      // ... sekcje dla funkcji
    ]
  },
  {
    id: "js-async",
    title: "Programowanie asynchroniczne",
    description: "Zaawansowane techniki programowania asynchronicznego z wykorzystaniem Promise, async/await i callbacks.",
    duration: "35 min",
    difficulty: "advanced",
    xp: 100,
    progress: {
      completedSections: [],
      quizResults: {}
    },
    sections: [
      // ... sekcje dla async
    ]
  }
]; 