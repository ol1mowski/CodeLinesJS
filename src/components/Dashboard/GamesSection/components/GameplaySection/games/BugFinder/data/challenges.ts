import { CodeChallenge } from "../types/bugFinder.types";

export const challenges: CodeChallenge[] = [
  {
    id: 1,
    code: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}`,
    correctCode: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}`,
    hints: [
      "Sprawdź warunek w pętli for",
      "Zastanów się nad zakresem indeksów tablicy"
    ],
    errors: [{
      line: 3,
      message: "Błąd w warunku pętli - wykracza poza zakres tablicy"
    }],
    timeLimit: 120,
    points: 100
  },
  {
    id: 2,
    code: `const filterEvenNumbers = array => {
  const result = array.filter(num => {
    if (num % 2 === 0);
      return num;
  });
  return result;
}`,
    correctCode: `const filterEvenNumbers = array => {
  const result = array.filter(num => num % 2 === 0);
  return result;
}`,
    hints: [
      "Zbędny średnik po warunku if",
      "Filter automatycznie zwraca true/false",
      "Można uprościć logikę filtrowania"
    ],
    errors: [
      { line: 3, message: "Zbędny średnik po warunku if" },
      { line: 4, message: "Niepotrzebny return w filter" }
    ],
    timeLimit: 90,
    points: 150
  }
]; 