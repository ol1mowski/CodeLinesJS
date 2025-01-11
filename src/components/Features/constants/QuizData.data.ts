export const QUIZ_DATA = {
    title: "Wyzwanie JavaScript",
    subtitle: "Co zwróci poniższy kod?",
    code: `const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(num => num * 2);
  console.log(doubled);`,
    answers: [
      "[2, 4, 6, 8, 10]",
      "[1, 2, 3, 4, 5, 1, 2, 3, 4, 5]",
      "undefined",
      "TypeError"
    ],
    correctAnswer: 0
  };