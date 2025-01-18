import { JSQuestion } from '../types/types';

export const questions: JSQuestion[] = [
  {
    id: 1,
    question: "Co zwróci poniższy kod?",
    code: "typeof typeof 42",
    options: ["'number'", "'string'", "'undefined'", "'object'"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Jaki będzie wynik?",
    code: "[1, 2, 3].map(num => num * 2)",
    options: ["[2, 4, 6]", "[1, 2, 3]", "undefined", "Error"],
    correctAnswer: 0
  },
]; 