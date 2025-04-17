import { IconType } from 'react-icons';
import { FaCode, FaCodeBranch, FaSync } from 'react-icons/fa';

interface Challenge {
  title: string;
  description: string;
  difficulty: 'Łatwy' | 'Średni' | 'Trudny';
  icon: IconType;
  xp: number;
  timeEstimate: string;
}

export const challenges: Challenge[] = [
  {
    title: 'Podstawy Zmiennych',
    description:
      'Naucz się deklarować i używać zmiennych w JavaScript. Poznaj różnice między var, let i const.',
    difficulty: 'Łatwy' as const,
    icon: FaCode,
    xp: 100,
    timeEstimate: '30 min',
  },
  {
    title: 'Funkcje i Callbacks',
    description:
      'Zgłęb tajniki funkcji, parametrów i funkcji zwrotnych. Poznaj arrow functions i closure.',
    difficulty: 'Średni' as const,
    icon: FaCodeBranch,
    xp: 200,
    timeEstimate: '45 min',
  },
  {
    title: 'Asynchroniczność',
    description: 'Opanuj Promise, async/await i zarządzanie asynchronicznym kodem w JavaScript.',
    difficulty: 'Trudny' as const,
    icon: FaSync,
    xp: 300,
    timeEstimate: '60 min',
  },
];
