export const QUIZ_DATA = {
  title: 'Co zwróci poniższy kod?',
  code: `const x = 5;
const y = "5";

console.log(x == y);
console.log(x === y);`,
  options: [
    { id: 1, text: 'true, true' },
    { id: 2, text: 'true, false' },
    { id: 3, text: 'false, false' },
    { id: 4, text: 'false, true' },
  ],
  correctAnswer: 2,
};
