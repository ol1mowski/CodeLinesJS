import type { Lesson } from "../types/lesson.types";

export const lessons: Lesson[] = [
  {
    id: "js-variables",
    title: "Zmienne w JavaScript",
    description: "Poznaj podstawy deklarowania i używania zmiennych w JavaScript. Dowiedz się o różnicach między var, let i const.",
    duration: "15 min",
    difficulty: "beginner",
    xp: 50,
    rewards: {
      completion: [
        {
          type: 'xp',
          value: 50,
          title: 'Podstawy opanowane!',
          description: 'Ukończyłeś podstawy JavaScript'
        }
      ],
      quiz: {
        100: [
          {
            type: 'badge',
            value: 1,
            title: 'Perfekcyjny wynik!',
            description: 'Odpowiedziałeś poprawnie na wszystkie pytania'
          }
        ],
        80: [
          {
            type: 'xp',
            value: 10,
            title: 'Świetny wynik!',
            description: 'Zdobyłeś dodatkowe punkty za wysoki wynik'
          }
        ]
      }
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
  {
    id: "js-functions",
    title: "Funkcje w JavaScript",
    description: "Naucz się tworzyć i używać funkcji w JavaScript. Poznaj różne sposoby ich deklarowania i zastosowania.",
    duration: "25 min",
    difficulty: "intermediate",
    xp: 75,
    rewards: {
      completion: [
        {
          type: 'xp',
          value: 75,
          title: 'Podstawy opanowane!',
          description: 'Ukończyłeś podstawy JavaScript'
        }
      ],
      quiz: {
        100: [
          {
            type: 'badge',
            value: 1,
            title: 'Perfekcyjny wynik!',
            description: 'Odpowiedziałeś poprawnie na wszystkie pytania'
          }
        ],
        80: [
          {
            type: 'xp',
            value: 15,
            title: 'Świetny wynik!',
            description: 'Zdobyłeś dodatkowe punkty za wysoki wynik'
          }
        ]
      }
    },
    sections: [
      {
        title: "Podstawy funkcji",
        content: `Funkcje są podstawowymi "cegiełkami" w JavaScript. Pozwalają nam grupować kod, który możemy 
        wielokrotnie wykorzystywać. Funkcja może przyjmować parametry i zwracać wartość.`,
        examples: [
          {
            code: `// Podstawowa deklaracja funkcji
function sayHello(name) {
  return "Cześć, " + name + "!";
}

// Wywołanie funkcji
const greeting = sayHello("Jan");
console.log(greeting); // "Cześć, Jan!"

// Funkcja z wieloma parametrami
function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // 8`,
            language: "javascript",
            explanation: "Funkcje mogą przyjmować parametry i zwracać wartości. Używamy słowa kluczowego return do zwrócenia wyniku."
          }
        ]
      },
      {
        title: "Funkcje strzałkowe",
        content: `Funkcje strzałkowe (arrow functions) to nowoczesny sposób zapisu funkcji w JavaScript. 
        Są bardziej zwięzłe i mają inne zachowanie this niż tradycyjne funkcje.`,
        examples: [
          {
            code: `// Tradycyjna funkcja
function multiply(a, b) {
  return a * b;
}

// To samo jako funkcja strzałkowa
const multiply = (a, b) => a * b;

// Funkcja strzałkowa z blokiem kodu
const greet = (name) => {
  const message = "Witaj, " + name;
  return message + "!";
};

// Funkcja z jednym parametrem
const square = x => x * x;`,
            language: "javascript",
            explanation: "Funkcje strzałkowe są krótsze w zapisie. Jeśli mamy jeden parametr, możemy pominąć nawiasy. Jeśli funkcja wykonuje tylko return, możemy pominąć klamry i słowo return."
          }
        ]
      },
      {
        title: "Parametry domyślne i rest",
        content: `JavaScript pozwala na ustawienie wartości domyślnych dla parametrów oraz zbieranie 
        wielu argumentów w jeden parametr za pomocą operatora rest.`,
        examples: [
          {
            code: `// Parametry domyślne
function greet(name = "Gość") {
  return "Witaj, " + name;
}

console.log(greet()); // "Witaj, Gość"
console.log(greet("Jan")); // "Witaj, Jan"

// Operator rest
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(10, 20)); // 30`,
            language: "javascript",
            explanation: "Parametry domyślne są używane, gdy argument nie zostanie przekazany. Operator rest (...) zbiera wszystkie argumenty w tablicę."
          }
        ]
      },
      {
        title: "Sprawdź swoją wiedzę",
        content: "Sprawdź swoją wiedzę o funkcjach w JavaScript odpowiadając na poniższe pytania.",
        quiz: [
          {
            id: "q1",
            question: "Jaka jest główna różnica między tradycyjną funkcją a funkcją strzałkową?",
            options: [
              "Funkcje strzałkowe są wolniejsze",
              "Funkcje strzałkowe mają inne wiązanie this",
              "Funkcje strzałkowe nie mogą zwracać wartości",
              "Nie ma żadnej różnicy"
            ],
            correctAnswer: 1,
            explanation: "Główną różnicą jest inne wiązanie this w funkcjach strzałkowych - dziedziczą one this z otaczającego kontekstu."
          },
          {
            id: "q2",
            question: "Co oznacza operator rest (...) w parametrach funkcji?",
            options: [
              "Funkcja musi mieć co najmniej jeden argument",
              "Funkcja nie może mieć więcej argumentów",
              "Zbiera wszystkie argumenty w tablicę",
              "Rozbija tablicę na pojedyncze argumenty"
            ],
            correctAnswer: 2,
            explanation: "Operator rest (...) w parametrach funkcji zbiera wszystkie przekazane argumenty w jedną tablicę."
          }
        ]
      }
    ]
  },
  {
    id: "js-async",
    title: "Programowanie asynchroniczne",
    description: "Zaawansowane techniki programowania asynchronicznego z wykorzystaniem Promise, async/await i callbacks.",
    duration: "35 min",
    difficulty: "advanced",
    xp: 100,
    rewards: {
      completion: [
        {
          type: 'xp',
          value: 100,
          title: 'Podstawy opanowane!',
          description: 'Ukończyłeś podstawy JavaScript'
        }
      ],
      quiz: {
        100: [
          {
            type: 'badge',
            value: 1,
            title: 'Perfekcyjny wynik!',
            description: 'Odpowiedziałeś poprawnie na wszystkie pytania'
          }
        ],
        80: [
          {
            type: 'xp',
            value: 20,
            title: 'Świetny wynik!',
            description: 'Zdobyłeś dodatkowe punkty za wysoki wynik'
          }
        ]
      }
    },
    sections: [
      {
        title: "Callbacks i asynchroniczność",
        content: `JavaScript jest jednowątkowy, ale może wykonywać operacje asynchronicznie. 
        Tradycyjnie używaliśmy callbacków do obsługi operacji asynchronicznych, ale prowadziło 
        to często do tzw. "callback hell".`,
        examples: [
          {
            code: `// Przykład callback hell
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});

// Ten sam kod z lepszą organizacją
function handleData(data) {
  console.log(data);
}

function handleError(error) {
  console.error('Wystąpił błąd:', error);
}

getData()
  .then(handleData)
  .catch(handleError);`,
            language: "javascript",
            explanation: "Zagnieżdżone callbacks są trudne w utrzymaniu. Promise i async/await oferują lepsze rozwiązanie."
          }
        ]
      },
      {
        title: "Promise",
        content: `Promise to obiekt reprezentujący ostateczne zakończenie (lub niepowodzenie) 
        operacji asynchronicznej. Promise może być w jednym z trzech stanów: pending, fulfilled lub rejected.`,
        examples: [
          {
            code: `// Tworzenie Promise
const myPromise = new Promise((resolve, reject) => {
  // Symulacja operacji asynchronicznej
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve('Operacja zakończona sukcesem!');
    } else {
      reject(new Error('Coś poszło nie tak...'));
    }
  }, 1000);
});

// Użycie Promise
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Zakończono'));

// Łączenie Promise
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts')
])
  .then(([users, posts]) => {
    console.log('Użytkownicy:', users);
    console.log('Posty:', posts);
  });`,
            language: "javascript",
            explanation: "Promise pozwalają na lepszą obsługę operacji asynchronicznych i łatwiejsze łączenie wielu operacji."
          }
        ]
      },
      {
        title: "Async/Await",
        content: `Async/await to składnia, która pozwala na pisanie kodu asynchronicznego w sposób, 
        który wygląda jak synchroniczny. Jest to najnowszy i najbardziej czytelny sposób obsługi asynchroniczności.`,
        examples: [
          {
            code: `// Funkcja asynchroniczna
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Błąd podczas pobierania danych:', error);
    throw error;
  }
}

// Użycie async/await z wieloma operacjami
async function loadDashboard() {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUserData(1),
      fetchUserPosts(1),
      fetchUserComments(1)
    ]);
    
    console.log('Dane załadowane:', { user, posts, comments });
  } catch (error) {
    console.error('Błąd ładowania dashboardu:', error);
  }
}`,
            language: "javascript",
            explanation: "Async/await upraszcza kod asynchroniczny, czyniąc go bardziej czytelnym i łatwiejszym w debugowaniu."
          }
        ]
      },
      {
        title: "Sprawdź swoją wiedzę",
        content: "Sprawdź swoją wiedzę z programowania asynchronicznego odpowiadając na poniższe pytania.",
        quiz: [
          {
            id: "q1",
            question: "Który z poniższych zapisów NIE jest poprawnym użyciem async/await?",
            options: [
              "async function foo() { await promise; }",
              "const foo = async () => await promise;",
              "await promise;",
              "async () => { await promise; }"
            ],
            correctAnswer: 2,
            explanation: "await może być używane tylko wewnątrz funkcji async. Nie można używać await bezpośrednio w globalnym zakresie."
          },
          {
            id: "q2",
            question: "Co zwraca funkcja oznaczona jako async?",
            options: [
              "Zawsze undefined",
              "Promise",
              "Wartość synchroniczną",
              "Callback"
            ],
            correctAnswer: 1,
            explanation: "Funkcja async zawsze zwraca Promise, nawet jeśli jawnie zwracamy wartość synchroniczną."
          }
        ]
      }
    ]
  },
  {
    id: "js-dom",
    title: "Manipulacja DOM",
    description: "Naucz się manipulować strukturą strony poprzez DOM (Document Object Model). Poznaj metody dostępu i modyfikacji elementów.",
    duration: "30 min",
    difficulty: "intermediate",
    xp: 80,
    rewards: {
      completion: [
        {
          type: 'xp',
          value: 80,
          title: 'Podstawy opanowane!',
          description: 'Ukończyłeś podstawy JavaScript'
        }
      ],
      quiz: {
        100: [
          {
            type: 'badge',
            value: 1,
            title: 'Perfekcyjny wynik!',
            description: 'Odpowiedziałeś poprawnie na wszystkie pytania'
          }
        ],
        80: [
          {
            type: 'xp',
            value: 15,
            title: 'Świetny wynik!',
            description: 'Zdobyłeś dodatkowe punkty za wysoki wynik'
          }
        ]
      }
    },
    sections: [
      {
        title: "Wprowadzenie do DOM",
        content: `DOM (Document Object Model) to programowy interfejs do dokumentów HTML. 
        Reprezentuje stronę jako drzewo obiektów, które możemy modyfikować za pomocą JavaScript.`,
        examples: [
          {
            code: `// Pobieranie elementów
const element = document.getElementById('myId');
const elements = document.getElementsByClassName('myClass');
const elementsByTag = document.getElementsByTagName('div');

// Nowoczesne selektory
const oneElement = document.querySelector('.myClass');
const allElements = document.querySelectorAll('.myClass');`,
            language: "javascript",
            explanation: "DOM udostępnia różne metody do wyszukiwania elementów. querySelector i querySelectorAll używają selektorów CSS."
          }
        ]
      },
      {
        title: "Modyfikacja elementów",
        content: `JavaScript pozwala na dynamiczną modyfikację zawartości, atrybutów i stylów elementów DOM.`,
        examples: [
          {
            code: `// Modyfikacja zawartości
element.textContent = 'Nowy tekst';
element.innerHTML = '<span>HTML</span>';

// Praca z klasami CSS
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('visible');

// Modyfikacja stylów
element.style.backgroundColor = 'red';
element.style.fontSize = '16px';

// Atrybuty
element.setAttribute('data-id', '123');
element.getAttribute('data-id');`,
            language: "javascript",
            explanation: "Możemy modyfikować tekst, HTML, klasy CSS, style inline i atrybuty elementów."
          }
        ]
      },
      {
        title: "Zdarzenia DOM",
        content: `Zdarzenia pozwalają reagować na interakcje użytkownika i inne zmiany w DOM.`,
        examples: [
          {
            code: `// Dodawanie nasłuchiwania zdarzeń
element.addEventListener('click', function(event) {
  console.log('Kliknięto!', event);
});

// Usuwanie nasłuchiwania
const handleClick = (event) => {
  console.log('Kliknięto!');
};
element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick);

// Delegacja zdarzeń
document.body.addEventListener('click', function(event) {
  if (event.target.matches('.button')) {
    console.log('Kliknięto przycisk!');
  }
});`,
            language: "javascript",
            explanation: "Zdarzenia pozwalają na interaktywność. Delegacja zdarzeń to wzorzec pozwalający obsługiwać wiele elementów jednym nasłuchiwaczem."
          }
        ]
      },
      {
        title: "Sprawdź swoją wiedzę",
        content: "Sprawdź swoją wiedzę o manipulacji DOM odpowiadając na poniższe pytania.",
        quiz: [
          {
            id: "q1",
            question: "Jaka jest różnica między textContent a innerHTML?",
            options: [
              "Nie ma różnicy",
              "textContent jest szybszy ale nie interpretuje HTML",
              "innerHTML jest bezpieczniejszy",
              "textContent działa tylko dla tekstu"
            ],
            correctAnswer: 1,
            explanation: "textContent traktuje wszystko jako tekst i jest bezpieczniejszy, podczas gdy innerHTML interpretuje zawartość jako HTML."
          },
          {
            id: "q2",
            question: "Która metoda jest zalecana do dodawania klas CSS?",
            options: [
              "element.className += 'newClass'",
              "element.classList.add('newClass')",
              "element.style.class = 'newClass'",
              "element.addClass('newClass')"
            ],
            correctAnswer: 1,
            explanation: "classList.add() jest nowoczesną i bezpieczną metodą dodawania klas, która nie nadpisuje istniejących klas."
          }
        ]
      }
    ]
  }
]; 