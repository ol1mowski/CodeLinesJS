import { CodeChallenge } from "../types/bugFinder.types";

export const challenges: CodeChallenge[] = [
  {
    id: 1,
    code: `function calculateSum(numbers) {
  let sum;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum
}`,
    correctCode: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}`,
    hints: [
      "Sprawdź inicjalizację zmiennej sum",
      "Przyjrzyj się warunkowi w pętli for",
      "Nie zapomnij o średniku na końcu return"
    ],
    errors: [
      { line: 2, message: "Zmienna sum nie jest zainicjalizowana" },
      { line: 3, message: "Błędny warunek w pętli (wykracza poza tablicę)" },
      { line: 5, message: "Brak średnika na końcu wyrażenia" }
    ],
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