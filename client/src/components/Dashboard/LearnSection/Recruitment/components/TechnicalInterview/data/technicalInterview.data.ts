import { FaBook, FaCode } from 'react-icons/fa';
import type { InterviewBlock, InterviewTip } from '../types/recruitment.types';

export const interviewBlocks: InterviewBlock[] = [
  {
    id: 'theory',
    title: 'Teoria',
    description: 'Podstawowe koncepty i wiedza teoretyczna niezbędna podczas rozmów technicznych',
    icon: FaBook,
    topics: [
      'Podstawy JavaScript (var, let, const)',
      'Hoisting i scope',
      'Closures i funkcje wyższego rzędu',
      'Prototypy i dziedziczenie',
      'Event loop i asynchroniczność',
      'ES6+ nowe funkcjonalności',
    ],
  },
  {
    id: 'practice',
    title: 'Praktyka',
    description: 'Zadania praktyczne i przykłady kodu często pojawiające się na rozmowach',
    icon: FaCode,
    topics: [
      'Algorytmy sortowania i wyszukiwania',
      'Manipulacja tablicami i obiektami',
      'Zadania z rekurencją',
      'Problemy z string-ami',
      'Live coding challenges',
      'Debugowanie kodu',
    ],
  },
];

export const interviewTips: InterviewTip[] = [
  {
    category: 'Przed rozmową',
    tips: [
      'Przejrzyj podstawy JavaScript',
      'Przygotuj pytania do firmy',
      'Przetestuj kamerę i mikrofon',
    ],
  },
  {
    category: 'W trakcie rozmowy',
    tips: [
      'Myśl na głos',
      'Zadawaj pytania doprecyzowujące',
      'Nie bój się przyznać do niewiedzy',
    ],
  },
  {
    category: 'Live coding',
    tips: [
      'Zacznij od prostego rozwiązania',
      'Testuj kod na przykładach',
      'Optymalizuj tylko na końcu',
    ],
  },
]; 