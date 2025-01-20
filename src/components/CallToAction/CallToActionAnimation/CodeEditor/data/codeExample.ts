import { CodeLine } from '../types';

export const codeLines: CodeLine[] = [
    {
      line: "// Witaj w CodeLinesJS! 🚀",
      indent: 0,
    },
    {
      line: "",
      indent: 0,
    },
    {
      line: "function calculateScore(challenges) {",
      indent: 0,
    },
    {
      line: "const points = challenges.reduce((total, challenge) => {",
      indent: 1,
    },
    {
      line: "return total + challenge.difficulty * 100;",
      indent: 2,
    },
    {
      line: "}, 0);",
      indent: 1,
    },
    {
      line: "",
      indent: 0,
    },
    {
      line: "const bonus = points > 1000 ? points * 0.1 : 0;",
      indent: 1,
    },
    {
      line: "return points + bonus;",
      indent: 1,
    },
    {
      line: "}",
      indent: 0,
    },
    {
      line: "",
      indent: 0,
    },
    {
      line: "// Oblicz wynik gracza",
      indent: 0,
    },
    {
      line: "const playerScore = calculateScore(completedChallenges);",
      indent: 0,
    },
    {
      line: "console.log(`Twój wynik: ${playerScore} punktów! 🎮`);",
      indent: 0,
    },
  ];