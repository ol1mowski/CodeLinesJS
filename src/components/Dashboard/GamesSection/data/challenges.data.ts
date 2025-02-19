import { CodeChallenge } from '../types/jsTypoHunter.types';

export const challenges: CodeChallenge[] = [
  {
    id: 1,
    code: "conosle.log('Hello World');",
    error: "conosle",
    correct: "console"
  },
  {
    id: 2,
    code: "let num = 10;\nif(num = 10) { alert('Ten!'); }",
    error: "=",
    correct: "=="
  },
  {
    id: 3,
    code: "function calculateSum(a, b {\n  return a + b;\n}",
    error: "function calculateSum(a, b {",
    correct: "function calculateSum(a, b) {"
  }
]; 